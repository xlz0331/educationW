<template>
  <div class="salary-pay-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="6">
        <label style="font-size:small">月份：</label>
        <el-date-picker size="mini"
                        v-model="queryParams.salaryYearAndMon"
                        type="month"
                        value-format="yyyy-M"
                        placeholder="请选择算薪月份" @change="initPage()">
        </el-date-picker>
      </el-col>
      <el-col :span="18" class="text-right">
        <div>
          <!--<el-button type="warning" :loading="calcLoading" @click="calculateData()">-->
            <!--补助计算-->
          <!--</el-button> -->
        </div>
      </el-col>
    </el-row>
    <!--element-loading-spinner="el-icon-loading"-->
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="拼命加载中"
      stripe border :span-method="arraySpanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%">
      <el-table-column prop="seqText" header-align="center" label="序号" width="35">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType==1" class="text-left">
            {{scope.row.seqText}}
          </div>
          <div class="text-center" v-else>{{scope.row.seqText}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="empName" align="center" label="姓名" minWidth="45"></el-table-column>
      <el-table-column prop="deptName" align="center" label="部门" minWidth="85"></el-table-column>
      <el-table-column prop="jobName" align="center" label="职务" minWidth="85"></el-table-column>
      <el-table-column align="center" label="放弃年休假情况">
        <el-table-column prop="dateRange" align="center" label="原休假时间"
                         :render-header="renderheader"
                         minWidth="140">
        </el-table-column>
        <el-table-column prop="totalDays" header-align="center" align="right" label="总天数"
                         :render-header="renderheader"
                         minWidth="40">
        </el-table-column>
        <el-table-column prop="alreadyDays" :render-header="renderheader" header-align="center" align="right"
                         label="已休假天数" minWidth="60">
        </el-table-column>
        <el-table-column prop="giveUpDays" header-align="center" align="right" label="未休假天数"
                         :render-header="renderheader"
                         minWidth="70">
        </el-table-column>
        <el-table-column prop="aduitName" header-align="center"
                         align="right"
                         label="审批人" :render-header="renderheader" minWidth="50">
        </el-table-column>
        <el-table-column prop="aduitDate" :render-header="renderheader" align="center"
                         label="审批时间" minWidth="80">
          <template slot-scope="scope">
            {{scope.row.aduitDate?scope.row.aduitDate.substring(0,10):''}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="补助金额计算">
        <el-table-column prop="rankSalary" header-align="center" align="right" label="职级工资" minWidth="50">
        </el-table-column>
        <el-table-column prop="fullWorkSalary" header-align="center" align="right" label="满勤奖" minWidth="50">
        </el-table-column>
        <el-table-column prop="calculateBase" header-align="center" align="right" label="计算基数" minWidth="50">
        </el-table-column>
        <el-table-column prop="daySalary" header-align="center" align="right" label="日值" minWidth="50">
        </el-table-column>
        <el-table-column prop="assistanceDay" header-align="center" align="right" label="补助天数" minWidth="50">
        </el-table-column>
        <el-table-column prop="assistanceRateText" header-align="center" align="right" label="补助比例" minWidth="50">
        </el-table-column>
        <el-table-column prop="assistanceSalary" header-align="center" align="right" label="补助金额" minWidth="50">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
  .salary-pay-container {
    max-width: 1280px;
  }

  .hidden_btn {
    display: none;
  }

  .el-date-editor {
    width: 160px !important;
  }

</style>
<script>
  import Salary_API from '@/api/salary/salary'
  import Subsidy_API from '@/api/salary/subsidy'

  export default {
    name: "list",
    data() {
      var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数值不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 0) {
              callback(new Error('数值不能小于0'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        loading: false,
        dialogVisible: false,
        tableHeight: null,
        title: '',
        columnColtrol: {},
        tableData: [],
        companyList: [],
        queryParams: {
          salaryCompany: '',
          salaryYearAndMon: '',
          salaryYear: '',
          salaryMonth: '',
          gradeCategory: '',
        },
        mainData: {
          fdId: '',
          zCanQuery: false,//判断是否有查询当月工资的权限
          xCalculateShow: false,//工资计算
          xAuditShow: false,//工资审核
          xUnAuditShow: false,//工资审核（反审）
          xApproveShow: false,//工资审批
          xUnApproveShow: false//工资审批（反审批）
        },
        calcLoading: false,//计算
        auditLoading: false,

        //奖扣明细
        formdata: {
          empNo: '',
          empName: '',
          jobName: '',
          deptName: '',
          salaryGrade: ''
        },
        addList: [],
        subuctList: []
      }
    },
    watch: {
      '$route': function () {
        this.initpage();
        this.getTableHeight();
      }
    },
    components: {},
    methods: {
      getTableHeight() {
        this.tableHeight = window.innerHeight - 140;
      },
      renderheader(h, {column, $index}) {
        return h('span', {}, [
          h('span', {}, column.label.split('</br>')[0]),
          h('br'),
          h('span', {}, column.label.split('</br>')[1])
        ])
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return [1, 22];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },

      //重新计算
      calculateData() {
        this.$confirm('确定要进行【' + this.queryParams.salaryYearAndMon + '】【未休年休假补助】吗？', {type: 'warning'}).then((item) => {
          let para = this.queryParams;
          this.calcLoading = true;
          this.loading = true;
          Subsidy_API.calculateData_subsidyGiveupYearVacation(para).then(res => {
            this.calcLoading = false;
            this.loading = false;
            if (res.success) {
              this.$message({type: 'success', message: '【' + this.queryParams.salaryYearAndMon + '】未休年休假补助计算完成！'})
              this.initPage();
            }
            else {
              this.$message({
                type: 'error',
                message: '【' + this.queryParams.salaryYearAndMon + '】未休年休假补助计算失败！' + res.msg
              });
            }
          }).catch(err => {
            this.$message({type: 'error', message: '【' + this.queryParams.salaryYearAndMon + '】未休年休假补助计算失败：' + err.msg})
            this.calcLoading = false;
            this.loading = false;
          });
        }).catch(error => {
          this.$message({type: 'info', showClose:true,message: '已取消进行'});
        });
        ;
      },

      queryShowList() {
        var arr = [];
        if (this.queryParams.salaryYearAndMon == null) return;
        if (this.queryParams.salaryYearAndMon == '') return;
        if (this.queryParams.salaryYearAndMon.indexOf('-') == -1) return;
        arr = this.queryParams.salaryYearAndMon.split('-');
        this.queryParams.salaryYear = arr[0];
        this.queryParams.salaryMonth = arr[1];
        let params = {
          salaryCompany: this.queryParams.salaryCompany,
          salaryYear: arr[0],
          salaryMonth: arr[1],
        }

        //
        // let params = {
        //   salaryCompany: this.queryParams.salaryCompany,
        //   salaryYear: this.queryParams.salaryYear,
        //   salaryMonth: this.queryParams.salaryMonth
        // }
        Subsidy_API.queryShowList_subsidyGiveupYearVacation(params).then(res => {
          this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', showClose:true, message: '列表加载失败：' + err.msg})
        });
      },
      initPage() {
        this.queryShowList();
      },
    },
    created() {
    },
    mounted() {
      var routerParams = this.$store.state.salary.routerCommParams;
      this.title = routerParams.keyVal1.title + routerParams.keyVal2.title;
      this.queryParams.salaryCompany = routerParams.keyVal1.values;
      var now = new Date();
      var lastMon = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      this.queryParams.salaryYearAndMon = lastMon.getFullYear() + "-" + (lastMon.getMonth() + 1);//默认为上一个月

     this.initPage();
     this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





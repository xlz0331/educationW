<template>
  <div class="standard-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}厂长(含)以下职等管理人员【月薪标准执行】表</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="5">
        <label style="font-size:small">年度：</label>
        <el-date-picker size="mini"
                        v-model="queryParams.salaryYearAndMon"
                        type="year"
                        value-format="yyyy"
                        placeholder="请选择算薪年度" @change="initPage()">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <label style="font-size:small">开始执行时间：</label>
        {{2018}}
      </el-col>
      <el-col :span="13" class="text-right">
        <div>
          <el-button type="primary" @click="goPage('monStand')">说明</el-button>
          <el-button type="primary" @click="goPage('monStand')">历史月薪标准查询</el-button>
          <!--<el-button type="primary" @click="goPage('monStand')">增加职等</el-button>-->
          <!--<el-button type="primary" @click="goPage('monStand')">调整职级工资</el-button>-->
          <!--<el-button type="primary" @click="goPage('monStand')">放弃条横</el-button>-->
          <!--<el-button type="primary" @click="goPage('monStand')">保存</el-button>-->
          <!--<el-button type="primary" @click="goPage('monStand')">提交审批</el-button>-->
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中..."
      stripe border :span-method="arraySpanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%">
      <el-table-column prop="sequence" header-align="center" label="职等数" width="45">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType==1" class="text-left">

          </div>
          <div class="text-center" v-else>{{scope.row.gradeNumber}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gradeName" header-align="center" width="100" label="职等"></el-table-column>
      <el-table-column align="center" label="本年度增资">
        <el-table-column prop="thisAddMoney" align="center" label="金额" width="60">
        </el-table-column>
        <el-table-column prop="thisAddRate" align="center" label="比例" width="60">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="职等平均工资">
        <el-table-column prop="averagePre" align="center" label="上年度" width="70">
        </el-table-column>
        <el-table-column prop="averageThis" align="center" label="本年度" width="70">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="职等优级工资差">
        <el-table-column prop="compareDiffer" align="center" label="差额" width="70">
        </el-table-column>
        <el-table-column prop="compareGarde" align="center" label="对比职等" width="70">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="rankDiffer" align="center" label="级差" width="50">
      </el-table-column>
      <el-table-column align="center" label="职级及月薪">
        <template slot-scope="scope">
          <table class="table" style="width: 100%">
            <tbody>
            <tr style="width: 100%">
              <td style="width: 40px;border-right: none;" v-for="item in scope.row.listRankName">{{item}}</td>
            </tr>
            </tbody>
          </table>
        </template>
      </el-table-column>
      <el-table-column prop="shouldSalaryTotal" header-align="center" align="right" label="操作"
                       :render-header="renderheader"
                       width="40">
      </el-table-column>
    </el-table>

    <el-dialog title="【奖扣项目明细】" width="55%" :close-on-click-modal="false"
               :visible.sync="dialogVisible">
      <div style="max-height: 600px;overflow-y: scroll;">
        <!--<el-row>-->
        <!--<el-col :span="24">-->
        <!--<div><b>{{title}}【奖扣项目明细】查询表</b></div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row class="text-left">
          <el-col :span="10">
            <div>
              <el-input v-model="formdata.empName" placeholder="姓名" readonly>
                <template slot="prepend"><b>姓名:</b></template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="10">
            <div>
              <el-input v-model="formdata.salaryGrade" placeholder="职等" readonly>
                <template slot="prepend"><b>职等:</b></template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div>
              <el-input v-model="formdata.deptName" placeholder="部门" readonly>
                <template slot="prepend"><b>部门:</b></template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="10">
            <div>
              <el-input v-model="formdata.jobName" placeholder="职务" readonly>
                <template slot="prepend"><b>职务:</b></template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!--element-loading-spinner="el-icon-loading"-->

        <el-row class="text-left">
          <el-col :span="24">
            <div><b> 一、其他奖项</b></div>
          </el-col>
        </el-row>
        <el-table
          :data="addList"
          stripe border
          :row-class-name="rowClass"
          :cell-class-name="rowClass"
          show-summary
          sum-text="小计"
          style="width: 100% ;margin-top: 4px;!important;">
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column prop="itemName" header-align="center" label="项目名称" minWidth="80"></el-table-column>
          <el-table-column prop="money" align="center" label="金额" minWidth="60"></el-table-column>
          <el-table-column align="center" label="计算明细查看" width="90">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.itemName=='未休年休假补助'" @click="goCalDetail(scope.row)"
                         style="cursor: pointer">点击查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="备注" minWidth="80">
            <template slot-scope="scope">
              {{scope.row.remark}}
            </template>
          </el-table-column>
        </el-table>
        <el-row class="text-left ">
          <el-col :span="24">
            <div><b> 二、其他扣项</b></div>
          </el-col>
        </el-row>
        <el-table
          :data="subuctList"
          stripe border
          :row-class-name="rowClass"
          :cell-class-name="rowClass"
          show-summary
          sum-text="小计"
          style="width: 100%;margin-top: 4px;!important;">
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column prop="itemName" header-align="center" label="项目名称" minWidth="80"></el-table-column>
          <el-table-column prop="money" align="center" label="金额" minWidth="60"></el-table-column>
          <el-table-column align="center" label="计算明细查看" width="90">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.itemName=='未休年休假补助'" @click="goCalDetail(scope.row)"
                         style="cursor: pointer">点击查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="备注" minWidth="80">
            <template slot-scope="scope">
              {{scope.row.remark}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :title="calcDetailTitle" width="95%" :close-on-click-modal="false"
                 :visible.sync="dialogCalDetailVisible" append-to-body>
        <el-table
          :data="detailData" v-loading="loading" element-loading-text="加载中......"
          stripe border
          :row-class-name="rowClass"
          :cell-class-name="rowClass"
          style="width: 100%">
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
      </el-dialog>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
  ._container {
    max-width: 1320px;
  }

  .el-date-editor {
    width: 160px;
  }

  .table {
    border-spacing: 0px;
    width: 100%;
    thead tr {
      th {
        text-align: center;
        border-bottom: none;
        height: 30px;
      }
    }
    tbody tr td {
      text-align: center;
      height: 30px;
    }
  }
</style>
<style lang="scss">
  .standard-container {
    .el-table td, .el-table th {
      padding: 0px !important;
    }
  }
</style>
<script>
  import Salary_API from '@/api/salary/salary'
  import Standard_API from '@/api/standard/standard'

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
        dialogCalDetailVisible: false,
        tableHeight: null,
        title: '',
        calcDetailTitle: '未休年假补助计算明细',
        columnColtrol: {},
        tableData: [],
        detailData: [],
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
        if (row.rowType == 51) {
          return [1, 9];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        // if (row.rowType == 1) {
        //   return 'warning-row';
        // }
      },

      initPage() {
        this.queryList();
      },
      queryList() {
        var arr = [];
        if (this.queryParams.salaryYearAndMon == null) return;
        if (this.queryParams.salaryYearAndMon == '') return;
        if (this.queryParams.salaryYearAndMon.indexOf('-') == -1) return;
        arr = this.queryParams.salaryYearAndMon.split('-') || [];
        this.queryParams.salaryYear = arr[0];
        this.queryParams.salaryMonth = arr[1];
        let para = {
          salaryCompany: this.queryParams.salaryCompany,
          salaryYear: arr[0],
          salaryMonth: arr[1],
          gradeCategory: this.queryParams.gradeCategory
        }
        if (para.salaryCompany == '') return;

        Standard_API.queryReport(para).then(res => {
          let resdata = res.data || [];
          this.tableData = resdata;
        }).catch(err => {
          this.$message({type: 'error', showClose: true, message: '列表信息失败：' + err.msg})
        });

      },


      showDetail(obj) {
        this.dialogVisible = true;
        this.queryAwardDetailList(obj.empNo);
      },
      //跳转至各个副表
      goPage(val, keyObj) {
        if (this.queryParams.salaryCompany == null || this.queryParams.salaryCompany == ''
          || this.queryParams.salaryYear == null || this.queryParams.salaryYear == ''
          || this.queryParams.salaryMonth == null || this.queryParams.salaryMonth == '') {
          this.$message({type: 'info', message: '请选择年月'})
          return;
        }
        let params = this.queryParams;
        params.title = this.title;

        switch (val) {
          case "monStand" :
            this.$store.commit('setMonthStandardParams', params)
            this.$router.push({path: './salary_month_standard_list'});
            break;
          case "detailList" :
            this.$store.commit('setCommParams', params)
            this.$router.push({path: './salary_detail_list'});
            break;
          case "employeeDiff" :
            this.$store.commit('setCommParams', params)
            this.$router.push({path: './salary_employee_diff_list'});
            break;
          case "detailChangeList" :
            this.$store.commit('setCommParams', params)
            this.$router.push({path: './salary_detail_change_list'});
            break;
          case "award" :
            params.empNo = keyObj;
            this.$store.commit('setCommParams', params);
            this.$router.push({path: './salary_detail_award_list'});
            break;
        }
      },


      //请求弹出框列表的数据
      queryAwardDetailList(empNo) {
        let params = {
          salaryYear: this.queryParams.salaryYear,
          salaryMonth: this.queryParams.salaryMonth,
          empNo: empNo
        }
        Salary_API.queryOthersByEmpMonth_payAuditSalary(params).then(res => {
          // this.tableData = res.data || [];
          var resdata = res.data || {};
          this.formdata.empNo = resdata.empNo;
          this.formdata.empName = resdata.empName;
          this.formdata.salaryGrade = resdata.salaryGrade;
          this.formdata.jobName = resdata.jobName;
          this.formdata.deptName = resdata.deptName;
          this.addList = resdata.addList || [];
          this.subuctList = resdata.subuctList || [];

        }).catch(err => {
          this.$message({type: 'error', message: '奖扣明细加载失败：' + err.msg})
        });
      },


    },
    created() {
    },
    mounted() {
      var routerParams = this.$store.state.salary.routerCommParams;
      this.title = routerParams.keyVal1.title;
      this.queryParams.salaryCompany = routerParams.keyVal1.values;
      this.queryParams.gradeCategory = routerParams.keyVal2.values;//this.$route.params.gadeCode;
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





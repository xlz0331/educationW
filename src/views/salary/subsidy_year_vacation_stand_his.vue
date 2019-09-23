<template>
  <div class="salary-pay-container">
    <el-row>
      <el-col :span="20">
        <div><b>未休年休假【补助标准历史查询】表</b></div>
      </el-col>
      <el-col :span="4" class="text-right">
        <div>
          <el-button type="warning"     @click="goback()">
            返回上一级
          </el-button>
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
      <el-table-column type="index" align="center" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="itemName" align="center" label="项目" minWidth="60"></el-table-column>
      <el-table-column prop="itemValueText1" align="center" label="补助比例" minWidth="85"></el-table-column>
      <el-table-column prop="startDate" align="center" label="开始执行时间" minWidth="85">
        <template slot-scope="scope">
          {{scope.row.startDate?scope.row.startDate.substring(0,10):''}}
        </template>
      </el-table-column>
      <el-table-column prop="endDate" align="center" label="执行结束时间" minWidth="85">
        <template slot-scope="scope">
          {{scope.row.endDate?scope.row.endDate.substring(0,10):''}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" align="center" label="备注" minWidth="120"></el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
  .salary-pay-container {
    max-width: 900px;
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
    name: "subsidy_year_vacation_stand_his",
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
        itemType:'未休年休假补助',
        columnColtrol: {},
        tableData: [],
        companyList: [],
        queryParams: {
          salaryCompany: '004',
          salaryYearAndMon: '',
          salaryYear: '2019',
          salaryMonth: '3',
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
        if (row.rowType == 1) {
          return [1, 22];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },

      findHistoryByType() {
        let params = {
          itemType:this.itemType
        }
        Subsidy_API.findHistoryByType_subsidyStandardManual(params).then(res => {
          this.tableData=res.data||[];
        }).catch(err => {
          this.$message({type: 'error', showClose:true,message: '列表加载失败：' + err.msg})
        });
      },
      initPage() {
        this.findHistoryByType();
      },
      goback(){
        history.go(-1);
      }
    },
    created() {
    },
    mounted() {
      var routerParams = this.$store.state.salary.routerCommParams;
      this.title = routerParams.keyVal1.title + routerParams.keyVal2.title;
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





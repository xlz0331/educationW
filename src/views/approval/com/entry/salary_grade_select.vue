<template>
  <div class="rank_container">
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中..."
      stripe border :max-height="tableHeight"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="45">
      </el-table-column>
      <el-table-column prop="nodeName" align="center" label="节点" width="100"></el-table-column>
      <el-table-column prop="userName" header-align="center" label="处理人" width="100"></el-table-column>
      <el-table-column prop="disposeDate" header-align="center" align="center" label="开始日期" :render-header="renderheader"
                       width="130">
      </el-table-column>
      <el-table-column prop="disposeDate" header-align="center" align="center" label="处理日期" :render-header="renderheader"
                       width="130">
      </el-table-column>
      <el-table-column prop="disposeStatusText" header-align="center" align="center" label="处理状态" :render-header="renderheader"
                       width="100">
      </el-table-column>
      <el-table-column prop="disposeOpinion" header-align="center" align="left" label="审核审批意见"
                       :render-header="renderheader"
                       minWidth="150">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import SalarySys_API from '@/api/salary/salarySys'

  export default {
    name: "salary_grade_",
    props: {
      salarySystem: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        tableHeight: null,
        tableData: [],
        loading: false,
        salaryGradeList:[],
        salaryRankList:[],
        formData:{
          salaryGrade:'',
          salaryRank:'',
          entryMonthSalary:null,
          entrySalary:null,
        }
      }
    },
    component() {
    },
    methods: {
      queryListBySalarySystem(params) {
        SalarySys_API.queryListBySalarySystem_payAuditSalaryGrade(params).then(res => {
          this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },
      queryRankListByGrade(params) {
        SalarySys_API.queryRankListByGrade_payAuditSalaryGrade(params).then(res => {
        this.salaryRankList = res.data || [];
      }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
      });
      },



      renderheader(h, {column, $index}) {
        return h('span', {}, [
          h('span', {}, column.label.split('</br>')[0]),
          h('br'),
          h('span', {}, column.label.split('</br>')[1])
        ])
      },
    },
    mounted() {
      let params = {salarySystem: this.salarySystem};
      this.queryListBySalarySystem(params);
    }

  }
</script>

<style lang="scss" >
  .rank_container{
    .el-input--mini .el-input__inner {
      width: 90%;
      margin: 1px auto;
    }
  }
</style>

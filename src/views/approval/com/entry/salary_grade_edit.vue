<template>
  <div class="rank_container">
    <table class="table el-table el-table--border ">
      <thead>
      <tr>
        <th style="width: 50%">原职等</th>
        <th style="width: 50%">职等</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          {{formData.jobGrade}}
        </td>
        <td>
          <el-select v-model="formData.salaryGrade" placeholder="请选择" >
          <el-option :key="0" value=""></el-option>
            <el-option
              v-for="item in salaryGradeList"
              :key="item.fdId"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import SalarySys_API from '@/api/salary/salarySys'

  export default {
    components: {},
    name: "salary_rank_edit",
    props: {
      salaryObj: {
        type: Object,
        required: false
      },
      keyVal: {
        type: String,
        required: true
      },
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
        salaryGradeList: [],
        salaryRankList: [],
        formData: {
          salaryGrade: '',
          salaryRank: '',
          entryMonthSalary: null,
          entrySalary: null,
        }
      }
    },
    component() {
    },
    watch: {
      keyVal: function (obj) {
        this.formData = this.salaryObj;
      }
    },
    methods: {
      queryListBySalarySystem(params) {
        SalarySys_API.queryListBySalarySystem_payAuditSalaryGrade(params).then(res => {
          this.salaryGradeList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '职等数据列表请求异常：' + err.msg})
        });
      },
      queryRankListByGrade(params) {
        SalarySys_API.queryRankListByGrade_payAuditSalaryGrade(params).then(res => {
          this.salaryRankList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '职级数据请求异常：' + err.msg})
        });
      },
      gradeChange() {
        let params = {
          salarySystem: this.salarySystem,
          salaryGrade: this.formData.salaryGrade
        };
        this.queryRankListByGrade(params);
        this.formData.salaryRank = null;
        this.formData.entryMonthSalary = null;
        this.formData.entrySalary = null;
      },
      rankChange() {
        let arr = this.salaryRankList.filter(_item => {
          return _item.salaryRank === this.formData.salaryRank
        }) || [];
        this.formData.entryMonthSalary = arr.length > 0 ? arr[0].rankSalary : null;
        this.formData.entrySalary = (this.formData.entryMonthSalary * 12 / 10000).toFixed(4);;
      },
      entryMonthSalaryChange() {
        this.formData.entrySalary = (this.formData.entryMonthSalary * 12 / 10000).toFixed(4);
      },

    },
    mounted() {
      this.formData = this.salaryObj || {};
      this.salaryGradeList = [];
      this.salaryRankList = [];
      let params = {salarySystem: this.salarySystem};
      this.queryListBySalarySystem(params);
    }

  }
</script>

<style lang="scss">
  .rank_container {
    .el-input--mini .el-input__inner {
      width: 90%;
      margin: 1px auto;
    }
  }
</style>

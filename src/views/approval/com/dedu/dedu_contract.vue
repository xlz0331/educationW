<template>
  <div class="dedu_container">
    <table class="table el-table el-table--border ">
      <thead>
      <tr>
        <th style="width: 10%">录用人</th>
        <th>开始时间</th>
        <th>结束时间</th>
        <th>约定年限</th>
        <th>津贴标准（元）</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{formData.name}}</td>
        <td>
          <el-date-picker
            v-model="formData.startTime"
            align="right"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </td>
        <td>
          <el-date-picker
            v-model="formData.endTime"
            align="right"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </td>
        <td>
          <el-input  type="number"  v-model="formData.appointYear" placeholder=""></el-input>
        </td>
        <td>
          <el-input  type="number"  v-model="formData.allowance" placeholder=""></el-input>
        </td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import WaittingApproval_API from '@/api/approval/waittingApproval'

  export default {
    name: "salary_standard_reimburse",
    props: {
      keyVal: {
        type: String,
        required: true,
      },
      formObj: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        tableHeight: null,
        tableData: [],
        loading: false,
        formData: {
          startTime: '',
          endTime: '',
          name: '',
          appointYear: '',
          appointTax: '',
          allowance: '',
          monthBorrowAmount: '',
          monthRepaymentAmount: '',
          perTaxMonthSalary: '',
          perTaxYearSalary: null,
          afterTaxMonthSalary: '',
          afterTaxYearSalary: null,
        }
      }
    },
    component() {

    },
    watch: {
      keyVal: function (obj) {
        this.formData = this.formObj;
      }
    },
    methods: {
      queryFlowNodeList(params) {
        WaittingApproval_API.queryFlowNodeList(params).then(res => {
          this.tableData = res.data || [];
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
      this.formData = this.formObj;
    }

  }
</script>


<style lang="scss">
  .dedu_container {
    .el-input--mini .el-input__inner, {
      width: 95%;
      margin: 1px auto;
    }
    .el-date-editor {
      width: 90%;
      margin: auto 5px;
    }
  }
</style>

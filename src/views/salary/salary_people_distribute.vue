<template>
  <div class="salary-people-container  distribute-table"  :style="'width:'+(columnCount*80+160+120+2)+'px;min-width:1000px'">
    <el-row>
      <el-col :span="21">
        <div><b>{{title}}【职级人数分布】查询表</b></div>
      </el-col>
      <el-col :span="3" class="text-right">
        <div>
          <el-button type="warning" @click="goback()">返回上一级</el-button>
        </div>
      </el-col>
    </el-row>
    <!--element-loading-spinner="el-icon-loading"-->
    <el-table
      :data="tableData" :span-method="arraySpanMethod" v-loading="loading" element-loading-text="拼命加载中"
      stripe border :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      :style="'width:'+(columnCount*80+160+120+2)+'px;'"
      >
      <el-table-column prop="seq" align="center" label="序号" width="40">
        <template slot-scope="scope">
          {{scope.row.seq}}
        </template>
      </el-table-column>
      <el-table-column prop="salaryGrade" align="center" label="职等" width="80">
        <template slot-scope="scope">
          {{ scope.row.rowType==2|| scope.row.rowType==3?'': scope.row.salaryGrade}}
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="right" label="职级人数分布"
                       :render-header="renderheader"
      :width="(columnCount*80+160)">
        <template slot="header" slot-scope="scope">
          <table class="table">
            <thead>
            <tr>
              <th style="width: 80px">项目</th>
              <th colspan="columnCount" :style="'width:'+((columnCount)*80)+'px'">职级分布</th>
              <th style="width: 80px;border-right: none;">合计</th>
            </tr>
            </thead>
          </table>
        </template>
        <template slot-scope="scope">
          <table class="table">
            <tbody>
            <tr v-for="item in scope.row.listDetail" style="width: 100%">
              <td v-for="(item1,index1) in item" :style="index1==0?'width:80px'
              :index1==(item.length-1)?'width:80px;border-right:none;':('width:80px')">{{item1}}
              </td>
            </tr>
            </tbody>
          </table>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<style lang="scss">
  .distribute-table {
    .el-table td, .el-table th {
      padding: 0px !important;
    }
  }
</style>
<style lang="scss" scoped>
  /*.salary-people-container {*/
    /*max-width: 1240px;*/
  /*}*/

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
      /*border-bottom: 1px solid ;*/
    }
  }

</style>
<script>
  import Salary_API from '@/api/salary/salary'
  import SalarySys_API from '@/api/salary/salarySys'

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        title: '',
        tableHeight: null,
        tableData: [],
        salaryYearAndMon: '',
        columnColtrol: {},
        salaryCompany: '',
        salaryYear: '',
        salaryMonth: '',
        gradeCategory: '',
        dialogVisible: false,
        columnCount: 1
      }
    },
    watch: {
      '$route': function () {
        this.getTableHeight();
        this.initpage();
      }
    },
    filters: {
      rounding(value, num) {
        var resValue = value != null && value != '' ? value.toFixed(num) : value;
        return resValue
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
          return [1, 20];
        }
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 3 || columnIndex === 4) {
          for (let i = 0; i < this.OrderIndexArr.length; i++) {
            let element = this.OrderIndexArr[i]
            for (let j = 0; j < element.length; j++) {
              let item = element[j]
              if (rowIndex == item) {
                if (j == 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else if (j != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },
      queryPeopleDistribute() {
        let params = {
          salaryCompany: this.salaryCompany,
          salaryYear: this.salaryYear,
          salaryMonth: this.salaryMonth,
          gradeCategory: this.gradeCategory
        }
        this.loading = true;
        Salary_API.queryPeopleDistribute_payAuditSalary(params).then(res => {
          var resdata = res.data || [];
          this.tableData = res.data || [];
          if (resdata.length > 0) {
            this.columnCount = resdata[0].columnCount || 1;
          }
          // this.columnColtrol = res.data.columnColtrol || {};
          this.loading = false;
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '状态加载失败：' + err.msg})
          this.loading = true;
        });
      },

      //新增、修改保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isNew) {
              Salary_API.save_payAuditSalaryGradeCategory(this.editFormData).then(res => {
                this.$message(res.success ? {type: 'success', message: '新增成功'} : {
                  type: 'error',
                  message: '新增失败' + res.msg
                });
                this.resetForm('editFormData');
                this.dialogEditVisible = false;
                this.findListByCompany();
              }).catch(err => {
                this.$message({type: 'error',showClose:true, message: '新增失败：' + err.msg})
              });
            } else {
              Salary_API.update_payAuditSalaryGradeCategory(this.editFormData).then(res => {
                this.$message(res.success ? {type: 'success',showClose:true, message: '修改成功'} : {
                  type: 'error',
                  showClose:true,
                  message: '修改失败' + res.msg
                });
                this.resetForm('editFormData');
                this.dialogEditVisible = false;
                this.findListByCompany();
              }).catch(err => {
                this.$message({type: 'error',showClose:true, message: '修改失败：' + err.msg})
              });
            }


          } else {
            return false;
          }
        });
      },
      goback() {
        history.go(-1);
      },
      showExplain() {
        this.dialogVisible = true;
      },
      initPage() {
        var obj = this.$store.state.salary.monthStandardParams || {};
        this.salaryCompany = obj.salaryCompany;
        this.salaryYearAndMon = obj.salaryYearAndMon,
          this.salaryYear = obj.salaryYear;
        this.salaryMonth = obj.salaryMonth;
        this.gradeCategory = obj.gradeCategory;
        this.title = obj.title;
        this.queryPeopleDistribute();
        this.getTableHeight();
      }
    },
    created() {
    },
    mounted() {
      this.initPage();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }

  }
</script>





<template>
  <div class="salary-detail-tax-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}【个人所得税计算】查询表</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="4" class="text-left">
        <el-input v-model="salaryYearAndMon" placeholder="月份" readonly>
          <template slot="prepend"><b>月份：</b></template>
        </el-input>
      </el-col>
      <el-col :span="20" class="text-right">
        <div>
          <el-button type="warning" @click="goback()">返回上一级</el-button>
        </div>
      </el-col>
    </el-row>
    <!--element-loading-spinner="el-icon-loading"-->
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="拼命加载中"
      stripe border :span-method="arraySpanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      sum-text="合计"
      style="width: 100%">
      <el-table-column  prop="seqText" hearder-align="center" label="序号"   width="35">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType==1" class="text-left">
            {{scope.row.seqText}}
          </div>
          <div class="text-center" v-else>{{scope.row.seqText}}
          </div>
        </template>
      </el-table-column>
      <!--<el-table-column prop="empNo" header-align="center" label="工号"  width="55"></el-table-column>-->
      <el-table-column prop="empName" header-align="center" label="姓名"  width="50"></el-table-column>
      <el-table-column header-align="center" label="本年累计工资收入"  :render-header="renderheader">
        <el-table-column prop="salaryUp"  header-align="center" align="right" label="上表"  :render-header="renderheader"
                         width="70">
        </el-table-column>
        <el-table-column prop="salaryClose"  header-align="center" align="right" label="封闭"  :render-header="renderheader"
                         width="80">
        </el-table-column>
        <el-table-column prop="yearVacation"  header-align="center" align="right" label="年休假</br>工资"  :render-header="renderheader"
                         width="50">
        </el-table-column>
        <el-table-column prop="salarySum"  header-align="center" align="right" label="小计"   :render-header="renderheader"
                         width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="累计代缴个人费用" >
        <el-table-column prop="social"  header-align="center" align="right" label="社保</br>费用" :render-header="renderheader"
                         width="70">
        </el-table-column>
        <el-table-column prop="fund"  header-align="center" align="right" label="住房</br>公积金" :render-header="renderheader"
                         width="50">
        </el-table-column>
        <el-table-column prop="instead"  header-align="center" align="right" label="小计" :render-header="renderheader"
                         min-width="70">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="salaryTax"  header-align="center" align="right" label="本年累计</br>应税工资"  :render-header="renderheader" width="80"></el-table-column>
      <el-table-column prop="deductBase"  header-align="center" align="right" label="基本减除</br>费用"  :render-header="renderheader" width="60"></el-table-column>
      <el-table-column prop="deductItem"  header-align="center" align="right" label="专项附加</br>扣除费用"  :render-header="renderheader"
                       width="60"></el-table-column>
      <el-table-column prop="salaryTaxReal"  header-align="center" align="right" label="应纳税</br>所得额" :render-header="renderheader" width="70"></el-table-column>
      <el-table-column prop="advanceRate"  header-align="center" align="right" label="预扣率" width="35"></el-table-column>
      <el-table-column prop="speedDeduct"  header-align="center" align="right" label="速算</br>扣除数" :render-header="renderheader"
                       width="45"></el-table-column>
      <el-table-column prop="taxShould"  header-align="center" align="right" label="累计应</br>预扣预缴" :render-header="renderheader"
                       width="75"></el-table-column>
      <el-table-column prop="taxAlready"  header-align="center" align="right" label="累计已</br>预扣预缴" :render-header="renderheader"
                       width="60">
      </el-table-column>
      <el-table-column header-align="center" label="本期预扣预缴" :render-header="renderheader">
        <el-table-column prop="taxThisUp"  header-align="center" align="right" label="上表" :render-header="renderheader"
                         min-width="60">
        </el-table-column>
        <el-table-column prop="taxThisClose"  header-align="center" align="right" label="封闭" :render-header="renderheader"
                         width="70">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
.salary-detail-tax-container{
  width: 1240px;
}
</style>
<script>
  import Salary_API from '@/api/salary/salary'

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        title:'',
        tableHeight:null,
        tableData: [],
        salaryYearAndMon:'',
        salaryCompany: '',
        salaryYear: '',
        salaryMonth: '',
        gradeCategory: ''
      }
    },
    watch:{
      '$route':function () {
        this.getTableHeight();
      }
    },
    components: {},
    methods: {
      getTableHeight(){
        this.tableHeight=window.innerHeight-140;
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
          return [1, 19];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },
      queryList() {
        let params = {
          salaryCompany: this.salaryCompany,
          salaryYear: this.salaryYear,
          salaryMonth: this.salaryMonth,
          gradeCategory: this.gradeCategory
        }
        this.loading=true;
        Salary_API.queryTaxDetailList_payAuditSalary(params).then(res => {
          this.loading=false;
          this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '列表加载失败：' + err.msg})
          this.loading=true;
        });
      },
      initPage(){
        this.queryList();
      },
      goback() {
        history.go(-1);
      }

    },
    created() {
    },
    mounted() {
      var obj = this.$store.state.salary.commParams || {};
      this.salaryCompany = obj.salaryCompany;
      this.salaryYearAndMon=obj.salaryYearAndMon,
      this.salaryYear = obj.salaryYear;
      this.salaryMonth = obj.salaryMonth;
      this.gradeCategory = obj.gradeCategory;
      this.title=obj.title;
      this.initPage();
      this.getTableHeight();
    },
    beforeMount(){
      window.addEventListener('resize',this.getTableHeight);
    }

  }
</script>





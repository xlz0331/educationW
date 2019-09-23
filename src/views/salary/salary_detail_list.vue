<template>
  <div class="salary-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}【月实发工资明细】表</b></div>
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
          <el-button type="primary" @click="goPage()">个税计算明细</el-button>
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
      <el-table-column prop="seqText" hearder-align="center"  label="序号" width="40">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType==1" class="text-left">
            {{scope.row.seqText}}
          </div>
          <div class="text-center" v-else>{{scope.row.seqText}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="empName" align="center" label="姓名" width="60"></el-table-column>
      <el-table-column prop="deptName" header-align="center" label="部门" min-width="120"></el-table-column>
      <el-table-column prop="jobName" header-align="center" label="职务" width="120">
      </el-table-column>
      <el-table-column prop="salaryGrade" align="center" label="职等" width="100">
        <template slot-scope="scope">
          {{scope.row.empName=='小计'?'':scope.row.salaryGrade}}
        </template>
      </el-table-column>
      <!--<el-table-column prop="" align="center" label="职级" width="60">-->
        <!--<template slot-scope="scope">-->
            <!--{{scope.row.salaryRank}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="shouldSalaryTotal"  header-align="center" align="right" label="本月应发工资" width="90"></el-table-column>
      <el-table-column align="center" label="代缴费用" width="90">
        <el-table-column prop="selfSocial"  header-align="center" align="right" label="社保费用" width="90">
        </el-table-column>
        <el-table-column prop="selfFund"  header-align="center" align="right" label="住房公积金" width="90">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="insteadFee"  header-align="center" align="right" label="代垫费用" width="80"></el-table-column>
      <el-table-column prop="insteadTax"  header-align="center" align="right" label="代缴个税" width="80"></el-table-column>
      <el-table-column align="center" label="本月实发工资" width="90">
        <el-table-column prop="actualPaySalaryUp"  header-align="center" align="right" label="上表发放" width="90">
        </el-table-column>
        <el-table-column prop="shouldYearVacation"  header-align="center" align="right" label="年休假工资" width="70">
        </el-table-column>
        <el-table-column prop="actualPaySalaryClose"  header-align="center" align="right" label="封闭发放" width="90">
        </el-table-column>
        <el-table-column prop="actualPaySalary"  header-align="center" align="right" label="合计" width="90">
        </el-table-column>
      </el-table-column>

    </el-table>
  </div>
</template>
<style lang="scss" scoped>
  .salary-container {
    width: 1240px;
  }
</style>

<script>

  import Salary_API from '@/api/salary/salary'

  export default {
    name: "salary-detail-list",
    data() {
      return {
        loading: false,
        tableData: [],
        tableHeight:null,
        title:'',
        salaryYearAndMon:'',
        salaryCompany: '',
        salaryYear: '',
        salaryMonth: '',
        gradeCategory: '',
        columnColtrol:{},
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
          return [1, 20];
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
        Salary_API.querySalaryDetailList_payAuditSalary(params).then(res => {
          this.tableData = res.data.listReport || [];
          this.columnColtrol=res.data.columnColtrol || [];
          this.loading=false;
        }).catch(err => {
          this.loading=false;
          this.$message({type: 'error', message: '列表加载失败：' + err.msg})
        });
      },
      initPage(){
        this.queryList();
      },
      goPage(){
        let params = {
         salaryYearAndMon:this.salaryYearAndMon,
        salaryCompany: this.salaryCompany,
        salaryYear: this.salaryYear,
        salaryMonth: this.salaryMonth,
        gradeCategory: this.gradeCategory
      };
        params.title=this.title;
        this.$store.commit('setCommParams', params)
        this.$router.push({path: './salary_detail_tax_list'});
      },
      goback() {
        this.$store.commit('setSelectMonth',  this.salaryYearAndMon)
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





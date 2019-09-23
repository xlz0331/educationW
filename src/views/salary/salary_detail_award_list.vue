<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}【奖扣项目明细】查询表</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="4" class="text-left">
        <el-input v-model="salaryYearAndMon" placeholder="月份" readonly>
          <template slot="prepend"><b>月份：</b></template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <div>
          <el-input v-model="formdata.empName" placeholder="姓名" readonly>
            <template slot="prepend"><b>姓名:</b></template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <el-input v-model="formdata.salaryGrade" placeholder="职等" readonly>
            <template slot="prepend"><b>职等:</b></template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <el-input v-model="formdata.deptName" placeholder="部门" readonly>
            <template slot="prepend"><b>部门:</b></template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <el-input v-model="formdata.jobName" placeholder="职务" readonly>
            <template slot="prepend"><b>职务:</b></template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4" class="text-right">
        <div>
          <el-button type="warning" @click="goback()">返回上一级</el-button>
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
      sum-text="合计"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="100"></el-table-column>
      <el-table-column prop="itemName" header-align="center" label="项目名称" minWidth="120"></el-table-column>
      <el-table-column prop="money" align="center" label="金额" minWidth="80"></el-table-column>
      <el-table-column  header-align="center"  label="备注" minWidth="120">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>
    </el-table>
    <el-row class="text-left">
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
      sum-text="合计"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
      <el-table-column prop="itemName"  header-align="center"  label="项目名称" minWidth="120"></el-table-column>
      <el-table-column prop="money" align="center" label="金额" minWidth="80"></el-table-column>
      <el-table-column  header-align="center"  label="备注" minWidth="120">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>

</style>
<script>
  import Salary_API from '@/api/salary/salary'

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        tableData: [],
        title: '',
        salaryYearAndMon: '',
        salaryCompany: '',
        salaryYear: '',
        salaryMonth: '',
        gradeCategory: '',
        empNo: '',
        empName: '',
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
    components: {},
    methods: {
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
          salaryYear: this.salaryYear,
          salaryMonth: this.salaryMonth,
          empNo: this.empNo
        }
        this.loading=true;
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
          this.loading=false;
        }).catch(err => {
          this.$message({type: 'error', message: '列表加载失败：' + err.msg})
          this.loading=false;
        });
      },
      initPage() {
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
      // this.salaryCompany = obj.salaryCompany;
      this.salaryYearAndMon = obj.salaryYearAndMon,
        this.salaryYear = obj.salaryYear;
      this.salaryMonth = obj.salaryMonth;
      this.empNo = obj.empNo;
      this.empName = obj.empName;
      this.title = obj.title;
      this.initPage();
    }
  }
</script>





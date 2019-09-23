<template>
  <div>
    <el-row style="margin-bottom:15px">
      <el-col :span="4" class="text-left">
        &#12288;
        <!-- <span>录入人：</span>
        <span style="text-decoration:underline;color:#409EFF"> {{login_user.name || ''}}</span>-->
      </el-col>
      <el-col :span="16">
        <b>入职薪酬（副表）</b>
      </el-col>
      <el-col :span="4" class="text-right">
        <!-- <el-button type="primary">说明</el-button> -->
        <!-- <el-button type="primary" @click="save()">完成提交</el-button> -->
        <el-button type="primary" @click="$router.go(-1)">返回上一级</el-button>
      </el-col>
    </el-row>

    <el-table border :data="tableData">
      <el-table-column type="index" header-align="center" align="center" label="序号" width="35"></el-table-column>
      <el-table-column prop="name" header-align="center" label="录用人" align="center" width="65"></el-table-column>
      <el-table-column header-align="center" label="年薪（万元）" align="center" min-width="100">
        <el-table-column
          prop="totalYearSalary"
          header-align="center"
          label="合计"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="yearSalaryAward"
          header-align="center"
          label="年薪资</br>奖励"
          align="center"
          min-width="60"
          :render-header="renderheader"
        ></el-table-column>
        <el-table-column
          prop="yearPerformanceAppraisal"
          header-align="center"
          label="年绩效</br>考核"
          align="center"
          min-width="60"
          :render-header="renderheader"
        ></el-table-column>
        <el-table-column
          prop="yearSalary"
          header-align="center"
          label="12个月</br>月薪"
          align="center"
          min-width="60"
          :render-header="renderheader"
        ></el-table-column>
      </el-table-column>
      <el-table-column header-align="center" label="月薪酬项目结构（元）" align="center" min-width="60">
        <el-table-column
          prop="monthSalary"
          header-align="center"
          label="月工资"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="annualHoliday"
          header-align="center"
          label="年休假"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="fullFrequentlyAward"
          header-align="center"
          label="满勤奖"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="trafficaAllowance"
          header-align="center"
          label="交通餐饮</br>补助"
          align="center"
          min-width="60"
          :render-header="renderheader"
        ></el-table-column>
        <el-table-column
          prop="totalMoneySalary"
          header-align="center"
          label="小计"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="yearSalary"
          header-align="center"
          label="12个月月</br>薪(万元)"
          align="center"
          min-width="60"
          :render-header="renderheader"
        ></el-table-column>
      </el-table-column>
      <el-table-column header-align="center" label="月薪酬减项（元）" align="center" min-width="60">
        <el-table-column
          prop="meritPay"
          header-align="center"
          label="绩效工资"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="salaryBorrow"
          header-align="center"
          label="工资借款"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="contractAllowance"
          header-align="center"
          label="契约津贴"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="awardBorrow"
          header-align="center"
          label="福利借款"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="accountSalary"
          header-align="center"
          label="报账工资"
          align="center"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="totalSubtract"
          header-align="center"
          label="小计"
          align="center"
          min-width="60"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        prop="actualMonthSalary"
        header-align="center"
        label="月应发</br>工资"
        align="center"
        min-width="60"
        :render-header="renderheader"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import Hire_API from '@/api/hire/hire'
import directive from '@/views/hire/hire_edit_grade'
export default {
  name: 'price-list',
  data() {
    return {
      loading: false,
      tableData: [],
      personalId: "",
      inputProof: '',
      fileList: [],
      dialogProof: false,
      proofSrc: '',
      pathList: [],
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      this.personalId = this.$route.query.fdId;
      this.findByPersonalIdSalary();
      // this.findPath1();
      // console.log(this.personalId);
    },
    renderheader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('</br>')[0]),
        h('br'),
        h('span', {}, column.label.split('</br>')[1])
      ])
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.rowType == 1) {
        return [1, 20];
      }
    },
    proofOut(item) {
      this.proofSrc = '';
      this.proofSrc = item;
      this.dialogProof = true;
    },
    findPath1() {
      var params = { companyId: this.$route.query.companyId, fdId: this.$route.query.fdId }
      console.log(params)
      Hire_API.findPath1(params).then(res => {
        this.pathList = res.data || [];
        this.pathList.forEach(item => {
          item.src = item.filepath;
          var str1 = item.name;
          item.name1 = str1.split('.')[0];
          console.log(item)
        });
        if (this.fileList.length > 0) {
          // document.getElementById('inputPr').style.display="";
        }
        console.log("123", this.pathList)
      })
    },
    findByPersonalIdSalary() {
      var params = this.$route.query.fdId;
      Hire_API.findByPersonalIdSalary(params).then(res => {
        this.tableData.push(res.data);

      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    findHireProofByFileId(val) {
      Hire_API.findHireProofByFileId(val).then(res => {
        this.fileList = res.data || [];
        this.fileList.forEach(item => {
          item.src = item.filepath;
          var str1 = item.name;
          item.name1 = str1.split('.')[0];
          //  console.log(item)
        });
        if (this.fileList.length > 0) {
          // document.getElementById('inputPr').style.display="";
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
  },
  watch: {
    "$route": function () {
      this.initPage();
    }
  },
  created() {
  },
  mounted() {
    this.initPage();
  },

}
</script>
<style lang="scss" scoped>
</style>
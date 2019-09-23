<template>
  <div class="grade_container">
    <!--<el-row class="text-left">-->
      <!--<el-col :span="24" class="text-left">-->
        <!--<div>-->
          <!--选择职等:-->
          <!--<el-select v-model="gradeNameList" multiple placeholder="请选择" @change="gradeChange()">-->
            <!--<el-option-->
              <!--v-for="item in salaryGradeList"-->
              <!--:key="item.fdId"-->
              <!--:label="item.name"-->
              <!--:value="item.name">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--老板不会用多选选择器，改成弹出框，这操作....-->
    <el-row class="text-left">
      <el-col :span="24" class="text-right">
        <div>
          <el-button v-if="!isReadOnly" type="primary" @click="showGrade">选择职等</el-button>
          <!--<el-button type="primary">关闭</el-button>-->
        </div>
      </el-col>
    </el-row>

    <table class="table el-table el-table--border ">
      <thead>
      <tr>
        <th>职等</th>
        <th>级差</th>
        <th>职级及月薪</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableData">
        <td> {{item.gradeName}}</td>
        <td> {{item.rankSalaryDiff}}</td>
        <td style="padding: 0px;border-right: none;border-bottom: none;">
          <table class="table">
            <tbody>
            <tr v-for="item1 in item.listDetail ">
              <td v-for="item2 in item1" style="width: 50px">{{item2}}</td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>

    <el-dialog title="选择职等" width="30%" :close-on-click-modal="false" :visible.sync="dialogGrade" append-to-body>
      <div>
        <el-row>
          <el-col :span="24" class="text-right">
            <div>
              <el-button type="primary" @click="selectedConfirm()">确定</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table
          :data="salaryGradeList"
          stripe border
          style="width: 100%"
          :max-height="400"
          ref="multipleTable"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column prop="name" align="center" header-align="center" label="职等" minWidth="120"></el-table-column>
        </el-table>

      </div>
    </el-dialog>
  </div>

</template>

<script>
  import SalarySys_API from '@/api/salary/salarySys'
  // import SalaryStandardGradeSelect from "@/views/approval/com/entry/salary_standard_grade_select";

  export default {
    components: {},
    name: "salary_",
    props: {
      salarySystem: {
        type: String,
        required: true
      },
      salaryGrade: {
        type: String,
        required: true
      },
      salaryObj: {
        type: Object,
        required: false
      },
      isReadOnly: {
        type: Boolean,
        required: false
      },
    },
    data() {
      return {
        dialogGrade: '',
        tableHeight: null,
        tableData: [],
        loading: false,
        dialogGrade: false,
        salaryGradeList: [],//职等下拉列表
        salaryRankList: [],
        gradeNameList: [],//已选择的职等
        formData: {
          salaryGrade: '',
          salaryRank: '',
          entryMonthSalary: null,
          entrySalary: null,
        },
        salaryRankObj: {
          salaryGradeStandard: ''
        }
      }
    },
    methods: {
      handleSelectionChange(val) {
        let arr = val || [];
        this.gradeNameList = [];
        arr.forEach(item => {
          this.gradeNameList.push(item.name);
        })
      },
      queryListBySalarySystem(params) {
        SalarySys_API.queryListBySalarySystem_payAuditSalaryGrade(params).then(res => {
          this.salaryGradeList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },
      querySomeSalaryGradeInfo(params) {
        SalarySys_API.querySomeSalaryGradeInfo_payAuditSalaryGrade(params).then(res => {
          this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },

      showGrade() {
        this.dialogGrade = true;
      },
      gradeChange() {
        // let gnList = this.gradeNameList.map(item => item.name);

        let grade = this.gradeNameList.join(',');
        this.salaryObj.salaryGradeStandard=grade;
        let params = {salarySystem: this.salarySystem, gradeNameList: grade};
        this.querySomeSalaryGradeInfo(params);
      },
      selectedConfirm() {
        this.dialogGrade = false;
        this.gradeChange();
      },


    },
    mounted() {
      this.salaryRankObj = this.salaryObj || {};
      let str = this.salaryRankObj.salaryGradeStandard || '';
      this.gradeNameList = [];
      if (str != '') {
        this.gradeNameList = str.split(',') || [];
      }
      this.gradeChange();
      this.queryListBySalarySystem({salarySystem: this.salarySystem});//查找所有职等


      // if(this.gradeNameList.length==0){//如果没有选择  则加载默认值？？
      //   let params = {salarySystem: this.salarySystem, gradeNameList: this.salaryGrade};
      //   this.querySomeSalaryGradeInfo(params);
      // }
    },
    showGrade() {
      this.dialogGrade = true;
    }

  }
</script>

<style lang="scss">
  .grade_container {
    .el-input--mini .el-input__inner {
      width: 400px;
      margin: 1px auto;
    }
  }
</style>

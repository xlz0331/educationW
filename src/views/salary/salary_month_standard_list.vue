<template>
  <div class="salary-month-standard-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}【月发工资标准】查询表</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="4" class="text-left">
        <!--<el-form label-width="80px">-->
          <!--<el-form-item label="月份：">-->
          <!--{{salaryYearAndMon}}-->
          <!--</el-form-item>-->
        <!--</el-form>-->
        <el-input v-model="salaryYearAndMon" placeholder="月份" readonly>
          <template slot="prepend"><b>月份：</b></template>
        </el-input>
      </el-col>
      <el-col :span="20" class="text-right">
        <div>
          <el-button type="primary" @click="showExplain()">薪酬项目说明</el-button>
          <el-button type="primary" v-if="gradeCategory!=10 && gradeCategory!=30" @click="goDistribute()">职级人数分布</el-button>
          <el-button type="warning" @click="goback()">返回上一级</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData" :span-method="arraySpanMethod" v-loading="loading" element-loading-text="拼命加载中"
      stripe border :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%">
      <el-table-column prop="seqText" header-align="center" label="序号" width="35">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType==1">
            {{scope.row.seqText}}
          </div>
          <div class="text-center" v-else>{{scope.row.seqText}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="empName" header-align="center" label="姓名" minWidth="50"></el-table-column>
      <el-table-column prop="jobName" header-align="center" label="职务" minWidth="80"></el-table-column>
      <el-table-column prop="salaryGrade" align="center" label="职等" minWidth="70">
        <template slot-scope="scope">
          {{ scope.row.rowType==2|| scope.row.rowType==3?'': scope.row.salaryGrade}}
        </template>
      </el-table-column>
      <el-table-column prop="salaryRank" align="center" label="职级" minWidth="35">
      </el-table-column>
      <el-table-column prop="rankSalary" header-align="center" align="right" label="职级工资</br>（元）"
                       :render-header="renderheader" minWidth="65"></el-table-column>
      <el-table-column prop="rankSalaryYear" header-align="center" align="right" label="年薪</br>(万元)"
                       :render-header="renderheader" minWidth="55">
        <template slot-scope="scope">
          {{scope.row.rankSalaryYear|rounding(2)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="年薪酬结构（万元）" minWidth="80">
        <el-table-column prop="yearSalaryRewards" header-align="center" align="right" label="年薪资</br>奖励"
                         :render-header="renderheader" minWidth="50">
          <template slot-scope="scope">
            {{scope.row.yearSalaryRewards|rounding(2)}}
          </template>
        </el-table-column>
        <el-table-column v-if="columnColtrol.yearPerformance" prop="yearPerformance" header-align="center" align="right"
                         label="年绩效</br>考核" :render-header="renderheader" minWidth="50">
          <template slot-scope="scope">
            {{scope.row.yearPerformance|rounding(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="yearSalary12" header-align="center" align="right" label="12个月</br>工资"
                         :render-header="renderheader" minWidth="60">
          <template slot-scope="scope">
            {{scope.row.yearSalary12|rounding(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="yearSalarySum" header-align="center" align="right" label="合计" minWidth="60"
                         :render-header="renderheader">
          <template slot-scope="scope">
            {{scope.row.yearSalarySum|rounding(2)}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="月薪酬结构（元）">
        <el-table-column prop="monthSalaryOne" header-align="center" align="right" label="月工资" minWidth="60"
                         :render-header="renderheader">
        </el-table-column>
        <el-table-column v-if="columnColtrol.monthYearVacation" prop="monthYearVacation" header-align="center"
                         align="right" label="年休假</br>工资" :render-header="renderheader" minWidth="60">
        </el-table-column>
        <el-table-column prop="monthFullWork" header-align="center" align="right" label="满勤</br>奖"
                         :render-header="renderheader" minWidth="50">
        </el-table-column>
        <el-table-column prop="monthTrafficDine" header-align="center" align="right" label="交通餐</br>饮补助"
                         :render-header="renderheader" minWidth="50">
        </el-table-column>
        <el-table-column prop="monthSubTotal" header-align="center" align="right" label="小计" minWidth="60"
                         :render-header="renderheader">
        </el-table-column>
        <el-table-column prop="monthSalary12" header-align="center" align="right" label="12个月</br>工资(万元)"
                         :render-header="renderheader" minWidth="65">
          <template slot-scope="scope">
            {{scope.row.monthSalary12|rounding(2)}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column v-if="columnColtrol.deductItemTotal" align="center" label="月薪酬减项（元）">
        <el-table-column v-if="columnColtrol.deductItemPerformance" prop="deductItemPerformance" header-align="center"
                         align="right" label="绩效</br>工资" :render-header="renderheader" minWidth="55">
        </el-table-column>
        <el-table-column v-if="columnColtrol.deductItemBorrow" prop="deductItemBorrow" header-align="center"
                         align="right" label="工资</br>借款" :render-header="renderheader" minWidth="55">
        </el-table-column>
        <el-table-column v-if="columnColtrol.deductItemFulfil" prop="deductItemFulfil" header-align="center"
                         align="right" label="履约</br>津贴" :render-header="renderheader" minWidth="55">
        </el-table-column>
        <el-table-column v-if="columnColtrol.deductItemAccount" prop="deductItemAccount" header-align="center"
                         align="right" label="报账</br>工资" :render-header="renderheader" minWidth="55">
        </el-table-column>
        <el-table-column v-if="columnColtrol.deductItemTotal" prop="deductItemTotal" header-align="center" align="right"
                         label="小计" minWidth="60" :render-header="renderheader">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="monthPayStandard" header-align="center" align="right" label="月发工资标准</br>（元）"
                       :render-header="renderheader" minWidth="75">
      </el-table-column>
    </el-table>
    <div>
      <el-dialog title="【薪酬项目说明】" width="64%" :close-on-click-modal="false"
                 :visible.sync="dialogVisible" top="10px">
        <div class="text-left" style="max-height: 750px;overflow-y: auto">
          <b> 一、本表作用</b>
          <br>1、查看个人的工资项目构成。
          <br>2、根据个人工资项目构成，计算出个人的月发工资标准。
          <b><br>二、月发工资标准：</b>
          <br>&nbsp;&nbsp;&nbsp;&nbsp;指的是在年薪总额的基础上，扣除年终发放项目和月度单独发放（或月度预留）之后的工资。
          <b><br>三、年终发放项目</b>
          <br> （一）年绩效考核：
          <br> 1、发放时间：次年1月份发放上年的绩效工资
          <br> 2、发放办法：
          <br> （1）在执行相关绩效考核管理方案前，根据实际出勤计发。
          <br>（2）在执行相关绩效考核管理方案后，根据绩效考核的结果发放。
          <br>（二）年薪资奖励
          <br> 1、发放时间：次年1月份发放上年的薪资奖励。
          <br>2、设置标准：为2个月的月薪酬（按当期或实际公司实施的标准为准）
          <br> 3、发放办法：
          <br>（1）年底仍在职的：薪资奖励在年终一次性发放，年内入职的按出勤计发。
          <br>（2）年底不在职的：薪资奖励在离职的次月按出勤计发。
          <b> <br>四、月工资减项</b>
          <br>（一）定义：主要包含的是以下两个部分的项目：
          <br>1、单独发放：不以工资形式发放的工资项目，而是采用报账、借款或其他方式发放的工资项目。
          <br>2、预留工资：为了使员工更加关注考核，从个人工资中预留考核金，在考核期结束后再行发放结算。
          <br>（二）绩效工资
          <br>1、定义：目前只包含中高层管理人员实施产量和成本考核时预留的风险金。
          <br>2、发放办法：
          <br>（1）预留：每月从工资中预留当月的考核风险金。
          <br>（2）发放：根据已审批的请示，上季度的考核结果在本季度均分为3个月进行发放。
          <br>（三）工资借款：
          <br>1、定义：指的是对重要岗位新入职人员约定工作年限的一种履约方式保证，如果不履约，该部分员工需返还借款给公司，并且有单独协议约定需支付违约金。
          <br> 2、借款工资金额：为税前金额，实际借款时按个人适用税率进行扣除个税，按税后发放。
          <br> 3、发放办法：在薪酬管理系统中打印借款单，由借款人办理签字手续，出纳办理发放，并入特殊费用管理。
          <br> （四）报账工资
          <br> 1、定义：指的是允许部分高层领导每月以发票报销的方式领取工资，以便能够节约个税，报账工资并入公司的业务招待费用支出。
          <br> 2、发放方式：限定报账额度标准，在标准内凭发票金额实报实销，若本月剩余未报销部分可累计到以后年度继续报销。
          <br>（五）履约津贴
          <br>1、事项：承诺在若干年后内不会出现3个月或4个月以上的长假，长假不分类型和性质。
          <br>2、约定方式：目前没有文字协议，只采用口头约定。
          <br>3、发放办法：属于年薪酬的范围内，但以契约津贴的方式发放，不随每月工资发放。<br> &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .salary-month-standard-container {
    max-width: 1280px;
  }
</style>
<script>
  import Salary_API from '@/api/salary/salary'

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
        dialogVisible: false
      }
    },
    watch: {
      '$route': function () {
        this.getTableHeight();
      }
    },
    filters: {
      rounding(value,num) {
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
      queryMonthStandardList() {
        let params = {
          salaryCompany: this.salaryCompany,
          salaryYear: this.salaryYear,
          salaryMonth: this.salaryMonth,
          gradeCategory: this.gradeCategory
        }
        this.loading = true;
        Salary_API.queryMonthStandardList_payAuditSalary(params).then(res => {
          this.tableData = res.data.listReport || [];
          this.columnColtrol = res.data.columnColtrol || {};
          this.loading = false;
        }).catch(err => {
          this.$message({type: 'error', message: '状态加载失败：' + err.msg})
          this.loading = false;
        });
      },
      goDistribute(){
        let params = {
          salaryYearAndMon:this.salaryYearAndMon,
          salaryCompany: this.salaryCompany,
          salaryYear: this.salaryYear,
          salaryMonth: this.salaryMonth,
          gradeCategory: this.gradeCategory
        };
        params.title=this.title;
        this.$store.commit('setCommParams', params)
        this.$router.push({path: './salary_people_distribute'});
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
                  message: '修改失败' + res.msg
                });
                this.resetForm('editFormData');
                this.dialogEditVisible = false;
                this.findListByCompany();
              }).catch(err => {
                this.$message({type: 'error', message: '修改失败：' + err.msg})
              });
            }
          } else {
            return false;
          }
        });
      },
      goback() {
        this.$store.commit('setSelectMonth',  this.salaryYearAndMon)
        history.go(-1);
      },
      showExplain() {
        this.dialogVisible = true;
      }
    },
    created() {
    },
    mounted() {
      var obj = this.$store.state.salary.monthStandardParams || {};
      this.salaryCompany = obj.salaryCompany;
      this.salaryYearAndMon = obj.salaryYearAndMon,
      this.salaryYear = obj.salaryYear;
      this.salaryMonth = obj.salaryMonth;
      this.gradeCategory = obj.gradeCategory;
      this.title = obj.title;
      this.queryMonthStandardList();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





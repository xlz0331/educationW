<template>
  <div class="salary-detail-change-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}【与上月工资对比审核】界面</b></div>
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
          <el-button type="primary" @click="showExplain()">说明</el-button>
          <el-button type="warning" @click="goback()">返回上一级</el-button>
        </div>
      </el-col>
    </el-row>
    <!--element-loading-spinner="el-icon-loading"-->
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="拼命加载中"
      stripe border :span-method="objectSpanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      sum-text="合计"
      style="width: 100%">
      <el-table-column type="index"  align="center"   label="序号" width="35">
        <template slot-scope="scope">
          {{scope.row.seq}}
        </template>
      </el-table-column>
      <el-table-column prop="empName" align="center" label="姓名" minWidth="45"></el-table-column>
      <el-table-column prop="jobName" align="center" label="职务" minWidth="60"></el-table-column>
      <el-table-column prop="monthText" align="center" label="月份" minWidth="50"></el-table-column>
      <!--<el-table-column prop="rankSalary" align="center" label="职级工资" minWidth="60"></el-table-column>-->
      <el-table-column prop="monthPayStandard"  header-align="center" align="right" label="月发工</br>资标准"  :render-header="renderheader"  minWidth="60">
        <template slot-scope="scope">
          {{scope.row.monthText=='差额' && scope.row.monthPayStandard==0?'':scope.row.monthPayStandard}}
        </template>
      </el-table-column>
      <el-table-column prop="lowerLevelSalary"  header-align="center" align="right" label="降级</br>减工资"  :render-header="renderheader"  minWidth="50">
        <template slot-scope="scope">
          {{scope.row.monthText=='差额' && scope.row.lowerLevelSalary==0?'':scope.row.lowerLevelSalary}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="本月工资标准">
        <el-table-column prop="standardSalaryBase"  header-align="center" align="right" label="基础</br>工资"  :render-header="renderheader"  minWidth="60">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.standardSalaryBase==0?'':scope.row.standardSalaryBase}}
          </template>
        </el-table-column>
        <el-table-column prop="standardYearVacation" v-if="columnColtrol.standardYearVacation"  header-align="center" align="right" label="年休假</br>工资"  :render-header="renderheader"  minWidth="50">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.standardYearVacation==0?'':scope.row.standardYearVacation}}
          </template>
        </el-table-column>
        <el-table-column prop="standardFullWork"  header-align="center" align="right" label="满勤奖"  :render-header="renderheader"  minWidth="45">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.standardFullWork==0?'':scope.row.standardFullWork}}
          </template>
        </el-table-column>
        <el-table-column prop="standardTrafficDine" v-if="columnColtrol.standardTrafficDine"   header-align="center" align="right" label="交通餐</br>饮补助"  :render-header="renderheader"  minWidth="45">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.standardTrafficDine==0?'':scope.row.standardTrafficDine}}
          </template>
        </el-table-column>
        <el-table-column prop="standardSubTotal"  header-align="center" align="right" label="小计" minWidth="60">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.standardSubTotal==0?'':scope.row.standardSubTotal}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="attendanceNotDays"  header-align="center" align="right" label="本月缺勤天数"  :render-header="renderheader"  minWidth="40">
        <template slot-scope="scope">
          {{scope.row.monthText=='差额' && scope.row.attendanceNotDays==0?'':scope.row.attendanceNotDays}}
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="本月出勤">-->
      <!--<el-table-column prop="attendanceDays"  header-align="center" align="right" label="出勤</br>天数"  :render-header="renderheader"  minWidth="45">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.monthText=='差额' && scope.row.attendanceDays==0?'':scope.row.attendanceDays}}-->
        <!--</template>-->
        <!--</el-table-column>       -->
      <!--</el-table-column>-->
      <el-table-column align="center" label="本月应发工资">
        <el-table-column prop="shouldAttendanceSalary"  header-align="center" align="right" label="出勤</br>工资"  :render-header="renderheader"  minWidth="60">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.shouldAttendanceSalary==0?'':scope.row.shouldAttendanceSalary}}
          </template>
        </el-table-column>
        <el-table-column prop="shouldYearVacation"   v-if="columnColtrol.shouldYearVacation" header-align="center" align="right" label="年休假</br>工资"  :render-header="renderheader"  minWidth="45">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.shouldYearVacation==0?'':scope.row.shouldYearVacation}}
          </template>
        </el-table-column>
        <el-table-column prop="shouldFullWork"  header-align="center" align="right" label="满勤奖"  :render-header="renderheader"  minWidth="45">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.shouldFullWork==0?'':scope.row.shouldFullWork}}
          </template>
        </el-table-column>
        <el-table-column prop="shouldTrafficDine"  v-if="columnColtrol.shouldTrafficDine" header-align="center" align="right" label="交通餐</br>饮补助"  :render-header="renderheader"  minWidth="45">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.shouldTrafficDine==0?'':scope.row.shouldTrafficDine}}
          </template>
        </el-table-column>
        <el-table-column prop="shouldSubTotal"  header-align="center" align="right" label="小计" minWidth="70">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.shouldSubTotal==0?'':scope.row.shouldSubTotal}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column  align="center" label="绩效工资">
        <el-table-column prop="performanceStandard"  header-align="center" align="right" label="预留"  :render-header="renderheader"  minWidth="50">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.performanceStandard==0?'':scope.row.performanceStandard}}
          </template>
        </el-table-column>
        <el-table-column prop="performanceActual"  header-align="center" align="right" label="实得"  :render-header="renderheader"  minWidth="50">
          <template slot-scope="scope">
            {{scope.row.monthText=='差额' && scope.row.performanceActual==0?'':scope.row.performanceActual}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column  align="center" label="奖扣项目">
        <el-table-column prop="othersAdd"  header-align="center" align="right" label="奖项"  :render-header="renderheader"  minWidth="50">
        </el-table-column>
        <el-table-column prop="othersSubtract"  header-align="center" align="right" label="扣项"  :render-header="renderheader"  minWidth="50">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="shouldSalaryTotal"  header-align="center" align="right" label="本月应发</br>工资总额"  :render-header="renderheader"  minWidth="60">
      </el-table-column>
    </el-table>
    <el-dialog title="说明" width="58%" :close-on-click-modal="false"
               :visible.sync="dialogVisible">
      <div class="text-left">
        <strong>1、本表数据：</strong>只显示本月应发工资和上月不一致的人员，本月与上月完全一致的，不在本表显示。
        <br><strong>2、本表作用：</strong>重点对该本月工资与上月不一致的人员进行核对，以便审核计算是否出现错误。
        <br>&nbsp;
        <br>&nbsp;
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
  .salary-detail-change-container{
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
        tableDataArr: [],
        salaryYearAndMon: '',
        salaryCompany: '',
        salaryYear: '',
        salaryMonth: '',
        gradeCategory: '',
        dialogVisible: false,
        columnColtrol:{}
      }
    },
    watch: {
      '$route': function () {
        this.getTableHeight();
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
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.monthText == '差额' && column!=0) {
          return 'warning-row';
        }
      },
      setTableDataArr(keyField) {//keyField为索引进行分类存储
        let obj = {};
        this.tableData.forEach((element, index) => {
          element.rowIndex = index;
          if (null != element[keyField]) {
            if (obj[element[keyField]]) {
              obj[element[keyField]].push(index);
            }
            else {
              obj[element[keyField]] = [];
              obj[element[keyField]].push(index);
            }
          }
        });
        for (let i in obj) {
          if (obj[i].length > 1) {
            this.tableDataArr.push(obj[i]);
          }
        }
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 ||columnIndex === 1 ||columnIndex === 2 ) {
          for (let i = 0; i < this.tableDataArr.length; i++) {
            let element = this.tableDataArr[i]
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

      queryList() {
        this.loading = true;
        let params = {
          salaryCompany: this.salaryCompany,
          salaryYear: this.salaryYear,
          salaryMonth: this.salaryMonth,
          gradeCategory: this.gradeCategory
        }
        Salary_API.querySalaryDetailChangeList_payAuditSalary(params).then(res => {
          this.tableData = res.data.listReport || [];
          this.columnColtrol=res.data.columnColtrol || [];
          this.setTableDataArr("empName");
          this.loading = false;
        }).catch(err => {
          this.$message({type: 'error', message: '列表加载失败：' + err.msg})
          this.loading = false;
        });
      },
      initPage() {
        this.queryList();
      },
      goPage() {
        let params = {
          salaryCompany: this.salaryCompany,
          salaryYear: this.salaryYear,
          salaryMonth: this.salaryMonth,
          gradeCategory: this.gradeCategory
        };
        this.$store.commit('setCommParams', params)
        this.$router.push({path: './salary_detail_tax_list'});
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
      var obj = this.$store.state.salary.commParams || {};
      this.salaryCompany = obj.salaryCompany;
      this.salaryYearAndMon = obj.salaryYearAndMon,
        this.salaryYear = obj.salaryYear;
      this.salaryMonth = obj.salaryMonth;
      this.gradeCategory = obj.gradeCategory;
      this.title = obj.title;
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }

  }
</script>





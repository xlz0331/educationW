<template>
  <div class="salary-pay-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}【工资发放审核】界面</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <!--<el-col :span="3">-->
      <!--<el-select v-model="queryParams.salaryCompany" filterable placeholder="请选择财务公司" @change="initPage()">-->
      <!--<el-option-->
      <!--v-for="item in companyList"-->
      <!--:key="item.company"-->
      <!--:label="item.descrShort"-->
      <!--:value="item.company">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-col>-->
      <el-col :span="6">
        <label style="font-size:small">月份：</label>
        <el-date-picker size="mini"
                        v-model="queryParams.salaryYearAndMon"
                        type="month"
                        value-format="yyyy-M"
                        placeholder="请选择算薪月份" @change="initPage()">
        </el-date-picker>
      </el-col>
      <el-col :span="18" class="text-right">
        <div>
          <el-button type="primary" v-if="mainData.zCanQuery" @click="goPage('monStand')">月发工资标准查询</el-button>
          <el-button type="primary" v-if="mainData.zCanQuery" @click="goPage('detailList')">实发工资明细</el-button>
          <el-button type="primary" v-if="mainData.zCanQuery" @click="goPage('employeeDiff')">人员变动审核</el-button>
          <el-button type="primary" v-if="mainData.zCanQuery" @click="goPage('detailChangeList')">与上月工资对比审核</el-button>
          <el-button type="warning" v-if="mainData.xCalculateShow" :loading="calcLoading" @click="salaryCalculate()">
            工资计算
          </el-button>
          <el-button type="warning" v-if="mainData.xAuditShow" :loading="auditLoading" @click="payAudit()">审核
          </el-button>
          <el-button type="info" v-if="mainData.xUnAuditShow || mainData.xUnApproveShow " :loading="auditLoading"
                     disabled>已审核
          </el-button>
          <!--<el-button type="info" v-if="mainData.xUnAuditShow" :loading="auditLoading" @click="payUnAudit()">工资审核(反审)-->
          <!--</el-button>-->
          <el-button type="warning" v-if="mainData.xApproveShow" :loading="auditLoading" @click="payApproval()">审批
          </el-button>
          <el-button type="info" v-if="mainData.xUnApproveShow" disabled>已审批
          </el-button>
          <!--<el-button type="info" v-if="mainData.xUnApproveShow" :loading="auditLoading" @click="payUnApproval()">-->
          <!--工资审批(反审)-->
          <!--</el-button>-->
        </div>
      </el-col>
    </el-row>
    <!--element-loading-spinner="el-icon-loading"-->
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中..."
      stripe border :span-method="arraySpanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%">
      <el-table-column prop="seqText" header-align="center" label="序号" width="35">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType==1" class="text-left">
            {{scope.row.seqText}}
          </div>
          <div class="text-center" v-else>{{scope.row.seqText}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="empName" align="center" label="姓名" minWidth="45"></el-table-column>
      <el-table-column prop="jobName" align="center" label="职务" minWidth="85"></el-table-column>
      <!--<el-table-column prop="salaryGrade" align="center" label="职等" minWidth="60"></el-table-column>-->
      <!--<el-table-column prop="" align="center" label="职级" minWidth="35">-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.salaryRank}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="rankSalary" align="center" label="职级</br>工资"  :render-header="renderheader" minWidth="60"></el-table-column>-->
      <el-table-column prop="monthPayStandard" header-align="center" align="right" label="月发工</br>资标准"
                       :render-header="renderheader"
                       minWidth="65"></el-table-column>
      <el-table-column prop="lowerLevelSalary" header-align="center" align="right" label="降级</br>减工资"
                       :render-header="renderheader"
                       minWidth="45"></el-table-column>
      <el-table-column align="center" label="本月工资标准" minWidth="80">
        <el-table-column prop="standardSalaryBase" header-align="center" align="right" label="基础工资"
                         :render-header="renderheader"
                         minWidth="70">
        </el-table-column>
        <el-table-column v-if="columnColtrol.standardYearVacation" prop="standardYearVacation" header-align="center"
                         align="right"
                         label="年休假</br>工资" :render-header="renderheader" minWidth="45">
        </el-table-column>
        <el-table-column prop="standardFullWork" :render-header="renderheader" header-align="center" align="right"
                         label="满勤奖" minWidth="50">
        </el-table-column>
        <el-table-column v-if="columnColtrol.standardTrafficDine" prop="standardTrafficDine" header-align="center"
                         align="right"
                         label="交通餐</br>饮补助" :render-header="renderheader" minWidth="45">
        </el-table-column>
        <el-table-column prop="standardSubTotal" :render-header="renderheader" header-align="center" align="right"
                         label="小计" minWidth="70">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="本月考勤">
        <el-table-column prop="attendanceDays" header-align="center" align="right" label="出勤</br>天数"
                         :render-header="renderheader"
                         minWidth="40">
        </el-table-column>
        <el-table-column prop="attendanceNotDays" header-align="center" align="right" label="缺勤</br>天数"
                         :render-header="renderheader"
                         minWidth="40">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="本月应发工资">
        <el-table-column prop="shouldAttendanceSalary" header-align="center" align="right" label="出勤工资"
                         :render-header="renderheader"
                         minWidth="70">
        </el-table-column>
        <el-table-column v-if="columnColtrol.shouldYearVacation " prop="shouldYearVacation" header-align="center"
                         align="right"
                         label="年休假</br>工资" :render-header="renderheader" minWidth="50">
        </el-table-column>
        <el-table-column prop="shouldFullWork" :render-header="renderheader" header-align="center" align="right"
                         label="满勤奖" minWidth="50">
        </el-table-column>
        <el-table-column v-if="columnColtrol.shouldTrafficDine" prop="shouldTrafficDine" header-align="center"
                         align="right"
                         label="交通餐</br>饮补助" :render-header="renderheader" minWidth="45">
        </el-table-column>
        <el-table-column prop="shouldSubTotal" header-align="center" align="right" label="小计" minWidth="75">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="绩效工资">
        <el-table-column prop="performanceStandard" header-align="center" align="right" label="预留" minWidth="50">
        </el-table-column>
        <el-table-column prop="performanceActual" header-align="center" align="right" label="实得" minWidth="50">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="奖扣项目">
        <template slot="header" slot-scope="scope">
          奖扣项目
          <br> <font color="dodgerblue"> (点击查看明细)</font>
        </template>
        <el-table-column prop="othersAdd" header-align="center" align="right" label="奖项" :render-header="renderheader"
                         minWidth="55">
          <template slot-scope="scope">
            <a style="cursor:pointer;color:dodgerblue" v-if="scope.row.rowType!=2 && scope.row.rowType!=3"
               @click="showDetail(scope.row)"
               type="text" size="small">
              {{scope.row.othersAdd}}
            </a>
            <span v-else>
               {{scope.row.othersAdd}}
          </span>
          </template>
        </el-table-column>
        <el-table-column prop="othersSubtract" header-align="center" align="right" label="扣项"
                         :render-header="renderheader" minWidth="55">
          <template slot-scope="scope">
            <a style="cursor:pointer;color:dodgerblue" v-if="scope.row.rowType!=2 && scope.row.rowType!=3"
               @click="showDetail(scope.row)"
               type="text" size="small">
              {{scope.row.othersSubtract}}
            </a>
            <span v-else>
              {{scope.row.othersSubtract}}
          </span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="shouldSalaryTotal" header-align="center" align="right" label="本月应发</br>工资总额"
                       :render-header="renderheader"
                       minWidth="80">
      </el-table-column>
    </el-table>

    <el-dialog title="【奖扣项目明细】" width="55%" :close-on-click-modal="false"
               :visible.sync="dialogVisible">
      <div style="max-height: 600px;overflow-y: scroll;">
        <!--<el-row>-->
        <!--<el-col :span="24">-->
        <!--<div><b>{{title}}【奖扣项目明细】查询表</b></div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row class="text-left">
          <el-col :span="10">
            <div>
              <el-input v-model="formdata.empName" placeholder="姓名" readonly>
                <template slot="prepend"><b>姓名:</b></template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="10">
            <div>
              <el-input v-model="formdata.salaryGrade" placeholder="职等" readonly>
                <template slot="prepend"><b>职等:</b></template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div>
              <el-input v-model="formdata.deptName" placeholder="部门" readonly>
                <template slot="prepend"><b>部门:</b></template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="10">
            <div>
              <el-input v-model="formdata.jobName" placeholder="职务" readonly>
                <template slot="prepend"><b>职务:</b></template>
              </el-input>
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
          sum-text="小计"
          style="width: 100% ;margin-top: 4px;!important;">
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column prop="itemName" header-align="center" label="项目名称" minWidth="80"></el-table-column>
          <el-table-column prop="money" align="center" label="金额" minWidth="60"></el-table-column>
          <el-table-column align="center" label="计算明细查看" width="90">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.itemName=='未休年休假补助'" @click="goCalDetail(scope.row)"
                         style="cursor: pointer">点击查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="备注" minWidth="80">
            <template slot-scope="scope">
              {{scope.row.remark}}
            </template>
          </el-table-column>
        </el-table>
        <el-row class="text-left ">
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
          sum-text="小计"
          style="width: 100%;margin-top: 4px;!important;">
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column prop="itemName" header-align="center" label="项目名称" minWidth="80"></el-table-column>
          <el-table-column prop="money" align="center" label="金额" minWidth="60"></el-table-column>
          <el-table-column align="center" label="计算明细查看" width="90">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.itemName=='未休年休假补助'" @click="goCalDetail(scope.row)"
                         style="cursor: pointer">点击查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="备注" minWidth="80">
            <template slot-scope="scope">
              {{scope.row.remark}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :title="calcDetailTitle" width="95%" :close-on-click-modal="false"
                 :visible.sync="dialogCalDetailVisible" append-to-body>
        <el-table
          :data="detailData" v-loading="loading" element-loading-text="拼命加载中"
          stripe border
          :row-class-name="rowClass"
          :cell-class-name="rowClass"
          style="width: 100%">
          <el-table-column prop="empName" align="center" label="姓名" minWidth="45"></el-table-column>
          <el-table-column prop="deptName" align="center" label="部门" minWidth="85"></el-table-column>
          <el-table-column prop="jobName" align="center" label="职务" minWidth="85"></el-table-column>

          <el-table-column align="center" label="放弃年休假情况">
            <el-table-column prop="dateRange" align="center" label="原休假时间"
                             :render-header="renderheader"
                             minWidth="140">
            </el-table-column>
            <el-table-column prop="totalDays" header-align="center" align="right" label="总天数"
                             :render-header="renderheader"
                             minWidth="40">
            </el-table-column>
            <el-table-column prop="alreadyDays" :render-header="renderheader" header-align="center" align="right"
                             label="已休假天数" minWidth="60">
            </el-table-column>
            <el-table-column prop="giveUpDays" header-align="center" align="right" label="未休假天数"
                             :render-header="renderheader"
                             minWidth="70">
            </el-table-column>
            <el-table-column prop="aduitName" header-align="center"
                             align="right"
                             label="审批人" :render-header="renderheader" minWidth="50">
            </el-table-column>
            <el-table-column prop="aduitDate" :render-header="renderheader" align="center"
                             label="审批时间" minWidth="80">
              <template slot-scope="scope">
                {{scope.row.aduitDate?scope.row.aduitDate.substring(0,10):''}}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="补助金额计算">
            <el-table-column prop="rankSalary" header-align="center" align="right" label="职级工资" minWidth="50">
            </el-table-column>
            <el-table-column prop="fullWorkSalary" header-align="center" align="right" label="满勤奖" minWidth="50">
            </el-table-column>
            <el-table-column prop="calculateBase" header-align="center" align="right" label="计算基数" minWidth="50">
            </el-table-column>
            <el-table-column prop="daySalary" header-align="center" align="right" label="日值" minWidth="50">
            </el-table-column>
            <el-table-column prop="assistanceDay" header-align="center" align="right" label="补助天数" minWidth="50">
            </el-table-column>
            <el-table-column prop="assistanceRateText" header-align="center" align="right" label="补助比例" minWidth="50">
            </el-table-column>
            <el-table-column prop="assistanceSalary" header-align="center" align="right" label="补助金额" minWidth="50">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
  .salary-pay-container {
    max-width: 1320px;
  }

  .hidden_btn {
    display: none;
  }

  .el-date-editor {
    width: 160px !important;
  }

</style>
<script>
  import Salary_API from '@/api/salary/salary'
  import SalarySys_API from '@/api/salary/salarySys'
  import Subsidy_API from '@/api/salary/subsidy'

  export default {
    name: "list",
    data() {
      var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数值不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 0) {
              callback(new Error('数值不能小于0'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        loading: false,
        dialogVisible: false,
        dialogCalDetailVisible: false,
        tableHeight: null,
        title: '',
        calcDetailTitle: '未休年假补助计算明细',
        columnColtrol: {},
        tableData: [],
        detailData: [],
        companyList: [],
        queryParams: {
          salaryCompany: '',
          salaryYearAndMon: '',
          salaryYear: '',
          salaryMonth: '',
          gradeCategory: '',
        },
        mainData: {
          fdId: '',
          zCanQuery: false,//判断是否有查询当月工资的权限
          xCalculateShow: false,//工资计算
          xAuditShow: false,//工资审核
          xUnAuditShow: false,//工资审核（反审）
          xApproveShow: false,//工资审批
          xUnApproveShow: false//工资审批（反审批）
        },
        calcLoading: false,//计算
        auditLoading: false,

        //奖扣明细
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
          return [1, 22];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },
      getCompanyList() {
        SalarySys_API.getCompanyList_orgDepartment().then(res => {
          this.companyList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '公司列表请求异常：' + err.msg})
        });
      },
      initPage() {
        this.queryList();
      },
      queryList() {
        var arr = [];
        if (this.queryParams.salaryYearAndMon == null) return;
        if (this.queryParams.salaryYearAndMon == '') return;
        if (this.queryParams.salaryYearAndMon.indexOf('-') == -1) return;
        arr = this.queryParams.salaryYearAndMon.split('-') || [];
        this.queryParams.salaryYear = arr[0];
        this.queryParams.salaryMonth = arr[1];
        let para = {
          salaryCompany: this.queryParams.salaryCompany,
          salaryYear: arr[0],
          salaryMonth: arr[1],
          gradeCategory: this.queryParams.gradeCategory
        }
        if (para.salaryCompany == '') return;
        this.getAndInit(para);

      },
      //加载主信息
      getAndInit(para) {
        Salary_API.getAndInit_payAuditSalary(para).then(res => {
          var readata = res.data || {};
          this.mainData = readata;
          if (readata.zCanQuery == true) {
            this.querySalaryDetailList(para);
          }
          else {
            this.$message({type: 'error', showClose: true, duration: 6000, message: '对不起，您没有查阅当前职级、年月工资的权限!'})
          }
        }).catch(err => {
          this.$message({type: 'error', showClose: true, message: '获取主信息失败,请联系管理员：' + err.msg})
        });
      },
      //加载列表
      querySalaryDetailList(para) {
        this.loading = true;
        Salary_API.querySalaryDetailList_payaudit(para).then(res => {
          this.loading = false;
          let resData = res.data || {};
          this.tableData = resData.listReport || [];
          this.columnColtrol = resData.columnColtrol || {};

          // this.columnColtrol.standardYearVacation=2;
          // this.columnColtrol.standardTrafficDine=3;
          // this.columnColtrol.shouldYearVacation=2;
          // this.columnColtrol.shouldTrafficDine=2;

          if (this.tableData.length <= 0) this.$message({
            type: 'info',
            showClose: true,
            message: '查询不到当前月份的数据【' + this.queryParams.salaryYearAndMon + "】"
          })
        }).catch(err => {
          this.loading = false;
          this.$message({type: 'error', showClose: true, message: '获取列表信息失败：' + err.msg})
        });
      },
      showDetail(obj) {
        this.dialogVisible = true;
        this.queryAwardDetailList(obj.empNo);
      },
      //跳转至各个副表
      goPage(val, keyObj) {
        if (this.queryParams.salaryCompany == null || this.queryParams.salaryCompany == ''
          || this.queryParams.salaryYear == null || this.queryParams.salaryYear == ''
          || this.queryParams.salaryMonth == null || this.queryParams.salaryMonth == '') {
          this.$message({type: 'info', showClose: true, message: '请选择年月'})
          return;
        }
        let params = this.queryParams;
        params.title = this.title;
        this.$store.commit('setSelectMonth',  this.queryParams.salaryYearAndMon)
        switch (val) {
          case "monStand" :
            this.$store.commit('setMonthStandardParams', params)
            this.$router.push({path: './salary_month_standard_list?month='+this.queryParams.salaryYearAndMon});
            break;
          case "detailList" :
            this.$store.commit('setCommParams', params)
            this.$router.push({path: './salary_detail_list'});
            break;
          case "employeeDiff" :
            this.$store.commit('setCommParams', params)
            this.$router.push({path: './salary_employee_diff_list'});
            break;
          case "detailChangeList" :
            this.$store.commit('setCommParams', params)
            this.$router.push({path: './salary_detail_change_list'});
            break;
          case "award" :
            params.empNo = keyObj;
            this.$store.commit('setCommParams', params);
            this.$router.push({path: './salary_detail_award_list'});
            break;
        }
      },
      //重新计算
      salaryCalculate() {
        this.$confirm('确定要进行【' + this.queryParams.salaryYearAndMon + '】【工资计算】吗？', {type: 'warning',closeOnClickModal:false}).then((item) => {
          let para = this.queryParams;
          this.calcLoading = true;
          Salary_API.salaryCalculate_payAuditSalary(para).then(res => {
            this.calcLoading = false;
            if (res.success) {
              this.$message({type: 'success', message: '【' + this.queryParams.salaryYearAndMon + '】工资计算完成！'})
              this.initPage();
            }
            else {
              this.$message({type: 'error', message: '【' + this.queryParams.salaryYearAndMon + '】工资计算失败！' + res.msg});
            }
          }).catch(err => {
            this.$message({type: 'error', message: '【' + this.queryParams.salaryYearAndMon + '】工资计算失败：' + err.msg})
            this.calcLoading = false;
          });
        }).catch(error => {
          // this.$message({type: 'info', message: '已取消进行工资计算'});
        });
        ;
      },
      //审核
      payAudit() {
        if (this.mainData.fdId == '' || this.tableData.length <= 0) {
          this.$message({type: 'info', showClose: true, message: '没有需要审核的数据,请选择月份查询数据！'});
          return;
        }
        this.$confirm('确定要【审核】工资数据吗？【' + this.queryParams.salaryYearAndMon + '】', {type: 'warning',closeOnClickModal:false}).then((item) => {
          let para = {fdId: this.mainData.fdId};
          this.auditLoading = true;
          Salary_API.payAudit_payAuditSalary(para).then(res => {
            this.auditLoading = false;
            if (res.success) {
              this.$message({type: 'success', showClose: true, message: '审核成功！【' + this.queryParams.salaryYearAndMon + '】'})
              this.initPage();
            }
            else {
              this.$message({type: 'error', showClose: true, message: '审核失败！' + res.msg});
            }
          }).catch(err => {
            this.auditLoading = false;
            this.$message({type: 'error', showClose: true, message: '审核失败：' + err.msg})
          });
        }).catch(error => {
          // this.$message({type: 'info', message: '已取消审核'});
        });
        ;
      },
      //反审核
      payUnAudit() {
        if (this.mainData.fdId == '' || this.tableData.length <= 0) {
          this.$message({type: 'info', showClose: true, message: '没有需要反审核的数据,请选择月份查询数据！'});
          return;
        }
        this.$confirm('确定要【反审核】工资数据吗？【' + this.queryParams.salaryYearAndMon + '】', {type: 'warning',closeOnClickModal:false}).then((item) => {
          let para = {fdId: this.mainData.fdId};
          this.auditLoading = true;
          Salary_API.payUnAudit_payAuditSalary(para).then(res => {
            this.auditLoading = false;
            if (res.success) {
              this.$message({type: 'success', showClose: true, message: '反审核成功！'})
              this.initPage();
            }
            else {
              this.$message({type: 'error', showClose: true, message: '反审核失败！' + res.msg});
            }
          }).catch(err => {
            this.auditLoading = false;
            this.$message({type: 'error', showClose: true, message: '反审核失败：' + err.msg})
          });
        }).catch(error => {
          // this.$message({type: 'info', message: '已取消反审核'});
        });

      },

      //审批
      payApproval() {
        if (this.mainData.fdId == '' || this.tableData.length <= 0) {
          this.$message({type: 'info', showClose: true, message: '没有需要审批的数据,请选择月份查询数据！'});
          return;
        }
        this.$confirm('确定要【审批】工资数据吗？【' + this.queryParams.salaryYearAndMon + '】', {type: 'warning',closeOnClickModal:false}).then((item) => {
          let para = {fdId: this.mainData.fdId};
          this.auditLoading = true;
          Salary_API.payApproval_payAuditSalary(para).then(res => {
            this.auditLoading = false;
            if (res.success) {
              this.$message({type: 'success', showClose: true, message: '审批成功！【' + this.queryParams.salaryYearAndMon + '】'})
              this.initPage();
            }
            else {
              this.$message({type: 'error', showClose: true, message: '审批失败！' + res.msg});
            }
          }).catch(err => {
            this.auditLoading = false;
            this.$message({type: 'error', showClose: true, message: '审批失败：' + err.msg})
          });
        }).catch(error => {
          // this.$message({type: 'info', showClose: true, message: '已取消审批'});
        });
        ;
      },
      //反审批
      payUnApproval() {
        if (this.mainData.fdId == '' || this.tableData.length <= 0) {
          this.$message({type: 'info', message: '没有需要反审批的数据,请选择月份查询数据！'});
          return;
        }
        this.$confirm('确定要【反审批】工资数据吗？【' + this.queryParams.salaryYearAndMon + '】', {type: 'warning',closeOnClickModal:false}).then((item) => {
          let para = {fdId: this.mainData.fdId};
          this.auditLoading = true;
          Salary_API.payUnApproval_payAuditSalary(para).then(res => {
            this.auditLoading = false;
            if (res.success) {
              this.$message({type: 'success', message: '反审批成功！'})
              this.initPage();
            }
            else {
              this.$message({type: 'error', message: '反审批失败！' + res.msg});
            }
          }).catch(err => {
            this.auditLoading = false;
            this.$message({type: 'error', message: '反审批失败：' + err.msg})
          });
        }).catch(error => {
          // this.$message({type: 'info', message: '已取消反审批'});
        });
        ;
      },

      //请求弹出框列表的数据
      queryAwardDetailList(empNo) {
        let params = {
          salaryYear: this.queryParams.salaryYear,
          salaryMonth: this.queryParams.salaryMonth,
          empNo: empNo
        }
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

        }).catch(err => {
          this.$message({type: 'error', message: '奖扣明细加载失败：' + err.msg})
        });
      },

      //个人计算明细
      goCalDetail(obj) {
        this.dialogCalDetailVisible = true;
        this.calcDetailTitle = obj.empName + '未休年假补助计算明细';
        this.queryShowOne(obj.empNo);
      },
      //重新计算
      queryShowOne(empNo) {
        this.detailData = [];
        let params = {
          salaryCompany: this.salaryCompany
          , salaryYear: this.salaryYear
          , salaryMonth: this.salaryMonth
          , empNo: empNo
        }
        Subsidy_API.queryShowOne_subsidyGiveupYearVacation(params).then(res => {
          var resObj = res.data || {};
          this.detailData.push(resObj);
        }).catch(err => {
          this.$message({type: 'error', message: '查找计算明细失败' + err.msg})
        })
      }
    },
    created() {
    },
    mounted() {
      var routerParams = this.$store.state.salary.routerCommParams;
      this.title = routerParams.keyVal1.title + routerParams.keyVal2.title;
      this.queryParams.salaryCompany = routerParams.keyVal1.values;
      this.queryParams.gradeCategory = routerParams.keyVal2.values;

      this.queryParams.salaryYearAndMon=this.$store.state.salary.selectMonth || ''
      if(this.queryParams.salaryYearAndMon==='') {
        var now = new Date();
        var lastMon = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        this.queryParams.salaryYearAndMon = lastMon.getFullYear() + "-" + (lastMon.getMonth() + 1);//默认为上一个月
      }
     //  var obj = this.$store.state.salary.monthStandardParams || {};
     // console.log(obj)
     //  if (obj.salaryYearAndMon == '') {
     //    var now = new Date();
     //    var lastMon = new Date(now.getFullYear(), now.getMonth() - 1, 1);
     //    this.queryParams.salaryYearAndMon = lastMon.getFullYear() + "-" + (lastMon.getMonth() + 1);//默认为上一个月
     //  } else {
     //    this.queryParams.salaryYearAndMon = obj.salaryYearAndMon;
     //  }
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    },
    destroyed(){
      this.$store.commit('setSelectMonth',  '')
    }
  }
</script>





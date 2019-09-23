<template>
  <div class="person-deduct-cal-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{companyName}}个人所得税【当月预缴税款计算】</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <!--<el-col :span="4">-->
      <!--<el-select v-model="company" filterable placeholder="请选择公司" @change="getSalaryGroupList">-->
      <!--<el-option-->
      <!--v-for="item in companyList"-->
      <!--:key="item.fdId"-->
      <!--:label="item.text"-->
      <!--:value="item.fdId">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-col>-->
      <el-col :span="5">
        <div>
          <label style="font-size:small">月份：</label>
          <el-date-picker
            v-model="salaryMonth"
            type="month"
            size="mini"
            value-format="yyyy-M"
            placeholder="选择算薪月份" @change="getSalaryGroupList">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <el-select v-model="salaryGroup" placeholder="请选择薪资组" @change="queryReport">
            <el-option
              v-for="item in salaryGroupList"
              :key="item.gpPaygroup"
              :label="item.descr"
              :value="item.gpPaygroup">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <label style="font-size:small">{{statusText}}</label>
          <!--<el-input v-model="statusText" placeholder="" readonly>-->
          <!--</el-input>-->
        </div>
      </el-col>
      <el-col :span="5">
        <div>&nbsp;</div>
      </el-col>
      <el-col :span="6" class="text-right">
        <div>
          <!--<el-button type="primary">说明</el-button>-->
          <el-button type="warning" :loading="calcLoading" @click="calculateTax">计算预缴税款</el-button>
          <!--<el-button type="primary" @click="sentDataToSalarySqlDb">同步PS</el-button>-->
          <el-button type="warning" @click="aduitLock">审核</el-button>
        </div>
      </el-col>
    </el-row>
    <!--element-loading-spinner="el-icon-loading"-->
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中"
      stripe border :span-method="arraySpanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%">
      <el-table-column prop="seqText" header-align="center" label="序号"  width="35">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType==1" class="text-left">
            {{scope.row.seqText}}
          </div>
          <div class="text-center" v-else>{{scope.row.seqText}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="empNo" header-align="center" label="工号"  width="60"></el-table-column>
      <el-table-column prop="empName" header-align="center" label="姓名"  width="55">
        <template slot-scope="scope">
          <a v-if="scope.row.rowType==2" >{{scope.row.empName}}</a>
          <a v-else style="cursor:pointer;color:dodgerblue" @click="showDetail(scope.row)">{{scope.row.empName}}</a>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="本年累计工资收入" :render-header="renderheader">
        <el-table-column prop="salaryUp"  align="center"  label="上表"  :render-header="renderheader"
                         width="70">
        </el-table-column>
        <el-table-column prop="salaryClose" align="center" label="封闭"  :render-header="renderheader"
                         width="80">
        </el-table-column>
        <el-table-column prop="yearVacation" align="center" label="年休假工资"  :render-header="renderheader"
                         width="45">
        </el-table-column>
        <el-table-column prop="salarySum" align="center" label="小计"  :render-header="renderheader"
                         width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="累计代缴个人费用" :render-header="renderheader">
        <el-table-column prop="social" align="center" label="社保费用" :render-header="renderheader"
                         width="70">
        </el-table-column>
        <el-table-column prop="fund" align="center" label="住房公积金" :render-header="renderheader"
                         width="50">
        </el-table-column>
        <el-table-column prop="instead" align="center" label="小计" :render-header="renderheader"
                         width="70">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="salaryTax" align="center" label="本年累计应税工资" width="80"></el-table-column>
      <el-table-column prop="deductBase" align="center" label="基本减除费用" width="60"></el-table-column>
      <el-table-column prop="deductItem" align="center" label="专项附加扣除费用" :render-header="renderheader"
                       width="55"></el-table-column>
      <el-table-column prop="salaryTaxReal" align="center" label="应纳税所得额" width="80"></el-table-column>
      <el-table-column prop="advanceRate" align="center" label="预扣率" width="35"></el-table-column>
      <el-table-column prop="speedDeduct" align="center" label="速算扣除数" :render-header="renderheader"
                       width="50"></el-table-column>
      <el-table-column prop="taxShould" align="center" label="累计应预扣预缴" :render-header="renderheader"
                       width="75"></el-table-column>
      <el-table-column prop="taxAlready" align="center" label="累计已预扣预缴" :render-header="renderheader"
                       width="65">
      </el-table-column>
      <el-table-column header-align="center" label="本期预扣预缴" :render-header="renderheader">
        <el-table-column prop="taxThisUp" align="center" label="上表" :render-header="renderheader"
                         width="50">
        </el-table-column>
        <el-table-column prop="taxThisClose" align="center" label="封闭" :render-header="renderheader"
                         min-width="70"  max-width="80">
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitile"
      :visible.sync="dialogVisible"
      width="99%">
      <el-table
        :data="detailData" v-loading="loading" element-loading-text="加载中..."
        stripe border :max-height="tableHeight-100"
        style="width: 100%">
        <el-table-column type="index" align="center" label="序号"  width="35">
        </el-table-column>
        <el-table-column prop="calculateMonth" align="center" label="月份"  width="40"></el-table-column>
        <el-table-column header-align="center" label="月工资收入" :render-header="renderheader">
          <el-table-column prop="salaryUp" align="center" label="上表" :render-header="renderheader"
                           width="65">
          </el-table-column>
          <el-table-column prop="salaryClose" align="center" label="封闭" :render-header="renderheader"
                           width="75">
          </el-table-column>
          <el-table-column prop="yearVacation" align="center" label="年休假工资" :render-header="renderheader"
                           width="45">
          </el-table-column>
          <el-table-column prop="salarySum" align="center" label="小计" :render-header="renderheader"
                           width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="月代缴个人费用" :render-header="renderheader">
          <el-table-column prop="social" align="center" label="社保费用" :render-header="renderheader"
                           width="60">
          </el-table-column>
          <el-table-column prop="fund" align="center" label="住房公积金" :render-header="renderheader"
                           width="50">
          </el-table-column>
          <el-table-column prop="instead" align="center" label="小计" :render-header="renderheader"
                           width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="salaryTax" align="center" label="月应税工资" width="75"></el-table-column>
        <el-table-column align="center" label="本年累计">
          <el-table-column prop="sumObj.salaryTax" align="center" label="应税工资" width="80"></el-table-column>
          <el-table-column prop="sumObj.deductBase" align="center" label="基本减除费用" width="60"></el-table-column>
          <el-table-column prop="sumObj.deductItem" align="center" label="专项附加扣除费用" :render-header="renderheader"
                           width="55"></el-table-column>
          <el-table-column prop="sumObj.salaryTaxReal" align="center" label="应纳税所得额" width="75"></el-table-column>
          <el-table-column prop="sumObj.advanceRate" align="center" label="预扣率" width="35"></el-table-column>
          <el-table-column prop="sumObj.speedDeduct" align="center" label="速算扣除数" :render-header="renderheader"
                           width="55"></el-table-column>
          <el-table-column prop="sumObj.taxShould" align="center" label="应预扣预缴" :render-header="renderheader"
                           width="75"></el-table-column>
          <el-table-column prop="sumObj.taxAlready" align="center" label="已预扣预缴" :render-header="renderheader"
                           width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column header-align="center" label="本月应预扣预缴" :render-header="renderheader">
          <el-table-column prop="sumObj.taxThisUp" align="center" label="上表" :render-header="renderheader"
                           width="60">
          </el-table-column>
          <el-table-column prop="sumObj.taxThisClose" align="center" label="封闭" :render-header="renderheader"
                           min-width="75"    max-width="80">
          </el-table-column>
        </el-table-column>
      </el-table>
      <!--<span slot="footer" class="dialog-footer text-center" >-->
    <!--<el-button type="primary" @click="dialogVisible = false">关闭</el-button>-->
  <!--</span>-->
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
  .el-date-editor {
    width: 180px !important;
  }

  .person-deduct-cal-container {
    max-width: 1280px;
  }
</style>
<script>
  import Tax_API from '@/api/tax/tax'

  export default {
    name: "list",
    data() {
      return {
        dialogVisible: false,
        dialogTitile: '',
        loading: false,
        calcLoading: false,//计算
        tableHeight: null,
        ruleForm: [],
        detailData: [],
        tableData: [],
        salaryMonth: '',
        salaryGroupList: [],
        salaryGroup: '',
        companyList: [],
        company: '',
        companyName: '',
        year: '',
        month: '',
        main_data: {},
        statusText: '当前状态：'
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
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },
      getCompanyList() {
        Tax_API.getCompanyList_Deduct().then(res => {
          this.companyList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '公司列表请求异常：' + err.msg})
        });
      },
      getSalaryGroupList() {
        this.salaryGroup = '';
        this.statusText = '当前状态：';
        this.tableData = [];
        if (this.company == '' || this.company == null) return;
        if (this.salaryMonth == null || this.salaryMonth == '' || this.salaryMonth.indexOf("-") == -1) return;
        let arrMon = this.salaryMonth.split("-");
        this.year = arrMon[0];
        this.month = arrMon[1];
        let para = {
          company: this.company,
          year: arrMon[0],
          month: arrMon[1]
        }
        Tax_API.getSalaryGroupList_Deduct(para).then(res => {
          this.salaryGroupList = res.data || [];
          this.loading = false;
        }).catch(err => {
          this.loading = false;
          this.$message({type: 'error',showClose:true, message: '请求异常：' + err.msg})
        });
      },
      getOneAndInit() {
        if (this.company == '' || this.year == '' || this.month == '' || this.gpPaygroup == '')
          return;
        let para = {
          company: this.company,
          year: this.year,
          month: this.month,
          gpPaygroup: this.salaryGroup
        }
        Tax_API.getOneAndInit_taxPersonCalculate(para).then(res => {
          this.main_data = res.data || {};
          this.statusText = "当前状态：" + this.main_data.status;
          // statusText
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '状态加载失败：' + err.msg})
        });
      },

      queryReport() {
        //查询报表的同时 查询当月的状态
        this.statusText = '';
        this.getOneAndInit();
        let para = {
          company: this.company,
          year: this.year,
          month: this.month,
          gpPaygroup: this.salaryGroup
        }
        this.loading = true;
        Tax_API.queryReport_taxPersonCalculate(para).then(res => {
          this.tableData = res.data || [];
          this.loading = false;
          if (this.tableData.length <= 0) {
            this.$message({type: 'info',showClose:true, message: '对不起，查询不到当前月份及薪资组的数据。'})
          }
        }).catch(err => {
          this.loading = false;
          this.$message({type: 'error',showClose:true, message: '列表请求异常：' + err.msg})
        });
      },
      calculateTax() {
        if (this.company == '' || this.year == '' || this.month == '' || this.salaryGroup == '') {
          this.$message({type: 'warning', message: '请选择算薪月份、薪资组！'});
          return;
        }
        this.$confirm('确定要计算预缴税款吗？').then((ite) => {
          let para = {
            company: this.company,
            year: this.year,
            month: this.month,
            gpPaygroup: this.salaryGroup
          }
          this.loading = true;
          this.calcLoading = true;
          Tax_API.calculateTax_taxPersonCalculate(para).then(res => {
            if (res.success) {
              this.queryReport();
              this.$message({type: 'success', message: '计算成功【' + this.salaryMonth + "]"})
            }
            this.loading = false;
            this.calcLoading = false;
          }).catch(err => {
            this.loading = false;
            this.calcLoading = false;
            this.$message({type: 'error', message: '计算异常：' + err.msg})
          });
        }).catch(err => {
          this.$message({message: '已取消'})
        })
      },
      aduitLock() {
        if (this.company == '' || this.year == '' || this.month == '' || this.salaryGroup == '') {
          this.$message({type: 'warning', message: '请选择公司、算薪月份、薪资组！'});
          return;
        }
        this.$confirm('确定要审核冻结吗？').then((ite) => {
          let para = {
            company: this.company,
            year: this.year,
            month: this.month,
            gpPaygroup: this.salaryGroup
          }
          this.loading = true;
          Tax_API.aduitLock_taxPersonCalculate(para).then(res => {
            if (res.success) this.queryReport();
            this.loading = false;
          }).catch(err => {
            this.loading = false;
            this.$message({type: 'error',showClose:true, message: '审核失败：' + err.msg})
          });
        }).catch(err => {
          // this.$message({type: 'info', message: '已取消'})
        })

      },
      initpage() {
        this.queryReport();
      },

      queryMonthlyForEmp(params) {
        Tax_API.queryMonthlyForEmp_taxPersonCalculate(params).then(res => {
          this.detailData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '明细查阅失败异常：' + err.msg})
        });
      },
      showDetail(obj) {
        this.dialogVisible = true;
        this.dialogTitile = "【" + obj.empName + "】个人所得税【当月预缴税款计算明细】表"
        let params = {calculateDetailId: obj.fdId}
        this.queryMonthlyForEmp(params);
      }
    },
    created() {
    },
    mounted() {
      // this.getCompanyList();
      var now = new Date();
      var mon = new Date(now.getFullYear(), now.getMonth(), 1);
      // var lastMon = new Date(now.getFullYear(), now.getMonth() - 1, 1);//上个月
      this.salaryMonth = mon.getFullYear() + "-" + (mon.getMonth() + 1);//默认为当前月月
      var routerParams = this.$store.state.salary.routerCommParams;
      this.company = routerParams.keyVal1.values;
      this.companyName = routerParams.keyVal1.title;
      this.getSalaryGroupList();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





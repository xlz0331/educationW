<template>
  <div class="person-deduct-detail-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{companyName}}个人所得税【专项附加扣除信息】表</b></div>
      </el-col>
    </el-row>
    <!--<el-row class="text-left" style="margin: 5px 0">-->
    <!--<el-col :span="24">-->
    <!--<el-radio-group v-model="company" size="mini">-->
    <!--<el-radio-button label="上海"></el-radio-button>-->
    <!--<el-radio-button  v-for="item in companyList" :label="item.fdId">{{item.text}}</el-radio-button>-->
    <!--</el-radio-group>-->
    <!--</el-col>-->
    <!--</el-row>-->
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
      <el-col :span="6">
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
      <el-col :span="5">
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
      <el-col :span="7">
        <div>&nbsp;</div>
      </el-col>
      <el-col :span="6" class="text-right">
        <div>
          <el-button type="primary">说明</el-button>
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </div>
      </el-col>
    </el-row>
    <!--element-loading-spinner="el-icon-loading"-->
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="拼命加载中"
      stripe border :span-method="arraySpanMethod"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      :max-height="tableHeight"
      style="width: 100%">
      <el-table-column prop="seqText" header-align="center" label="序号" width="45">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType==1" class="text-left">
            {{scope.row.seqText}}
          </div>
          <div class="text-center" v-else>{{scope.row.seqText}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="deptName3" header-align="center" label="部门" min-width="100"></el-table-column>
      <el-table-column prop="empName" align="center" label="姓名" min-width="70"></el-table-column>
      <el-table-column prop="nid" align="center" label="身份证号" min-width="120"></el-table-column>
      <el-table-column prop="jobName" align="center" label="职务" min-width="90"></el-table-column>
      <el-table-column prop="supvLvl" align="center" label="职等" :render-header="renderheader"
                       min-width="75"></el-table-column>

      <el-table-column header-align="center" label="专项附加扣除年度累计" :render-header="renderheader">
        <el-table-column prop="deductChildren" align="center" label="子女教育" :render-header="renderheader"
                         min-width="70">
        </el-table-column>
        <el-table-column prop="deductEducation" align="center" label="继续教育" :render-header="renderheader"
                         min-width="70">
        </el-table-column>
        <el-table-column prop="deductLoans" align="center" label="住房贷款利息" :render-header="renderheader"
                         min-width="100">
        </el-table-column>
        <el-table-column prop="deductRenting" align="center" label="房屋租金" :render-header="renderheader"
                         min-width="70">
        </el-table-column>
        <el-table-column prop="deductOlder" align="center" label="赡养老人" :render-header="renderheader"
                         min-width="70">
        </el-table-column>
        <el-table-column prop="deductSum" align="center" label="合计" :render-header="renderheader"
                         min-width="70">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<style  lang="scss" scoped>
  .person-deduct-detail-container{
    max-width: 1160px;
  }
  .el-date-editor {
    width: 180px !important;
  }
</style>
<script>
  import Tax_API from '@/api/tax/tax'

  export default {
    name: "price-list",
    data() {
      return {
        loading: false,
        tableHeight:null,
        ruleForm: [],
        tableData: [],
        salaryMonth: '',
        salaryGroupList: [],
        salaryGroup: '',
        companyList: [],
        company: '',
        companyName:'',
        year: '',
        month: ''
      }
    },
    components: {},
    watch:{
      '$route':function () {
        this.getTableHeight();
      }
    },
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
          return [1, 12];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}){
        if (row.rowType == 1) {
          return  'warning-row';
        }
      },
      getCompanyList() {
        Tax_API.getCompanyList_Deduct().then(res => {
          this.companyList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '公司列表请求异常：' + err.msg})
        });
      },
      getSalaryGroupList() {
        this.salaryGroup = '';
        if (this.company == '' || this.company == null) return;
        if (this.salaryMonth == '' || this.salaryMonth == null || this.salaryMonth.indexOf("-") == -1) return;
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
          this.$message({type: 'error', message: '请求异常：' + err.msg})
        });
      },
      queryReport() {
        let arrMon = this.salaryMonth.split("-");
        let para = {
          company: this.company,
          year: arrMon[0],
          month: arrMon[1],
          gpPaygroup: this.salaryGroup
        }
        this.loading = true;
        Tax_API.queryReport_Deduct(para).then(res => {
          this.tableData = res.data || [];
          if(this.tableData.length<=0){
            this.$message({type: 'info', message: '对不起，查询不到当前月份及薪资组的数据。'})
          }
          this.loading = false;
        }).catch(err => {
          this.loading = false;
          this.$message({type: 'error', message: '请求异常：' + err.msg})
        });
      },
      exportExcel() {
        if (this.company == '' || this.year == '' || this.month == '' || this.salaryGroup == '') {
          this.$message({type: 'warning', message: '请选择算薪月份、薪资组！'});
          return;
        }
        let para = {
          company: this.company,
          year: this.year,
          month: this.month,
          gpPaygroup: this.salaryGroup
        }
        try {
          let url = Tax_API.exportExcel_Deduct(para) ;
          var ef=document.createElement("iframe");
          ef.src=url;
          ef.style.display="none";
          document.body.appendChild(ef);
          // window.open(url);
        } catch (ex) {
          this.$message({type: 'error', message: ex});
        }
      },
      initpage(){
        this.queryReport();
      }
    },
    created() {
    },
    mounted() {
      // this.getCompanyList();
      var routerParams = this.$store.state.salary.routerCommParams;
      this.company=routerParams.keyVal1.values;
      this.companyName=routerParams.keyVal1.title;

      var now=new Date();
      var mon = new Date(now.getFullYear(), now.getMonth() , 1);
      // var lastMon = new Date(now.getFullYear(), now.getMonth() - 1, 1);//上个月
      this.salaryMonth = mon.getFullYear() + "-" + (mon.getMonth() + 1);//默认为当前月月
      this.getSalaryGroupList();
      this.getTableHeight();
    },
    beforeMount(){
      window.addEventListener('resize',this.getTableHeight);
    }
  }
</script>




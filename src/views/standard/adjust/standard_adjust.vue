<template>
  <div class="standard-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}厂长(含)以下职等管理人员【月薪标准调整】表</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="5">
        <label style="font-size:small">年度：</label>
        <el-date-picker size="mini"
                        v-model="queryParams.salaryYearAndMon"
                        type="year"
                        value-format="yyyy"
                        placeholder="请选择算薪年度" @change="initPage()">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <label style="font-size:small">开始执行时间：</label>
        {{2018}}
      </el-col>
      <el-col :span="13" class="text-right">
        <div>
          <el-button type="primary" @click="showExplain()">说明</el-button>
          <el-button type="primary" @click="addGrade()">增加职等</el-button>
          <el-button type="primary" @click="adjustRankSalary()">调整职级工资</el-button>
          <el-button type="primary" @click="doGiveUp()">放弃调整</el-button>
          <el-button type="primary" @click="doSave()">保存</el-button>
          <el-button type="primary" @click="doSubmit()">提交审批</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中..."
      stripe border :span-method="arraySpanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%">
      <el-table-column prop="sequence" header-align="center" label="职等数" width="45">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType==1" class="text-left">

          </div>
          <div class="text-center" v-else>{{scope.row.gradeNumber}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gradeName" header-align="center" width="100" label="职等"></el-table-column>
      <el-table-column align="center" label="本年度增资">
        <el-table-column prop="thisAddMoney" align="center" label="金额" width="60">
        </el-table-column>
        <el-table-column prop="thisAddRate" align="center" label="比例" width="60">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="职等平均工资">
        <el-table-column prop="averagePre" align="center" label="上年度" width="70">
        </el-table-column>
        <el-table-column prop="averageThis" align="center" label="本年度" width="70">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="职等优级工资差">
        <el-table-column prop="compareDiffer" align="center" label="差额" width="70">
        </el-table-column>
        <el-table-column prop="compareGarde" align="center" label="对比职等" width="70">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="rankDiffer" align="center" label="级差" width="50">
      </el-table-column>
      <el-table-column align="center" label="职级及月薪">
        <template slot-scope="scope">
          <table class="table" style="width: 100%">
            <tbody>
            <tr style="width: 100%">
              <td style="width: 40px;border-right: none;" v-for="item in scope.row.listRankName">{{item}}</td>
            </tr>
            </tbody>
          </table>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="right" label="操作"
                       :render-header="renderheader"
                       width="40">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="【增加职等】" width="30%" :close-on-click-modal="false"
               :visible.sync="dialogGrade">
      <div>
        <el-row class="text-left">
          <el-col :span="24">
            <label>职等：</label>
            <el-input v-model="formData.grade" placeholder="职等" readonly>
            </el-input>
          </el-col>
        </el-row>
        <el-button type="primary" @click="doSaveGrade()">保存</el-button>
        <el-button type="primary" @click="dialogGrade=false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="【调整职级工资】" width="70%" :close-on-click-modal="false"
               :visible.sync="dialogRankSalary">
      <el-row class="text-left">
        <el-col :span="24">
          <el-button type="primary" @click="doSaveGrade()">增加职级</el-button>
          <el-button type="primary" @click="dialogGrade=false">删除职级</el-button>
          <el-button type="primary" @click="dialogGrade=false">保存</el-button>
          <el-button type="primary" @click="dialogGrade=false">返回上级</el-button>
        </el-col>
      </el-row>
      <div>
        <table class="table">
          <thead>
          <tr>
            <th>职等数</th>
            <th>职等</th>
            <th>项目</th>
            <th colspan="9">职级及月薪</th>
            <th>对比职等选择</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td rowspan="2"><el-input   placeholder=""></el-input></td>
            <td rowspan="2"><el-input   placeholder=""></el-input></td>
            <td>职级</td>
            <td v-for="item in 9">item</td>
            <td rowspan="2">选择</td>
          </tr>
          <tr>
            <td>月薪</td>
            <td v-for="item in 9">item</td>
          </tr>
          </tbody>
        </table>

      </div>
    </el-dialog>

  </div>
</template>
<style lang="scss" scoped>
  ._container {
    max-width: 1320px;
  }

  .el-date-editor {
    width: 160px;
  }

  .table {
    border-spacing: 0px;
    width: 100%;
    thead tr {
      th {
        text-align: center;
        border-bottom: none;
        height: 30px;
      }
    }
    tbody tr td {
      text-align: center;
      height: 30px;
    }
  }
</style>
<style lang="scss">
  .standard-container {
    .el-table td, .el-table th {
      padding: 0px !important;
    }
  }
</style>
<script>
  import Standard_API from '@/api/standard/standard'

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
        dialogGrade: false,
        dialogRankSalary: false,
        tableHeight: null,
        title: '',
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

        formData: {
          grade: ''
        }
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
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 51) {
          return [1, 9];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        // if (row.rowType == 1) {
        //   return 'warning-row';
        // }
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

        Standard_API.queryReport(para).then(res => {
          let resdata = res.data || [];
          this.tableData = resdata;
        }).catch(err => {
          this.$message({type: 'error', showClose: true, message: '列表信息失败：' + err.msg})
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
          this.$message({type: 'info', message: '请选择年月'})
          return;
        }
        let params = this.queryParams;
        params.title = this.title;

        switch (val) {
          case "monStand" :
            this.$store.commit('setMonthStandardParams', params)
            this.$router.push({path: './salary_month_standard_list'});
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


      //doAction
      // <el-button type="primary" @click="showExplain()">说明</el-button>
      // <el-button type="primary" @click="addGrade()">增加职等</el-button>
      // <el-button type="primary" @click="adjustRankSalary()">调整职级工资</el-button>
      // <el-button type="primary" @click="doGiveUp()">放弃调整</el-button>
      // <el-button type="primary" @click="doSave()">保存</el-button>
      // <el-button type="primary" @click="doSubmit()">提交审批</el-button>
      //   queryBaseGradeList
      addGrade() {
        this.dialogGrade = true;
      },
      adjustRankSalary() {
        this.dialogRankSalary = true;
      },
    },
    created() {
    },
    mounted() {
      var routerParams = this.$store.state.salary.routerCommParams;
      this.title = routerParams.keyVal1.title;
      this.queryParams.salaryCompany = routerParams.keyVal1.values;
      this.queryParams.gradeCategory = routerParams.keyVal2.values;//this.$route.params.gadeCode;
      var now = new Date();
      var lastMon = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      this.queryParams.salaryYearAndMon = lastMon.getFullYear() + "-" + (lastMon.getMonth() + 1);//默认为上一个月
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





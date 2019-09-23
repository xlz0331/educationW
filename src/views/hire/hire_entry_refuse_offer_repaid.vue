<template>
  <div>
    <el-row style="margin-bottom:10px">
      <el-col>
        <b>{{companyName}}</b>
      </el-col>
    </el-row>
    <el-row>
      <!-- <el-col :span="2" style="height:30px;background:#f5f7fa;">
        <div style="margin-top:3.5px">
          <span>录用人：</span>
        </div>
      </el-col>
      <el-col :span="2">
        <div style="height:30px;background:#f5f7fa">
          <el-input v-model="name" @keyup.enter.native="queryNotEntryRepaid()"></el-input>
        </div>
      </el-col>
      <el-col :span="2" style="height:30px;background:#f5f7fa;">
        <div style="margin-top:3.5px">
          <span>录用部门：</span>
        </div>
      </el-col>
      <el-col :span="2">
        <div style="height:30px;background:#f5f7fa">
          <el-input v-model="dept" @keyup.enter.native="queryNotEntryRepaid()"></el-input>
        </div>
      </el-col>

      <el-col :span="2" class="text-left">
        <el-button type="primary" @click="queryNotEntryRepaid()" style="margin-left:10px">查询</el-button>
      </el-col>-->
      <el-col :span="24" class="text-right">
        <el-button type="primary" @click="$router.go(-1)">返回上一级</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      v-loading="loading"
      element-loading-text="拼命加载中"
      stripe
      border
      :span-method="arraySpanMethod"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      :max-height="tableHeight"
      style="width: 100%"
    >
      <el-table-column type="index" header-align="center" align="center" label="序号" width="45">
        <template slot-scope="scope">
          <div v-if="scope.row.fdId==null" class="text-left">
            <b>{{scope.row.index}}</b>
          </div>
          <div class="text-center" v-else>{{scope.row.index}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="name" header-align="center" label="录用人" align="center" width="65"></el-table-column>
      <el-table-column prop="sex" header-align="center" label="性别" align="center" width="30"></el-table-column>
      <!-- <el-table-column prop="nid" header-align="center" label="身份证号码" align="center" min-width="180"></el-table-column> -->
      <!-- <el-table-column prop="company" header-align="center" label="录用公司" align="center" width="120"></el-table-column> -->
      <el-table-column
        prop="dept"
        header-align="center"
        label="录用部门"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="position"
        header-align="center"
        label="录用岗位"
        align="center"
        min-width="60"
      ></el-table-column>
      <el-table-column
        prop="jobGrade"
        header-align="center"
        label="录用职等"
        align="center"
        min-width="60"
      ></el-table-column>
      <!-- <el-table-column prop="tryrangeText" header-align="center" label="试用期" align="center"  width="80"></el-table-column> -->
      <el-table-column
        prop="planEntryDay"
        header-align="center"
        label="计划入职</br>时间"
        align="center"
        width="90"
        :render-header="renderheader"
      ></el-table-column>
      <el-table-column prop header-align="center" label="入职借款及欠条">
        <el-table-column prop header-align="center" label="借款查询" align="center" width="75">
          <template slot-scope="scope">
            <!-- <span style="cursor:pointer;color:#409EFF;" v-html="scope.row.isBorrowText" @click="goBorrowInput(scope.row)"></span> -->
            <!-- <span style="cursor:pointer;color:#409EFF;" v-html="scope.row.isBorrowText" @click="goBorrowInput(scope.row)" ></span> -->
            <i
              style="cursor:pointer;color:#409EFF;"
              class="el-icon-search"
              @click="goBorrowInput(scope.row)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="entrySalaryStatusText"
          header-align="center"
          label="存档"
          align="center"
          width="65"
        >
          <template slot-scope="scope">
            <a
              target="_blank"
              :href="scope.row.src"
              style="cursor:pointer;color:#409EFF;text-decoration:underline"
            >
              <div v-if="scope.row.fdId">已存档</div>
            </a>
            <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.borrowText" @click="goSalaryInput(scope.row)"></span> -->
            <!-- <a :href="scope.row.src">
              <span style="cursor:pointer;color:#409EFF;text-decoration:underline">已存档</span>
            </a>-->
            <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut(scope.row)">已存档</span> -->
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="planEntryDay"
        header-align="center"
        label="不入职确认</br>时间"
        align="center"
        width="90"
        :render-header="renderheader"
      ></el-table-column>
      <el-table-column prop header-align="center" label="归还借款及违约金">
        <el-table-column
          prop="repaidBorrowAmount"
          header-align="center"
          label="归还借款</br>金额"
          align="center"
          width="75"
          :render-header="renderheader"
        ></el-table-column>
        <el-table-column
          prop="repaidDeditAmount"
          header-align="center"
          label="归还违约</br>金金额"
          align="center"
          width="75"
          :render-header="renderheader"
        ></el-table-column>
        <el-table-column
          prop="repayTime"
          header-align="center"
          label="归还时间"
          align="center"
          width="90"
        ></el-table-column>
        <el-table-column prop="agent" header-align="center" label="经办人" align="center" width="65"></el-table-column>
        <el-table-column
          prop="entrySalaryStatusText"
          header-align="center"
          label="归还凭证</br>存档"
          align="center"
          width="75"
          :render-header="renderheader"
        >
          <template slot-scope="scope">
            <a
              target="_blank"
              :href="scope.row.src1"
              style="cursor:pointer;color:#409EFF;text-decoration:underline"
            >
              <div v-if="scope.row.fdId">已存档</div>
            </a>
            <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.repayFileText"></span> -->
            <!-- <a :href="scope.row.src1">
              <span style="cursor:pointer;color:#409EFF;text-decoration:underline">已存档</span>
            </a>-->
            <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut1(scope.row)">已存档</span> -->
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogProof" width="900px" v-dialogDrag title="存档">
      <div>
        <img :src="proofSrc" style="width: 100%;height: auto;" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Hire_API from '@/api/hire/hire'
import directive from '@/views/hire/hire_edit_grade'
import { mapGetters } from 'vuex'
export default {
  name: 'price-list',
  data() {
    return {
      loading: false,
      tableData: [],
      tableData1: [],
      tableHeight: null,
      name: "",
      dept: '',
      companyIdA: '',
      dialogProof: false,
      proofSrc: '',
      companyName: '',
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {

      this.getCompanyList();
      this.queryNotEntryRepaid();

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
    queryNotEntryRepaid() {
      // var params = { companyId: this.companyIdA, name: this.name, dept: this.dept }
      Hire_API.queryNotEntryRepaid(this.companyIdA).then(res => {
        this.tableData = [];
        this.tableData1 = res.data;
        let index = 0;
        for (var i = 0; i < this.tableData1.length; i++) {
          index++
          if (this.tableData1[i].fdId == null) {
            index = 0
            this.tableData1[i].index = "职等：" + this.tableData1[i].jobGrade
            this.tableData1[i].jobGrade = '';
          } else {
            this.tableData1[i].index = index
          }

          var item = this.tableData1[i];
          if (item.isBorrow === 0) {
            item.print = ""
          } else {
            item.print = "打印";
            item.src = item.borrowFile;
            item.src1 = item.repayFile;
            this.tableData.push(item);
          }
        }
        console.log(this.tableData)
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    getCompanyList() {
      Hire_API.getCompanyList().then(res => {
        var comList = res.data || [];
        if (comList.length > 0) {
          for (var i = 0; i < comList.length; i++) {
            // debugger
            if (this.companyIdA == comList[i].companyId) {
              this.companyName = comList[i].companyName + "社招预注册管理人员【不入职人员已归还借款及违约金】台账";
            }
          }
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    proofOut(item) {
      this.proofSrc = '';
      this.proofSrc = item.src;
      this.dialogProof = true;
    },
    proofOut1(item) {
      this.proofSrc = '';
      this.proofSrc = item.src1;
      this.dialogProof = true;
    },
    goBorrowInput(val) {
      var item = val;
      if (item.isBorrowText != "无") {
        this.$router.push({
          path: '/hire/hire/hire_entry_borrow_money_search/' + this.companyIdA,
          query: { fdId: item.personalId }
        })
      }
      // console.log(val)
      // this.$router.push({
      //   path: '/hire/hire/hire_entry_borrow_money_search/' + this.companyIdA,
      //   query: { fdId: item.personalId }
      // })
    },
    goSalaryInput(val) {
      var item = val;
      this.$router.push({
        path: '/hire/hire/hire_entry_salary_search/' + this.companyIdA,
        query: { fdId: item.personalId }
      })
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.fdId == null) {
        return [1, 15];
      }
    },
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (row.fdId == null) {
        return 'warning-row';
      }
    },
  },
  created() {
  },
  watch: {
    "$route": function () {
      this.getTableHeight();
      this.initPage();
    }
  },
  mounted() {
    var str = this.$route.path;
    // this.companyIdA = str.split('=')[1];
    var index = str.lastIndexOf("\/");
    this.companyIdA = str.substring(index + 1, str.length);
    this.initPage();
  },
  computed: {
    ...mapGetters(['login_user']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
        // mobile: this.device === 'mobile'
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 130px;
}
.person-deduct-detail-container {
  max-width: 1160px;
}
.el-date-editor {
  width: 180px !important;
}
</style>

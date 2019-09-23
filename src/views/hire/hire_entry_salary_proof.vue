<template>
  <div>
    <el-row style="margin-bottom:15px">
      <el-col>
        <b>{{companyName}}</b>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" style="height:30px;background:#f5f7fa;">
        <div style="margin-top:3.5px">
          <span>录用人：</span>
        </div>
        <!-- <span style="text-decoration:underline;color:#409EFF">{{login_user.name || ''}}</span> -->
      </el-col>
      <el-col :span="2">
        <div style="height:30px;background:#f5f7fa">
          <el-input v-model="name" @keyup.enter.native="findSalaryProof()"></el-input>
        </div>
      </el-col>
      <el-col :span="2" style="height:30px;background:#f5f7fa;">
        <div style="margin-top:3.5px">
          <span>录用部门：</span>
        </div>
        <!-- <span style="text-decoration:underline;color:#409EFF">{{login_user.name || ''}}</span> -->
      </el-col>
      <el-col :span="2">
        <div style="height:30px;background:#f5f7fa">
          <el-input v-model="dept" @keyup.enter.native="findSalaryProof()"></el-input>
        </div>
      </el-col>
      <el-col :span="2" style="height:30px;background:#f5f7fa;">
        <div style="margin-top:3.5px">
          <span>录用职等：</span>
        </div>
        <!-- <span style="text-decoration:underline;color:#409EFF">{{login_user.name || ''}}</span> -->
      </el-col>
      <el-col :span="2">
        <div style="height:30px;background:#f5f7fa">
          <el-input v-model="jobGrade" @keyup.enter.native="findSalaryProof()"></el-input>
        </div>
      </el-col>
      <el-col :span="2" class="text-left">
        <el-button type="primary" @click="findSalaryProof()" style="margin-left:10px">查询</el-button>
      </el-col>
      <el-col :span="10" class="text-right"></el-col>
    </el-row>
    <el-table :data="tableData" border>
      <el-table-column type="index" header-align="center" align="center" label="序号" width="30"></el-table-column>

      <el-table-column prop="name" header-align="center" label="录用人" align="center" width="65"></el-table-column>
      <el-table-column prop="sex" header-align="center" label="性别" align="center" width="50"></el-table-column>
      <el-table-column prop="nid" header-align="center" label="身份证号码" align="center" width="160"></el-table-column>
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
        min-width="80"
      ></el-table-column>
      <el-table-column
        prop="jobGrade"
        header-align="center"
        label="录用职等"
        align="center"
        min-width="60"
      ></el-table-column>
      <el-table-column
        prop="tryrangeText"
        header-align="center"
        label="试用期"
        align="center"
        width="65"
      ></el-table-column>
      <el-table-column
        prop="planEntryDay"
        header-align="center"
        label="计划入职时间"
        align="center"
        width="110"
      ></el-table-column>
      <el-table-column prop header-align="center" label="入职薪酬确认" :render-header="renderheader">
        <el-table-column prop header-align="center" label="入职借款" align="center" width="75">
          <template slot-scope="scope">
            <span
              style="cursor:pointer;color:#409EFF;"
              v-html="scope.row.isBorrowText"
              @click="goBorrowInput(scope.row)"
            ></span>
            <!-- <span style="cursor:pointer;color:#409EFF;" v-html="scope.row.isBorrowText" @click="goBorrowInput(scope.row)"></span> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="entrySalaryStatusText"
          header-align="center"
          label="入职薪酬"
          align="center"
          width="75"
        >
          <template slot-scope="scope">
            <span style="cursor:pointer;color:#409EFF;" @click="goSalaryInput(scope.row)">查看</span>
            <!-- <span style="cursor:pointer;color:#409EFF;"  @click="goSalaryInput(scope.row)" >查看</span> -->
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop header-align="center" label="录入凭证" :render-header="renderheader">
        <el-table-column prop header-align="center" label="录入依据" align="center" width="100">
          <template slot-scope="scope">
            <span v-html="scope.row.salaryInputProof"></span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="存档" min-width="45">
          <template slot-scope="scope">
            <span
              style="cursor:pointer;color:#409EFF;"
              @click="findPath1(scope.row)"
              v-html="scope.row.salaryInputFileText"
            ></span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogProof" width="900px" v-dialogDrag>
      <el-table :data="pathList" border>
        <el-table-column type="index" header-align="center" align="center" label="序号"></el-table-column>
        <el-table-column header-align="center" label="附件">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.src">
              <span v-html="scope.row.name" style="cursor:pointer;color:#409EFF;"></span>
            </a>
            <!-- <a :href="scope.row.src">
              <span v-html="scope.row.name" style="cursor:pointer;color:#409EFF;"></span>
            </a>-->
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogProof = false">确 定</el-button>
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
      name: "",
      dept: '',
      jobGrade: '',
      companyIdA: "",
      srcs: [],
      dialogProof: false,
      proofSrc: '',
      companyName: '',
      pathList: [],
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      var str = this.$route.path;
      // this.companyIdA = str.split('=')[1];
      // var index = str.lastIndexOf("\/");
      // this.companyIdA = str.substring(index + 1, str.length);
      this.getCompanyList();
      this.findSalaryProof();
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
    findPath1(item) {
      this.dialogProof = true;
      var params = { fdId: item.fdId, companyId: item.companyId }
      Hire_API.findPath1(params).then(res => {
        this.pathList = res.data || [];
        if (this.pathList.length > 0) {
          this.pathList.forEach(item => {
            item.src = item.filepath;
            var str1 = item.name;
            item.name1 = str1.split('.')[0];
          });
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    getCompanyList() {
      Hire_API.getCompanyList().then(res => {
        var comList = res.data || [];
        if (comList.length > 0) {
          for (var i = 0; i < comList.length; i++) {
            if (this.companyIdA == comList[i].companyId) {
              this.companyName = comList[i].companyName + "社招预注册管理人员【入职薪酬录入凭证查询】";
            }
          }
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },

    findSalaryProof() {
      var params = { companyId: this.companyIdA, name: this.name, dept: this.dept, jobGrade: this.jobGrade }
      Hire_API.findSalaryProof(params).then(res => {
        this.tableData = res.data || [];
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },

    downloadMulti() {
      if (this.srcs.length > 0) {
        var aDom = document.createElement('a')
        var evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', false, false)
        aDom.href = this.srcs[0];
        aDom.dispatchEvent(evt);
        aDom.click();
      }
      if (this.srcs.length > 1) {
        var aDom = document.createElement('a')
        var evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', false, false)
        aDom.href = this.srcs[1];
        aDom.dispatchEvent(evt);
        aDom.click();
      }
      if (this.srcs.length > 2) {
        var aDom = document.createElement('a')
        var evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', false, false)
        aDom.href = this.srcs[2];
        aDom.dispatchEvent(evt);
        aDom.click();
      }
      // if(this.srcs.length>3){
      // var aDom = document.createElement('a')
      // var evt = document.createEvent('HTMLEvents')
      // evt.initEvent('click', false, false)
      // aDom.href =this.srcs[3];
      // aDom.dispatchEvent(evt);
      // aDom.click();
      // }
    },

    goBorrowInput(val) {
      var item = val;
      if (item.isBorrowText != "无") {
        this.$router.push({
          path: '/hire/hire/hire_entry_borrow_money_search/' + this.companyIdA,
          query: { fdId: item.fdId }
        })
      }
      // this.$router.push({
      //   path: '/hire/hire/hire_entry_borrow_money_search/' + this.companyIdA,
      //   query: { fdId: item.fdId }
      // })
    },
    goSalaryInput(val) {
      var item = val;
      this.$router.push({
        path: '/hire/hire/hire_entry_salary_search/' + this.companyIdA,
        query: { fdId: item.fdId, companyId: item.companyId }
      })
    }
  },
  created() {
  },
  watch: {
    "$route": function () {
      this.initPage();
    }
  },
  mounted() {
    // var str= this.$route.path;
    // // this.companyIdA = str.split('=')[1];
    // var index = str .lastIndexOf("\/");
    // this.companyIdA  = str .substring(index + 1, str .length);

    var routerParams = this.$store.state.salary.routerCommParams;//(routerParams.keyVal1.title /name/values 对应router的meta值)
    this.companyIdA = routerParams.keyVal1.values;
    this.companyName = routerParams.keyVal1.title;

    this.initPage();
    // console.log(this.companyIdA)
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
</style>

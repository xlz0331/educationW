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
          <el-input v-model="name" @keyup.enter.native="findAllAcceptOffer()"></el-input>
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
          <el-input v-model="dept" @keyup.enter.native="findAllAcceptOffer()"></el-input>
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
          <el-input v-model="jobGrade" @keyup.enter.native="findAllAcceptOffer()"></el-input>
        </div>
      </el-col>
      <el-col :span="2" class="text-left">
        <el-button type="primary" @click="findAllAcceptOffer()" style="margin-left:10px">查询</el-button>
      </el-col>
      <el-col :span="10" class="text-right"></el-col>
    </el-row>
    <div>
      <el-table :data="tableData">
        <el-table-column type="index" header-align="center" align="center" label="序号" width="35"></el-table-column>

        <el-table-column prop="name" header-align="center" label="录用人" align="center" width="60"></el-table-column>
        <el-table-column prop="sex" header-align="center" label="性别" align="center" width="35"></el-table-column>
        <el-table-column prop="nid" header-align="center" label="身份证号码" align="center" width="155"></el-table-column>
        <el-table-column
          prop="company"
          header-align="center"
          label="录用公司"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="dept"
          header-align="center"
          label="录用部门"
          align="center"
          min-width="80"
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
        <el-table-column
          prop="tryrangeText"
          header-align="center"
          label="试用期"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="planEntryDay"
          header-align="center"
          label="计划入职</br>时间"
          align="center"
          width="85"
          :render-header="renderheader"
        ></el-table-column>
        <el-table-column
          prop="actualEntryDay"
          header-align="center"
          label="实际入职</br>时间"
          align="center"
          width="85"
          :render-header="renderheader"
        ></el-table-column>
        <el-table-column prop header-align="center" label="入职借款及欠条" :render-header="renderheader">
          <el-table-column
            prop
            header-align="center"
            label="借款查询"
            align="center"
            width="65"
            :render-header="renderheader"
          >
            <template slot-scope="scope">
              <!-- <span style="cursor:pointer;color:#409EFF;" v-html="scope.row.isBorrowText" @click="goBorrowInput(scope.row)"></span> -->
              <span
                style="cursor:pointer;color:#409EFF;"
                v-html="scope.row.isBorrowText"
                @click="goBorrowInput(scope.row)"
              ></span>
              <!-- <i style="cursor:pointer;color:#409EFF;" class="el-icon-search" @click="goBorrowInput(scope.row)" ></i> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="entrySalaryStatusText"
            header-align="center"
            label="打印"
            align="center"
            width="40"
          >
            <template slot-scope="scope">
              <span
                style="cursor:pointer;color:#409EFF;text-decoration:underline"
                v-html="scope.row.print"
                @click="goBorrowFile(scope.row)"
              ></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="entrySalaryStatusText"
            header-align="center"
            label="存档"
            align="center"
            width="50"
          >
            <template slot-scope="scope">
              <!-- <span style="cursor:po
              "></span>-->
              <!-- <a :href="scope.row.src">
            <span style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.borrowText"></span>
              </a>-->
              <!-- <span
                :id="scope.row.fdId+'b'"
                style="cursor:pointer;color:#409EFF;text-decoration:underline;display:"
                v-html="scope.row.borrowText"
              ></span>-->
              <div
                v-if="scope.row.borrowFile == 0"
                :id="scope.row.fdId"
                value="item.name"
                @click="aaa(scope.row)"
              >
                <el-upload
                  style="display:inline-block"
                  class="upload-demo"
                  ref="upload"
                  action="/hire/hireProofFiles/upload"
                  :show-file-list="false"
                  :http-request="uploadSectionFile"
                  :auto-upload="true"
                >
                  <span
                    :id="scope.row.fdId+'c'"
                    style="cursor:pointer;color:#409EFF;text-decoration:underline;display:"
                    v-html="scope.row.borrowText"
                  ></span>
                  <span
                    :id="scope.row.fdId+'d'"
                    style="cursor:pointer;color:#409EFF;text-decoration:underline;display:none"
                  ></span>
                </el-upload>
              </div>
              <div
                style="cursor:pointer;color:#409EFF;text-decoration:underline"
                :id="scope.row.fdId+'a'"
                v-if="scope.row.borrowFile != 0"
              >
                <a target="_blank" :href="scope.row.src">已存档</a>
                <!-- <a :href="scope.row.src" @click="aaa(scope.row)">
                  <span
                    style="cursor:pointer;color:#409EFF;text-decoration:underline"
                    v-html="scope.row.borrowText"
                  ></span>
                </a>-->
                <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut(scope.row)" v-html="scope.row.proofText" ></span> -->
              </div>
              <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.borrowText" @click="proofOut(scope.row)"></span> -->
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop header-align="center" label="入职薪酬确认书" :render-header="renderheader">
          <el-table-column prop header-align="center" label="薪酬查询" align="center" width="65">
            <template slot-scope="scope">
              <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="goBorrowInput(scope.row)">查看</span> -->
              <span style="cursor:pointer;color:#409EFF;" @click="goSalaryInput(scope.row)">查看</span>
              <!-- <i style="cursor:pointer;color:#409EFF;" class="el-icon-search" @click="goSalaryInput(scope.row)" ></i> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="entrySalaryStatusText"
            header-align="center"
            label="打印"
            align="center"
            width="40"
          >
            <template slot-scope="scope">
              <span
                style="cursor:pointer;color:#409EFF;text-decoration:underline"
                @click="goSalaryConfirm(scope.row)"
              >打印</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="entrySalaryStatusText"
            header-align="center"
            label="存档"
            align="center"
            width="50"
          >
            <template slot-scope="scope">
              <!-- <a :href="scope.row.src1">
            <span style="cursor:pointer;color:#409EFF;text-decoration:underline">已存档</span>
              </a>-->
              <!-- <span
                :id="scope.row.fdId+'f'"
                style="cursor:pointer;color:#409EFF;text-decoration:underline;display:"
                v-html="scope.row.salaryConfirmText"
              ></span>-->
              <div
                v-if="scope.row.salaryConfirmFile==0"
                :id="scope.row.fdId+'z'"
                value="item.name"
                @click="aaa(scope.row)"
              >
                <el-upload
                  style="display:inline-block"
                  class="upload-demo"
                  ref="upload"
                  action="/hire/hireProofFiles/upload"
                  :show-file-list="false"
                  :http-request="uploadSectionFile1"
                  :auto-upload="true"
                >
                  <span
                    :id="scope.row.fdId+'g'"
                    style="cursor:pointer;color:#409EFF;text-decoration:underline;display:"
                    v-html="scope.row.salaryConfirmText"
                  ></span>
                  <span
                    :id="scope.row.fdId+'h'"
                    style="cursor:pointer;color:#409EFF;text-decoration:underline;display:none"
                  ></span>
                </el-upload>
              </div>
              <div :id="scope.row.fdId+'e'" v-if="scope.row.salaryConfirmFile!=0">
                <a
                  target="_blank"
                  :href="scope.row.src1"
                  style="cursor:pointer;color:#409EFF;text-decoration:underline"
                >已存档</a>
                <!-- <a :href="scope.row.src1" @click="aaa(scope.row)">
                  <span
                    style="cursor:pointer;color:#409EFF;text-decoration:underline"
                    v-html="scope.row.salaryConfirmText"
                  ></span>
                </a>-->
                <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut(scope.row)" v-html="scope.row.proofText" ></span> -->
              </div>
              <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut1(scope.row)">已存档</span> -->
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog :visible.sync="dialogSalaryConfirm" width="840px">
        <div id="aa">
          <el-row>
            <el-col class="text-center">入职薪酬确认书</el-col>
          </el-row>
        </div>
        <span slot="footer">
          <el-button type="info" @click="dialogSalaryConfirm=false">取消</el-button>
          <el-button type="primary" @click="printFile()">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="dialogBorrow" width="840px">
        <div id="bb">
          <el-row>
            <el-col class="text-center">入职借条</el-col>
          </el-row>
        </div>
        <span slot="footer">
          <el-button type="info" @click="dialogBorrow=false">取消</el-button>
          <el-button type="primary" @click="printFile1()">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="dialogProof" width="900px" v-dialogDrag title="存档">
        <div>
          <img :src="proofSrc" style="width: 100%;height: auto;" />
        </div>
      </el-dialog>
    </div>
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
      name: "",
      dept: '',
      jobGrade: '',
      companyIdA: '',
      dialogSalaryConfirm: false,
      dialogBorrow: false,
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
      this.findAllAcceptOffer();
      this.findFilePath();
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
    aaa(val) {
      this.personalId = val.fdId;
      this.fileId = val.fdId;
      // document.getElementById(val.fdId+'d').style.display="";
      // document.getElementById(val.fdId+'c').style.display="none";
    },
    findAllAcceptOffer() {
      this.tableData = [];
      var params = { companyId: this.companyIdA, name: this.name, dept: this.dept, jobGrade: this.jobGrade }
      Hire_API.findAllAcceptOffer(params).then(res => {
        this.tableData1 = res.data;
        for (var i = 0; i < this.tableData1.length; i++) {
          var item = this.tableData1[i];
          if (item.isBorrow === 0) {
            item.print = ""
            item.src1 = item.salaryConfirmFile;
            this.tableData.push(item)
          } else {
            item.print = "打印";
            item.src = item.borrowFile;
            item.src1 = item.salaryConfirmFile;
            this.tableData.push(item)
          }

        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    addrepay() {
      this.totalRepayAmount = 0;
      this.tableData = this.tableData;
      // for (var i = 0; i < this.tableData.length; i++) {
      //   this.totalRepayAmount = parseFloat(this.totalRepayAmount + this.tableData[i].repayAmount);
      //   var item = this.tableData[i];
      //   // console.log(item)
      //   // debugger
      //   // if (item.borrowFile != 0) {
      //   //   document.getElementById(item.fdId).style.display = "none";
      //   //   document.getElementById(item.fdId + 'a').style.display = "";
      //   //   document.getElementById(item.fdId + 'b').style.display = "none";
      //   // } else {
      //   //   document.getElementById(item.fdId).style.display = "";
      //   //   document.getElementById(item.fdId + 'a').style.display = "none";
      //   //   document.getElementById(item.fdId + 'b').style.display = "none";
      //   // };
      //   // if (item.salaryConfirmFile != 0) {
      //   //   document.getElementById(item.fdId + 'z').style.display = "none";
      //   //   document.getElementById(item.fdId + 'e').style.display = "";
      //   //   document.getElementById(item.fdId + 'f').style.display = "none";
      //   // } else {
      //   //   document.getElementById(item.fdId + 'z').style.display = "";
      //   //   document.getElementById(item.fdId + 'e').style.display = "none";
      //   //   document.getElementById(item.fdId + 'f').style.display = "none";
      //   // }
      // }
    },
    getCompanyList() {
      Hire_API.getCompanyList().then(res => {
        var comList = res.data || [];
        if (comList.length > 0) {
          for (var i = 0; i < comList.length; i++) {
            // debugger
            if (this.companyIdA == comList[i].companyId) {
              this.companyName = comList[i].companyName + "社招预注册管理人员【入职薪酬已确认已入职】明细表";
            }
          }
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    proofOut1(item) {
      this.proofSrc = '';
      this.proofSrc = item.src1;
      this.dialogProof = true;
    },
    proofOut(item) {
      this.proofSrc = '';
      this.proofSrc = item.src;
      this.dialogProof = true;
    },
    printFile() {
      // var oldHtml = document.body.innerHTML;
      // document.body.innerHTML = document.getElementById("aa").innerHTML;
      // window.print();
      // document.body.innerHTML = oldHtml;
      let subOutputRankPrint = document.getElementById('aa');
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
    },
    printFile1() {
      // var oldHtml = document.body.innerHTML;
      // document.body.innerHTML = document.getElementById("aa").innerHTML;
      // window.print();
      // document.body.innerHTML = oldHtml;
      let subOutputRankPrint = document.getElementById('bb');
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
    },
    goSalaryConfirm(item) {
      // this.dialogSalaryConfirm=true;
      // this.$router.push({
      //   path:'/hire/hire/hire_salary_confirm_file',
      //    query:{item:item}
      // })
      // if (this.companyIdA == 11000) {
      //   let routeData = this.$router.push({
      //     path: '/hire/hire/hire_salary_confirm_file1',
      //     query: { item: item }
      //   });
      //   window.open(routeData.href, '_blank');
      // } else {
      //   this.$router.push({
      //     path: '/hire/hire/hire_salary_confirm_file',
      //     query: { item: item }
      //   })
      // }
      Hire_API.findNowHistorySalary(item.fdId).then(res => {
        // console.log(res.data)
        if (res.data.length > 0) {
          var nowsalary = res.data[0];
          if (nowsalary.trafficaAllowance > 0) {
            let routeData = this.$router.resolve({
              path: '/hire/hire/hire_salary_confirm_file1',
              query: { fdId: item.fdId, name: item.name, nid: item.nid, company: item.company, position: item.position, planEntryDay: item.planEntryDay }
            })
            window.open(routeData.href, '_blank');
          } else {
            let routeData = this.$router.resolve({
              path: '/hire/hire/hire_salary_confirm_file',
              query: { fdId: item.fdId, name: item.name, nid: item.nid, company: item.company, position: item.position, planEntryDay: item.planEntryDay }
            });
            window.open(routeData.href, '_blank');
          }
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    goBorrowFile(item) {
      let routeData = this.$router.resolve({
        path: '/hire/hire/hire_borrow_file',
        query: { fdId: item.fdId, name: item.name, nid: item.nid, company: item.company, position: item.position, planEntryDay: item.planEntryDay }
      })
      window.open(routeData.href, '_blank');
      // this.dialogBorrow=true;
    },
    goBorrowInput(val) {
      var item = val;
      if (item.isBorrowText != "无") {
        this.$router.push({
          path: '/hire/hire/hire_entry_borrow_money_search/' + this.companyIdA,
          query: { fdId: item.fdId }
        })
      }
      // console.log(val)
      // this.$router.push({
      //   path: '/hire/hire/hire_entry_borrow_money_search/' + this.companyIdA,
      //   query: { fdId: item.fdId }
      // })
    },
    goSalaryInput(val) {
      var item = val;
      this.$router.push({
        path: '/hire/hire/hire_entry_salary_search/' + this.companyIdA,
        query: { fdId: item.fdId, companyId: this.companyIdA }
      })
    },
    uploadSectionFile(param) {
      // console.log(param)
      var fileObj = param.file;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("multipartFile", fileObj);
      //  form.append("userId", this.userId);
      //  form.append("userName", this.userName);
      //  debugger
      //  console.log(this.fileList)
      // var fileId=this.tableData[0].fdId;
      var proofType = "AS03";
      Hire_API.uploadFile(form, this.personalId, this.fileId, proofType).then(res => {
        var params = this.personalId;
        // this.save();
        // this.$router.go(0);
        this.findAllAcceptOffer();
        document.getElementById(this.fileId + 'd').style.display = "";
        document.getElementById(this.fileId + 'c').style.display = "none";
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
      });
    },
    findFilePath() {
      Hire_API.findFilePath().then(res => {
        this.filePath = res.data.code;
        // console.log(this.filePath)
      })
    },
    uploadSectionFile1(param) {
      // console.log(param)
      var fileObj = param.file;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("multipartFile", fileObj);
      //  form.append("userId", this.userId);
      //  form.append("userName", this.userName);
      //  debugger
      // console.log(form)
      // var fileId=this.tableData[0].fdId;
      var proofType = "AS02";
      Hire_API.uploadFile(form, this.personalId, this.fileId, proofType).then(res => {
        var params = this.personalId;
        // this.save();
        // this.$router.go(0);
        this.findAllAcceptOffer();
        document.getElementById(this.fileId + 'g').style.display = "";
        document.getElementById(this.fileId + 'h').style.display = "none";
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
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
    // var str= this.$route.path;
    // // this.companyIdA = str.split('=')[1];
    // var index = str .lastIndexOf("\/");
    // this.companyIdA  = str .substring(index + 1, str .length);

    var routerParams = this.$store.state.salary.routerCommParams;
    this.title = routerParams.keyVal1.title;//(routerParams.keyVal1.title /name/values 对应router的meta值)
    this.companyIdA = routerParams.keyVal1.values;
    this.companyName = routerParams.keyVal1.title;
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
</style>

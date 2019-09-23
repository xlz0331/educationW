<template>
  <div>
    <el-row style="margin-bottom:15px">
      <el-col :span="4" class="text-right">
        &#12288;
        <!-- <el-button type="primary" @click="refuseEntryRepayRegister()">归还登记</el-button>
        <el-button type="primary" @click="findRepaid()">已归还记录查询</el-button>-->
        <!-- <el-button type="primary">返回上一级</el-button>        -->
      </el-col>
      <el-col :span="14">
        <b>{{companyName}}</b>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-button type="primary" @click="refuseEntryRepayRegister()">归还登记完成</el-button>
        <el-button type="primary" @click="findRepaid()">已归还记录查询</el-button>
        <!-- <el-button type="primary">返回上一级</el-button>        -->
      </el-col>
    </el-row>
    <div @click="getAgent()">
      <div>
        <el-table :data="tableData">
          <el-table-column type="index" header-align="center" align="center" label="序号" width="50"></el-table-column>

          <el-table-column prop="name" header-align="center" label="录用人" align="center" width="65"></el-table-column>
          <el-table-column prop="sex" header-align="center" label="性别" align="center" width="50"></el-table-column>
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
                  :href="scope.row.src1"
                  style="cursor:pointer;color:#409EFF;text-decoration:underline"
                >已存档</a>
                <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.borrowText" @click="goSalaryInput(scope.row)"></span> -->
                <!-- <a :href="scope.row.src1">
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
          <el-table-column prop header-align="center" label="归还登记">
            <el-table-column
              prop="repaidBorrowAmount"
              header-align="center"
              label="归还借款</br>金额"
              align="center"
              width="85"
              :render-header="renderheader"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.repaidBorrowAmount"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="repaidDeditAmount"
              header-align="center"
              label="归还违约</br>金金额"
              align="center"
              width="85"
              :render-header="renderheader"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.repaidDeditAmount"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="repayTime"
              header-align="center"
              label="归还时间"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="scope.row.repayTime"
                  placeholder="请选择"
                ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column
              prop="agent"
              header-align="center"
              label="经办人"
              align="center"
              width="65"
            >
              <template slot-scope="scope">
                <div v-html="scope.row.agent" @click="getAgent()"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="entrySalaryStatusText"
              header-align="center"
              label="归还凭证</br>存档"
              align="center"
              width="75"
              :render-header="renderheader"
            >
              <template slot-scope="scope">
                <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.repayFileText"></span> -->
                <!-- <span
                  :id="scope.row.fdId+'b'"
                  style="cursor:pointer;color:#409EFF;text-decoration:underline;display:"
                  v-html="scope.row.repayFileText"
                ></span>-->
                <div
                  v-if="scope.row.repayFile == 0"
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
                    <!-- <span  style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.repayFileText"></span> -->
                    <span
                      :id="scope.row.fdId+'c'"
                      style="cursor:pointer;color:#409EFF;text-decoration:underline;display:"
                      v-html="scope.row.repayFileText"
                    ></span>
                    <span
                      :id="scope.row.fdId+'d'"
                      style="cursor:pointer;color:#409EFF;text-decoration:underline;display:none"
                    >已存档</span>
                  </el-upload>
                </div>
                <div :id="scope.row.fdId+'a'" v-if="scope.row.repayFile != 0">
                  <a
                    target="_blank"
                    :href="scope.row.src"
                    style="cursor:pointer;color:#409EFF;text-decoration:underline"
                  >已存档</a>
                  <!-- <a :href="scope.row.src">
                    <span style="cursor:pointer;color:#409EFF;text-decoration:underline">已存档</span>
                  </a>-->
                  <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut1(scope.row)">已存档</span> -->
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="dialogProof"
          width="900px"
          v-dialogDrag
          title="存档"
        >
          <div>
            <img :src="proofSrc" style="width: 100%;height: auto;" />
          </div>
        </el-dialog>
      </div>
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
      filePath: '',
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
      this.findNotEntryRepay();
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
    getCompanyList() {
      Hire_API.getCompanyList().then(res => {
        var comList = res.data || [];
        if (comList.length > 0) {
          for (var i = 0; i < comList.length; i++) {
            // debugger
            if (this.companyIdA == comList[i].companyId) {
              this.companyName = comList[i].companyName + "招预注册管理人员【不入职人员归还借款及违约金】台账";
            }
          }
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    proofOut(item) {
      this.proofSrc = '';
      this.proofSrc = item.src1;
      this.dialogProof = true;
    },
    proofOut1(item) {
      this.proofSrc = '';
      this.proofSrc = item.src;
      this.dialogProof = true;
    },
    findNotEntryRepay() {
      var params = this.companyIdA;
      Hire_API.findNotEntryRepay(params).then(res => {
        this.tableData = [];
        this.tableData1 = res.data;
        for (var i = 0; i < this.tableData1.length; i++) {
          var item = this.tableData1[i];
          if (item.isBorrow === 0) {
            item.print = "";
            this.tableData.push(item);
          } else {
            item.print = "打印";
            item.src1 = item.borrowFile;
            this.tableData.push(item);
          }
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    refuseEntryRepayRegister() {
      var params = this.tableData;
      if (params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          if (params[i].repaidBorrowAmount >= 0 && params[i].repaidDeditAmount >= 0 && params[i].repayTime != null) {
            var borrow = params[i].borrowAmount;
            if (borrow != params[i].repaidBorrowAmount) {
              this.open2(params[i]);
            } else {
              Hire_API.refuseEntryRepayRegister(params).then(res => {
                // this.$message({type: 'success', message: '归还登记成功！'});
                this.findNotEntryRepay();
              }).catch(err => {
                this.$message({ type: 'error', message: err.msg })
              });
            }
          } else {
            // this.$message('请核实第['+(i+1)+']条归还借款金额、归还违约金金额、归还时间是否填写完毕');
          }
        };
      }
    },
    open2(item) {
      this.$alert('录用人【' + item.name + '】归还借款金额为【' + item.repaidBorrowAmount + '元】与实际借款金额【' + item.borrowAmount + '元】不一致，请核查。', '提示', {
        confirmButtonText: '确定',
        // cancelButtonText: '取消',
        // type: 'warning'
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: '登记失败',
          // });
        },
      });
    },
    registerContinue(item) {
      Hire_API.refuseEntryRepayRegister(item).then(res => {
        this.$message({ type: 'success', message: '归还登记成功！' });
        this.findNotEntryRepay();
      }).catch(err => {
        this.$message({ type: 'error', message: err.msg })
        console.log(err.errorCode);
      });
    },
    getAgent() {
      for (var i = 0; i < this.tableData.length; i++) {
        var item = this.tableData[i];
        if (item.repaidBorrowAmount != null && item.repaidDeditAmount != null && item.repayTime != null) {
          item.agent = this.login_user.name;
          //  console.log("111")
        }
      }
      // var item=val;

    },
    findRepaid() {
      this.$router.push({
        path: '/hire/hire/hire_entry_refuse_offer_repaid/' + this.companyIdA,
      })
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
    aaa(val) {
      this.personalId = val.personalId;
      this.fileId = val.fdId;

      // document.getElementById(val.fdId + 'b').style.display = "none";
    },
    test() {
      // for (var i = 0; i < this.tableData.length; i++) {
      //   var item = this.tableData[i];
      //   if (item.repayFile != 0) {
      //     document.getElementById(item.fdId).style.display = "none";
      //     document.getElementById(item.fdId + 'a').style.display = "";
      //     document.getElementById(item.fdId + 'b').style.display = "none";
      //   } else {
      //     document.getElementById(item.fdId).style.display = "";
      //     document.getElementById(item.fdId + 'a').style.display = "none";
      //     document.getElementById(item.fdId + 'b').style.display = "none";
      //   }
      // }
    },
    findFilePath() {
      Hire_API.findFilePath().then(res => {
        this.filePath = res.data.code;
      })
    },
    uploadSectionFile(param) {
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
      var proofType = "AS04";
      Hire_API.uploadFile(form, this.personalId, this.fileId, proofType).then(res => {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].personalId == this.personalId) {
            this.tableData[i].repayFile = 1
          }
        }
        // this.refuseEntryRepayRegister()
        // this.findNotEntryRepay();
        // document.getElementById(this.fileId + 'd').style.display = "";
        // document.getElementById(this.fileId + 'c').style.display = "none";
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
      });
    },
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 130px;
}
</style>

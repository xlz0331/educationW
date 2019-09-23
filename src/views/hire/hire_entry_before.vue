<template>
  <div>
    <el-row style="margin-bottom:15px">
      <el-col>
        <b>{{companyName}}</b>
      </el-col>
    </el-row>
    <div>
      <el-table :data="tableData" border>
        <el-table-column type="index" header-align="center" align="center" label="序号" width="35"></el-table-column>

        <el-table-column prop="name" header-align="center" label="录用人" align="center" width="65"></el-table-column>
        <el-table-column prop="sex" header-align="center" label="性别" align="center" width="35"></el-table-column>
        <el-table-column prop="nid" header-align="center" label="身份证号码" align="center" width="155"></el-table-column>
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
          label="计划入职</br>时间"
          align="center"
          width="85"
          :render-header="renderheader"
        ></el-table-column>
        <el-table-column prop header-align="center" label="入职借款及欠条" :render-header="renderheader">
          <el-table-column prop header-align="center" label="借款查询" align="center" width="65">
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
            width="50"
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
            width="55"
          >
            <template slot-scope="scope">
              <!-- <span
                :id="scope.row.fdId+'c'"
                style="cursor:pointer;color:#409EFF;text-decoration:underline"
                v-html="scope.row.borrowText"
              ></span>-->
              <div :id="scope.row.fdId+'d'" v-if="scope.row.borrowFile== 0" value="item.name">
                <el-upload
                  style="display:inline-block"
                  class="upload-demo"
                  ref="upload"
                  action="/hire/hireProofFiles/upload"
                  :show-file-list="false"
                  :http-request="uploadSectionBorrowFile"
                  :auto-upload="true"
                >
                  <span
                    style="cursor:pointer;color:#409EFF;text-decoration:underline"
                    @click="aaa(scope.row)"
                  >
                    <span
                      style="cursor:pointer;color:#409EFF;text-decoration:underline"
                      v-html="scope.row.borrowText"
                    ></span>
                  </span>
                </el-upload>
              </div>
              <div
                :id="scope.row.fdId+'f'"
                v-if="scope.row.borrowFile != 0"
                style="cursor:pointer;color:#409EFF;text-decoration:underline"
              >
                <a target="_blank" :href="scope.row.src1">已存档</a>
                <!-- <a @click="showPic(scope.row.src1)"> -->
                <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline">已存档</span> -->
                <!-- </a> -->
                <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut1(scope.row)">已存档</span> -->
              </div>
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
            width="50"
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
            width="65"
          >
            <template slot-scope="scope">
              <!-- <span
                :id="scope.row.fdId+'b'"
                style="cursor:pointer;color:#409EFF;text-decoration:underline;display:"
                v-html="scope.row.salaryConfirmText"
              ></span>-->
              <div v-if="scope.row.salaryConfirmFile==0" :id="scope.row.fdId" value="item.name">
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
                    style="cursor:pointer;color:#409EFF;text-decoration:underline"
                    @click="aaa(scope.row)"
                  >上传</span>
                </el-upload>
              </div>
              <div
                v-if="scope.row.salaryConfirmFile!=0"
                :id="scope.row.fdId+'a'"
                style="cursor:pointer;color:#409EFF;text-decoration:underline"
              >
                <a target="_blank" :href="scope.row.src">已存档</a>
                <!-- <a tag="aa" :href="scope.row.src">ssss</a> -->

                <!-- <a :href="scope.row.src">
                  <span style="cursor:pointer;color:#409EFF;text-decoration:underline">已存档</span>
                </a>-->
                <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut(scope.row)">已存档</span> -->
              </div>
              <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.salaryConfirmText" ></span> -->
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div>
        <el-dialog :close-on-click-modal="false" :visible.sync="dialogSalaryConfirm" width="840px">
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
        <el-dialog :close-on-click-modal="false" :visible.sync="dialogBorrow" width="770px">
          <div id="bb">
            <el-row>
              <el-col class="text-center" style="font-size:22pt;font-family:SimHei;">借条</el-col>
              <el-col>&#12288;</el-col>
              <el-col class="text-left">
                <span style="font-family:FangSong_GB2312;font-size:15pt;letter-spacing:3px;">
                  &#12288;&#12288;借款人:
                  <input class="inputText" style="width:110px" />（身份证号：
                  <input class="inputText" style="width:220px" />）拟入职出借人投资的公司。为安置家庭，借款人向出借人借款，借款本金：
                  <input class="inputText" style="width:80px" />元整（￥
                  <input class="inputText" style="width:125px" />元）。借款人出具本借条后由出借人在
                  <input class="inputText" style="width:95px" />内将借款本金通过转账方式汇入借款人以下账户：
                  <br />&#12288;&#12288;户&#12288;名：
                  <input class="inputText" style="width:350px" />
                  <br />&#12288;&#12288;开户行：
                  <input class="inputText" style="width:350px" />
                  <br />&#12288;&#12288;账&#12288;号：
                  <input class="inputText" style="width:350px" />
                  <br />
                  <br />
                  <span style="font-size:16pt;font-family:'黑体';">&#12288;&#12288;一、借款人履诺如下：</span>
                  <br />
                  <span>
                    &#12288;&#12288;借款人在收到借款后于
                    <input class="inputText" style="width:60px" />年
                    <input class="inputText" style="width:40px" />月
                    <input class="inputText" style="width:40px" />日内与出借人投资的公司及关联公司签订《劳动合同书》，并到公司报到、工作。借款人逾期不签订《劳动合同书》或逾期不到公司报到、工作的，借款人在5日内一次性归还借款本金，并同时向出借人支付借款本金50%的违约金。逾期归还借款本金及违约金的，每逾期1日借款人按借款本金的千分之一支付给出借人利息。
                  </span>
                  <br />
                  <br />
                  <span style="font-size:16pt;font-family:'黑体';">&#12288;&#12288;二、还款办法：</span>
                  <br />
                  <span style="font-weight:bold">&#12288;&#12288;1、开始还款时间：</span>
                  <span>借款人自入职出借人所投资公司或关联公司的次月开始逐月还款；</span>
                  <br />
                  <span style="font-weight:bold">&#12288;&#12288;2、还款月数：</span>
                  <span>
                    分
                    <input class="inputText" style="width:60px" />月归还；
                  </span>
                  <br />
                  <span style="font-weight:bold">&#12288;&#12288;3、每月还款金额：</span>
                  <input class="inputText" style="width:100px" />万元；
                  <br />
                  <span style="font-weight:bold">&#12288;&#12288;4、离职还款：</span>
                  <span>
                    如借款人在出借人投资的公司或关联公司服务不满
                    <input class="inputText" style="width:60px" />个月而离职的（无论是借款人原因还是公司原因），借款人在离职后5日内将剩余未归还的借款本金归还给出借人。逾期的，每逾期1日借款人按应归还借款本金的千分之一支付出借人利息。
                  </span>
                  <br />
                  <span>&#12288;&#12288;（注：出借人投资的公司及关联公司包括华劲集团股份有限公司、华劲集团纸品销售有限公司、华劲集团股份有限公司南宁纸业分公司、广西华劲竹林发展有限公司、赣州华劲纸业有限公司、华劲集团赣州纸品有限公司、赣州华劲竹林发展有限公司、广西华劲人纸品销售有限公司）</span>
                  <br />
                  <br />&#12288;&#12288;出借人：&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;借款人：
                  <br />&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;年&#12288;&#12288;月&#12288;&#12288;日
                </span>
                <span></span>
              </el-col>
            </el-row>
          </div>
          <span slot="footer">
            <el-button type="info" @click="dialogBorrow=false">取消</el-button>
            <el-button type="primary" @click="printFile1()">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
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
      personalId: '',
      fileId: '',
      companyIdA: '',
      dialogSalaryConfirm: false,
      dialogBorrow: false,
      dialogProof: false,
      proofSrc: '',
      companyName: '',
      url: '',
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      var str = this.$route.path;
      this.getCompanyList();
      this.findAllGetOffer();
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
              this.companyName = comList[i].companyName + "社招预注册管理人员【入职薪酬已确认待入职】明细表";
            }
          }
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
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
    goSalaryConfirm(item) {
      // this.dialogSalaryConfirm=true;
      //  debugger
      // console.log(item)
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
      })


    },
    goBorrowFile(item) {
      let routeData = this.$router.resolve({
        path: '/hire/hire/hire_borrow_file',
        query: { fdId: item.fdId, name: item.name, nid: item.nid, company: item.company, position: item.position, planEntryDay: item.planEntryDay }
      })
      window.open(routeData.href, '_blank');
      // this.dialogBorrow=true;
    },
    findAllGetOffer() {
      // this.url = process.env.BASE_API;
      this.url = window.global_config.BASE_API;
      this.tableData = [];
      var params = this.companyIdA;
      Hire_API.findAllGetOffer(params).then(res => {
        this.tableData1 = res.data;
        for (var i = 0; i < this.tableData1.length; i++) {
          var item = this.tableData1[i];
          if (item.isBorrow === 0) {
            item.print = "";
            item.src = item.salaryConfirmFile;
            this.tableData.push(item)
          } else {
            item.print = "打印";
            item.src1 = item.borrowFile;
            item.src = item.salaryConfirmFile;
            this.tableData.push(item)
          }
        }
        // console.log(this.tableData)
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    test() {
      for (var i = 0; i < this.tableData.length; i++) {
        var item = this.tableData[i];
        // if (item.salaryConfirmFile != 0) {
        //   document.getElementById(item.fdId).style.display = "none";
        //   document.getElementById(item.fdId + 'a').style.display = "";
        //   document.getElementById(item.fdId + 'b').style.display = "none";
        // } else {
        //   document.getElementById(item.fdId).style.display = "";
        //   document.getElementById(item.fdId + 'a').style.display = "none";
        //   document.getElementById(item.fdId + 'b').style.display = "none";
        // }
        // if (item.borrowFile != 0) {
        //   document.getElementById(item.fdId + 'd').style.display = "none";
        //   document.getElementById(item.fdId + 'f').style.display = "";
        //   document.getElementById(item.fdId + 'c').style.display = "none";
        // } else {
        //   document.getElementById(item.fdId + 'd').style.display = "";
        //   document.getElementById(item.fdId + 'f').style.display = "none";
        //   document.getElementById(item.fdId + 'c').style.display = "none";
        // }
        // if (item.isBorrow == 0) {
        //   document.getElementById(item.fdId + 'd').style.display = "none";
        //   document.getElementById(item.fdId + 'f').style.display = "none";
        //   document.getElementById(item.fdId + 'c').style.display = "none";
        // }
      }
    },
    goBorrowInput(val) {
      var item = val;
      // console.log(val)
      if (item.isBorrowText != "无") {
        this.$router.push({
          path: '/hire/hire/hire_entry_borrow_money_search/' + this.companyIdA,
          query: { fdId: item.fdId }
        })
      }

    },
    goSalaryInput(val) {
      var item = val;
      this.$router.push({
        path: '/hire/hire/hire_entry_salary_search/' + this.companyIdA,
        query: { fdId: item.fdId, companyId: this.companyIdA }
      })
    },
    findFilePath() {
      Hire_API.findFilePath().then(res => {
        this.filePath = res.data.code;
        // console.log(this.filePath)
      })
    },
    aaa(val) {
      this.personalId = val.fdId;
      this.fileId = val.fdId;
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
      var proofType = "AS02";
      Hire_API.uploadFile(form, this.personalId, this.fileId, proofType).then(res => {
        this.findAllGetOffer();
      }).catch(err => {
        // this.$message({ type: 'error', message: '异常：' + err.msg })
      });
    },
    uploadSectionBorrowFile(param) {
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
        this.findAllGetOffer();
      }).catch(err => {
        // this.$message({ type: 'error', message: '异常：' + err.msg })
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
    // this.url = process.env.BASE_API;
    // var str = this.$route.path;
    // // this.companyIdA = str.split('=')[1];
    // var index = str.lastIndexOf("\/");
    // this.companyIdA = str.substring(index + 1, str.length);

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
.text {
  font-family: FangSong_GB2312;
  font-size: 15pt;
  text-align: center;
}
.inputText {
  border-left-width: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0.5px;
  border-bottom-color: #000;
  font-size: 15pt;
}
</style>

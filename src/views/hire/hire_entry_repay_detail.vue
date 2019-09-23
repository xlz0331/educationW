<template>
  <div>
    <el-row style="width:800px">
      <el-col :span="6" class="text-left">
        <span>状态：{{repayStatusText}}</span>
      </el-col>
      <el-col :span="9">
        <b>【已入职人员归还借款明细记录】表</b>
      </el-col>
      <el-col :span="9" class="text-right">
        <el-button type="primary" @click="addOne()">归还登记</el-button>
        <el-button type="primary" @click="save()">完成确认</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回上一级</el-button>
      </el-col>
    </el-row>
    <el-table border :data="tableData" style="width:800px">
      <!-- <el-table-column type="index" header-align="center" align="center" label="序号" width="50"></el-table-column> -->
      <el-table-column prop="name" header-align="center" label="录用人" align="center" width="80px"></el-table-column>
      <el-table-column
        prop="isBorrowText"
        header-align="center"
        label="性别"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        prop="isBorrow"
        header-align="center"
        label="实际入职时间"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="totalBorrowMoney"
        header-align="center"
        label="入职借款总额（万元）"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="periods"
        header-align="center"
        label="还款期数（期数）"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="perRepay"
        header-align="center"
        label="每期还款金额（万元）"
        align="center"
        min-width="100"
      ></el-table-column>
    </el-table>
    <div>
      <el-table border :data="tableData1" style="width:800px">
        <el-table-column header-align="center" align="center" label="归还借款明细记录">
          <el-table-column
            prop="periods"
            header-align="center"
            align="center"
            label="期数"
            width="60"
          ></el-table-column>
          <el-table-column
            prop="shouldRepayDay"
            header-align="center"
            label="应还款时间"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="actualRepayDay"
            header-align="center"
            label="实际还款时间"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-date-picker value-format="yyyy-MM-dd" v-model="scope.row.actualRepayDay"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="repayAmount"
            header-align="center"
            label="还款金额（万元）"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.repayAmount"
                :min="0"
                :max="maxNum"
                :step="perPay"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="agent"
            header-align="center"
            label="经办人"
            align="center"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="proofText"
            header-align="center"
            label="还款凭证存档"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.proofText"></span> -->
              <!-- <span
                :id="scope.row.fdId+'b'"
                style="cursor:pointer;color:#409EFF;text-decoration:underline;display:"
                v-html="scope.row.proofText"
              ></span>-->
              <div v-if="scope.row.proof == 0" :id="scope.row.fdId" @click="aaa(scope.row)">
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
                    v-html="scope.row.proofText"
                  ></span>
                </el-upload>
                <!-- <span
                  :id="scope.row.fdId+'d'"
                  style="cursor:pointer;color:#409EFF;text-decoration:underline;display:none"
                >已存档</span>-->
              </div>
              <div :id="scope.row.fdId+'a'" v-if="scope.row.proof == 1">
                <a
                  target="_blank"
                  :href="scope.row.src"
                  style="cursor:pointer;color:#409EFF;text-decoration:underline"
                >已存档</a>
                <!-- <a :href="scope.row.src" @click="aaa(scope.row)">
                  <span
                    style="cursor:pointer;color:#409EFF;text-decoration:underline"
                    v-html="scope.row.proofText"
                  ></span>
                </a>-->
                <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut(scope.row)" v-html="scope.row.proofText" ></span> -->
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-row
        style="height:23px;border-bottom: 1px solid #ccc;border-left: 1px solid #ccc;border-right: 1px solid #ccc;text-align: center;margin-top:-1px;width:800px"
      >
        <el-col style="height:23px;width:60px;border-right: 1px solid #ccc;">&#12288;</el-col>
        <el-col style="height:23px;border-right: 1px solid #ccc;text-align: center;width:100px">小计</el-col>
        <el-col style="height:23px;width:162px;border-right: 1px solid #ccc;">&#12288;</el-col>
        <el-col style="height:23px;border-right: 1px solid #ccc;text-align: center;width:159px">
          <div style="margin-top:2px">{{totalRepayAmount}}</div>
        </el-col>
        <!-- <el-col :span="4"></el-col> -->
        <el-col
          style="height:23px;border-right: 1px solid #ccc;text-align: center;width:159px"
        >&#12288;</el-col>
        <!-- <el-col style="height:35px;border: 1px solid #ccc;text-align: center;"></el-col> -->
      </el-row>
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
      tableData2: [],
      tableData3: [],
      actualEntryDay: "",
      sex: "",
      data: [],
      personalId: "",
      totalRepayAmount: 0,
      perPay: 1,
      filePath: '',
      repayStatusText: '',
      dialogProof: false,
      proofSrc: '',
      totalBorrowMoney: '',
      maxNum: 100,
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      this.personalId = this.$route.query.fdId;
      this.findOne();
      this.findRepaidDetailByPersonalId();
      this.findFilePath();
      // console.log(this.personalId);
    },
    renderheader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('</br>')[0]),
        h('br'),
        h('span', {}, column.label.split('</br>')[1])
      ])
    },
    findByPersonalIdBorrow() {
      var params = this.$route.query.fdId;
      Hire_API.findByPersonalIdBorrow(params).then(res => {
        this.tableData.push(res.data)
        // this.actualEntryDay=this.data.actualEntryDay;
        // this.sex=this.data.sex;
        this.tableData[0].isBorrow = this.data.actualEntryDay;
        this.tableData[0].isBorrowText = this.data.sex;
        this.perPay = this.tableData[0].perRepay;
        this.maxNum = this.tableData[0].totalBorrowMoney;
        // for(var i=0;i<this.tableData2.length;i++){
        //   var item=this.tableData2[i];
        //   var item=this.tableData2[i];
        //   this.maxNum=this.maxNum-item.repayAmount;
        //   console.log(this.maxNum)
        // }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });

    },
    proofOut(item) {
      this.proofSrc = "";
      this.proofSrc = item.src;
      this.dialogProof = true;
    },
    findOne() {
      var params = this.$route.query.fdId;
      Hire_API.findOne(params).then(res => {
        this.data = res.data || [];
        this.findByPersonalIdBorrow();

      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    findRepaidDetailByPersonalId() {
      var params = this.$route.query.fdId;
      Hire_API.findRepaidDetailByPersonalId(params).then(res => {
        this.tableData1 = [];
        this.tableData2 = res.data || [];
        if (this.tableData2[0].repayAmount == 0) {
          this.repayStatusText = '未还款'
        } else { this.repayStatusText = '还款中' }
        if (this.tableData2.length > 0) {
          this.totalRepayAmount = 0;
          // this.addrepay();
          for (var i = 0; i < this.tableData2.length; i++) {

            var item = this.tableData2[i];

            this.totalRepayAmount = parseFloat(this.totalRepayAmount + item.repayAmount)
            if (item.proof == "0") {
              item.proofText = "上传";
              // this.tableData1.splice(item,1);
              this.tableData1.push(item)
            } else {
              item.proofText = "已存档";
              item.src = item.createrId;
              this.tableData1.push(item);
              console.log(item)
            }
          }
        }
        // console.log(this.tableData1)
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    addrepay() {
      // this.totalRepayAmount = 0;
      // this.tableData1 = this.tableData1;
      // for (var i = 0; i < this.tableData1.length; i++) {
      //   this.totalRepayAmount = parseFloat(this.totalRepayAmount + this.tableData1[i].repayAmount);
      //   var item = this.tableData1[i];
      //   // console.log(item)
      //   if (item.proof == 1) {
      //     document.getElementById(item.fdId).style.display = "none";
      //     document.getElementById(item.fdId + 'a').style.display = "";
      //     document.getElementById(item.fdId + 'b').style.display = "none";
      //     // document.getElementById(item.fdId+'d').style.display="none";
      //   } else {
      //     document.getElementById(item.fdId).style.display = "";
      //     document.getElementById(item.fdId + 'a').style.display = "none";
      //     document.getElementById(item.fdId + 'b').style.display = "none";
      //     // document.getElementById(item.fdId+'d').style.display="none";
      //   }
      // }
    },
    addOne() {
      var params = this.$route.query.fdId;
      Hire_API.addOneRepayDetail(params).then(res => {
        // this.$message({type: 'success', message: 'success'});
        Hire_API.findRepaidDetailByPersonalId2(params).then(res => {
          this.tableData1 = [];
          this.tableData2 = res.data || [];
          if (this.tableData2.length > 0) {
            this.totalRepayAmount = 0;
            for (var i = 0; i < this.tableData2.length; i++) {
              var item = this.tableData2[i];
              this.totalRepayAmount = parseFloat(this.totalRepayAmount + item.repayAmount)
              if (item.proof == "0") {
                item.proofText = "上传";
                // this.tableData1.splice(item,1);
                this.tableData1.push(item)
              } else {
                item.proofText = "已存档";
                item.src = item.createrId;
                this.tableData1.push(item)
              }
            }
          }
        }).catch(err => {
          this.$message({ type: 'error', message: '请求异常：' + err.msg })
        });
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },

    save() {
      var params = this.tableData1;
      Hire_API.saveConfirmRepayDetail(params).then(res => {
        this.findRepaidDetailByPersonalId();
        this.$message({ type: 'success', message: '归还登记成功！' });
        // this.findRepaidDetailByPersonalId();
        // this.$router.go(0);
      }).catch(err => {
        this.$message({ type: 'error', message: err.msg })
      });
    },
    aaa(val) {
      this.personalId = val.personalId;
      this.fileId = val.fdId;
      // document.getElementById(val.fdId+'d').style.display="";
      // document.getElementById(val.fdId+'c').style.display="none";
    },
    findFilePath() {
      Hire_API.findFilePath().then(res => {
        this.filePath = res.data.code;
        // console.log(this.filePath)
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
      var proofType = "AS05";
      Hire_API.uploadFile(form, this.personalId, this.fileId, proofType).then(res => {
        var params = this.personalId;
        if (this.tableData1[this.tableData1.length - 1].actualRepayDay == null) {
          this.$message({ type: 'warming', message: '请先填写还款日期' })
        } else {
          this.save();
        }

        // this.$router.go(0);
        // document.getElementById(this.fileId + 'd').style.display = "";
        // document.getElementById(this.fileId + 'c').style.display = "none";
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
        console.log(err.errorCode);
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

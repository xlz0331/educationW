<template>
  <div>
    <el-row>
      <el-col>
        <b>入职薪酬录入界面</b>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="text-left">
        <span>录入人：</span>
        <span style="text-decoration:underline;color:#409EFF">{{login_user.name || ''}}</span>
      </el-col>
      <el-col :span="8" class="text-left">
        <span>匹配情况：</span>
        <span style="text-decoration:underline;color:red">{{matchingStatus|| ''}}</span>
      </el-col>
      <el-col :span="12" class="text-right">
        <!-- <el-button type="primary">说明</el-button> -->
        <el-button type="primary" @click="save()">完成提交</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回上一级</el-button>
      </el-col>
    </el-row>
    <div @click="totalYearSalaryAdd()">
      <el-table border :data="tableData">
        <el-table-column type="index" header-align="center" align="center" label="序号" width="20"></el-table-column>
        <el-table-column prop="name" header-align="center" label="录用人" align="center" width="65"></el-table-column>
        <el-table-column header-align="center" label="年薪（万元）" align="center">
          <el-table-column header-align="center" label="合计" align="center" min-width="60">
            <template slot-scope="scope">
              <el-input v-model="scope.row.totalYearSalary" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            label="年薪资</br>奖励"
            align="center"
            min-width="60"
            :render-header="renderheader"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.yearSalaryAward" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            label="年绩效</br>考核"
            align="center"
            min-width="60"
            :render-header="renderheader"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.yearPerformanceAppraisal" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="yearSalary"
            header-align="center"
            label="12个月</br>月薪"
            align="center"
            min-width="60"
            :render-header="renderheader"
          >
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.yearSalary" style="display:"></el-input>
            </template>-->
          </el-table-column>
        </el-table-column>
        <el-table-column header-align="center" label="月薪酬项目结构（元）" align="center" min-width="60">
          <el-table-column
            prop="monthSalary"
            header-align="center"
            label="月工资"
            align="center"
            min-width="60"
          >
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.monthSalary" style="display:"></el-input>
            </template>-->
          </el-table-column>
          <el-table-column header-align="center" label="年休假" align="center" min-width="60">
            <template slot-scope="scope">
              <el-input v-model="scope.row.annualHoliday" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="满勤奖" align="center" min-width="60">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fullFrequentlyAward" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            label="交通餐饮</br>补助"
            align="center"
            min-width="60"
            :render-header="renderheader"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.trafficaAllowance" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalMoneySalary"
            header-align="center"
            label="小计"
            align="center"
            min-width="60"
          >
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.totalMoneySalary" style="display:"></el-input>
            </template>-->
          </el-table-column>
          <el-table-column
            prop="yearSalary"
            header-align="center"
            label="12个月月</br>薪(万元)"
            align="center"
            min-width="60"
            :render-header="renderheader"
          >
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.yearSalary" style="display:"></el-input>
            </template>-->
          </el-table-column>
        </el-table-column>
        <el-table-column header-align="center" label="月薪酬减项（元）" align="center" min-width="60">
          <el-table-column header-align="center" label="绩效工资" align="center" min-width="60">
            <template slot-scope="scope">
              <el-input v-model="scope.row.meritPay" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="工资借款" align="center" min-width="60">
            <template slot-scope="scope">
              <el-input v-model="scope.row.salaryBorrow" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="契约津贴" align="center" min-width="60">
            <template slot-scope="scope">
              <el-input v-model="scope.row.contractAllowance" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="福利借款" align="center" min-width="60">
            <template slot-scope="scope">
              <el-input v-model="scope.row.awardBorrow" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="报账工资" align="center" min-width="60">
            <template slot-scope="scope">
              <el-input v-model="scope.row.accountSalary" style="display:"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalSubtract"
            header-align="center"
            label="小计"
            align="center"
            min-width="60"
          >
            <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.totalSubtract" style="display:"></el-input>
            </template>-->
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="actualMonthSalary"
          header-align="center"
          label="月应发</br>工资"
          align="center"
          min-width="60"
          :render-header="renderheader"
        >
          <!-- <template slot-scope="scope">
          <el-input v-model="scope.row.actualMonthSalary" style="display:"></el-input>
          </template>-->
        </el-table-column>
      </el-table>
    </div>
    <el-row style="height:35px;border: 1px solid #ccc;margin-top:-1px;background:#f5f7fa">
      <el-col
        :span="2"
        style="height:35px;border: 1px solid #ccc;margin-top:-1px;text-align: center;background:#f5f7fa"
      >
        <div style="margin-top:5px;text-align: center;">
          <span>录入依据</span>
        </div>
      </el-col>
      <el-col :span="4" style="height:35px;border: 1px solid #ccc;margin:-1px;text-align: center;">
        <div style="margin:3px;text-align: center;">
          <el-select v-model="inputProof" @change="inputP()">
            <el-option value="OA绝密请示">OA绝密请示</el-option>
            <el-option value="工资网请示">工资网请示</el-option>
            <el-option value="纸质版请示">纸质版请示</el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="18" class="text-left" style="height:35px;margin:0px;text-align: left;">
        <div style="margin:0px;display:none" id="inputPr">
          <!-- <el-button type="success" round="">薪酬请示扫描上传</el-button> -->
          <el-upload
            style="display:inline-block"
            class="upload-demo"
            ref="upload"
            action="/hire/hireProofFiles/upload"
            :show-file-list="false"
            :http-request="uploadSectionFile"
            :auto-upload="true"
          >
            <el-button slot="trigger" size="small" type="primary" plain>附件上传</el-button>
            <!-- <span v-for="file in fileList" :key="file.fdId"> -->
            <a style="height: 20px; position: relative;">
              <!-- <a :href="file.src"> -->
              <!-- <el-tooltip effect="light" :content='"查看【"+file.name1+"】"' placement="top-start"> -->
              <!-- <el-button @click="proofOut(file.src)" type="text" style=" color:blue;">{{file.name1}}&#8194;</el-button> -->
              <span
                style="cursor:pointer;color:#409EFF;"
                @click="proofOut()"
                v-html="inputProofText"
              ></span>
              <!-- </el-tooltip> -->
              <!-- </a> -->
              <!-- <el-tooltip  effect="dark" :content='"删除【"+file.name1+"】"' placement="top-start">
                <el-button  type="text" @click="deleteProofById(file)" style="margin-left:-25px;color:#000;">×</el-button>
              </el-tooltip>-->
            </a>
            <!-- </span> -->
          </el-upload>
        </div>
      </el-col>
      <!-- <el-col :span="15" style="height:35px;border: 1px solid #ccc;margin:-1px;text-align: left;">
        <div style="margin-top:7px;color:blue;">
          <span style="">{{fileList}}</span>
        </div>
      </el-col>-->
    </el-row>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogProof" width="900px" v-dialogDrag>
      <el-table :data="pathList" border>
        <el-table-column type="index" header-align="center" label="序号"></el-table-column>
        <el-table-column header-align="center" label="附件">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.src">
              <span v-html="scope.row.name" style="cursor:pointer;color:#409EFF;"></span>
            </a>
            <!-- <a :href="scope.row.src">
              <span v-html="scope.row.name" style="cursor:pointer;color:#409EFF;margin-left:5px"></span>
            </a>-->
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="50px">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="deleteProofById(scope.row.fdId)"
              style="color:#409EFF;"
            >删除</el-button>
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
      personalId: "",
      idBorrowM: [{
        value: '否',
        label: '否'
      }, {
        value: '是',
        label: '是'
      }],
      matchingStatus: "",
      inputProof: '',
      acceptType: '',
      fileList: [],
      filePath: '',
      companyIdA: '',
      dialogProof: false,
      proofSrc: '',
      pathList: [],
      inputProofText: '',
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      var str = this.$route.path;
      // this.companyIdA = str.split('=')[1];
      var index = str.lastIndexOf("\/");
      this.companyIdA = str.substring(index + 1, str.length);
      this.personalId = this.$route.query.fdId;
      this.findNowHistorySalary();
      this.findFilePath();

      // this.findHireProofByFileId1();
      // console.log(this.personalId);
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
    proofOut(item) {
      this.proofSrc = '';
      this.proofSrc = item;
      this.dialogProof = true;
    },
    salaryConfirmed() {
      var str = this.$route.path;
      // this.companyIdA = str.split('=')[1];
      var index = str.lastIndexOf("\/");
      this.companyIdA = str.substring(index + 1, str.length);
      var params = this.companyIdA;
      Hire_API.salaryConfirmed(params).then(res => {
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    findPath1() {
      var str = this.$route.path;
      // this.companyIdA = str.split('=')[1];
      var index = str.lastIndexOf("\/");
      this.companyIdA = str.substring(index + 1, str.length);
      var params = { companyId: this.$route.query.companyId, fdId: this.$route.query.fdId }
      Hire_API.findPath1(params).then(res => {
        this.pathList = res.data || [];
        // console.log(this.pathList)
        if (this.pathList.length > 0) {
          this.inputProof = "纸质版请示";
          this.inputProofText = "已存档";
          document.getElementById('inputPr').style.display = "";
          this.pathList.forEach(item => {
            item.src = item.filepath;
            var str1 = item.name;
            item.name1 = str1.split('.')[0];
            //  console.log(item)
          });
          // console.log("123",this.pathList)
        } else {
          this.inputProofText = "";
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    findNowHistorySalary() {
      var params = this.$route.query.fdId;
      Hire_API.findNowHistorySalary(params).then(res => {
        this.tableData = res.data;
        console.log(this.tableData);
        if (this.tableData.length > 0) {
          var aa = this.tableData[0].fdId;
          this.inputProof = this.tableData[0].salaryInputProof;
          if (this.tableData[0].salaryInputProof == null || this.tableData[0].salaryInputProof == "纸质版请示") {
            this.findPath1();
          } else {
            this.inputProof = this.tableData[0].salaryInputProof;
          }

          // this.findHireProofByFileId(aa);
          //
        }

        // console.log(this.tableData)
        if (this.tableData[0].status == 0) {
          this.matchingStatus = "待匹配";
        } if (this.tableData[0].status == 1) {
          this.matchingStatus = "匹配成功";
        } if (this.tableData[0].status == -1) {
          this.matchingStatus = "待录入";
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    findFilePath() {
      Hire_API.findFilePath().then(res => {
        this.filePath = res.data.code;
        console.log(this.filePath)
      })
    },
    findHireProofByFileId(val) {
      Hire_API.findHireProofByFileId(val).then(res => {
        this.fileList = res.data || [];
        this.fileList.forEach(item => {
          item.src = item.filepath
          var str1 = item.name;
          item.name1 = str1.split('.')[0];
          //  console.log(item)
        });
        if (this.fileList.length > 0) {
          document.getElementById('inputPr').style.display = "";
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
      });
    },
    findHireProofByFileId1() {
      var val = this.tableData[0].fdId;

      Hire_API.findHireProofByFileId(val).then(res => {
        this.fileList = res.data || [];
        this.fileList.forEach(item => {
          item.src = item.filepath;
          var str1 = item.name;
          item.name1 = str1.split('.')[0];
          //  console.log(item)
        });
        if (this.fileList.length > 0) {
          document.getElementById('inputPr').style.display = "";
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    totalYearSalaryAdd() {
      // console.log(111)
      for (var i = 0; i < this.tableData.length; i++) {
        var item = this.tableData[i];
        if (item.totalYearSalary != null && item.yearSalaryAward != null && item.yearPerformanceAppraisal != null) {
          item.yearSalary = (Math.round((parseFloat(item.totalYearSalary * 10000) - parseFloat(item.yearSalaryAward * 10000) - parseFloat(item.yearPerformanceAppraisal * 10000))) / 10000).toFixed(4);
          item.totalMoneySalary = ((Math.round(item.yearSalary * 1000000 / 12)) / 100).toFixed(2);
          // var s = item.totalMoneySalary;
          // var aNew;
          // var re = /([0-9]+.[0-9]{2})[0-9]*/;
          // aNew = s.replace(re,"$1");
          // aNew = s.toFixed(2);
          // alert(aNew);
          // item.totalMoneySalary=aNew;
          // console.log(aNew)
        }
        if (item.totalMoneySalary != null && item.annualHoliday != null && item.fullFrequentlyAward != null && item.trafficaAllowance != null) {
          item.monthSalary = ((Math.round(parseFloat(item.totalMoneySalary * 100) - parseFloat(item.annualHoliday * 100) - parseFloat(item.fullFrequentlyAward * 100) - parseFloat(item.trafficaAllowance * 100))) / 100).toFixed(2);
        }
        if (item.meritPay != null && item.salaryBorrow != null && item.contractAllowance != null && item.awardBorrow != null && item.accountSalary != null) {
          item.totalSubtract = ((Math.round(parseFloat(item.meritPay * 100) + parseFloat(item.salaryBorrow * 100) + parseFloat(item.contractAllowance * 100) + parseFloat(item.awardBorrow * 100) + parseFloat(item.accountSalary * 100))) / 100).toFixed(2);
          if (item.totalMoneySalary != null) {
            item.actualMonthSalary = ((Math.round(parseFloat(item.totalMoneySalary * 100) - parseFloat(item.totalSubtract * 100))) / 100).toFixed(2);
          }
        }
      }
    },
    save() {
      var params = this.tableData;
      for (var i = 0; i < this.tableData.length; i++) {
        params = this.tableData[i];
        params.salaryInputProof = this.inputProof;
        Hire_API.inputOneSalary(params).then(res => {
          this.findNowHistorySalary();
          // this.$message({type: 'success', message: '录入成功'});
          this.salaryConfirmed();
          if (res.data.status === 2) {
            this.$message({ type: 'success', message: '双人录入成功！' });
          } else {
            Hire_API.findOtherDataSalary(params.personalId).then(res => {
              if (res.data.length > 0) {
                this.$message({ type: 'info', message: '第二人录入成功！与【' + res.data[0].createrId + '】录入数据不一致。匹配失败' });
              } else {
                this.$message({ type: 'info', message: '第一人录入成功！未有数据匹配' });
              }
            })
          }
        }).catch(err => {
          this.$message({ type: 'error', message: '异常：' + err.msg })
          console.log(err.errorCode);
        });
      }
    },
    deleteProofById(item) {
      var params = item;
      // console.log(params)
      Hire_API.deleteProofById(params).then(res => {
        // this.findNowHistorySalary();
        this.findPath1();
        this.$message({ type: 'success', message: '删除成功' });
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
      });
    },
    inputP() {
      if (this.inputProof == "纸质版请示") {
        document.getElementById('inputPr').style.display = "";
        this.findPath1();
      } else {
        document.getElementById('inputPr').style.display = "none";
      }
    },

    submitUpload() {
      let list = document.getElementsByClassName('el-upload-list__item is-ready')
      //  this.fileList=list[0].innerText;
      console.log(list)
      if (list.length == 0) {
        this.$message({
          type: 'warning',
          message: "请选择需要上传的凭证！"
        })
        return;
      }
      this.$refs.upload.submit();
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
      var fileId = this.tableData[0].fdId;
      var proofType = "AS01";
      Hire_API.uploadFile(form, this.personalId, fileId, proofType).then(res => {
        this.findHireProofByFileId1();
        this.findPath1();
        //  this.dialogProof=true;
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
</style>

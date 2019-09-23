<template>
  <div>
    <el-row>
      <el-col>
        <b>{{companyName}}</b>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="text-left">
        <span>录入人：</span>
        <span style="text-decoration:underline;color:#409EFF">{{login_user.name || ''}}</span>
      </el-col>
      <el-col :span="8">&#12288;</el-col>
      <el-col :span="12" class="text-right">
        <el-button type="primary" @click="dialogRemarks=true">说明</el-button>
        <!-- <el-button type="primary" @click="salaryConfirmed()">完成提交</el-button> -->
      </el-col>
    </el-row>
    <el-table :data="tableData" border>
      <el-table-column type="index" header-align="center" align="center" label="序号" width="30"></el-table-column>

      <el-table-column prop="name" header-align="center" label="录用人" align="center" width="65"></el-table-column>
      <el-table-column prop="sex" header-align="center" label="性别" align="center" width="50"></el-table-column>
      <el-table-column prop="nid" header-align="center" label="身份证号码" align="center" width="155"></el-table-column>
      <el-table-column prop="company" header-align="center" label="录用公司" align="center" width="90"></el-table-column>
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
      <el-table-column prop header-align="center" label="录入" :render-header="renderheader">
        <el-table-column prop header-align="center" label="入职借款" align="center" width="80">
          <template slot-scope="scope">
            <span
              style="cursor:pointer;color:#409EFF;text-decoration:underline"
              v-html="scope.row.entryBorrowStatusText"
              @click="goBorrowInput(scope.row)"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="entrySalaryStatusText"
          header-align="center"
          label="入职薪酬"
          align="center"
          width="80"
        >
          <template slot-scope="scope">
            <span
              style="cursor:pointer;color:#409EFF;text-decoration:underline"
              v-html="scope.row.entrySalaryStatusText"
              @click="goSalaryInput(scope.row)"
            ></span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <div>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogRemarks" width="660px" v-dialogDrag title="说明" center>
        <div>
          <el-row>
            <el-col class="text-left" style="margin-top:-15px">1、本表作用：</el-col>
          </el-row>
          <el-row>
            <el-col class="text-left" style="margin-top:5px">（1）用于对所有预注册成功的社招管理人员进行入职借款和入职薪酬的确认。</el-col>
          </el-row>
          <el-row>
            <el-col
              class="text-left"
              style="margin-top:5px"
            >（2）只有在本表双人录入确认完成预注册管理人员的薪酬后，才允许给录用人员发放录用通知书。</el-col>
          </el-row>
          <el-row>
            <el-col class="text-left" style="margin-top:10px">2、数据来源：自动读取预注册模块所有已审批的预注册管理人员信息。</el-col>
          </el-row>
          <el-row>
            <el-col class="text-left" style="margin-top:10px">3、入职借款和入职薪酬：</el-col>
          </el-row>
          <el-row>
            <el-col class="text-left" style="margin-top:5px">（1）有薪酬管理人员双人录入。</el-col>
          </el-row>
          <el-row>
            <el-col class="text-left">（2）录入及查看权限：根据职等的高低控制查看及录入权限。</el-col>
          </el-row>
          <el-row>
            <el-col class="text-left" style="margin-top:10px">①集团总部、华劲人纸品、上海销售：章坤和麦凤彩。</el-col>
          </el-row>
          <el-row>
            <el-col class="text-left" style="margin-top:5px">②赣州纸业、赣州纸品：值班长及以下王淑云、曾小琴，副经理及以上章坤、麦凤彩。</el-col>
          </el-row>
          <el-row>
            <el-col class="text-left" style="margin-top:5px">③广西竹林：场长、主任以下刘巧玲、刘志兰，副经理及以上章坤、麦凤彩。</el-col>
          </el-row>
          <el-row>
            <el-col class="text-left" style="margin-top:5px">④赣州竹林：场长、主任以下吴锦秀、麦凤彩，副经理及以上章坤、麦凤彩。</el-col>
          </el-row>
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
      companyIdA: '',
      dialogRemarks: false,
      companyName: '',
      url: ''
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      var str = this.$route.path;
      // var index = str .lastIndexOf("\/");
      // this.companyIdA  = str .substring(index + 1, str .length);
      // alert(str );
      // this.companyIdA = str.split('=')[1];
      // console.log(this.companyIdA);
      this.getCompanyList();
      this.findAllBefore();

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
              this.companyName = comList[i].companyName + "社招预注册管理人员【入职薪酬确认】表";
            }
          }
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    findAllBefore() {
      var params = this.companyIdA;
      Hire_API.findAllBefore(params).then(res => {
        this.tableData = res.data;
        console.log(this.tableData)
        if (this.tableData.length > 0) {
          for (var i = 0; i < this.tableData.length; i++) {
            var ite = this.tableData[i];
            if (ite.entryBorrowStatus == 0) {
              ite.entryBorrowStatusText = "待匹配";
            }
            if (ite.entryBorrowStatus == -1) {
              ite.entryBorrowStatusText = "待录入";
            }
            if (ite.entryBorrowStatus == 1) {
              ite.entryBorrowStatusText = "录入成功";
            }
            if (ite.entrySalaryStatus == 0) {
              ite.entrySalaryStatusText = "待匹配";
            }
            if (ite.entrySalaryStatus == -1) {
              ite.entrySalaryStatusText = "待录入";
            }
            if (ite.entrySalaryStatus == 1) {
              ite.entrySalaryStatusText = "录入成功";
            }
          }
        }
        // console.log(this.tableData)
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    salaryConfirmed() {
      var params = this.companyIdA;
      Hire_API.salaryConfirmed(params).then(res => {
        this.findAllBefore();
        console.log('ss' + res.data);
        if (res.data != null) {
          this.$message({ type: 'success', message: '薪酬确认状态成功提交PS' })
        } else {
          this.$message({ type: 'wraming', message: '不存在需要提交的数据！' })
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    goBorrowInput(val) {
      var item = val;
      console.log(val)
      this.$router.push({
        path: '/hire/hire/hire_entry_borrow_money/' + this.companyIdA,
        query: { fdId: item.fdId }
      })
    },
    goSalaryInput(val) {
      var item = val;
      this.$router.push({
        path: '/hire/hire/hire_entry_salary/' + this.companyIdA,
        query: { fdId: item.fdId, companyId: item.companyId }
      })
    }
  },
  watch: {
    "$route": function () {
      this.initPage();
    }
  },
  created() {
  },
  mounted() {
    // this.url=process.env.BASE_API;
    // var str= this.$route.path;
    // var index = str .lastIndexOf("\/");
    // this.companyIdA  = str .substring(index + 1, str .length);


    var routerParams = this.$store.state.salary.routerCommParams;
    this.title = routerParams.keyVal1.title;//(routerParams.keyVal1.title /name/values 对应router的meta值)
    this.companyIdA = routerParams.keyVal1.values;
    this.companyName = routerParams.keyVal1.title;

    // this.companyIdA = str.split('=')[1];
    this.initPage();
    console.log(this.companyIdA)
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

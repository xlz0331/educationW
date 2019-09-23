<template>
  <div>
    <el-row style="width:800px">
      <el-col :span="6" class="text-right">&#12288;</el-col>
      <el-col :span="12">
        <b>【已入职人员归还借款明细】表</b>
      </el-col>
      <el-col :span="6" class="text-right">
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
    <div @click="addrepay()">
      <el-table border :data="tableData1" style="width:800px">
        <el-table-column header-align="center" align="center" label="归还借款明细记录">
          <el-table-column
            prop="periods"
            header-align="center"
            align="center"
            label="期数"
            width="60px"
          ></el-table-column>
          <el-table-column
            prop="shouldRepayDay"
            header-align="center"
            label="应还款时间"
            align="center"
            width="100px"
          ></el-table-column>
          <el-table-column
            prop="actualRepayDay"
            header-align="center"
            label="实际还款时间"
            align="center"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="repayAmount"
            header-align="center"
            label="还款金额（万元）"
            align="center"
            min-width="100"
          ></el-table-column>
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
              <a
                target="_blank"
                :href="scope.row.src"
                style="cursor:pointer;color:#409EFF;text-decoration:underline"
              >已存档</a>
              <!-- <a :href="scope.row.src">
                <span
                  style="cursor:pointer;color:#409EFF;text-decoration:underline"
                  v-html="scope.row.proofText"
                ></span>
              </a>-->
              <!-- <span style="cursor:pointer;color:#409EFF;text-decoration:underline" @click="proofOut(scope.row)" v-html="scope.row.proofText" ></span> -->
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-row
        style="height:23px;border-bottom: 1px solid #ccc;border-left: 1px solid #ccc;border-right: 1px solid #ccc;text-align: center;width:800px"
      >
        <el-col style="height:23px;width:60px;border-right: 1px solid #ccc;">&#12288;</el-col>
        <el-col style="width:100px;height:23px;border-right: 1px solid #ccc;text-align: center;">小计</el-col>
        <el-col style="width:161px">&#12288;</el-col>
        <el-col
          style="height:23px;border-left: 1px solid #ccc;border-right: 1px solid #ccc;text-align: center;width:160px"
        >
          <div>{{totalRepayAmount}}</div>
        </el-col>
        <el-col style="width:159px;border-right: 1px solid #ccc;height:23px;">&#12288;</el-col>
        <el-col style="height:23px;text-align: center;width:160px">&#12288;</el-col>
        <!-- <el-col :span="16" style="height:35px;border: 1px solid #ccc;text-align: center;"></el-col> -->
      </el-row>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogProof" width="900px" v-dialogDrag title="存档">
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
      personalId: "",
      totalRepayAmount: 0,
      perPay: 1,
      data: [],
      dialogProof: false,
      proofSrc: '',
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      this.personalId = this.$route.query.fdId;
      // this.findByPersonalIdBorrow();
      this.findOne();
      this.findRepaidDetailByPersonalId();
      // console.log(this.personalId);
    },
    renderheader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('</br>')[0]),
        h('br'),
        h('span', {}, column.label.split('</br>')[1])
      ])
    },
    proofOut(item) {
      this.proofSrc = "";
      this.proofSrc = item.src;
      this.dialogProof = true;
    },
    findByPersonalIdBorrow() {
      var params = this.$route.query.fdId;
      Hire_API.findByPersonalIdBorrow(params).then(res => {
        this.tableData.push(res.data)
        // console.log(this.tableData)
        this.tableData[0].isBorrow = this.data.actualEntryDay;
        this.tableData[0].isBorrowText = this.data.sex;
        this.perPay = this.tableData[0].perRepay;
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });

    },
    findOne() {
      var params = this.$route.query.fdId;
      Hire_API.findOne(params).then(res => {
        this.data = res.data || [];
        this.findByPersonalIdBorrow();
      })
    },
    findRepaidDetailByPersonalId() {
      var params = this.$route.query.fdId;
      Hire_API.findRepaidDetailByPersonalId(params).then(res => {
        this.tableData2 = res.data || [];
        if (this.tableData2.length > 0) {
          this.totalRepayAmount = 0;
          for (var i = 0; i < this.tableData2.length; i++) {
            var item = this.tableData2[i];
            this.totalRepayAmount = parseFloat(this.totalRepayAmount + item.repayAmount)
            if (item.proof == "0") {
              item.proofText = "上传";
              this.tableData1.push(item);
            } else {
              item.proofText = "已存档";
              item.src = item.createrId;
              this.tableData1.push(item);
            }
          }
        }
        // console.log(this.tableData1)
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    addrepay() {
      this.totalRepayAmount = 0;
      for (var i = 0; i < this.tableData1.length; i++) {
        this.totalRepayAmount = parseFloat(this.totalRepayAmount + this.tableData1[i].repayAmount)
      }
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

<template>
  <div>
    <el-row style="width:800px">
      <el-col>
        <b>入职借款录入界面</b>
      </el-col>
    </el-row>
    <el-row style="width:800px">
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
    <div @click="perRepay()">
      <el-table border :data="tableData" style="width:800px">
        <el-table-column type="index" header-align="center" align="center" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" header-align="center" label="录用人" align="center" width="100"></el-table-column>
        <el-table-column header-align="center" label="是否有入职借款" align="center" min-width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.isBorrowText" @change="isborrow(scope.row)">
              <el-option
                v-for="item in idBorrowM"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalBorrowMoney"
          header-align="center"
          label="入职借款总额（万元）"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.totalBorrowMoney" style="display:" id="total"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="periods"
          header-align="center"
          label="还款期数（期数）"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.periods" style="display:" id="per"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="perRepay"
          header-align="center"
          label="每期还款金额（万元）"
          align="center"
          min-width="100"
        >
          <!-- <template slot-scope="scope">
            <el-input disabled="" v-model="scope.row.perRepay" style="display:" id="perr"></el-input>
          </template>-->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Hire_API from '@/api/hire/hire'
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
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      this.personalId = this.$route.query.fdId;
      this.findNowHistoryBorrow();
      this.first();
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
    findNowHistoryBorrow() {
      var params = this.$route.query.fdId;
      Hire_API.findNowHistoryBorrow(params).then(res => {
        this.tableData = res.data;
        if (this.tableData[0].status == 0) {
          this.matchingStatus = "待匹配";
        } if (this.tableData[0].status == 1) {
          this.matchingStatus = "匹配成功";
        } if (this.tableData[0].status == -1) {
          this.matchingStatus = "待录入";
        }
        // console.log(this.tableData)
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    first() {
      this.findNowHistoryBorrow();
      if (this.tableData.length > 0) {
        document.getElementById('total').style.display = "none";
        document.getElementById('per').style.display = "none";
        // document.getElementById('perr').style.display = "none";
      }
    },
    isborrow(val) {
      var item = val;
      if (item.isBorrowText == "是") {
        item.isBorrow = 1;
        document.getElementById('total').style.display = "";
        document.getElementById('per').style.display = "";
        // document.getElementById('perr').style.display = "";
      } else {
        item.isBorrow = 0;
        document.getElementById('total').style.display = "none";
        document.getElementById('per').style.display = "none";
        // document.getElementById('perr').style.display = "none";
        item.totalBorrowMoney = "";
        item.periods = "";
        item.perRepay = "";
      }
    },
    perRepay() {
      var params = this.tableData;
      for (var i = 0; i < this.tableData.length; i++) {
        params = this.tableData[i];
        if (params.isBorrow == 0) {
          params.periods = "";
          params.periods = "";
          params.perRepay = "";
          document.getElementById('total').style.display = "none";
          document.getElementById('per').style.display = "none";
        }
        if (params.isBorrow == 1) {
          if (params.periods != null && params.periods == 0) {
            params.perRepay = 0;
          }
          if (params.totalBorrowMoney != null && params.periods != null && params.periods > 0) {
            params.perRepay = params.totalBorrowMoney / params.periods;
          }
        }

      }
    },
    goBack() {
      var str = this.$route.path;
      // this.companyIdA = str.split('=')[1];
      var index = str.lastIndexOf("\/");
      this.companyIdA = str.substring(index + 1, str.length);
      this.$router.push({
        path: '/hire/hire/hire_entry_salary_comfire/' + this.companyIdA,
        // query:{fdId:item.fdId,companyId:item.companyId}
      })
    },
    save() {
      var params = this.tableData;
      if (params[0].isBorrow === 1) {
        if (params[0].totalBorrowMoney != null && params[0].periods != null && params[0].totalBorrowMoney > 0 && params[0].periods > 0) {
          for (var i = 0; i < this.tableData.length; i++) {
            params = this.tableData[i];
            Hire_API.inputOneBorrow(params).then(res => {
              this.findNowHistoryBorrow();
              // this.$message({ type: 'success', message: '录入成功！' });
              this.salaryConfirmed();
              if (res.data.status === 2) {
                this.$message({ type: 'success', message: '双人录入成功！' });
              } else {
                Hire_API.findOtherDataBorrow(params.personalId).then(res => {
                  if (res.data.length > 0) {
                    this.$message({ type: 'info', message: '第二人录入成功！与【' + res.data[0].createrId + '】录入数据不一致。匹配失败' });
                  } else {
                    this.$message({ type: 'info', message: '第一人录入成功！未有数据匹配' });
                  }
                })
              }
              // console.log(res.data)
            }).catch(err => {
              this.$message({ type: 'error', message: '请求异常：' + err.msg })
              console.log(err.errorCode);
            });
          }
        } else {
          this.$message({ type: 'info', message: '请核查[借款总额、还款期数]是否正确？' });
        }
      } else {
        for (var i = 0; i < this.tableData.length; i++) {
          params = this.tableData[i];
          Hire_API.inputOneBorrow(params).then(res => {
            this.findNowHistoryBorrow();
            // this.$message({ type: 'success', message: '录入成功！' });
            this.salaryConfirmed();
            if (res.data.status === 2) {
              this.$message({ type: 'success', message: '双人录入成功！' });
            } else {
              Hire_API.findOtherDataBorrow(params.personalId).then(res => {
                if (res.data.length > 0) {
                  this.$message({ type: 'info', message: '第二人录入成功！与【' + res.data[0].createrId + '】录入数据不一致。匹配失败' });
                } else {
                  this.$message({ type: 'info', message: '第一人录入成功！未有数据匹配' });
                }
              })
            }
            // console.log(res.data)
          }).catch(err => {
            this.$message({ type: 'error', message: '请求异常：' + err.msg })
            console.log(err.errorCode);
          });
        }
      }

    },
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
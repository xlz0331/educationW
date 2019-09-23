<template>
  <div>
    <el-row style="margin-bottom:15px;width:800px">
      <el-col :span="4" class="text-left">&#12288;</el-col>
      <el-col :span="16">
        <b>入职借款（副表）</b>
      </el-col>
      <el-col :span="4" class="text-right">
        &#12288;
        <!-- <el-button type="primary">说明</el-button> -->
        <!-- <el-button type="primary" @click="save()">完成提交</el-button> -->
        <el-button type="primary" @click="$router.go(-1)">返回上一级</el-button>
      </el-col>
    </el-row>
    <el-table border :data="tableData" style="width:800px">
      <el-table-column type="index" header-align="center" align="center" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" header-align="center" label="录用人" align="center" width="100"></el-table-column>
      <el-table-column
        prop="isBorrowText"
        header-align="center"
        label="是否有入职借款"
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
  </div>
</template>
<script>
import Hire_API from '@/api/hire/hire'
// import { mapGetters } from 'vuex'
export default {
  name: 'price-list',
  data() {
    return {
      loading: false,
      tableData: [],
      personalId: "",
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      this.personalId = this.$route.query.fdId;
      this.findByPersonalIdBorrow();
      // this.first();
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
    findByPersonalIdBorrow() {
      var params = this.$route.query.fdId;
      Hire_API.findByPersonalIdBorrow(params).then(res => {
        this.tableData.push(res.data);
        console.log(this.tableData)
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
  },
  created() {
  },
  mounted() {
    this.initPage();
  },

}
</script>
<style lang="scss" scoped>
</style>
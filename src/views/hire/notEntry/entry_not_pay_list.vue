<template>
  <div class="salary-pay-container">
    <el-row>
      <el-col :span="24">
        <div>
          <b>{{companyName}}【谈薪不成功】明细表</b>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      v-loading="loading"
      element-loading-text="加载中......"
      stripe
      border
      :span-method="arraySpanMethod"
      :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%"
    >
      <el-table-column type="index" align="center" label="序号" width="35"></el-table-column>
      <el-table-column prop="name" align="center" label="录入人" width="60"></el-table-column>
      <el-table-column prop="sex" align="center" label="性别" width="45"></el-table-column>
      <el-table-column prop="nid" header-align="center" label="身份证号" width="155"></el-table-column>
      <el-table-column prop="company" header-align="center" align="left" minWidth="录用公司" width="80"></el-table-column>
      <el-table-column prop="dept" header-align="center" align="left" label="录用部门" minWidth="150"></el-table-column>
      <el-table-column
        prop="position"
        header-align="center"
        align="left"
        label="录用岗位"
        minWidth="100"
      ></el-table-column>
      <el-table-column prop="jobGrade" header-align="center" align="left" label="录用职等" width="100"></el-table-column>
      <el-table-column
        prop="tryrangeText"
        header-align="center"
        align="left"
        label="试用期"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="planEntryDay"
        header-align="center"
        align="center"
        label="计划入职时间"
        width="100"
      ></el-table-column>
      <el-table-column header-align="center" align="left" label="谈薪不成功确认">
        <el-table-column prop="lastAlterId" align="center" label="确认人" width="60"></el-table-column>
        <el-table-column prop="lastAlterTime" align="center" label="确认时间" width="140"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
._container {
  max-width: 1320px;
}
</style>
<script>
import Hire_API from '@/api/hire/hire'

export default {
  name: "list",
  data() {
    return {
      loading: false,
      dialogVisible: false,
      tableHeight: null,
      title: '',
      companyId: '',
      companyName: '',
      tableData: [
        {
          subject: '1',
          title: '2',
          createrName: '3',
          createTime: '4',
          currentNodeName: '5',
        }
      ],
      userName: ''
    }
  },
  watch: {
    '$route': function () {
      this.getTableHeight();
    }
  },
  components: {},
  methods: {
    getTableHeight() {
      this.tableHeight = window.innerHeight - 140;
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
        return [1, 22];
      }
    },
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (row.rowType == 1) {
        return 'warning-row';
      }
    },
    findList(params) {
      Hire_API.findAllTalkSalaryFail(params).then(res => {
        this.tableData = res.data || [];
      }).catch(err => {
        this.$message({ type: 'error', message: '数据列表请求异常：' + err.msg })
      });
    },

    initPage() {
      let params = { companyId: this.companyId }
      this.findList(params);
    }
  },
  created() {

  },
  mounted() {
    var routerParams = this.$store.state.salary.routerCommParams;
    this.companyName = routerParams.keyVal1.title;
    this.companyId = routerParams.keyVal1.values;
    this.initPage();
    this.getTableHeight();
  },
  beforeMount() {
    window.addEventListener('resize', this.getTableHeight);
  }
}
</script>





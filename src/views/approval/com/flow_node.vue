<template>
  <div>
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中..."
      stripe border :max-height="tableHeight"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="45">
      </el-table-column>
      <el-table-column prop="nodeName" align="center" label="步骤" width="100"></el-table-column>
      <el-table-column prop="userName" align="center" label="办理人" width="100"></el-table-column>
      <el-table-column prop="disposeOpinion" header-align="center" align="left" label="办理意见"
                       :render-header="renderheader"
                       minWidth="150">
      </el-table-column>
      <el-table-column prop="disposeDate" header-align="center" align="center" label="办理时间" :render-header="renderheader"
                       width="150">
      </el-table-column>
      <el-table-column prop="diffDays" align="center" label="停留时间" width="100"></el-table-column>


      <!--<el-table-column prop="disposeDate" header-align="center" align="center" label="开始日期" :render-header="renderheader"-->
                       <!--width="140">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="disposeStatusText" header-align="center" align="center" label="状态" :render-header="renderheader"-->
                       <!--width="100">-->
      <!--</el-table-column>-->

    </el-table>


  </div>
</template>

<script>
  import WaittingApproval_API from '@/api/approval/waittingApproval'

  export default {
    name: "flow_node",
    props: {
      instanceId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        tableHeight: null,
        tableData: [],
        loading:false
      }
    },
    component() {

    },
    methods: {
      queryFlowNodeList(params) {
        WaittingApproval_API.queryFlowNodeList(params).then(res => {
          this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },
      renderheader(h, {column, $index}) {
        return h('span', {}, [
          h('span', {}, column.label.split('</br>')[0]),
          h('br'),
          h('span', {}, column.label.split('</br>')[1])
        ])
      },
    },
    mounted() {
      let params = {instanceId: this.instanceId};
      this.queryFlowNodeList(params);
    }
  }
</script>

<style scoped>

</style>

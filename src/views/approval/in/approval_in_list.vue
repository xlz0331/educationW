<template>
  <div class="salary-pay-container">
    <el-row>
      <el-col :span="24">
        <div><b>公文办理进度查询</b></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="text-left">
        <div style="color: red;font-size: 12px">提示：已审批办理结束的公文不显示，请在已审批公文查询界面查看。</div>
      </el-col>
    </el-row>

    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中....."
      stripe border  :max-height="tableHeight"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="40">
      </el-table-column>
      <el-table-column prop="subject" align="center" label="公文主题" width="110"
                       sortable
                       :filters="subjectList"
                       :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="code" header-align="center" align="left" label="公文编号" width="120"></el-table-column>
      <el-table-column prop="title" header-align="center" label="公文题目" minWidth="150"></el-table-column>
      <el-table-column prop="createrName" header-align="center" align="center" label="拟稿人" :render-header="renderheader"
                       width="60">
      </el-table-column>
      <el-table-column prop="createTime" header-align="center" align="center" label="发起时间"
                       :render-header="renderheader" width="130">
      </el-table-column>
      <el-table-column prop="currentNodeUser" header-align="center" align="left" label="当前处理人"
                       :render-header="renderheader"
                       width="130">
      </el-table-column>
      <el-table-column prop="currentNodeName" header-align="center" align="center" label="当前节点"
                       :render-header="renderheader"
                       width="90">
      </el-table-column>
      <el-table-column prop="stayText" header-align="center" align="left" label="当前节点</br>停留时间"
                       :render-header="renderheader"
                       width="80">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="审核审批" :render-header="renderheader"
                       width="60">
        <template slot-scope="scope">
          <el-button type="primary" @click="goPage(scope.row)">查看</el-button>
        </template>
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
  import WaittingApproval_API from '@/api/approval/waittingApproval'

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        dialogVisible: false,
        tableHeight: null,
        title: '',
        subjectList: [],
        tableData: [
          {
            subject: '',
            title: '',
            createrName: '',
            createTime: '',
            currentNodeName: '',
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
      filterHandler(value, row, column) {
        const property = column['subject'];
        return row['subject'] === value;
      },

      queryInstanceListForRunning() {
        this.loading=true;
        WaittingApproval_API.queryInstanceListForRunning({t:(new Date()).getTime()}).then(res => {
          this.loading=false;
          this.tableData = res.data || [];
          this.subjectList = this.uniqueArr(this.tableData);
        }).catch(err => {
          this.loading=false;
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },
      uniqueArr(arr) {
        let sl = arr.map((item) => {
          let obj = {text: item.subject, value: item.subject};
          return obj;
        }) || [];
        let result = [];
        var obj = {};
        sl.forEach(
          item => {
            if (!obj[item.text]) {
              result.push(item);
              obj[item.text] = true;
            }
          }
        )
        return result;
      },
      goPage(obj) {
        let params = JSON.parse(JSON.stringify(obj || {}));
        let nodeType = obj.currentNodeType || '';
        let subject = obj.subject || '';
        let  formType=obj.formType||'';
        switch (formType){
          case '固定表单':
            switch (subject) {
              case '入职薪酬':
                this.$store.commit('setCommParams', params);
                this.$router.push({path: '../waitting/detail_view'});
                break;
              default:
                this.$store.commit('setCommParams', params);
                this.$router.push({path: '../waitting/detail_view'});
                break;
            }
            break;
          case '通用表单':
            this.$store.commit('setCommParams', params);
            this.$router.push({ path: `/approval/doc/doc_view`,});
            break;
        }

        // this.$store.commit('setCommParams', params);
        // switch (subject) {
        //   case '入职薪酬':
        //     this.$router.push({path: '../waitting/detail_view'});
        //     break;
        //   case '薪酬调整':
        //     this.$router.push({ path: `/approval/doc/doc_view`,});
        //     break;
        // }
        // console.log('params ：', params)




      },
      initPage() {
        this.queryInstanceListForRunning();
      }
    },
    created() {

    },
    mounted() {
      this.tableData=[];
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





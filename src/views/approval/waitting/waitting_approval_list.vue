<template>
  <div class="salary-pay-container">
    <el-row>
      <el-col :span="24">
        <div><b>待审核审批公文</b></div>
      </el-col>
    </el-row>

    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中......"
      stripe border :max-height="tableHeight"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="40">
      </el-table-column>
      <el-table-column prop="subject" align="center" label="公文主题" width="120"
                       sortable
                       :filters="subjectList"
                       :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="code" header-align="center" align="left" label="公文编号" sortable
                       width="120"></el-table-column>
      <el-table-column prop="title" header-align="center" label="公文题目" minWidth="120"></el-table-column>
      <el-table-column prop="createrName" header-align="center" align="center" label="拟稿人" :render-header="renderheader"
                       width="60">
      </el-table-column>
      <el-table-column prop="createTime" header-align="center" align="center" label="发起时间" sortable
                       :render-header="renderheader" width="130">
      </el-table-column>
      <el-table-column prop="currentNodeName" header-align="center" align="center" label="当前节点"
                       :render-header="renderheader"
                       width="110">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="审核审批" :render-header="renderheader"
                       width="80">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-search" @click="goPage(scope.row)">查看</el-button>
          <!--<el-button type="primary" icon="el-icon-search" @click="goDemo(scope.row)">demo</el-button>-->
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
      filterHandler(value, row, column) {
        const property = column['subject'];
        return row['subject'] === value;
      },
      queryNeedToDoList() {
        WaittingApproval_API.queryNeedToDoList({t:(new Date()).getTime()}).then(res => {
          this.tableData = res.data || [];
          this.subjectList = this.uniqueArr(this.tableData);
        }).catch(err => {
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
        let formType = obj.formType || '';
        switch (formType) {
          case '固定表单':
            switch (subject) {
              case '入职薪酬':
                switch (nodeType) {
                  case '拟稿':
                    this.$store.commit('setCommParams', params);
                    this.$router.push({path: './detail_prepare_draft'});
                    break;
                  case '审核':
                    this.$store.commit('setCommParams', params);
                    this.$router.push({path: './detail_audit'});
                    break;
                  case '审批':
                    this.$store.commit('setCommParams', params);
                    this.$router.push({path: './detail_audit'});
                    break;
                }
                break;
            }
            break;
          case '通用表单':
            switch (nodeType) {
              case '拟稿':
                this.$store.commit('setCommParams', params);
                this.$router.push({path: `/approval/doc/doc_draft`});
                break;
              case '审核':
                this.$store.commit('setCommParams', params);
                this.$router.push({path: `/approval/doc/doc_audit`});
                break;
              case '审批':
                this.$store.commit('setCommParams', params);
                this.$router.push({path: `/approval/doc/doc_audit`});
                break;
            }
            break;
        }


      },

      goDemo(obj) {
        let val = obj.currentNodeType || '';
        let params = JSON.parse(JSON.stringify(obj || {}));
        switch (val) {
          case '拟稿':
            this.$store.commit('setCommParams', params);
            this.$router.push({path: './detail_prepare_draft_demo'});
            break;
          case '审核':
            this.$store.commit('setCommParams', params);
            this.$router.push({path: './detail_audit'});
            break;
          case '审批':
            this.$store.commit('setCommParams', params);
            this.$router.push({path: './detail_audit'});
            break;
          // default:
          //   this.$store.commit('setCommParams', params);
          //   this.$router.push({path: './detail_view'});
          //   break;
        }
      },
      initPage() {
        this.tableData = [];
        this.queryNeedToDoList();
      }
    },
    created() {

    },
    mounted() {
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





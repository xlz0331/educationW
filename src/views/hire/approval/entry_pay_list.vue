<template>
  <div class="_container">
    <el-row>
      <el-col :span="24">
        <div><b>{{companyName}}【入职薪酬】报批表</b></div>
      </el-col>
    </el-row>

    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中......"
      stripe border :span-method="arraySpanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="35">
      </el-table-column>
      <el-table-column prop="name" align="center" label="录入人" width="60"></el-table-column>
      <el-table-column prop="sex" align="center" label="性别" width="45"></el-table-column>
      <el-table-column prop="nid" header-align="center" label="身份证号" width="170"></el-table-column>
      <el-table-column prop="company" header-align="center" align="left"  label="录用公司"
                       width="100">
      </el-table-column>
      <el-table-column prop="dept" header-align="center" align="left" label="录用部门"
                       minWidth="150">
      </el-table-column>
      <el-table-column prop="position" header-align="center" align="left" label="录用岗位"
                          minWidth="100">
      </el-table-column>
      <el-table-column prop="jobGrade" header-align="center" align="left" label="录用职等"

                       width="100">
      </el-table-column>
      <el-table-column prop="tryrangeText" header-align="center" align="center" label="试用期"

                       width="60">
      </el-table-column>
      <el-table-column prop="planEntryDay" header-align="center" align="center" label="计划入职时间"

                       width="100">
      </el-table-column>
      <el-table-column header-align="center" align="left" label="入职借款及薪酬"
                         >
        <el-table-column prop="nodeType"  align="center" label="报批状态"
                         width="80">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="录入发起"
                         width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.nodeType==='待录入'" type="warning" icon="el-icon-edit" @click="goPage(scope.row)">录入</el-button>
            <el-button v-if="scope.row.nodeType==='待录入'" type="warning" icon="el-icon-edit" @click="goPageDemo(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
  ._container {
    max-width: 1140px;
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
        companyId:'',
        companyName:'',
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
      renderheader(h, {column, $index}) {
        return h('span', {}, [
          h('span', {}, column.label.split('</br>')[0]),
          h('br'),
          h('span', {}, column.label.split('</br>')[1])
        ])
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return [1, 22];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },
      findAllBeforeEntry(params) {
        this.tableData=[];
        this.loading=true;
        Hire_API.findAllBeforeEntry(params).then(res => {
          this.tableData = res.data || [];
          this.loading=false;
        }).catch(err => {
          this.loading=false;
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },
      goPage(obj) {
        let val = obj.currentNodeType || '';
        let params = JSON.parse(JSON.stringify(obj || {}));
        this.$store.commit('setCommParams', params);
        this.$router.push({path: './entry_pay_add'});
      },
      goPageDemo(obj) {
        let val = obj.currentNodeType || '';
        let params = JSON.parse(JSON.stringify(obj || {}));
        this.$store.commit('setCommParams', params);
        this.$router.push({path: './entry_pay_add_demo'});
      },

      initPage() {
        let params={companyId:this.companyId}
        this.findAllBeforeEntry(params);
      }
    },
    created() {

    },
    mounted() {
      var routerParams = this.$store.state.salary.routerCommParams;
      this.companyName = routerParams.keyVal1.title ;
      this.companyId = routerParams.keyVal1.values;
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





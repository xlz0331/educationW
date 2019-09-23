<template>
  <div class="_container">
    <el-row>
      <el-col :span="24">
        <div><b>【入职薪酬】录入界面</b></div>
      </el-col>
    </el-row>
    <el-form label-width="90px">
      <el-row class="text-left">
        <el-col :span="24" class="text-right">
          <div>
            <el-checkbox label="开启修改" title="打钩：可进行编辑并提交保存；没有打钩：不可编辑" border></el-checkbox>

            <el-checkbox v-model="formObj.isOfferBackAccount" label="提供银行流水" border
                         title="打钩：需要提供流水；没有打钩：不提供银行流水"
                         @change="isOfferBackAccountChange()"></el-checkbox>
            <!--<el-button type="primary" @click="show('')">不提供银行流水</el-button>-->
            <!--<el-button type="primary" @click="showFlowNode('')">查阅审核审批流程</el-button>-->
            <el-button type="primary" @click="doSave()">未提交保存</el-button>
            <el-button type="primary" @click="doSubmit()">完成提交</el-button>
            <el-button type="primary" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div :style="'max-height:'+tableHeight+'px;overflow-y: auto;border-top:'">
      <entry-pay-edit ref="entryEdit" :mainObj="mainObj" :formObj="formObj"></entry-pay-edit>
    </div>
  </div>
</template>

<style lang="scss">
  .draft_container {
    .box-card {
      margin-bottom: 12px;
    }
    .el-card {
      border: 1px solid #ccc;
      .el-card__header {
        padding: 4px;
        font-size: 14px;
        border-bottom: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: antiquewhite;
      }
      .el-card__body {
        margin: 0px;
        padding: 0px !important;
      }
      .el-table {
        margin-top: 2px;
        border-left: none;
        tr {
          th {
            /*line-height: 2px !important;*/
            font-weight: 300;
            background-color: #fff;
          }
          td {
            /*background-color: #fff;*/
            padding: 0;
            .el-input--mini .el-input__inner {
              /*border: none;*/
              width: 94%;
              margin: 1px auto;
            }
          }
        }

      }
    }
    .table {
      border-spacing: 0px;
      border-right: none;
      width: 100%;
      thead tr {
        th {
          text-align: center;
          /*height: 26px;*/
        }
      }
      tbody tr td {
        text-align: center;
        height: 26px;
        /*border-bottom: 1px solid ;*/
      }
    }
    .td-warning {
      background: #e1e3fa;
    }
  }

</style>
<script>
  import Hire_API from '@/api/hire/hire'
  import EntryPayEdit from "@/views/approval/com/entry/entry_pay_edit";

  export default {
    name: "list111",
    data() {
      return {
        tableHeight: null,
        title: '',
        tableData: [],
        fdId: '',
        mainObj: {
          fdId: ''
        },//主表对象
        formObj: {
          isOfferBackAccount: true  //是否提供银行流水（注：提交参数时记得添加至相应的对象中）
        }

      }
    },
    watch: {},
    components: {
      EntryPayEdit
    },
    methods: {
      //公共方法
      getTableHeight() {
        this.tableHeight = window.innerHeight - 120;
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
      goback() {
        history.go(-1)
      },

      isOfferBackAccountChange() {
        this.$refs.entryEdit.formData.hireEntrySalaryConfirmDto.isOfferBackAccount
          = this.formObj.isOfferBackAccount;
      },
      //保存
      doSave() {
        let params = this.$refs.entryEdit.formData || {};
        Hire_API.saveAllEdit(params).then(res => {
          if (res.success) {
            this.$message({type: 'success', message: '保存成功！'})
            this.initPage();
          }
          else {
            this.$message({type: 'error', message: '保存失败！' + res.msg});
          }
        }).catch(err => {
          this.$message({type: 'error', message: '保存失败：' + err.msg})
        });
      },
      doSubmit() {
        let params = this.formData || {};
        Hire_API.saveAllEdit(params).then(res => {
          if (res.success) {
            this.$message({type: 'success', message: '保存成功！'})
            this.initPage();
          }
          else {
            this.$message({type: 'error', message: '保存失败！' + res.msg});
          }
        }).catch(err => {
          this.$message({type: 'error', message: '保存失败：' + err.msg})
        });
      },


      initPage() {
        // var obj = this.$store.state.salary.commParams || {};
        // this.mainObj = obj || {};
        // console.log('1111 ：', obj)
      }

    },
    created() {
      var obj = this.$store.state.salary.commParams || {};
      this.mainObj = obj || {};
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





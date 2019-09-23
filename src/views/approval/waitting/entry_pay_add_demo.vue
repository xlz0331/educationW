<template>
  <div class="_container">
    <el-row>
      <el-col :span="24">
        <div><b>【入职薪酬】录入表</b></div>
      </el-col>
    </el-row>
    <el-form label-width="90px">
      <el-row class="text-left">
        <el-col :span="24" class="text-right">
          <div>
            <el-checkbox v-model="formObj.isOfferBankAccount" label="提供银行流水" border
                         title="打钩：需要提供流水；没有打钩：不提供银行流水"
                         @change="isOfferBankAccountChange()"></el-checkbox>
            <!--<el-button type="primary" @click="show('')">不提供银行流水</el-button>-->
            <!--<el-button type="primary" @click="showFlowNode('')">查阅审核审批流程</el-button>-->
            <el-button type="primary" @click="doNoAgreement()">谈薪不成功</el-button>
            <el-button type="primary" @click="doSave('保存')">保存</el-button>
            <el-button type="primary" @click="doSubmit('提交审批')">提交审批</el-button>
            <el-button type="warning" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div :style="'max-height:'+tableHeight+'px;overflow-y: auto;border-top:'">
      <!--<entry-pay-edit ref="entryEdit"  :instanceId="mainObj.fdId" :mainObj="mainObj" :formObj="formObj"></entry-pay-edit>-->

      <entry-pay-demo ref="entryEdit"  :instanceId="mainObj.fdId" :mainObj="mainObj" :formObj="formObj"></entry-pay-demo>
    </div>
  </div>
</template>

<style lang="scss">

</style>
<script>
  import Hire_API from '@/api/hire/hire'
  import EntryPayEdit from "@/views/approval/com/entry/entry_pay_edit";
  import EntryPayView from "@/views/approval/com/entry/entry_pay_view";

  import EntryPayDemo from "@/views/approval/com/entry/entry_pay_demo";


  export default {
    name: "list111",
    data() {
      return {
        tableHeight: null,
        title: '',
        tableData: [],
        mainObj: {
          fdId: ''
        },//主表对象
        formObj: {
          isEditAtt:1,
          isShowUploadAtt:0,
          nodeTyped:'待提交',
          isOfferBankAccount: true  //是否提供银行流水（注：提交参数时记得添加至相应的对象中）
        }

      }
    },
    watch: {},
    components: {
      EntryPayEdit,
      EntryPayView,
      EntryPayDemo
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

      isOfferBankAccountChange() {
        this.$refs.entryEdit.formData.hireEntrySalaryConfirmDto.isOfferBankAccount
          = this.formObj.isOfferBankAccount?'是':'否';
      },
      //保存
      doSave(val) {
        let params = this.$refs.entryEdit.formData || {};
        let nodeParams={nodeTyped:val}
        Hire_API.saveAllEdit(nodeParams,params).then(res => {
          if (res.success) {
            this.$message({type: 'success',showClose:true, message: '保存成功！'})
          }
          else {
            this.$message({type: 'error',showClose:true, message: '保存失败！' + res.msg});
          }
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '保存失败：' + err.msg})
        });
      },
      doSubmit(val) {
        this.$confirm('确定要【'+val+'】吗？', {type: 'warning'}).then((item) => {
          let params = this.$refs.entryEdit.formData || {};
          let nodeParams={nodeTyped:val}
          Hire_API.saveAllEdit(nodeParams,params).then(res => {
            if (res.success) {
              this.$message({type: 'success', message: val+'成功！'})
              this.goback();
              // this.initPage();
            }
            else {
              this.$message({type: 'error', message: val+'失败！' + res.msg});
            }
          }).catch(err => {
            this.$message({type: 'error', message: val+'失败：' + err.msg})
          });
        }).catch(err => {
          this.$message({type: 'info',showClose:true, message: '已取消提交' })
        })
      },

      //谈薪不成功
      doNoAgreement() {
        this.$confirm('确定【谈薪不成功】吗？', {type: 'warning'}).then((item) => {
          let params = {personalId:this.mainObj.fdId};
          Hire_API.talkAboutSalaryFailed(params).then(res => {
            if (res.success) {
              this.$message({type: 'success',showClose:true, message: '保存成功！'})
              this.goback();
              // this.initPage();
            }
            else {
              this.$message({type: 'error', message: '保存失败！' + res.msg});
            }
          }).catch(err => {
            this.$message({type: 'error', message: '保存失败：' + err.msg})
          });
        }).catch(err1 => {
          this.$message({type: 'info',showClose:true, message: '已取消保存' })
        })
      },

    },
    created() {
      var obj = this.$store.state.salary.commParams || {};
      this.mainObj = obj || {};
    },
    mounted() {
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





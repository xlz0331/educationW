<template>
  <div class="_container">
    <el-row>
      <el-col :span="24">
        <div><b>{{formObj.documentTitle}}</b></div>
      </el-col>
    </el-row>

    <el-row class="text-left">
      <el-form>
        <el-col :span="12" class="text-left">
          <el-form-item label="公文编号:">
            {{formObj.documentCode}}
          </el-form-item>
        </el-col>
        <el-col :span="12" class="text-right">
          <div>
            <el-button type="primary" @click="showFlowNode('')">审核审批意见查阅</el-button>
            <el-button v-if="btnControl.isReCallBack" type="primary" @click="doRecallBack('撤回修改')">撤回修改</el-button>
            <el-button type="primary" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <div :style="'max-height:'+tableHeight+'px;overflow-y: auto;border-top:'">
      <entry-pay-view ref="entryEdit" :instanceId="mainObj.fdId" :mainObj="mainObj" :formObj="formObj"></entry-pay-view>
    </div>
    <el-dialog title="审核审批意见查阅" width="80%" :close-on-click-modal="false"
               :visible.sync="dialogFlow">
      <flow-node :instance-id="mainObj.fdId"></flow-node>
    </el-dialog>
    <el-dialog title="人员选择" width="66%" :close-on-click-modal="false"
               :visible.sync="dialogEmployeeSelect">
      <div>
        <employee-select ref="cp_empSelect" :selectedEmployeeStr="formObj.selectedEmployeeStr"></employee-select>
        <el-row class="text-left">
          <el-col :span="24" class="text-right">
            <div>
              <el-button type="primary" @click="doSelectedEmp()">确认</el-button>
              <el-button type="primary" @click="doCancelEmp()">取消</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">

</style>
<script>
  import Hire_API from '@/api/hire/hire'
  import WaittingApproval_API from '@/api/approval/waittingApproval'
  import FlowNode from "@/views/approval/com/flow_node";
  import EntryPayEdit from "@/views/approval/com/entry/entry_pay_edit";
  import EmployeeSelect from "@/views/approval/com/employee_select";
  import EntryPayView from "@/views/approval/com/entry/entry_pay_view";

  export default {
    name: "list111",
    data() {
      return {
        tableHeight: null,
        dialogFlow: false,
        dialogEmployeeSelect: false,
        empSelectType: 'audit',
        title: '',
        tableData: [],
        mainObj: {
          fdId: ''
        },//主表对象
        formObj: {
          isEditAtt:0,//允许编辑附件
          isShowUploadAtt:1,//允许上传附件及查看附件

          documentTitle:'',
          documentSubject: '',
          documentCode: '',
          drafter: '',
          aduitUser: '',
          approveUser: '',

          selectedEmployeeStr: '',
          nodeTyped: '待提交',
          isOfferBankAccount: true  //是否提供银行流水（注：提交参数时记得添加至相应的对象中），

        },
        btnControl:{
          isReCallBack:''//是否允许撤回
        },

      }
    },
    watch: {},
    components: {
      FlowNode,
      EmployeeSelect,
      EntryPayEdit,
      EntryPayView
    },
    methods: {
      //公共方法
      getTableHeight() {
        this.tableHeight = window.innerHeight - 160;
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

      showEmployeeSelect(val) {
        this.empSelectType = val;
        this.formObj.selectedEmployeeStr='';
        if (this.empSelectType === 'audit') {
          this.formObj.selectedEmployeeStr=this.formObj.aduitUser;
          this.dialogEmployeeSelect = true;
        } else if (this.empSelectType === 'approve') {
          this.formObj.selectedEmployeeStr=this.formObj.approveUser;
          this.dialogEmployeeSelect = true;
        }

      },
      doSelectedEmp() {
        let empName = this.$refs.cp_empSelect.selectedEmployee || [];
        if (this.empSelectType === 'audit') {
          this.formObj.aduitUser = empName.join(',');
          this.selectedEmployeeStr= this.formObj.aduitUser;
        } else if (this.empSelectType === 'approve') {
          this.formObj.approveUser = empName.join(',');
          this.selectedEmployeeStr= this.formObj.approveUser;
        }
        this.dialogEmployeeSelect = false;
      },
      doCancelEmp(){
        this.dialogEmployeeSelect = false;
      },
      showFlowNode() {
        this.dialogFlow = true;
      },

      isOfferBankAccountChange() {
        this.$refs.entryEdit.formData.hireEntrySalaryConfirmDto.isOfferBankAccount
          = this.formObj.isOfferBankAccount ? '是' : '否';
      },
      initPage(){
        this.checkCanRecallBack();
      },
      checkCanRecallBack(){
        let params={instanceId:this.mainObj.fdId};
        WaittingApproval_API.checkCanRecallBack(params).then(res => {
          this.btnControl.isReCallBack=res.data||false;
        }).catch(err => {
          this.$message({type: 'error', message: '权限判断异常：' + err.msg})
        });
      },
      doRecallBack(val) {
        let _this=this;
        this.$confirm('确定要【'+val+'】吗？', {type: 'warning'}).then((item) => {
          let params={instanceId:_this.mainObj.fdId};
          WaittingApproval_API.recallBack(params).then(res => {
            if (res.success) {
              this.$message({type: 'success', message: `${val}成功！`});
              _this.goback(-1);
            }
            else {
              this.$message({type: 'error', message: `${val}失败！` + res.msg});
            }
          }).catch(err => {
            this.$message({type: 'error', message: `${val}失败:` + err.msg})
          });
        }).catch(err => {
          this.$message({type: 'info', showClose: true, message: '取消操作......'})
        })
      },

      //保存
      doSave(val) {
        let params = this.$refs.entryEdit.formData || {};
        let nodeParams = {nodeTyped: val,nodeId:this.mainObj.fdId}
        Hire_API.saveAllEdit(nodeParams, params).then(res => {
          if (res.success) {
            this.$message({type: 'success', showClose: true, message: '保存成功！'})
          }
          else {
            this.$message({type: 'error', showClose: true, message: '保存失败！' + res.msg});
          }
        }).catch(err => {
          this.$message({type: 'error', showClose: true, message: '保存失败：' + err.msg})
        });
      },
      doSubmit(val) {
        this.$confirm('确定要【'+val+'】吗？', {type: 'warning'}).then((item) => {
          let params = this.$refs.entryEdit.formData || {};
          let nodeParams = {nodeTyped: val,nodeId:this.mainObj.fdId}
          Hire_API.saveAllEdit(nodeParams, params).then(res => {
            if (res.success) {
              this.$message({type: 'success', message: `${val}成功！`})
              // this.initPage();
            }
            else {
              this.$message({type: 'error', message: `${val}失败！` + res.msg});
            }
          }).catch(err => {
            this.$message({type: 'error', message: '提交失败：' + err.msg})
          });
        }).catch(err => {
          this.$message({type: 'info', showClose: true, message: '已取消提交'})
        })
      },

      //谈薪不成功
      doNoAgreement() {
        this.$confirm('确定【谈薪不成功】吗？', {type: 'warning'}).then((item) => {
          let params = {personalId: this.mainObj.fdId};
          Hire_API.talkAboutSalaryFailed(params).then(res => {
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
        }).catch(err => {
          this.$message({type: 'info', showClose: true, message: '已取消保存'})
        })
      },

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





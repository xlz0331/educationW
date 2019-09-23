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
            <!--一句话：老板不会用勾选框，改成按钮-->
            <!--<el-checkbox v-model="isEdit" label="开启修改" border-->
            <!--title="打钩：开启编辑；没有打钩：预览"-->
            <!--@change="isOfferBankAccountChange()"></el-checkbox>-->
            <el-button type="primary" @click="showFlowNode()">查阅审核审批流程</el-button>
            <el-button v-if="!isEdit" type="primary" @click="isEdit=true">开启修改</el-button>
            <el-button v-if="isEdit" type="primary" @click="doSave('保存')">保存修改</el-button>
            <!--<el-button v-if="isEdit" type="primary" @click="doShowOpinion">意见录入</el-button>-->

            <el-button type="primary" @click="doShowBack('退回修改')">退回修改</el-button>
            <el-button type="primary" @click="doShowAgreement(currentNodeTypeName)">{{currentNodeTypeName}}</el-button>
            <el-button type="primary" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <div :style="'max-height:'+tableHeight+'px;overflow-y: auto;border-top:'">
      <entry-pay-edit :key="entryKey" v-if="isEdit" ref="entryEdit" :instanceId="mainObj.fdId" :mainObj="mainObj"
                      :formObj="formObj"></entry-pay-edit>
      <entry-pay-view :key="entryKey" v-if="!isEdit" ref="entryEdit" :instanceId="mainObj.fdId" :mainObj="mainObj"
                      :formObj="formObj"></entry-pay-view>
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
    <!--退回-->
    <el-dialog :title="opinionTitle" width="40%"
               :visible.sync="dialogOpinionBack" :close-on-click-modal="false">
      <div style="margin-bottom: 10px">
        <Opinion ref="backForm" :opinion="opinionBack"></Opinion>
      </div>
      <el-row class="text-left">
        <el-col :span="24" class="text-center">
          <div>
            <el-button type="primary" @click="doBackConfirm(nodeType)">确认</el-button>
            <el-button type="primary" @click="dialogOpinionBack=false">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!--同意-->
    <el-dialog width="40%" title="请确认是否同意"
               :visible.sync="dialogOpinion" :close-on-click-modal="false">
      <div style="margin-bottom: 10px">
        <Opinion ref="opinionForm" :opinion="opinionAgree"></Opinion>
      </div>
      <el-row class="text-left">
        <el-col :span="24" class="text-center">
          <div>
            <el-button type="primary" @click="doOpinionConfirm(nodeType)">确认</el-button>
            <el-button type="primary" @click="dialogOpinion=false">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<style lang="scss">

</style>
<script>
  import Hire_API from '@/api/hire/hire'
  import FlowNode from "@/views/approval/com/flow_node";
  import EntryPayEdit from "@/views/approval/com/entry/entry_pay_edit";
  import EntryPayView from "@/views/approval/com/entry/entry_pay_view";
  import EmployeeSelect from "@/views/approval/com/employee_select";
  import Opinion from "@/views/approval/com/opinion";

  export default {
    name: "detail-audit",
    data() {
      return {
        tableHeight: null,
        dialogFlow: false,
        dialogOpinionBack: false,
        currentNodeTypeName:'同意提交',
        opinionTitle: '',//审核审批、退回修改意见弹窗标题
        opinionAgree: '',//同意意见
        opinionBack:'',//退回意见
        nodeType:'',
        dialogOpinion: false,
        dialogEmployeeSelect: false,
        empSelectType: 'audit',
        tableData: [],
        isEdit: false,
        entryKey: '',
        mainObj: {
          fdId: '',//流程实例Id
          needToDoNodeId: '',//节点Id
        },//主表对象
        formObj: {
          isEditAtt: 1,//允许编辑附件
          isShowUploadAtt: 1,//允许上传附件及查看附件

          documentTitle: '',
          documentSubject: '',
          documentCode: '',
          drafter: '',
          aduitUser: '',
          approveUser: '',

          selectedEmployeeStr: '',
          nodeTyped: '待提交',
          isOfferBankAccount: true  //是否提供银行流水（注：提交参数时记得添加至相应的对象中），
        }

      }
    },
    watch: {},
    components: {
      FlowNode,
      EmployeeSelect,
      EntryPayEdit,
      EntryPayView,
      Opinion
    },
    methods: {
      //公共方法
      getTableHeight() {
        this.tableHeight = window.innerHeight - 150;
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
        this.formObj.selectedEmployeeStr = '';
        if (this.empSelectType === 'audit') {
          this.formObj.selectedEmployeeStr = this.formObj.aduitUser;
          this.dialogEmployeeSelect = true;
        } else if (this.empSelectType === 'approve') {
          this.formObj.selectedEmployeeStr = this.formObj.approveUser;
          this.dialogEmployeeSelect = true;
        }

      },
      doSelectedEmp() {
        let empName = this.$refs.cp_empSelect.selectedEmployee || [];
        if (this.empSelectType === 'audit') {
          this.formObj.aduitUser = empName.join(',');
          this.selectedEmployeeStr = this.formObj.aduitUser;
        } else if (this.empSelectType === 'approve') {
          this.formObj.approveUser = empName.join(',');
          this.selectedEmployeeStr = this.formObj.approveUser;
        }
        this.dialogEmployeeSelect = false;
      },
      doCancelEmp() {
        this.dialogEmployeeSelect = false;
      },
      showFlowNode() {
        this.dialogFlow = true;
      },

      isOfferBankAccountChange() {
        this.$refs.entryEdit.formData.hireEntrySalaryConfirmDto.isOfferBankAccount
          = this.formObj.isOfferBankAccount ? '是' : '否';
      },

      //退回、同意  应该做成同一个组件，奈何还要做成不一样的。。。
      //退回
      doShowBack(val) {
        this.nodeType=val;
        this.dialogOpinionBack = true;
        this.opinionTitle = '请输入' + val + '意见';
      },
      doBackConfirm(val) {
        this.opinionBack = this.$refs.backForm.auditOpinion;
        if (this.opinionBack == '') {
          this.$message({type: 'info', showClose: true, message: '意见不能为空'});
          return;
        }
        let nParams = {disposeOpinion: this.opinionBack, disposeResult: '退回'};
        this.doSave(val, nParams);
        this.dialogOpinionBack = false;
      },

      //同意提交
      doShowAgreement(val) {
        this.nodeType=val;
        this.opinionAgree = this.opinionAgree != '' ? this.opinionAgree : val;
        this.dialogOpinion = true;
      },
      doOpinionConfirm(val) {
        this.opinionAgree = this.$refs.opinionForm.auditOpinion || '';
        let nParams = {disposeOpinion: this.opinionAgree, disposeResult: '同意'};
        this.doAgreement(val,nParams);
        this.dialogOpinion = false;
      },

      doAgreement(val,nParams) {
        this.doSave(val, nParams);

        // let _this = this;
        // this.$confirm('确定要【' + val + '】吗？', {type: 'warning'}).then(() => {
        //   let obj = {disposeOpinion: val, disposeResult: '同意'};
        //   _this.doSave(val, obj);
        // }).catch(err => {
        //   this.$message({type: 'info', showClose: true, message: '没有完成提交'})
        // })

        // let _this = this;
        // this.$prompt('请输入审批意见', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        // }).then(({value}) => {
        //   let obj = {disposeOpinion: value, disposeResult: '同意'};
        //   _this.doSave(val, obj);
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消'
        //   });
        // });

      },
      doSave(val, nParams) {
        let _this = this;
        let params = this.$refs.entryEdit.formData || {};
        let nodeParams = {nodeTyped: val, nodeId: this.mainObj.needToDoNodeId};
        nodeParams = Object.assign(nodeParams, nParams);
        Hire_API.saveAllEdit(nodeParams, params).then(res => {
          this.isEdit = false;
          if (res.success) {
            this.$message({type: 'success', showClose: true, message: `${val}` + '成功！'});
            if (val != '保存') {//临时保存不跳转
              this.goback();
            }
            else {
              this.entryKey = new Date().getTime() + '_';
            }
          }
          else {
            this.$message({type: 'error', showClose: true, message: `${val}` + '失败！' + res.msg});
          }
        }).catch(err => {
          this.$message({type: 'error', showClose: true, message: `${val}` + '失败：' + err.msg})
        });
      },

      // doSubmit(val) {
      //   this.$confirm('确定要【提交审批】吗？', {type: 'warning'}).then((item) => {
      //     console.log(this.$refs.entryEdit.formData)
      //     let params = this.$refs.entryEdit.formData || {};
      //     let nodeParams = {nodeTyped: val,nodeId:this.mainObj.needToDoNodeId}
      //     Hire_API.saveAllEdit(nodeParams, params).then(res => {
      //       if (res.success) {
      //         this.$message({type: 'success', message: '提交成功！'})
      //         // this.initPage();
      //       }
      //       else {
      //         this.$message({type: 'error', message: '提交失败！' + res.msg});
      //       }
      //     }).catch(err => {
      //       this.$message({type: 'error', message: '提交失败：' + err.msg})
      //     });
      //   }).catch(err => {
      //     this.$message({type: 'info', showClose: true, message: '已取消提交'})
      //   })
      // },
      // //谈薪不成功
      // doNoAgreement() {
      //   this.$confirm('确定【谈薪不成功】吗？', {type: 'warning'}).then((item) => {
      //     let params = {personalId: this.mainObj.fdId};
      //     Hire_API.talkAboutSalaryFailed(params).then(res => {
      //       if (res.success) {
      //         this.$message({type: 'success', message: '保存成功！'})
      //         this.initPage();
      //       }
      //       else {
      //         this.$message({type: 'error', message: '保存失败！' + res.msg});
      //       }
      //     }).catch(err => {
      //       this.$message({type: 'error', message: '保存失败：' + err.msg})
      //     });
      //   }).catch(err => {
      //     this.$message({type: 'info', showClose: true, message: '已取消保存'})
      //   })
      // },

    },
    created() {
      var obj = this.$store.state.salary.commParams || {};
      this.mainObj = obj || {};
      this.currentNodeTypeName=this.mainObj.currentNodeType=='审批'?'同意审批':'同意提交';
    },
    mounted() {
      // this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





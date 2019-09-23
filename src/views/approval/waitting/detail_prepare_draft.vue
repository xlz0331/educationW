<template>
  <div class="_container">
    <el-row>
      <el-col :span="24">
        <div><b>入职薪酬拟稿发起界面</b></div>
      </el-col>
    </el-row>
    <el-form label-width="90px">
      <el-row class="text-left">
        <el-col :span="24" class="text-right">
          <div>
            <el-checkbox v-model="formObj.isOfferBankAccount" label="提供银行流水" border
                         title="打钩：需要提供流水；没有打钩：不提供银行流水"
                         @change="isOfferBankAccountChange()"></el-checkbox>
            <el-button type="primary" @click="showFlowNode('')">查阅审核审批流程</el-button>
            <el-button type="primary" @click="doSave('未提交保存')">未提交保存</el-button>
            <el-button type="primary" @click="doSubmit('完成提交')">完成提交</el-button>
            <el-button type="primary" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="text-left">
        <el-col :span="12" class="text-left">
          <el-form-item label="公文题目:">
            <el-input  v-model="formObj.documentTitle" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="text-left">
          <el-form-item label="公文编号:">
            <el-input readonly v-model="formObj.documentCode" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="text-left">
        <el-col :span="5" class="text-left">
          <el-form-item label="拟稿人:">
            <el-input readonly v-model="formObj.drafter" placeholder="">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="text-left">
          <el-form-item label="传审核人:">
            <el-input readonly v-model="formObj.aduitUser" placeholder="">
              <el-button slot="append" icon="el-icon-user" @click="showEmployeeSelect('audit')"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="text-left">
          <el-form-item label="传审批人:">
            <el-input readonly v-model="formObj.approveUser" placeholder="">
              <el-button slot="append" icon="el-icon-user" @click="showEmployeeSelect('approve')"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div :style="'max-height:'+tableHeight+'px;overflow-y: auto;border-top:'">
      <entry-pay-edit :key="entryKey" ref="entryEdit" :instanceId="mainObj.fdId" :mainObj="mainObj" :formObj="formObj"></entry-pay-edit>
    </div>
    <el-dialog title="审核审批意见查阅" width="80%" :close-on-click-modal="false"
               :visible.sync="dialogFlow">
      <flow-node :instance-id="mainObj.fdId"></flow-node>
    </el-dialog>
    <el-dialog title="人员选择" width="66%" :close-on-click-modal="false" :key="keyVal"
               :visible.sync="dialogEmployeeSelect">
      <div>
        <employee-select  ref="cp_empSelect" :selectedEmployeeStr="formObj.selectedEmployeeStr"></employee-select>
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
  import FlowNode from "@/views/approval/com/flow_node";
  import EntryPayEdit from "@/views/approval/com/entry/entry_pay_edit";
  import EmployeeSelect from "@/views/approval/com/employee_select";

  export default {
    name: "list111",
    data() {
      return {
        keyVal:'',
        entryKey:'',
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
          isEditAtt:1,//允许编辑附件
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
        }
      }
    },
    watch: {
      formObj:function (obj) {

      }
    },
    computed:{
    },
    components: {
      FlowNode,
      EmployeeSelect,
      EntryPayEdit
    },
    methods: {
      //公共方法
      getTableHeight() {
        this.tableHeight = window.innerHeight - 220;
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
        // this.keyVal = new Date().getTime() + '_';
        this.keyVal = val+ '_';
        this.empSelectType = val;
        this.formObj.selectedEmployeeStr = '';
        if (this.empSelectType === 'audit') {
          this.formObj.selectedEmployeeStr = this.formObj.aduitUser||'';
          this.dialogEmployeeSelect = true;
        } else if (this.empSelectType === 'approve') {
          this.formObj.selectedEmployeeStr = this.formObj.approveUser||'';
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
      //保存
      doSave(val) {
        let params = this.$refs.entryEdit.formData || {};
        let nodeParams = {nodeTyped: val,nodeId:this.mainObj.fdId}
        params.hireDraftDto.aduitUser=this.formObj.aduitUser;
        params.hireDraftDto.approveUser=this.formObj.approveUser;
        params.hireDraftDto.documentTitle=this.formObj.documentTitle;

        Hire_API.saveAllEdit(nodeParams, params).then(res => {
          this.entryKey=new Date().getTime()+'_';
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
        let _this=this;
        this.$confirm('确定要【提交审批】吗？', {type: 'warning'}).then((item) => {
          let params = this.$refs.entryEdit.formData || {};
          let nodeParams = {nodeTyped: val}
          params.hireDraftDto.aduitUser=this.formObj.aduitUser;
          params.hireDraftDto.approveUser=this.formObj.approveUser;
          Hire_API.saveAllEdit(nodeParams, params).then(res => {
            if (res.success) {
              this.$message({type: 'success', message: '提交成功！'})
              _this.goback();
              // this.initPage();
            }
            else {
              this.$message({type: 'error', message: '提交失败！' + res.msg});
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
      // var obj = this.$store.state.salary.commParams || {};
      // this.mainObj = obj || {};

      var obj = this.$store.state.salary.commParams || {};
      this.mainObj = obj || {};

    },
    mounted() {
      this.getTableHeight();
      // this.$nextTick(() => {
      //   this.formObj = this.$refs.entryEdit.formData.hireDraftDto || {};
      // })
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





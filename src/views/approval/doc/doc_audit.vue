<template>
  <div class="_container">
    <el-row>
      <el-col :span="24">
        <div><b>{{this.formObj.title}}</b></div>
      </el-col>
    </el-row>
    <el-form label-width="90px">
      <el-row class="text-left">
        <el-col :span="6" class="text-left">
          <el-form-item label="公文编号:">
            <el-input readonly v-model="formObj.code" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18" class="text-right">
          <div>
            <!--<el-button type="primary" @click="loadAtta()">刷新正文</el-button>-->
            <el-button type="primary" @click="showAtta()">附件列表</el-button>
            <el-button type="primary" @click="showFlowNode()">审核审批意见查阅</el-button>
         <!---->
            <!--<el-button type="primary" @click="doBack('退回修改')">退回修改</el-button>-->
            <!--<el-button type="primary" @click="doSubmit('同意提交')">同意提交</el-button>-->
            <el-button type="primary" @click="doShowBack('退回修改')">退回修改</el-button>
            <el-button type="primary" @click="doShowAgreement(currentNodeTypeName)">{{currentNodeTypeName}}</el-button>

            <el-button type="warning" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-row>
      <!--<el-row class="text-left">-->
        <!--<el-col :span="12" class="text-left">-->
          <!--<el-form-item label="公文题目:">-->
            <!--<el-input v-model="formObj.title" placeholder=""></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="6" class="text-left">-->
          <!--<el-form-item label="公文编号:">-->
            <!--<el-input readonly v-model="formObj.code" placeholder=""></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
    </el-form>
    <div :style="(control.isShowOffice?'':'display:none;')+'height:'+tableHeight+'px'">
      <office-control :filePath="filePath" :objectHeight="tableHeight"></office-control>
    </div>
    <el-dialog title="审核审批意见查阅" width="80%"
               :visible.sync="dialogFlow" :close-on-click-modal="false"
               :before-close="flowDialogClose"  :show-close="false">
      <div slot="title">
        <div>审核审批意见查阅</div>
        <el-button type="primary" class="close-right" @click="dialogFlow=false">返回上级</el-button>
      </div>
      <flow-node :instance-id="formObj.instanceId"></flow-node>
    </el-dialog>

    <!--退回-->
    <el-dialog :title="opinionTitle" width="40%"
               :visible.sync="dialogOpinionBack"
               :before-close="backDialogClose" :close-on-click-modal="false">
      <div style="margin-bottom: 10px">
        <Opinion ref="backForm" :opinion="opinionBack"></Opinion>
      </div>
      <el-row class="text-left">
        <el-col :span="24" class="text-center">
          <div>
            <el-button type="primary" @click="doBackConfirm(nodeType)">确认</el-button>
            <el-button type="primary" @click="backDialogClose">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!--同意-->
    <el-dialog width="40%" title="请确认是否同意"
               :visible.sync="dialogOpinion"
               :before-close="opinionDialogClose" :close-on-click-modal="false">
      <div style="margin-bottom: 10px">
        <Opinion ref="opinionForm" :opinion="opinionAgree"></Opinion>
      </div>
      <el-row class="text-left">
        <el-col :span="24" class="text-center">
          <div>
            <el-button type="primary" @click="doOpinionConfirm(nodeType)">确认</el-button>
            <el-button type="primary" @click="opinionDialogClose">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<style lang="scss">
  .el-form-item--mini.el-form-item{
    margin-bottom: 3px;
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import {getCookie, TokenKey} from '@/utils/Cookie'
  import FlowNode from "@/views/approval/com/flow_node";
  import DocControl from "@/views/approval/com/doc/docControl";
  import OfficeControl from "@/views/approval/com/doc/officeControl";
  import EmployeeSelect from "@/views/approval/com/employee_select";
  import WaittingApproval_API from '@/api/approval/waittingApproval'
  import Opinion from "@/views/approval/com/opinion";
  import ElButton from "element-ui/packages/button/src/button";


  export default {
    name: "doc_audit",
    data() {
      return {
        control: {
          isShowOffice: true
        },
        opinionTitle:'',
        dialogOpinionBack: false,
        dialogOpinion:false,
        currentNodeTypeName:'同意提交',
        opinionTitle: '',//审核审批、退回修改意见弹窗标题
        opinionAgree: '',//同意意见
        opinionBack:'退回修改',//退回意见

        keyVal: '',
        tableHeight: 500,
        dialogFlow: false,
        dialogEmployeeSelect: false,
        empSelectType: 'audit',
        title: '',
        attTokenKey: '',
        filePath: '',
        tableData: [],
        formObj: {
          fdId: '',
          instanceId: '',
          title: '',
          code: '',
          codePre: '',
          subject: '',
          drafter: '',
          aduitUser: '',
          approveUser: '',
          isTempSave: '',//是否是“未提交保存”(是/否)

          selectedEmployeeStr: '',
          nodeTyped: '待提交',
          isOfferBankAccount: true,  //是否提供银行流水（注：提交参数时记得添加至相应的对象中），
        },
        mainObj: {},
        empList: []
      }
    },
    watch: {},
    computed: {
      ...mapGetters(['login_user']),
    },
    components: {
      ElButton,
      FlowNode,
      EmployeeSelect,
      DocControl,
      OfficeControl,
      Opinion
    },
    methods: {
      //公共方法
      getTableHeight() {
        this.tableHeight = window.innerHeight - 120;
      },

      goback() {
        history.go(-1)
      },
      //流程查阅
      showFlowNode() {
        if (this.formObj.fdId != '') {
          this.formObj.instanceId = this.formObj.fdId;
          this.control.isShowOffice = false;
          this.dialogFlow = true;
        } else {
          this.$message({type: 'error', showClose: true, message: '没有形成流程，无法查阅'})
        }

      },
      flowDialogClose() {
        this.control.isShowOffice = true;
        this.dialogFlow = false;
      },
      testDraftSubmit(params) {
        WaittingApproval_API.testDraftSubmit(params).then(res => {
          if (res.success) {
            this.$message({type: 'success', showClose: true, message: '保存成功！'});
            this.goPage();
          }
          else {
            this.$message({type: 'error', showClose: true, message: '保存失败！' + res.msg});
          }

        }).catch(err => {
          this.$message({type: 'error', showClose: true, message: '保存失败：' + err.msg})
        });
      },
      //跳转回待批公文列表
      goPage() {
        this.$router.push({path: `/approval/waitting/waitting_approval_list`,});
      },

      // doSave(val) {
      //   if (this.formObj.title == '') {
      //     this.$message({type: 'error', showClose: true, message: '公文标题不能为空'})
      //     return;
      //   }
      //   let params = this.formObj || {};
      //   let _this = this;
      //   params.isTempSave = (val == '未提交保存' ? '是' : '否');
      //   params.instanceId = params.fdId || '';
      //   this.testDraftSubmit(params);
      // },
      // doSubmit(val) {
      //   let params = this.formObj || {};
      //   let _this = this;
      //   this.control.isShowOffice = false;
      //   this.$confirm('确定要【完成提交】吗？', {type: 'warning'}).then((item) => {
      //     this.control.isShowOffice = true;
      //     params.isTempSave = (val == '未提交保存' ? '是' : '否');
      //     params.instanceId = params.fdId || '';
      //     this.testDraftSubmit(params);
      //   }).catch(err => {
      //     this.$message({type: 'error', message: '已取消提交'});
      //   })
      // },


      //获取及初始化atttoken
      getAndInitAttToken(params) {
        WaittingApproval_API.getAndInitAttToken(params).then(res => {
          // this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '初始化请求异常：' + err.msg})
        });
      },
      //获取公文编号
      getWorkFlowCode() {
        let params = {code: this.mainObj.codePre};
        WaittingApproval_API.getWorkFlowCode(params).then(res => {
          this.formObj.code = res.data || '';
        }).catch(err => {
          this.$message({type: 'error', message: '流程编号获取异常：' + err.msg})
        });
      },
      initPage() {
        if (this.isNew) {
          this.getWorkFlowCode();//获取流程编号
        } else {//重新加载附件
          this.loadAtta();
        }

        let attkey = getCookie(TokenKey);
        this.attTokenKey = attkey.substring(0, 16) || '';
        this.getAndInitAttToken({tokenId: this.attTokenKey});

      },

      //刷新附件
      loadAtta() {
        // let params = {wfCode: this.formObj.code}
        // this.filePath = WaittingApproval_API.downloadWfWorkFile(params);

        //@2019/07/26
        let params = {fdid: this.formObj.fdId}
        this.filePath = WaittingApproval_API.wfFileDownload(params);
        this.key = new Date().getTime() + '_';
      },

      nodeSubmit(params,typeVal) {
        WaittingApproval_API.nodeSubmit(params).then(res => {
          if (res.success) {
            this.$message({type: 'success', showClose: true, message: `${typeVal}成功`});
            this.goPage();
          }
          else {
            this.$message({type: 'error', showClose: true, message:  `${typeVal}失败` + res.msg});
          }

        }).catch(err => {
          this.$message({type: 'error', showClose: true, message: '保存失败：' + err.msg})
        });
      },

      //退回修改
      doBack(val) {
        this.control.isShowOffice = false;
        let _this = this;
        this.$prompt('请输入退回修改意见', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let obj = {nodeId: this.formObj.needToDoNodeId, disposeOpinion: value, disposeResult: '退回'};
          _this.nodeSubmit(obj);
          this.control.isShowOffice = true;
        }).catch(() => {
          this.control.isShowOffice = true;
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      doSubmit(val) {
        this.control.isShowOffice = false;
        let _this = this;
        this.$prompt('请输入审批意见', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let obj = {nodeId: this.formObj.needToDoNodeId,disposeOpinion: value, disposeResult: '同意'};
          _this.nodeSubmit(obj);
          this.control.isShowOffice = true;
        }).catch(() => {
          this.control.isShowOffice = true;
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },


      //附件
      showAtta() {
        if (!this.formObj.code) {
          this.$message({type: 'error', showClose: true, message: '没有公文编号，无法上传附件'});
          return;
        }
        ;
        let url = '';
        let action = '查阅';//行为包括：查阅、编辑、关闭
        // `2F769D4A-C504-4EE3-A0A7-006FF5C710D6|陈少佳|A02939|合同|FL1001121-1|无烟煤购销合同|编辑|1|打印|0`)).replace('=',':').replace('=',':').replace('&','')
        action =this.formObj.isEditAtt? '编辑':'查阅';
        url = this.attTokenKey
          + '|' + this.login_user.name
          + '|' + this.login_user.fdEmployeeNumber
          + '|' + this.formObj.subject
          + '|' + this.formObj.code
          + '|' + this.formObj.title
          + '|' + action
          + '|' + '1'
          + '|' + ''
          + '|' + '0';
        url = `hwagain-attch:` + (Base64.encode(url)).replace('=', ':').replace('=', ':').replace('&', '');
        console.log(url);
        window.location.href = url;
      },

      //2019/07/08
      //退回、同意  应该做成同一个组件，
      //退回
      doShowBack(val) {
        this.control.isShowOffice = false;
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
        let obj = {nodeId: this.formObj.needToDoNodeId, disposeOpinion: this.opinionBack, disposeResult: '退回'};
        this.nodeSubmit(obj,val);
        this.control.isShowOffice = true;
        this.dialogOpinionBack = false;
      },
      backDialogClose() {
        this.control.isShowOffice = true;
        this.dialogOpinionBack = false;
      },

      //同意提交
      doShowAgreement(val) {
        this.control.isShowOffice = false;
        this.nodeType=val;
        this.opinionAgree = this.opinionAgree != '' ? this.opinionAgree : val;
        this.dialogOpinion = true;
      },
      doOpinionConfirm(val) {
        this.opinionAgree = this.$refs.opinionForm.auditOpinion || '';
        let obj = {nodeId: this.formObj.needToDoNodeId,disposeOpinion: this.opinionAgree, disposeResult: '同意'};
        this.nodeSubmit(obj,val);
        this.control.isShowOffice = true;
        this.dialogOpinion = false;
      },
      opinionDialogClose() {
        this.control.isShowOffice = true;
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
    },
    created() {
      // var obj = this.$store.state.salary.commParams || {};
      // this.mainObj = obj || {};
      // console.log('1111 ：', obj)
    },
    mounted() {

      var obj = this.$store.state.salary.commParams || {};
      this.formObj = obj || {};
      this.formObj.isEditAtt=true;//允许编辑附件
      this.currentNodeTypeName=this.formObj.currentNodeType=='审批'?'同意审批':'同意提交';
      this.initPage();
      this.getTableHeight();

    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





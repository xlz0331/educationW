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
            <el-button type="primary" @click="showFlowNode()">查看审核审批流程</el-button>
            <el-button v-if="control.isReCallBack" type="primary" @click="doRecallBack('撤回修改')">撤回修改</el-button>
            <!--<el-button type="primary" @click="doBack('退回修改')">退回修改</el-button>-->
            <!--<el-button type="primary" @click="doSubmit('同意提交')">同意提交</el-button>-->
            <el-button type="warning" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-row>
      <!--<el-row class="text-left">-->
        <!--&lt;!&ndash;<el-col :span="12" class="text-left">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="公文题目:">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-input v-model="formObj.title" placeholder=""></el-input>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="6" class="text-left">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="公文编号:">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-input readonly v-model="formObj.code" placeholder=""></el-input>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
      <!--</el-row>-->
    </el-form>
    <div :style="(control.isShowOffice?'':'display:none;')+'height:'+tableHeight+'px'">
      <office-control :filePath="filePath" :objectHeight="tableHeight"></office-control>
    </div>
    <el-dialog title="审核审批意见查阅" width="80%"
               :visible.sync="dialogFlow" :close-on-click-modal="false"
               :before-close="flowDialogClose" :show-close="false">
      <div slot="title">
        <div>审核审批意见查阅</div>
        <el-button type="primary" class="close-right" @click="dialogFlow=false">返回上级</el-button>
      </div>
      <flow-node :instance-id="formObj.instanceId"></flow-node>
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
  import Org_API from '@/api/org/org'


  export default {
    name: "doc_audit",
    data() {
      return {
        control: {
          isShowOffice: true,
          isReCallBack:false
        },
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
      FlowNode,
      EmployeeSelect,
      DocControl,
      OfficeControl
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
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
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
        this.checkCanRecallBack();
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

      nodeSubmit(params) {
        WaittingApproval_API.nodeSubmit(params).then(res => {
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
      //退回修改
      doBack(val) {
        this.control.isShowOffice = false;
        let _this = this;
        this.$prompt('请输入退回修改意见', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let obj = {nodeId: this.formObj.fdId, disposeOpinion: value, disposeResult: '退回'};
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
          let obj = {nodeId: this.formObj.fdId,disposeOpinion: value, disposeResult: '同意'};
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
        window.location.href = url;
      },

      checkCanRecallBack(){
        let params={instanceId:this.formObj.fdId};
        WaittingApproval_API.checkCanRecallBack(params).then(res => {
          this.control.isReCallBack=res.data||false;
        }).catch(err => {
          this.$message({type: 'error', message: '权限判断异常：' + err.msg})
        });
      },

      doRecallBack(val) {
        this.control.isShowOffice = false;
        let _this=this;
        this.$confirm('确定要【'+val+'】吗？', {type: 'warning'}).then((item) => {
          let params={instanceId:_this.formObj.fdId};
          WaittingApproval_API.recallBack(params).then(res => {
            this.control.isShowOffice = true;
            if (res.success) {
              this.$message({type: 'success', message: `${val}成功！`});
              _this.goback(-1);
            }
            else {
              this.$message({type: 'error', message: `${val}失败！` + res.msg});
            }
          }).catch(err => {
            this.control.isShowOffice = true;
            this.$message({type: 'error', message: `${val}失败:` + err.msg})
          });
        }).catch(err => {
          this.$message({type: 'info', showClose: true, message: '取消操作......'})
        })
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
      this.formObj.isEditAtt=false;
      this.getTableHeight();
      this.initPage();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





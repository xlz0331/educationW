<template>
  <div class="_container">
    <el-row>
      <el-col :span="24">
        <div><b>{{this.formObj.subject}}拟稿发起界面</b></div>
      </el-col>
    </el-row>
    <el-form label-width="90px">
      <el-row class="text-left">
        <el-col :span="24" class="text-right">
          <div>
            <el-upload
              class="upload-demo "
              :action="wfFileUploadUrl()"
              :show-file-list="false"
              :with-credentials="true"
              :on-success="loadAtta"
              :on-error="handError()"
              :on-remove="handleRemove">
              <el-button size="small" type="primary">正文上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
            <!--<el-button type="primary" @click="loadAtta()">刷新</el-button>-->
            <el-button type="primary" @click="showAtta()">附件列表</el-button>
            <el-button type="primary" @click="showFlowNode()">审核审批意见查阅</el-button>
            <el-button type="primary" @click="doSave('未提交保存')">未提交保存</el-button>
            <el-button type="primary" @click="doSubmit('完成提交')">完成提交</el-button>
            <el-button type="warning" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="text-left">
        <el-col :span="12" class="text-left">
          <el-form-item label="公文题目:">
            <el-input v-model="formObj.title" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="text-left">
          <el-form-item label="公文编号:">
            <el-input readonly v-model="formObj.code" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="text-left">
        <el-col :span="5" class="text-left">
          <el-form-item label="拟稿人:">
            <el-input readonly v-model="formObj.draftUser">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="text-left">
          <el-form-item label="传审核人:">
            <el-input readonly v-model="formObj.aduitUser">
              <el-button slot="append" icon="el-icon-user" @click="showEmployeeSelect('audit')"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="text-left">
          <el-form-item label="传审批人:">
            <el-input readonly v-model="formObj.approveUser">
              <el-button slot="append" icon="el-icon-user" @click="showEmployeeSelect('approve')"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div :style="(control.isShowOffice?'':'display:none;')+'height:'+tableHeight+'px'">
      <office-control :key="key" :filePath="filePath" :objectHeight="tableHeight"></office-control>
    </div>
    <!--工资网没有组织架构的人员选择、暂时先用-->
    <el-dialog :title="empTitle" width="66%" :key="keyVal"
               :visible.sync="dialogEmployeeSelect" :close-on-click-modal="false"
               :before-close="empSelectDialogClose">
      <div>
        <el-row class="text-left">
          <el-col :span="24" class="text-right">
            <div>
              <el-button type="primary" v-if="empSelectType==='audit'" @click="showRulesExpalin(empSelectType)">{{empSelectTypeName}}确定规则</el-button>
              <el-button type="primary" @click="doSelectedEmp()">确认</el-button>
              <el-button type="warning" @click="doCancelEmp()">取消</el-button>
            </div>
          </el-col>
        </el-row>
        <employee-select ref="cp_empSelect" :selectedEmployeeStr="formObj.selectedEmployeeStr"
                         :empList="empList"></employee-select>

      </div>
    </el-dialog>
    <el-dialog title="【审核审批流程】" width="80%"
               :visible.sync="dialogFlow" :close-on-click-modal="false"
               :before-close="flowDialogClose" :show-close="false">
      <div slot="title">
        <div>审核审批意见查阅</div>
        <el-button type="primary" class="close-right" @click="dialogFlow=false">返回上级</el-button>
      </div>
      <flow-node :instance-id="formObj.instanceId"></flow-node>
    </el-dialog>
    <el-dialog :title="rulesTitle" width="60%" :close-on-click-modal="false"
               :visible.sync="dialogRules" >
      <div  v-if="empSelectType==='audit'" class="text-left">
        1、要求：为工资保密需要，拟稿人在选择审核人时需考虑审核人是否能够查看该拟稿内容涉及人员的工资，如审核人或审批人发现未按规则执行，作拟稿人严重工作失职处理。
        <br>2、审核人确定规则
        <br>（1）副总及以上人员：原则上除集团薪酬管理员、谈薪人或董事长特殊授权人员外，不允许传其他人审核。
        <br>（2）副总以下人员：原则上可以传以下人员审核。
        <br>①谈薪人或算薪权限范围内的薪酬管理员
        <br>②审核人比其职等高2级的体系领导，原则上可以传审核。
        <br>③其它参与工资讨论会议或特殊授权的人员。
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
  .upload-demo {
    width: 80px;
    display: inline-block;
    .el-button--primary {
      padding: 5px 10px;
    }
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import {getCookie, TokenKey} from '@/utils/Cookie'
  import FlowNode from "@/views/approval/com/flow_node";
  import DocControl from "@/views/approval/com/doc/docControl";
  import OfficeControl from "@/views/approval/com/doc/officeControl";
  // import docHeader from "@/views/approval/com/doc/doc_header";
  import EmployeeSelect from "@/views/approval/com/employee_select";
  import WaittingApproval_API from '@/api/approval/waittingApproval'
  import Org_API from '@/api/org/org'


  export default {
    name: "doc_fraft",
    props: {
      isNew: {
        type: Boolean,
        required: true
      },
      mainObj: {
        type: Object,
        required: false
      },
      formData: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        control: {
          isShowOffice: true
        },
        dialogRules:false,
        rulesTitle:'',
        keyVal: '',
        key: '',
        tableHeight: 500,
        dialogFlow: false,
        dialogEmployeeSelect: false,
        empSelectType: 'audit',
        empSelectTypeName: '',
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
          draftUser: '',
          aduitUser: '',
          approveUser: '',
          isTempSave: '',//是否是“未提交保存”(是/否)

          selectedEmployeeStr: '',
          nodeTyped: '待提交',
          isOfferBankAccount: true,  //是否提供银行流水（注：提交参数时记得添加至相应的对象中），
        },
        empList: [],
        empTitle: ''
      }
    },
    watch: {
      mainObj: function (obj) {
        this.formObj = obj || {};
      }
    },
    computed: {
      ...mapGetters(['login_user']),
    },
    components: {
      FlowNode,
      EmployeeSelect,
      DocControl,
      OfficeControl,
      // docHeader
      fileList: []
    },
    methods: {
      wfFileUploadUrl() {
        console.log('url', WaittingApproval_API.wfFileUploadUrl({instanceId: this.formObj.instanceId}));
        return WaittingApproval_API.wfFileUploadUrl({instanceId: this.formObj.instanceId})
      },
      handlePreview(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handError(file) {
        console.log(file)
        // this.$message({type: 'error', showClose: true, message: '附件上传失败' });
      },
      //公共方法
      getTableHeight() {
        this.tableHeight = window.innerHeight - 220;
      },

      goback() {
        history.go(-1)
      },

      //查找所有人员
      findEmployeeIntoList(params) {
        Org_API.findEmployeeIntoList(params).then(res => {
          // this.tableData = res.data || [];
          this.empList = res.data || [];
          this.empList.forEach((_item, _index) => {
            _item.key = _item.userName;
          })
        }).catch(err => {
          this.$message({type: 'error', message: '查找人员接口异常：' + err.msg})
        });
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
        this.control.isShowOffice = true;
      },
      //弹出人员选择
      showEmployeeSelect(val) {
        this.control.isShowOffice = false;
        // this.keyVal = new Date().getTime() + '_';
        this.keyVal = val + '_';
        this.empSelectType = val;
        this.formObj.selectedEmployeeStr = '';
        if (this.empSelectType === 'audit') {
          this.empTitle = '审核人选择界面';
          this.empSelectTypeName = '审核人';
          this.formObj.selectedEmployeeStr = this.formObj.aduitUser || '';
          this.dialogEmployeeSelect = true;
        } else if (this.empSelectType === 'approve') {
          this.empTitle = '审批人选择界面';
          this.empSelectTypeName = '审批人';
          this.formObj.selectedEmployeeStr = this.formObj.approveUser || '';
          this.dialogEmployeeSelect = true;
        }

      },
      //关闭人员选择
      doCancelEmp() {
        this.dialogEmployeeSelect = false;
        this.control.isShowOffice = true;
      },
      empSelectDialogClose() {
        this.control.isShowOffice = true;
        this.dialogEmployeeSelect = false;
      },
      //流程查阅
      showFlowNode() {
        if (this.mainObj.fdid) {
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
      //
      // testDraftSubmit(params) {
      //   WaittingApproval_API.testDraftSubmit(params).then(res => {
      //     if (res.success) {
      //       this.$message({type: 'success', showClose: true, message: '保存成功！'});
      //       this.goPage();
      //     }
      //     else {
      //       this.$message({type: 'error', showClose: true, message: '保存失败！' + res.msg});
      //     }
      //
      //   }).catch(err => {
      //     this.$message({type: 'error', showClose: true, message: '保存失败：' + err.msg})
      //   });
      // },

      showRulesExpalin(empSelectType){
        this.rulesTitle=empSelectType==='audit'?'审核人确定规则':'审批人确定规则';
        this.dialogRules=true;
      },

      draftSubmit(params) {
        WaittingApproval_API.draftSubmit2(params).then(res => {
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
      doSave(val) {
        if (this.formObj.title == null || this.formObj.title.trim() == '') {
          this.$message({type: 'error', showClose: true, message: '公文标题不能为空'})
          return;
        }
        let params = this.formObj || {};
        let _this = this;
        params.isTempSave = (val == '未提交保存' ? '是' : '否');
        if (this.formObj.code == null || this.formObj.code == '') {
          WaittingApproval_API.getWorkFlowCode({code: this.mainObj.codePre}).then(res => {
            this.formObj.code = res.data || '';
            _this.draftSubmit(params);
          }).catch(err => {
            this.$message({type: 'error', showClose: true, message: '流程编号获取异常：' + err.msg})
          });
        }
        else {
          this.draftSubmit(params);
        }
      },
      doSubmit(val) {
        let params = this.formObj || {};
        let _this = this;
        if (this.formObj.title == null || this.formObj.title.trim() == '') {
          this.$message({type: 'error', showClose: true, message: '公文标题不能为空'})
          return;
        }
        this.control.isShowOffice = false;
        this.$confirm('确定要【完成提交】吗？', {type: 'warning'}).then((item) => {
          this.control.isShowOffice = true;
          params.isTempSave = (val == '未提交保存' ? '是' : '否');
          // params.instanceId = params.fdId || '';
          if (this.formObj.code == null || this.formObj.code == '') {
            WaittingApproval_API.getWorkFlowCode({code: this.mainObj.codePre}).then(res => {
              this.formObj.code = res.data || '';
              _this.draftSubmit(params);
            }).catch(err => {
              this.control.isShowOffice = true;
              this.$message({type: 'error', message: '流程编号获取异常：' + err.msg})
            });
          }
          else {
            _this.draftSubmit(params);
          }
        }).catch(err => {
          // this.$message({type: 'error', message: '已取消提交'});
        })
      },


      //获取及初始化atttoken
      getAndInitAttToken(params) {
        WaittingApproval_API.getAndInitAttToken(params).then(res => {
          // this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '获取AttToken异常：' + err.msg})
        });
      },
      getId() {
        WaittingApproval_API.getId2().then(res => {
          // this.instanceId=res.data||'';
          this.formObj.instanceId = res.data || '';
          // this.tableData = res.data || [];
        }).catch(err => {
          // this.formObj.fdId = err || '';
          // console.log('err',String.valueOf(err) )
          // console.log(' this.formObj.',  this.formObj)
          this.$message({type: 'error', message: '获取流程实例Id异常：' + err.msg})
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
        //key验证
        let attkey = getCookie(TokenKey);
        this.attTokenKey = attkey.substring(0, 16) || '';
        this.getAndInitAttToken({tokenId: this.attTokenKey});

        if (this.isNew) {
          this.formObj.draftUser = this.login_user.name//拟稿人
          this.getWorkFlowCode();//获取流程编号
          this.getId();//流程实例Id
        } else {
          this.formObj.instanceId = this.formObj.fdId;
          this.loadAtta();
        }

      },

      //刷新附件
      loadAtta() {
        // let params = {fdid: '1142964991513739264'}
        // this.filePath = WaittingApproval_API.wfFileDownload(params);
        // let val = this.formObj.fdId;
        // let params = {fdid: val}
        // this.filePath = WaittingApproval_API.wfFileDownload(params);

        //@2019/06  用附件列表的第一个附件
        // let params = {wfCode: this.formObj.code}
        // this.filePath = WaittingApproval_API.downloadWfWorkFile(params);
        // this.key = new Date().getTime() + '_';

        //@2019/07/26
        let params = {fdid: this.formObj.instanceId}
        this.filePath = WaittingApproval_API.wfFileDownload(params);
        this.key = new Date().getTime() + '_';
      },

      //附件
      showAtta() {
        if (!this.formObj.code) {
          this.$message({type: 'error', showClose: true, message: '没有公文编号，无法上传附件'});
          return;
        }
        let url = '';
        let action = '查阅';//行为包括：查阅、编辑、关闭
        action = this.formObj.isEditAtt ? '编辑' : '查阅';
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
        console.log('url0:', url);
        url = `hwagain-attch:` + (Base64.encode(url)).replace('=', ':').replace('=', ':').replace('&', '');
        console.log('url1:', url);
        window.location.href = url;
      }
    },
    created() {
      this.formObj = this.mainObj || {};
      // var obj = this.$store.state.salary.commParams || {};
      // this.mainObj = obj || {};
      // console.log('1111 ：', obj)
    },
    mounted() {
      this.getTableHeight();
      // this.loadAtta();
      this.initPage();
      this.findEmployeeIntoList({empName: ''});
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>





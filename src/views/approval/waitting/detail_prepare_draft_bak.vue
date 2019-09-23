<template>
  <div class="draft_container" style="">
    <el-row>
      <el-col :span="24">
        <div><b>【入职薪酬报批拟稿】界面</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-form>
        <el-col :span="24" class="text-right">
          <div>
            <el-checkbox   label="开启修改" title="打钩：可进行编辑并提交保存；没有打钩：不可编辑" border></el-checkbox>
            <el-checkbox   label="提供银行流水" border title="打钩：需要提供流水；没有打钩：不提供银行流水"></el-checkbox>
            <!--<el-button type="primary" @click="show('')">不提供银行流水</el-button>-->
            <el-button type="primary" @click="showFlowNode('')">查阅审核审批流程</el-button>
            <el-button type="primary" @click="doSave()">未提交保存</el-button>
            <el-button type="primary" @click="doSubmit()">完成提交</el-button>
            <el-button type="primary" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <div :style="'max-height:'+tableHeight+'px;overflow-y: auto;border-top:'">
      <el-form label-width="90px">
        <el-row class="text-left">
          <el-col :span="12" class="text-left">
            <el-form-item label="公文题目:">
              <el-input v-model="formData.title" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="text-left">
            <el-form-item label="公文编号:">
              <el-input v-model="formData.title" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="text-left">
          <el-col :span="5" class="text-left">
            <el-form-item label="拟稿人:">
              <el-input v-model="formData.title" placeholder="">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" class="text-left">
            <el-form-item label="传审核人:">
              <el-input v-model="formData.title" placeholder="">
                <el-button slot="append" icon="el-icon-user" @click="showEmployeeSelect()"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="text-left">
            <el-form-item label="传审批人:">
              <el-input v-model="formData.title" placeholder="">
                <el-button slot="append" icon="el-icon-user" @click="showEmployeeSelect()"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>1.岗位信息及入职薪酬</b></span>
            <el-button style="float: right;" type="primary" @click="showSalaryStand('')">职等工资标准查看</el-button>
          </div>
          <table class="table el-table el-table--border ">
            <thead>
            <tr>
              <th rowspan="2">录用人</th>
              <th rowspan="2">性别</th>
              <th rowspan="2">身份证号</th>
              <th rowspan="2">录用公司</th>
              <th rowspan="2">录用部门</th>
              <th rowspan="2">录用岗位</th>
              <th colspan="2">录用职等职级</th>
              <th rowspan="2">试用期</th>
              <th rowspan="2">计划入职时间</th>
              <th rowspan="2" style="width: 80px">入职借款（万元）</th>
              <th colspan="3">入职薪酬</th>
            </tr>
            <tr>
              <th>职等</th>
              <th style="width: 60px">职级</th>
              <th style="width: 60px">职级</th>
              <th style="width: 60px">月薪(元)</th>
              <th style="width: 60px">年薪（万元）</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td> 1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>9</td>
              <td>10</td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
            </tr>
            </tbody>
          </table>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>1.1 薪酬结构</b></span>
          </div>
          <table class="table el-table el-table--border">
            <thead>
            <tr class="text-center">
              <th colspan="4">年薪</th>
              <th colspan="6">月薪酬项目结构（元）</th>
              <th colspan="6">月薪酬减项（元）</th>
              <th rowspan="2">月应发工资(元)</th>
            </tr>
            <tr>
              <th>合计</th>
              <th>年薪资奖励</th>
              <th>年绩效工资</th>
              <th>12个月月薪</th>

              <th>月工资</th>
              <th>年休假</th>
              <th>满勤奖</th>
              <th>交通餐饮补助</th>
              <th>小计</th>
              <th>12个月月薪（万元）</th>

              <th>绩效工资</th>
              <th>工资借款</th>
              <th>报账工资</th>
              <th>契约津贴</th>
              <th>福利借款</th>
              <th>小计</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>

              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>

              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
            </tr>
            </tbody>
          </table>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>1.2 入职借款</b></span>
          </div>
          <table class="table el-table el-table--border" style="width: 50%">
            <thead>
            <tr>
              <th>是否有入职借款</th>
              <th>借款总额（万元）</th>
              <th>还款月数（月）</th>
              <th>每月还款金额</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.title" placeholder=""></el-input>
              </td>

            </tr>
            </tbody>
          </table>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>2.原公司待遇与我司待遇对比</b></span>
            <div style="float: right;">
              <el-button type="primary">上传银行流水</el-button>
              <el-button type="primary">银行流水查看</el-button>
              <el-button type="primary" @click="doSave()">增加固定收入行</el-button>
              <el-button type="primary">增加绩效收入行</el-button>
            </div>
          </div>
          <table class="table el-table el-table--border">
            <thead>
            <tr style="text-align: left!important;">
              <th colspan="4" style="text-align: left!important;border-right: none">
                <span>原单位：</span>
              </th>
              <th colspan="3" style="text-align: left!important;"><span class="text-left">工作地点：  </span></th>
              <th colspan="4" style="text-align: left!important;border-right: none"><span class="text-left">原单位： </span>
              </th>
              <th colspan="4" style="text-align: left!important;"><span class="text-left"> 工作地点：</span></th>
            </tr>
            <tr>
              <th style="width: 35px">序号</th>
              <th>项目</th>
              <th>金额</th>
              <th>发放周期及频率</th>
              <th>年度总额</th>
              <th>占比</th>
              <th>备注说明</th>
              <th style="width: 35px">序号</th>
              <th>项目</th>
              <th>金额</th>
              <th>发放周期及频率</th>
              <th>年度总额</th>
              <th>占比</th>
              <th>备注说明</th>
              <th style="width: 40px">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in formData.bankStateList">
              <td>
                {{item.seq}}
              </td>
              <td>
                <el-input v-model="item.projectNameprojectName" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>

              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>
              <td>
                {{item.seq}}
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.projectName" placeholder=""></el-input>
              </td>

              <td>
                <el-button type="danger" icon="el-icon-delete" round></el-button>
                <!--<i class="el-icon-delete" title="删除行" typeof="danger"></i>-->
              </td>
            </tr>
            </tbody>
          </table>

        </el-card>

        <el-row class="text-left">
          <el-col :span="24" class="text-left">
            <el-form-item label-width="120px" label="录用理由:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="formData.title"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="text-left">
          <el-col :span="24" class="text-left">
            <el-form-item label-width="120px" label="薪酬确定理由:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="formData.title"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-dialog title="审核审批意见查阅" width="80%" :close-on-click-modal="false"
               :visible.sync="dialogFlow">
     <flow-node :instance-id="fdId"></flow-node>
    </el-dialog>
    <el-dialog title="【职等工资标准】查看" width="80%" :close-on-click-modal="false"
               :visible.sync="dialogSalaryStand">
      <salary-standard-grade :instance-id="fdId">
      </salary-standard-grade>
    </el-dialog>
    <el-dialog title="【报账工资标准】录入" width="80%" :close-on-click-modal="false"
               :visible.sync="dialogReimburse">
      <!--<salary_standard_reimburse :instance-id="fdId"></salary_standard_reimburse>-->
    </el-dialog>
    <el-dialog title="人员选择" width="50%" :close-on-click-modal="false"
               :visible.sync="dialogEmployeeSelect">
     <employee-select instance-id=""></employee-select>
    </el-dialog>

  </div>
</template>
<style lang="scss" scoped>
  .draft_container {
    max-width: 1320px;
    .el-select, el-input-number, .el-autocomplete {
      width: 100%;
    }
    .el-row {
      margin-bottom: 2px !important;
    }
    .el-checkbox{
      margin-left: 5px;
      margin-right: 5px;
    }
  }
</style>
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
            line-height: 2px !important;
            font-weight: 300;
            background-color: #fff !important;
          }
          td {
            background-color: #fff !important;
            padding: 0;
            .el-input--mini .el-input__inner {
              /*border: none;*/
              width: 90%;
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
  }

</style>
<script>
  import WaittingApproval_API from '@/api/approval/waittingApproval'
  import FlowNode from "../com/flow_node";
  import EmployeeSelect from "../com/employee_select";
  import SalaryStandardGrade from "../com/entry/salary_standard_grade";
  import SalaryStandardReimburse from "../com/salary_standard_reimburse";

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        dialogReimburse:false,
        dialogVisible: false,
        dialogFlow: false,
        dialogSalaryStand:false,
        dialogEmployeeSelect:false,
        tableHeight: null,
        title: '',
        tableData: [
          {
            subject: '1',
            title: '2',
            createrName: '3',
            createTime: '4',
            currentNodeName: '5',
          }
        ],
        userName: '',
        fdId: '1139375674434433024',
        formData: {
          fdId: '',
          title: '',
          bankStateList: [
            {
              seq: '1',
              rowType: 1,
              projectName: '',
            },
            {
              seq: '2',
              rowType: 2,
              projectName: '50',
            }
            ,
            {
              seq: '3',
              rowType: 3,
              projectName: '',
            }
            ,
            {
              seq: '2',
              rowType: 4,
              projectName: '绩效收入小计',
            }

          ]
        },
        flowData:{instanceId:''},//
        mainObj: {fdId: ''}//主表对象
      }
    },
    watch: {
      '$route': function () {
        this.getTableHeight();
      }
    },
    components: {
      SalaryStandardReimburse,
      EmployeeSelect,
      FlowNode,
      SalaryStandardGrade
    },
    methods: {
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
      queryNeedToDoList() {
        WaittingApproval_API.queryNeedToDoList().then(res => {
          // this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },

      //判断是否拟稿节点
      findOneInstance(params) {
        WaittingApproval_API.findOneInstance(params).then(res => {

          // this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },

      initPage() {
        var obj = this.$store.state.salary.commParams || {};
        this.mainObj = obj;
        let params = {instanceId: this.mainObj.fdId};
        this.findOneInstance(params);
      },
      doSave() {
        let obj = {seq: 6, projectName: 'ces'};
        this.formData.bankStateList.push(obj);
      },
      doSubmit() {
        if (this.mainData.fdId == '' || this.tableData.length <= 0) {
          this.$message({type: 'info', message: '没有需要提交的数据！'});
          return;
        }
        this.$confirm('确定要【完成提交】', {type: 'warning'}).then((item) => {
          let para = {fdId: this.mainData.fdId};
          Salary_API.draftSubmit(para).then(res => {
            if (res.success) {
              this.$message({type: 'success', message: '提交成功！【' + this.queryParams.salaryYearAndMon + '】'})
              this.initPage();
            }
            else {
              this.$message({type: 'error', message: '提交失败！' + res.msg});
            }
          }).catch(err => {
            this.$message({type: 'error', message: '提交失败：' + err.msg})
          });
        }).catch(error => {
          this.$message({type: 'info', message: '已取消提交'});
        });
        ;
      },

      showDialog(obj){

      },

      showFlowNode() {
        this.dialogFlow = true;
      },
      showSalaryStand(obj) {
        this.dialogSalaryStand = true;
      },
      showEmployeeSelect(){
        this.dialogEmployeeSelect=true;
      },
      goback() {
        history.go(-1)
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





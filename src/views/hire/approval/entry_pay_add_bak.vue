<template>
  <div class="draft_container" style="">
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
            <el-checkbox v-model="formData.hireEntrySalaryConfirmDto.isOfferBackAccount" label="提供银行流水" border
                         title="打钩：需要提供流水；没有打钩：不提供银行流水"></el-checkbox>
            <!--<el-button type="primary" @click="show('')">不提供银行流水</el-button>-->
            <!--<el-button type="primary" @click="showFlowNode('')">查阅审核审批流程</el-button>-->
            <el-button type="primary" @click="doSave()">未提交保存</el-button>
            <el-button type="primary" @click="doSubmit()">完成提交</el-button>
            <el-button type="primary" @click="goback()">返回上级</el-button>
          </div>
        </el-col>
      </el-row>

      <!--<el-row class="text-left">-->
      <!--<el-col :span="12" class="text-left">-->
      <!--<el-form-item label="公文题目:">-->
      <!--<el-input v-model="formData.title" placeholder=""></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="6" class="text-left">-->
      <!--<el-form-item label="公文编号:">-->
      <!--<el-input v-model="formData.title" placeholder=""></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row class="text-left">-->
      <!--<el-col :span="5" class="text-left">-->
      <!--<el-form-item label="拟稿人:">-->
      <!--<el-input v-model="formData.title" placeholder="">-->
      <!--</el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="7" class="text-left">-->
      <!--<el-form-item label="传审核人:">-->
      <!--<el-input v-model="formData.title" placeholder="">-->
      <!--<el-button slot="append" icon="el-icon-user" @click="showEmployeeSelect()"></el-button>-->
      <!--</el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="6" class="text-left">-->
      <!--<el-form-item label="传审批人:">-->
      <!--<el-input v-model="formData.title" placeholder="">-->
      <!--<el-button slot="append" icon="el-icon-user" @click="showEmployeeSelect()"></el-button>-->
      <!--</el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
    </el-form>

    <div :style="'max-height:'+tableHeight+'px;overflow-y: auto;border-top:'">
      <el-form label-width="90px">
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
              <th rowspan="2" style="width: 80px">计划入职<br>时间</th>
              <th rowspan="2" style="width: 80px">入职借款<br>（万元）</th>
              <th colspan="3">入职薪酬</th>
            </tr>
            <tr>
              <th>职等</th>
              <th style="width: 60px">职级</th>
              <th style="width: 60px">职级</th>
              <th style="width: 60px">月薪(元)</th>
              <th style="width: 60px">年薪(万元)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td> {{formData.hireEntrySalaryConfirmDto.name}}</td>
              <td>{{formData.hireEntrySalaryConfirmDto.sex}}</td>
              <td>{{formData.hireEntrySalaryConfirmDto.nid}}</td>
              <td>{{formData.hireEntrySalaryConfirmDto.company}}</td>
              <td>{{formData.hireEntrySalaryConfirmDto.dept}}</td>
              <td>{{formData.hireEntrySalaryConfirmDto.position}}</td>
              <td>{{formData.hireEntrySalaryConfirmDto.jobGrade}}</td>
              <td style="width: 60px;text-align: center;">
                <el-select v-model="formData.hireEntrySalaryConfirmDto.salaryJobLevel" placeholder="请选择">
                  <el-option
                    v-for="item in salaryJobLevelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td>{{formData.hireEntrySalaryConfirmDto.tryrange}}</td>
              <td>{{formData.hireEntrySalaryConfirmDto.planEntryDay}}</td>
              <td>
                <el-input v-model="formData.hireEntrySalaryConfirmDto.entryBorrow"
                          @change="entryBorrowChange()"></el-input>
              </td>
              <td style="cursor: pointer" @click="showRankEdit(item)">
                <a>
                  {{formData.hireEntrySalaryConfirmDto.salaryRank?formData.hireEntrySalaryConfirmDto.salaryRank:'--'}}
                </a>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryConfirmDto.entryMonthSalary" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryConfirmDto.entrySalary" placeholder=""></el-input>
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
              <th colspan="4">年薪（万元）</th>
              <th colspan="6">月薪酬项目结构（元）</th>
              <th colspan="6">月薪酬减项（元）</th>
              <th rowspan="2">月应发工资<br>(元)</th>
            </tr>
            <tr>
              <th>合计</th>
              <th>年薪资<br>奖励</th>
              <th>年绩效<br>工资</th>
              <th>12个月<br>月薪</th>

              <th>月工资</th>
              <th>年休假</th>
              <th>满勤奖</th>
              <th>交通餐饮<br>补助</th>
              <th style="min-width: 80px">小计</th>
              <th>12个月月薪<br>(万元)</th>

              <th>绩效<br>工资</th>
              <th>工资<br>借款</th>
              <th>报账<br>工资</th>
              <th>契约<br>津贴</th>
              <th>福利<br>借款</th>
              <th style="min-width: 80px">小计</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.totalYearSalary" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.yearSalaryAward" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.yearPerformanceAppraisal" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.totalYearSalary" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.monthSalary" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.annualHoliday" placeholder=""></el-input>
              </td>

              <td>
                <el-input v-model="formData.hireEntrySalaryDto.fullFrequentlyAward" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.trafficaAllowance" placeholder=""></el-input>
              </td>
              <td>
                {{formData.hireEntrySalaryDto.totalMoneySalary}}
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.totalMoneySalary" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.meritPay" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.salaryBorrow" placeholder=""></el-input>
              </td>

              <td>
                <el-input v-model="formData.hireEntrySalaryDto.accountSalary" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.contractAllowance" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.awardBorrow" placeholder=""></el-input>
              </td>
              <td>
                {{formData.hireEntrySalaryDto.totalSubtract}}
              </td>
              <td>
                <el-input v-model="formData.hireEntrySalaryDto.actualMonthSalary" placeholder=""></el-input>
              </td>
            </tr>
            </tbody>
          </table>
        </el-card>

        <!--有入职借款的时候显示-->
        <el-card class="box-card"
        >
          <div slot="header" class="text-left">
            <span><b>1.2 入职借款</b></span>
          </div>
          <table class="table el-table el-table--border" style="width: 35%">
            <thead>
            <tr>
              <th>是否有入职借款</th>
              <th>借款总额（万元）</th>
              <th>还款月数（月）</th>
              <th>每月还款金额（万元）</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                {{formData.hireEntryBorrowMoneyDto.isBorrowText}}
              </td>
              <td>
                {{formData.hireEntryBorrowMoneyDto.totalBorrowMoney}}
              </td>
              <td>
                <el-input v-model="formData.hireEntryBorrowMoneyDto.periods" @change="periodsChange()"></el-input>
              </td>
              <td>
                {{formData.hireEntryBorrowMoneyDto.perRepay}}
              </td>
            </tr>
            </tbody>
          </table>
        </el-card>

        <el-card class="box-card" v-if="formData.hireEntrySalaryConfirmDto.isOfferBackAccount">
          <div slot="header" class="text-left">
            <span><b>2.原公司待遇与我司待遇对比</b></span>
            <div style="float: right;">
              <el-button type="primary">上传银行流水</el-button>
              <el-button type="primary">银行流水查看</el-button>
              <el-button type="primary" @click="addRow(1)">增加固定收入行</el-button>
              <el-button type="primary" @click="addRow(3)">增加绩效收入行</el-button>
            </div>
          </div>
          <table class="table el-table el-table--border">
            <thead>
            <tr style="text-align: left;">
              <th colspan="4" style="text-align: left!important;border-right: none">
                <span>原单位：</span>
              </th>
              <th colspan="4" style="text-align: left!important;"><span class="text-left">工作地点：  </span></th>
              <th colspan="4" style="text-align: left!important;border-right: none"><span class="text-left">原单位： </span>
              </th>
              <th colspan="4" style="text-align: left!important;"><span class="text-left"> 工作地点：</span></th>
            </tr>
            <tr>
              <th style="width: 35px">序号</th>
              <th>项目</th>
              <th>金额</th>
              <th colspan="2" style="width: 80px">发放周期及频率</th>
              <th>年度总额</th>
              <th style="width: 40px">占比</th>
              <th>备注说明</th>
              <th>项目</th>
              <th>金额</th>
              <th colspan="2" style="width: 80px">发放周期及频率</th>
              <th>年度总额</th>
              <th style="width: 40px">占比</th>
              <th>备注说明</th>
              <th style="width: 40px">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in formData.hireSalaryContrastDtos.filter(_fi=>_fi.state===1)">
              <td>
                {{item.seq}}
              </td>
              <td style="text-align: center">
                <el-input v-model="item.project" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.moneyAmount" placeholder=""></el-input>
              </td>
              <td style="width: 40px">
                <el-input v-model="item.period" placeholder=""></el-input>
              </td>
              <td style="width: 40px">
                <el-input v-model="item.frequency" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.yearMoneyAmount" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.proportion" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.remark" placeholder=""></el-input>
              </td>



              <td>
                <el-input v-model="item.hwProject" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwPmoneyAmount" placeholder=""></el-input>
              </td>
              <td style="width: 40px">
                <el-input v-model="item.hwPeriod" placeholder=""></el-input>
              </td>
              <td style="width: 40px">
                <el-input v-model="item.hwFrequency" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwYearMoneyAmount" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwProportion" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwRemark" placeholder=""></el-input>
              </td>
              <td>
                <el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>
                <!--<i class="el-icon-delete" title="删除行" typeof="danger"></i>-->
              </td>
            </tr>
            <tr class="td-warning"
                v-for="(item,index) in formData.hireSalaryContrastDtos.filter(_fi=>_fi.state===2)">
              <td>
                {{item.seq}}
              </td>
              <td :colspan="4" style="text-align: left;">
                {{item.project}}
              </td>
              <td style="display: none">
                <el-input v-model="item.moneyAmount" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.period" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.frequency" placeholder=""></el-input>
              </td>
              <td>
                {{item.yearMoneyAmount}}
              </td>
              <td>
               {{item.proportion}}
              </td>
              <td>
               {{item.remark}}
              </td>

              <td :colspan="4">
                {{item.hwProject}}
              </td>
              <td style="display: none">
                <el-input v-model="item.hwPmoneyAmount" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.hwPeriod" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.hwFrequency" placeholder=""></el-input>
              </td>
              <td>
                {{item.hwYearMoneyAmount}}
              </td>
              <td>
                {{item.hwProportion}}
              </td>
              <td>
                {{item.hwRemark}}
              </td>
              <td>
                <!--<el-button  type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>-->
              </td>
            </tr>
            <tr v-for="(item,index) in formData.hireSalaryContrastDtos.filter(_fi=>_fi.state===3)">
              <td>
                {{item.seq}}
              </td>
              <td style="text-align: center">
                <el-input v-model="item.project" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.moneyAmount" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.period" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.frequency" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.yearMoneyAmount" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.proportion" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.remark" placeholder=""></el-input>
              </td>

              <td>
                <el-input v-model="item.hwProject" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwPmoneyAmount" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwPeriod" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwFrequency" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwYearMoneyAmount" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwProportion" placeholder=""></el-input>
              </td>
              <td>
                <el-input v-model="item.hwRemark" placeholder=""></el-input>
              </td>
              <td>
                <el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>
                <!--<i class="el-icon-delete" title="删除行" typeof="danger"></i>-->
              </td>
            </tr>
            <tr class="td-warning"
                v-for="(item,index) in formData.hireSalaryContrastDtos.filter(_fi=>_fi.state===4||_fi.state===5)">
              <td>
                {{item.seq}}
              </td>
              <td :colspan="4" style="text-align: left">
                {{item.project}}
              </td>
              <td style="display: none">
                <el-input v-model="item.moneyAmount" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.period" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.frequency" placeholder=""></el-input>
              </td>
              <td>
               {{item.yearMoneyAmount}}
              </td>
              <td>
              {{item.proportion}}
              </td>
              <td>
               {{item.remark}}
              </td>

              <td :colspan="4">
                {{item.hwProject}}
              </td>
              <td style="display: none">
                <el-input v-model="item.hwPmoneyAmount" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.hwPeriod" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.hwFrequency" placeholder=""></el-input>
              </td>
              <td>
               {{item.hwYearMoneyAmount}}
              </td>
              <td>
               {{item.hwProportion}}
              </td>
              <td>
                {{item.hwRemark}}
              </td>
              <td>
                <!--<el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>-->
              </td>
            </tr>
            <tr   class="td-warning"
                v-for="(item,index) in formData.hireSalaryContrastDtos.filter(_fi=>_fi.state===6)">
              <td>
                {{item.seq}}
              </td>
              <td :colspan="11" style="text-align: left">
                {{item.project}}
              </td>
              <td style="display: none">
                <el-input v-model="item.moneyAmount" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.period" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.frequency" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.yearMoneyAmount" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.proportion" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.remark" placeholder=""></el-input>
              </td>

              <td style="display: none">
                <el-input v-model="item.hwProject" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.hwPmoneyAmount" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.hwPeriod" placeholder=""></el-input>
              </td>
              <td style="display: none">
                <el-input v-model="item.hwFrequency" placeholder=""></el-input>
              </td>
              <td>
              {{item.hwYearMoneyAmount}}
              </td>
              <td>
               {{item.hwProportion}}
              </td>
              <td>
               {{item.hwRemark}}
              </td>
              <td>
                <!--<el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>-->
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

    <el-dialog title="录用职等选择" width="80%" :close-on-click-modal="false"
               :visible.sync="dialogRank">
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
    .el-checkbox {
      margin-left: 5px;
      margin-right: 5px;
    }
    .el-button--mini.is-round {
      padding: 2px;
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
    .td-warning{
      background: #e1e3fa;
    }
  }

</style>
<script>
  import Hire_API from '@/api/hire/hire'
  import WaittingApproval_API from '@/api/approval/waittingApproval'
  import FlowNode from "@/views/approval/com/flow_node";
  import EmployeeSelect from "@/views/approval/com/employee_select";
  import SalaryStandardGrade from "@/views/approval/com/entry/salary_standard_grade";
  import SalaryStandardReimburse from "@/views/approval/com/entry/salary_standard_reimburse";

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        dialogRank: false,
        dialogReimburse: false,
        dialogVisible: false,
        dialogFlow: false,
        dialogSalaryStand: false,
        dialogEmployeeSelect: false,
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
          hireDraftDto: {},
          hireEntryBorrowMoneyDto: {},
          hireEntrySalaryConfirmDto: {},
          hireEntrySalaryDto: {},
          hireSalaryContrastDtos: [
            {
              createTime: null
              , createrId: null
              , fdId: ""
              , frequency: null
              , hwFrequency: null
              , hwMoneyAmount: null
              , hwPeriod: null
              , hwProject: null
              , hwProportion: null
              , hwProportionText: null
              , hwRemark: null
              , hwYearMoneyAmount: null
              , isDelete: 0
              , lastAlterId: null
              , lastAlterTime: null
              , moneyAmount: null
              , period: null
              , personalId: ""
              , project: null
              , proportion: null
              , proportionText: null
              , remark: null
              , state: 1
              , status: null
              , yearMoneyAmount: null
            },


          ],
          hireSalarySubProjectDtos: []
        },
        flowData: {instanceId: ''},//
        mainObj: {fdId: ''},//主表对象
        state4Row: [2, 4, 5],
        stateRow: [6],
        salaryJobLevelList: [
          {label: '优', value: '优'},
          {label: 'A', value: 'A'},
          {label: 'B', value: 'B'},
          {label: 'C', value: 'C'},
          {label: 'D', value: 'D'}
        ]
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



      //初始化
      initPage() {
        var obj = this.$store.state.salary.commParams || {};
        this.mainObj = obj;
        let params = {instanceId: this.mainObj.fdId};
        this.findAllByPersonalId({personalId: this.mainObj.fdId});

        //判断是否拟稿节点
        this.findOneInstance(params);
      },
      //判断是否拟稿节点
      findOneInstance(params) {
        WaittingApproval_API.findOneInstance(params).then(res => {
          // this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },
      findAllByPersonalId(params) {
        Hire_API.findAllByPersonalId(params).then(res => {
          this.formData = res.data || {};
          let data = this.formData.hireSalaryContrastDtos || [];
          data.forEach((item,index)=>{
            item.seq=index+1;
          })
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },

      //-----待遇对比-----
      addRow(val) {
        let obj = {state: val};//初始化对象，其他字段是否需要删除
        let data = this.formData.hireSalaryContrastDtos || [];
        data.push(obj);
        this.sortContrasData();
      },
      //删除行
      doDeleteOne(obj) {

        this.$confirm('确定要删除吗？', {type: 'warning'}).then((item) => {
          let contrasData = this.formData.hireSalaryContrastDtos || [];
          contrasData.forEach((_ite, index) => {
            if (_ite === obj) {
              contrasData.splice(index, 1)
            }
          })
          this.sortContrasData();
          if (obj.fdId != null && obj.fdId != '') {
            let para = {fdId: obj.fdId};
            return;
            Hire_API.deleteByFdId(para).then(res => {
              if (res.success) {
                this.$message({type: 'success', message: '删除成功！'});
                // this.initPage();
              }
              else {
                this.$message({type: 'error', message: '删除失败！' + res.msg});
              }
            }).catch(err => {
              this.$message({type: 'error', message: '删除失败：' + err.msg})
            });
          }

        }).catch(error => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },

      sortContrasData() {
        let data = this.formData.hireSalaryContrastDtos || [];
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data.length - 1 - i; j++) {
            if (data[j].state > data[j+1].state ) {
              let tdata = data[j];
              data[j] = data[j + 1];
              data[j + 1] = tdata;
            }
          }
        }

        data.forEach((item,index)=>{
          item.seq=index+1;
        })
      },
      //编辑
      entryBorrowChange() {
        if (this.formData.hireEntrySalaryConfirmDto.entryBorrow != 0) {
          this.formData.hireEntryBorrowMoneyDto.isBorrowText = '是';
          this.formData.hireEntryBorrowMoneyDto.isBorrow = 1;
          this.formData.hireEntryBorrowMoneyDto.totalBorrowMoney = this.formData.hireEntrySalaryConfirmDto.entryBorrow;
        } else {
          this.formData.hireEntryBorrowMoneyDto.isBorrowText = '否';
          this.formData.hireEntryBorrowMoneyDto.isBorrow = 0;
          this.formData.hireEntryBorrowMoneyDto.totalBorrowMoney = this.formData.hireEntrySalaryConfirmDto.entryBorrow;
        }
        this.periodsChange();

      },
      periodsChange() {
        this.formData.hireEntryBorrowMoneyDto.perRepay = null;
        if (this.formData.hireEntryBorrowMoneyDto.periods != 0
          && this.formData.hireEntryBorrowMoneyDto.periods != null) {
          let perNum = this.formData.hireEntryBorrowMoneyDto.totalBorrowMoney
            / this.formData.hireEntryBorrowMoneyDto.periods;
          this.formData.hireEntryBorrowMoneyDto.perRepay = perNum.toFixed(2);

        }
      },
      showRankEdit() {
        this.dialogRank = true;
      },

      //保存
      doSave() {
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


      /**
       *
       * 弹出框界面功能
       */
      showDialog(obj) {

      },
      showFlowNode() {
        this.dialogFlow = true;
      },
      showSalaryStand(obj) {
        this.dialogSalaryStand = true;
      },
      showEmployeeSelect() {
        this.dialogEmployeeSelect = true;
      },

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





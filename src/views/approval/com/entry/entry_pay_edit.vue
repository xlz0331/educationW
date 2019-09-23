<template>
  <div class="entry_container">
    <div>
      <el-form label-width="90px">
        <!--岗位信息及入职薪酬-->
        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>1.岗位信息及入职薪酬</b></span>
            <el-button style="float: right;" type="primary" @click="showSalaryStand()">职等工资标准查看</el-button>
          </div>
          <table class="table el-table el-table--border ">
            <thead>
            <tr>
              <th rowspan="2">录用人</th>
              <th rowspan="2">性别</th>
              <th rowspan="2" style="width: 150px">身份证号</th>
              <th rowspan="2">录用公司</th>
              <th rowspan="2">录用部门</th>
              <th rowspan="2">录用岗位</th>
              <th colspan="2">录用职等职级</th>
              <th rowspan="2">试用期</th>
              <th rowspan="2" style="width: 90px">计划入职<br>时间</th>
              <th rowspan="2" style="width: 70px">入职借款<br>（万元）</th>
              <th colspan="4">入职薪酬</th>
            </tr>
            <tr>
              <th>职等</th>
              <th style="width: 60px">职级</th>
              <th style="width: 70px">职级</th>
              <th style="width: 60px">类型</th>
              <th style="width: 80px">月薪(元)</th>
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
              <!--<td>{{formData.hireEntrySalaryConfirmDto.jobGrade}}</td>-->
              <td style="cursor: pointer;" @click="showGradeEdit('')">
                {{formData.hireEntrySalaryConfirmDto.salaryGrade?
                formData.hireEntrySalaryConfirmDto.salaryGrade
                :formData.hireEntrySalaryConfirmDto.jobGrade}}
              </td>
              <td style="width: 50px;text-align: center;">
                <el-input class="text-center" v-model="formData.hireEntrySalaryConfirmDto.salaryJobLevel"></el-input>
                <!--<el-select v-model="formData.hireEntrySalaryConfirmDto.salaryJobLevel" placeholder="请选择">-->
                <!--<el-option-->
                <!--v-for="item in salaryJobLevelList"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
              </td>
              <td>{{formData.hireEntrySalaryConfirmDto.tryrangeText}}</td>
              <td>{{formData.hireEntrySalaryConfirmDto.planEntryDay}}</td>
              <td>
                <el-input type="number" v-model="formData.hireEntrySalaryConfirmDto.entryBorrow"
                          @change="entryBorrowChange()"></el-input>
              </td>
              <td style="cursor: pointer">
                <el-select v-model="formData.hireEntrySalaryConfirmDto.salaryRank" placeholder="请选择"
                           @change="salaryRankChange()">
                  <el-option
                    v-for="item in salaryRankList"
                    :key="item.fdId"
                    :label="item.salaryRank"
                    :value="item.salaryRank">
                  </el-option>
                  <el-option :key="0" value=""></el-option>
                </el-select>
                <!--<a style="color:#45a1ff">-->
                <!--{{formData.hireEntrySalaryConfirmDto.salaryRank!=null-->
                <!--&& formData.hireEntrySalaryConfirmDto.salaryRank!=''-->
                <!--?formData.hireEntrySalaryConfirmDto.salaryRank:'&#45;&#45;'}}-->
                <!--</a>-->
              </td>
              <td>
                {{formData.hireEntrySalaryConfirmDto.salaryRank?'标准':'特资'}}
              </td>
              <td>
                <el-input v-if="!formData.hireEntrySalaryConfirmDto.salaryRank"
                          v-model="formData.hireEntrySalaryConfirmDto.entryMonthSalary"
                          @change="entryMonthSalaryChange"></el-input>
                <span v-else>{{formData.hireEntrySalaryConfirmDto.entryMonthSalary}}</span>

                <!--<a style="color:#45a1ff">-->
                <!--{{formData.hireEntrySalaryConfirmDto.entryMonthSalary}}-->
                <!--</a>-->
              </td>
              <td>
                {{formData.hireEntrySalaryConfirmDto.entrySalary}}
                <!--<a style="color:#45a1ff">-->
                <!--{{formData.hireEntrySalaryConfirmDto.entrySalary}}-->
                <!--</a>-->
              </td>
            </tr>
            </tbody>
          </table>
        </el-card>

        <!--薪酬结构-->
        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>1.1 薪酬结构</b></span>
          </div>
          <table class="table el-table el-table--border table2">
            <thead>
            <tr class="text-center">
              <th colspan="4">年薪（万元）</th>
              <th colspan="6">月薪结构（元）</th>
              <th colspan="6">月薪减项（元）</th>
              <th rowspan="2">月应发工资<br>(元)</th>
            </tr>
            <tr>
              <th style="width: 60px">合计</th>
              <th style="width: 60px">年薪资<br>奖励</th>
              <th>年绩效<br>工资</th>
              <th>12个月<br>月薪</th>

              <th>月工资</th>
              <th>年休假<br>工资</th>
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
                {{formData.hireEntrySalaryDto.totalYearSalary}}
              </td>
              <td>
                <el-input type="number" v-model="formData.hireEntrySalaryDto.yearSalaryAward"
                          @change="formObjChange"></el-input>
              </td>
              <td>
                <el-input type="number" v-model="formData.hireEntrySalaryDto.yearPerformanceAppraisal"
                          @change="formObjChange"></el-input>
              </td>
              <td>
                {{formData.hireEntrySalaryDto.yearSalary}}
              </td>

              <td>
                {{formData.hireEntrySalaryDto.monthSalary}}
              </td>
              <td>
                <el-input type="number" v-model="formData.hireEntrySalaryDto.annualHoliday"
                          @change="formObjChange"></el-input>
              </td>
              <td>
                <el-input type="number" v-model="formData.hireEntrySalaryDto.fullFrequentlyAward"
                          @change="formObjChange"></el-input>
              </td>
              <td>
                <el-input type="number" v-model="formData.hireEntrySalaryDto.trafficaAllowance"
                          @change="formObjChange"></el-input>
              </td>
              <td>
                {{formData.hireEntrySalaryDto.totalMoneySalary}}
              </td>
              <td>
                {{formData.hireEntrySalaryDto.yearSalary}}
              </td>

              <td>
                <el-input type="number" v-model="formData.hireEntrySalaryDto.meritPay"
                          @change="formObjChange"></el-input>
              </td>
              <td @click="showDeduDialog('salaryBorrow')">
                <a style="color:#45a1ff">
                  {{formData.hireEntrySalaryDto.salaryBorrow?formData.hireEntrySalaryDto.salaryBorrow:'--'}}
                </a>
              </td>
              <td @click="showDeduDialog('accountSalary')">
                <a style="color:#45a1ff">
                  {{formData.hireEntrySalaryDto.accountSalary?formData.hireEntrySalaryDto.accountSalary:'--'}}
                </a>
              </td>
              <td @click="showDeduDialog('contractAllowance')">
                <a style="color:#45a1ff">
                  {{formData.hireEntrySalaryDto.contractAllowance?formData.hireEntrySalaryDto.contractAllowance:'--'}}
                </a>
              </td>
              <td @click="showDeduDialog('awardBorrow')">
                <a style="color:#45a1ff">
                  {{formData.hireEntrySalaryDto.awardBorrow?formData.hireEntrySalaryDto.awardBorrow:'--'}}
                </a>
              </td>

              <td>
                {{formData.hireEntrySalaryDto.totalSubtract}}
              </td>
              <td>
                {{formData.hireEntrySalaryDto.actualMonthSalary}}
              </td>
            </tr>
            </tbody>
          </table>
        </el-card>

        <!--有入职借款的时候显示-->
        <el-card class="box-card" v-if="formData.hireEntryBorrowMoneyDto.isBorrowText==='是'">
          <div slot="header" class="text-left">
            <span><b>1.2 入职借款</b></span>
          </div>
          <table class="table el-table el-table--border" style="width: 35%">
            <thead>
            <tr>
              <th>是否有<br>入职借款</th>
              <th>借款总额<br>（万元）</th>
              <th style="width: 90px">还款月数<br>（月）</th>
              <th>每月还款金额<br>（万元）</th>
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

        <!--v-if="formData.hireEntrySalaryConfirmDto.isOfferBankAccount"-->
        <el-card v-if="formObj.isOfferBankAccount" class="box-card">
          <div slot="header" class="text-left">
            <span><b>2.原公司待遇与我司待遇对比</b></span>
            <div style="float: right;">
              <el-button type="primary" v-if="formObj.isShowUploadAtt" @click="showBankAccount()">银行流水</el-button>
              <el-button type="primary" @click="addRow(1)">增加固定收入行</el-button>
              <el-button type="primary" @click="addRow(3)">增加绩效收入行</el-button>
            </div>
          </div>
          <table class="table el-table el-table--border">
            <thead>
            <tr style="text-align: left;">
              <th colspan="8" style="text-align: center">
                <div>原单位：</div>
                <el-input style="width: 70%" v-model="formData.hireEntrySalaryConfirmDto.oldCompany"></el-input>
              </th>
              <!--<th colspan="5" style="text-align: left!important;"><span class="text-left">工作地点：-->
              <!--<input v-model="formData.hireEntrySalaryConfirmDto.oldAddress" style="width:70%"></input>-->
              <!--</span></th>-->
              <th colspan="8" style="text-align: center"><span class="text-left">
               我司：{{formData.hireEntrySalaryConfirmDto.company}}
                <!--我司： <input style="width: 80%" v-model="formData.hireEntrySalaryConfirmDto.company"></input>-->
              </span>
              </th>
              <!--<th colspan="5" style="text-align: left!important;"><span class="text-left">-->
              <!--工作地点： <input v-model="formData.hireEntrySalaryConfirmDto.newAddress" style="width:70%"></input>-->
              <!--</span></th>-->
            </tr>
            <tr>
              <th style="width: 35px">序号</th>
              <th style="width: 100px">项目</th>
              <th style="width: 80px">金额</th>
              <th colspan="2" style="width: 140px">发放周期及频率</th>
              <th style="width: 70px">年度总额</th>
              <th style="width: 60px">占比</th>
              <th style="min-width: 100px;max-width: 150px">备注说明</th>
              <th style="width: 100px">项目</th>
              <th style="width: 80px">金额</th>
              <th colspan="2" style="width: 140px">发放周期及频率</th>
              <th style="width: 70px">年度总额</th>
              <th style="width: 60px">占比</th>
              <th style="min-width: 100px;max-width: 150px">备注说明</th>
              <th style="width: 40px">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in formData.hireSalaryContrastDtos.filter(_fi=>_fi.state===1)">
              <td>
                {{item.seq}}
              </td>
              <td style="text-align: center">
                <el-input v-model="item.project" type="textarea" :autosize="{ minRows: 1, maxRows: 3}"></el-input>
                <!--<el-input v-model="item.project" type="textarea" :autosize="{ minRows: 1, maxRows: 10}"></el-input>-->
              </td>
              <td>
                <el-input type="number" v-model="item.moneyAmount" @change="compareDataChange"></el-input>
              </td>
              <td style="width: 80px">
                <el-select v-model="item.period" placeholder="请选择">
                  <el-option key="1" label="月度" value="月度"></el-option>
                  <el-option key="2" label="季度" value="季度"></el-option>
                  <el-option key="3" label="半年度" value="半年度"></el-option>
                  <el-option key="4" label="年度" value="年度"></el-option>
                </el-select>

                <!--<el-input v-model="item.period" placeholder=""></el-input>-->
              </td>
              <td style="width: 60px">
                <el-input type="number" v-model="item.frequency" @change="compareDataChange"></el-input>
              </td>
              <td>
                {{item.yearMoneyAmount}}
                <!--<el-input v-model="item.yearMoneyAmount" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.proportionText}}
                <!--<el-input v-model="item.proportion" placeholder=""></el-input>-->
              </td>
              <td>
                <el-input v-model="item.remark" type="textarea" :autosize="{ minRows: 1, maxRows: 3}"></el-input>
              </td>

              <td>
                <el-input v-model="item.hwProject" type="textarea" :autosize="{ minRows: 1, maxRows: 3}"></el-input>
                <!--<el-input v-model="item.hwProject" type="textarea" :autosize="{ minRows: 1, maxRows: 10}"></el-input>-->
              </td>
              <td>
                <el-input type="number" v-model="item.hwMoneyAmount" @change="compareDataChange"></el-input>
              </td>
              <td style="width: 80px">
                <el-select v-model="item.hwPeriod" placeholder="请选择">
                  <el-option key="1" label="月度" value="月度"></el-option>
                  <el-option key="2" label="季度" value="季度"></el-option>
                  <el-option key="3" label="半年度" value="半年度"></el-option>
                  <el-option key="4" label="年度" value="年度"></el-option>
                </el-select>
                <!--<el-input v-model="item.hwPeriod" placeholder=""></el-input>-->
              </td>
              <td style="width: 60px">
                <el-input type="number" v-model="item.hwFrequency" @change="compareDataChange"></el-input>
              </td>
              <td>
                {{item.hwYearMoneyAmount}}
                <!--<el-input v-model="item.hwYearMoneyAmount" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.hwProportionText}}
                <!--<el-input v-model="item.hwProportion" placeholder=""></el-input>-->
              </td>
              <td>
                <el-input v-model="item.hwRemark" type="textarea" :autosize="{ minRows: 1, maxRows: 3}"></el-input>
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
                <el-input type="number" v-model="item.moneyAmount" placeholder=""></el-input>
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
                {{item.proportionText}}
              </td>
              <td>
                {{item.remark}}
              </td>

              <td :colspan="4" style="text-align: left;">
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
                {{item.hwProportionText}}
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
                <el-input v-model="item.project" type="textarea" :autosize="{ minRows: 1, maxRows: 10}"></el-input>
              </td>
              <td>
                <el-input type="number" v-model="item.moneyAmount" @change="compareDataChange"></el-input>
              </td>
              <td style="width: 80px">
                <el-select v-model="item.period" placeholder="请选择">
                  <el-option key="1" label="月度" value="月度"></el-option>
                  <el-option key="2" label="季度" value="季度"></el-option>
                  <el-option key="3" label="半年度" value="半年度"></el-option>
                  <el-option key="4" label="年度" value="年度"></el-option>
                </el-select>

                <!--<el-input v-model="item.period" placeholder=""></el-input>-->
              </td>
              <td style="width: 60px">
                <el-input type="number" v-model="item.frequency" @change="compareDataChange"></el-input>
              </td>
              <td>
                {{item.yearMoneyAmount}}
                <!--<el-input v-model="item.yearMoneyAmount" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.proportionText}}
                <!--<el-input v-model="item.proportion" placeholder=""></el-input>-->
              </td>
              <td>
                <el-input v-model="item.remark" type="textarea" :autosize="{ minRows: 1, maxRows: 10}"></el-input>
              </td>


              <td>
                <el-input v-model="item.hwProject" type="textarea" :autosize="{ minRows: 1, maxRows: 10}"></el-input>
              </td>
              <td>
                <el-input type="number" v-model="item.hwMoneyAmount" @change="compareDataChange"></el-input>
              </td>
              <td style="width: 80px">
                <el-select v-model="item.hwPeriod" placeholder="请选择">
                  <el-option key="1" label="月度" value="月度"></el-option>
                  <el-option key="2" label="季度" value="季度"></el-option>
                  <el-option key="3" label="半年度" value="半年度"></el-option>
                  <el-option key="4" label="年度" value="年度"></el-option>
                </el-select>

                <!--<el-input v-model="item.hwPeriod" placeholder=""></el-input>-->
              </td>
              <td style="width: 60px">
                <el-input type="number" v-model="item.hwFrequency" @change="compareDataChange"></el-input>
              </td>
              <td>
                {{item.hwYearMoneyAmount}}
                <!--<el-input v-model="item.hwYearMoneyAmount" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.hwProportionText}}
                <!--<el-input v-model="item.hwProportion" placeholder=""></el-input>-->
              </td>
              <td>
                <el-input v-model="item.hwRemark" type="textarea" :autosize="{ minRows: 1, maxRows: 10}"></el-input>
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
                {{item.proportionText}}
              </td>
              <td>
                {{item.remark}}
              </td>

              <td :colspan="4" style="text-align: left;">
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
                {{item.hwProportionText}}
              </td>
              <td>
                {{item.hwRemark}}
              </td>
              <td>
                <!--<el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>-->
              </td>
            </tr>

            <tr class="td-warning"
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
                <el-input v-model="item.proportionText" placeholder=""></el-input>
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
                {{item.hwProportionText}}
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
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 20}"
                        v-model="formData.hireEntrySalaryConfirmDto.hireReason"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="text-left">
          <el-col :span="24" class="text-left">
            <el-form-item label-width="120px" label="薪酬确定理由:">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 20}"
                        v-model="formData.hireEntrySalaryConfirmDto.salaryComfireReason"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!--老板只会弹出框列表 不会用多选择框，无奈-->
    <el-dialog title="录用职等选择" width="30%" :close-on-click-modal="false"
               :visible.sync="dialogSalaryGrade">
      <div>
        <el-row class="text-left">
          <el-col :span="24" class="text-right">
            <div>
              <el-button type="primary" @click="doConfirmSalaryGrade()">保存</el-button>
            </div>
          </el-col>
        </el-row>
        <salary-grade-edit ref="salaryGrade"
                           :keyVal="keyVal"
                           :salaryObj="salaryRankObj"
                           :salarySystem="formData.hireEntrySalaryConfirmDto.company"></salary-grade-edit>
      </div>
    </el-dialog>

    <el-dialog :title="formData.hireEntrySalaryConfirmDto.company+'入职薪酬职等、职级选择'" width="50%" :close-on-click-modal="false"
               :visible.sync="dialogSalaryRank">
      <div>
        <el-row class="text-left">
          <el-col :span="24" class="text-right">
            <div>
              <el-button type="primary" @click="doConfirmSalaryRank()">保存</el-button>
            </div>
          </el-col>
        </el-row>
        <salary-rank-edit ref="salaryRank"
                          :keyVal="keyVal"
                          :salaryObj="salaryRankObj"
                          :salarySystem="formData.hireEntrySalaryConfirmDto.company">
        </salary-rank-edit>
      </div>
    </el-dialog>

    <el-dialog title="职等工资标准" width="80%" :close-on-click-modal="false"
               :visible.sync="dialogSalaryStand">
      <salary-standard-grade :salarySystem="formData.hireEntrySalaryConfirmDto.company"
                             :salaryGrade="formData.hireEntrySalaryConfirmDto.salaryGrade"
                             :salaryObj="salaryRankObj">
      </salary-standard-grade>
    </el-dialog>

    <el-dialog title="工资借款标准" width="65%" :close-on-click-modal="false" :visible.sync="dialogDeduBorrow">
      <div>
        <el-row>
          <el-col :span="24" class="text-right">
            <div>
              <el-button type="primary" @click="doDeduConfirm('salaryBorrow')">保存</el-button>
            </div>
          </el-col>
        </el-row>
        <dedu-borrow ref="salaryBorrow" :keyVal="keyVal" :formObj="deduFormData">
        </dedu-borrow>
      </div>
    </el-dialog>
    <el-dialog title="报账工资" width="75%" :close-on-click-modal="false" :visible.sync="dialogAccount">
      <div>
        <el-row>
          <el-col :span="24" class="text-right">
            <div>
              <el-button type="primary" @click="doDeduConfirm('accountSalary')">保存</el-button>
            </div>
          </el-col>
        </el-row>
        <dedu-account ref="accountSalary" :keyVal="keyVal" :formObj="deduFormData">
        </dedu-account>
      </div>
    </el-dialog>
    <el-dialog title="契约津贴" width="65%" :close-on-click-modal="false" :visible.sync="dialoContract">
      <div>
        <el-row>
          <el-col :span="24" class="text-right">
            <div>
              <el-button type="primary" @click="doDeduConfirm('contractAllowance')">保存</el-button>
            </div>
          </el-col>
        </el-row>
        <dedu-contract ref="contractAllowance" :keyVal="keyVal" :formObj="deduFormData">
        </dedu-contract>
      </div>
    </el-dialog>
    <el-dialog title="福利借款" width="65%" :close-on-click-modal="false" :visible.sync="dialogAward">
      <div>
        <el-row>
          <el-col :span="24" class="text-right">
            <div>
              <el-button type="primary" @click="doDeduConfirm('awardBorrow')">保存</el-button>
            </div>
          </el-col>
        </el-row>
        <dedu-award ref="awardBorrow" :keyVal="keyVal" :formObj="deduFormData">
        </dedu-award>
      </div>
    </el-dialog>

  </div>
</template>
<style lang="scss" scoped>
  .entry_container {
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
    .el-table th {
      padding: 5px 0;
    }
    .el-table {
      th {
        div {
          line-height: 26px;
        }
      }
      margin-top: 2px;
      border-left: none;
    }
  }
</style>
<style lang="scss">
  .entry_container {
    .box-card {
      margin-bottom: 8px;
    }
    .el-input,.el-textarea {
      /*border: none;*/
      width: 90%;
      margin: 1px auto;
    }
    .el-input__inner{
      padding: 0px 5px;
    }
   .el-textarea__inner{
      padding: 5px 2px;
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
            font-weight: 300;
            background-color: #fff;
          }
          td {
            /*background-color: #fff;*/
            padding: 0;
            .el-input--mini .el-input__inner {
              /*border: none;*/
              width: 85%;
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
        height: 30px;
        /*border-bottom: 1px solid ;*/
      }
    }
    .table2 {
      thead tr {
        th {
          min-width: 60px;
        }
      }
    }
    .td-warning {
      background: #e1e3fa;
    }

  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

</style>

<script>
  import {mapGetters} from 'vuex'
  import {getCookie, TokenKey} from '@/utils/Cookie'

  import SalarySys_API from '@/api/salary/salarySys'
  import Hire_API from '@/api/hire/hire';
  import WaittingApproval_API from '@/api/approval/waittingApproval'
  import FlowNode from "@/views/approval/com/flow_node";
  import EmployeeSelect from "@/views/approval/com/employee_select";
  import SalaryStandardGrade from "@/views/approval/com/entry/salary_standard_grade";

  import DeduBorrow from "@/views/approval/com/dedu/dedu_borrow";
  import DeduAccount from "@/views/approval/com/dedu/dedu_account";
  import DeduContract from "@/views/approval/com/dedu/dedu_contract";
  import DeduAward from "@/views/approval/com/dedu/dedu_award";

  import SalaryGradeEdit from "@/views/approval/com/entry/salary_grade_edit";
  import SalaryRankEdit from "@/views/approval/com/entry/salary_rank_edit";
  // import SalaryStandardGradeSelect from "@/views/approval/com/entry/salary_standard_grade_select";


  export default {
    name: "entry_pay_edit",
    props: {
      mainObj: {
        type: Object,
        required: false
      },
      instanceId: {
        type: String,
        required: false
      },
      formObj: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        keyVal: '',
        loading: false,
        dialogSalaryGrade: false,
        dialogSalaryRank: false,
        dialogDeduBorrow: false,
        dialogAccount: false,
        dialoContract: false,
        dialogAward: false,
        dialogVisible: false,
        dialogFlow: false,
        dialogSalaryStand: false,
        dialogEmployeeSelect: false,
        tableHeight: null,
        title: '',
        salaryRankObj: {},//入职薪酬职等职级
        tableData: [
          {
            subject: '1',
            title: '2',
            createrName: '3',
            createTime: '4',
            currentNodeName: '5',
          }
        ],
        formData: {
          fdId: '',
          title: '',
          hireDraftDto: {
            aduitUser: null
            , approveUser: null
            , createTime: null
            , createrId: null
            , documentCode: null
            , documentSubject: null
            , documentTitle: null
            , drafter: null
            , fdId: null
            , isDelete: null
            , lastAlterId: null
            , lastAlterTime: null
            , name: null
            , nid: null
            , personalId: null
            , status: null
          },
          hireEntryBorrowMoneyDto: {
            createTime: null
            , createrId: null
            , fdId: null
            , isBorrow: null
            , isBorrowText: null
            , isDelete: null
            , lastAlterId: null
            , lastAlterTime: null
            , name: null
            , nid: null
            , perRepay: null
            , periods: null
            , personalId: null
            , status: null
            , totalBorrowMoney: null
          },
          hireEntrySalaryConfirmDto: {
            actualEntryDay: null
            , attGuid: null
            , borrowFile: null
            , borrowText: null
            , company: null
            , companyId: null
            , createTime: null
            , createrId: null
            , dept: null
            , deptId: null
            , entryBorrow: null
            , entryBorrowStatus: null
            , entryBorrowStatusText: null
            , entryMonthSalary: null
            , entrySalary: null
            , entrySalaryStatus: null
            , entrySalaryStatusText: null
            , fdId: null
            , hireReason: null
            , isBorrow: null
            , isBorrowText: null
            , isDelete: null
            , isOfferBankAccount: null
            , isSureSalary: null
            , isOfferSalaryGradeStandard: null  //是否提供职等
            , salaryGradeStandard: '' //职等对比
            , jobGrade: null
            , jobLevel: null
            , name: null
            , newAddress: null
            , nid: null
            , nodeType: null
            , oldAddress: null
            , oldCompany: null
            , personalType: null
            , planEntryDay: null
            , position: null
            , positionCode: null
            , rankSalary: null
            , salaryComfireReason: null
            , salaryConfirmFile: null
            , salaryConfirmText: null
            , salaryGrade: null
            , salaryInputFile: null
            , salaryInputFileText: null
            , salaryInputProof: null
            , salaryJobLevel: null
            , salaryRank: null
            , salarySystem: null
            , salaryType: null
            , sex: null
            , startDate: null
            , status: null
            , tryrange: null
            , tryrangeText: null
          },
          hireEntrySalaryDto: {
            accountSalary: null
            , actualMonthSalary: null
            , annualHoliday: null
            , awardBorrow: null
            , contractAllowance: null
            , createTime: null
            , createrId: null
            , fdId: null
            , fullFrequentlyAward: null
            , isDelete: null
            , lastAlterId: null
            , lastAlterTime: null
            , meritPay: null
            , monthSalary: null
            , name: null
            , nid: null
            , personalId: null
            , salaryBorrow: null
            , salaryConfirmFile: null
            , salaryInputProof: null
            , status: null
            , totalMoneySalary: null
            , totalSubtract: null
            , totalYearSalary: null
            , trafficaAllowance: null
            , yearPerformanceAppraisal: null
            , yearSalary: null
            , yearSalaryAward: null
          },
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
          hireSalarySubProjectDtos: [
            {
              afterTaxMonthSalary: null
              , afterTaxYearSalary: null
              , allowance: null
              , appointTax: null
              , appointYear: null
              , endTime: null
              , fdId: null
              , monthBorrowAmount: null
              , monthRepaymentAmount: null
              , name: null
              , nid: null
              , perTaxMonthSalary: null
              , perTaxYearSalary: null
              , personalId: null
              , startTime: null
              , status: null
              , type: null
              , typeText: null
            }
          ]
        },
        flowData: {instanceId: ''},//
        state4Row: [2, 4, 5],
        stateRow: [6],
        salaryJobLevelList: [
          {label: '', value: ''},
          {label: '优', value: '优'},
          {label: 'A+', value: 'A+'},
          {label: 'A', value: 'A'},
          {label: 'A-', value: 'A-'},
          {label: 'B+', value: 'B+'},
          {label: 'B', value: 'B'},
          {label: 'B-', value: 'B-'},
          {label: 'C+', value: 'C+'},
          {label: 'C', value: 'C'},
          {label: 'C-', value: 'C-'},
        ],
        salaryRankList: [],
        deduFormData: {},
        attTokenKey: '',
      }
    },
    components: {
      EmployeeSelect,
      FlowNode,
      SalaryStandardGrade,
      SalaryRankEdit,
      DeduBorrow,
      DeduAccount,
      DeduContract,
      DeduAward,
      SalaryGradeEdit
    },
    // watch: {
    //   formObj: function (obj) {
    //     // this.formObj=   Object.assign(this.formObj,this.formData.hireDraftDto);
    //     // this.formData.hireDraftDto=Object.assign(this.formData.hireDraftDto,obj);
    //   }
    // },
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
        //银行流水附件加载key(显示的时候再加载)
        if (this.formObj.isShowUploadAtt) {
          let attkey = getCookie(TokenKey);
          this.attTokenKey = attkey.substring(0, 16) || '';
          this.getAndInitAttToken({tokenId: this.attTokenKey});//目的是插入数据库以备调用附件插件校验
        }

        let params = {personalId: this.instanceId};
        this.findAllByPersonalId(params);
        //判断是否拟稿节点
        // this.findOneInstance(params);
      },
      findAllByPersonalId(params) {
        this.loading = true;
        Hire_API.findAllByPersonalId(params).then(res => {
          this.formData = res.data || {};

          this.formObj = Object.assign(this.formObj, this.formData.hireDraftDto);//目的是给父组件赋值
          //特殊处理银行流水字段
          this.formObj.isOfferBankAccount = this.formData.hireEntrySalaryConfirmDto
          && this.formData.hireEntrySalaryConfirmDto.isOfferBankAccount === '是' ? true : false;
          let data = this.formData.hireSalaryContrastDtos || [];
          data.forEach((item, index) => {
            item.seq = index + 1;
          });

          //判断是否薪酬职级，如果有 则查询薪酬职级列表
          if (this.formData.hireEntrySalaryConfirmDto && this.formData.hireEntrySalaryConfirmDto.salaryGrade) {
            let params = {
              salarySystem: this.formData.hireEntrySalaryConfirmDto.salarySystem,
              salaryGrade: this.formData.hireEntrySalaryConfirmDto.salaryGrade
            };
            this.queryRankListByGrade(params);
          }


          // // this.formData.hireDraftDto= this.formData.hireDraftDto||{};
          // this.formData.hireEntryBorrowMoneyDto= this.formData.hireEntryBorrowMoneyDto||{};
          // this.formData.hireEntrySalaryConfirmDto= this.formData.hireEntrySalaryConfirmDto||{};
          // this.formData.hireEntrySalaryDto= this.formData.hireEntrySalaryDto||{};
          // this.formData.hireSalaryContrastDtos= this.formData.hireSalaryContrastDtos||[];
          // this.formData.hireSalarySubProjectDtos= this.formData.hireSalarySubProjectDtos||[];

          this.loading = false;
        }).catch(err => {
          this.loading = false;
          this.$message({type: 'error',showClose:true, message: '数据初始化请求异常：' + err.msg})
        });
      },
      //判断是否拟稿节点
      findOneInstance(params) {
        WaittingApproval_API.findOneInstance(params).then(res => {
          console.log(res)
          // this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '数据列表请求异常：' + err.msg})
        });
      },
      //获取及初始化atttoken
      getAndInitAttToken(params) {
        WaittingApproval_API.getAndInitAttToken(params).then(res => {
          //返回值就不赋值了，  值与传的参数一样
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '获取及初始化atttoken请求异常：' + err.msg})
        });
      },

      /**
       * 待遇对比
       * */
      addRow(val) {
        let obj = {
          state: val,
          personalId: this.instanceId
        };//初始化对象，其他字段是否需要删除
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
          this.compareDataChange();
          if (obj.fdId != null && obj.fdId != '') {
            let para = {fdId: obj.fdId};
            Hire_API.deleteByFdId(para).then(res => {
              if (res.success) {
                this.$message({type: 'success',showClose:true, message: '删除成功！'});
                // this.initPage();
              }
              else {
                this.$message({type: 'error',showClose:true, message: '删除失败！' + res.msg});
              }
            }).catch(err => {
              this.$message({type: 'error',showClose:true, message: '删除失败：' + err.msg})
            });
          }

        }).catch(error => {
          this.$message({type: 'info',showClose:true, message: '已取消删除'});
        });
      },
      sortContrasData() {
        let data = this.formData.hireSalaryContrastDtos || [];
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data.length - 1 - i; j++) {
            if (data[j].state > data[j + 1].state) {
              let tdata = data[j];
              data[j] = data[j + 1];
              data[j + 1] = tdata;
            }
          }
        }

        data.forEach((item, index) => {
          item.seq = index + 1;
        })
      },
      //借款
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
          this.formData.hireEntryBorrowMoneyDto.perRepay = perNum.toFixed(4);
          this.formData.hireEntryBorrowMoneyDto.perRepay
            = Math.round(this.formData.hireEntryBorrowMoneyDto.perRepay * 1000) / 1000;//去掉小数后面的0
        }
      },
      //岗位信息、薪酬结构、入职借款数据的计算
      formObjChange() {

        // 表1.1 薪酬结构
        // 2.1 年薪
        //合计
        this.formData.hireEntrySalaryDto.totalYearSalary
          = this.formData.hireEntrySalaryConfirmDto.entrySalary;

        //月薪
        this.formData.hireEntrySalaryDto.yearSalary =
          this.formData.hireEntrySalaryDto.totalYearSalary -
          this.formData.hireEntrySalaryDto.yearSalaryAward
          - this.formData.hireEntrySalaryDto.yearPerformanceAppraisal;
        this.formData.hireEntrySalaryDto.yearSalary = this.formData.hireEntrySalaryDto.yearSalary.toFixed(2);

        //2.2 月薪酬项目结构
        this.formData.hireEntrySalaryDto.totalMoneySalary
          = (this.formData.hireEntrySalaryDto.yearSalary / 12 * 10000).toFixed(2);
        this.formData.hireEntrySalaryDto.totalMoneySalary
          = Math.round(this.formData.hireEntrySalaryDto.totalMoneySalary * 100) / 100;//去掉小数后面的0
        ; //小计
        this.formData.hireEntrySalaryDto.totalMoneySalary =
          (this.formData.hireEntrySalaryDto.totalMoneySalary / 1);

        this.formData.hireEntrySalaryDto.monthSalary
          = this.formData.hireEntrySalaryDto.totalMoneySalary / 1
          - this.formData.hireEntrySalaryDto.annualHoliday / 1
          - this.formData.hireEntrySalaryDto.fullFrequentlyAward / 1
          - this.formData.hireEntrySalaryDto.trafficaAllowance / 1;  // 月工资

        // 2.3 月薪酬减项
        this.formData.hireEntrySalaryDto.totalSubtract =
          (this.formData.hireEntrySalaryDto.meritPay / 1
            + this.formData.hireEntrySalaryDto.salaryBorrow / 1
            + this.formData.hireEntrySalaryDto.accountSalary / 1
            + this.formData.hireEntrySalaryDto.contractAllowance / 1
            + this.formData.hireEntrySalaryDto.awardBorrow / 1).toFixed(2);  // 小计

        this.formData.hireEntrySalaryDto.totalSubtract
          = Math.round(this.formData.hireEntrySalaryDto.totalSubtract * 100) / 100;//去掉小数后面的0
        // this.formData.hireEntrySalaryDto.totalSubtract=
        //   this.formData.hireEntrySalaryDto.totalSubtract.toFixed(2);

        //月应发工资
        this.formData.hireEntrySalaryDto.actualMonthSalary =
          (this.formData.hireEntrySalaryDto.totalMoneySalary / 1
            - this.formData.hireEntrySalaryDto.totalSubtract / 1).toFixed(2);
        this.formData.hireEntrySalaryDto.actualMonthSalary
          = Math.round(this.formData.hireEntrySalaryDto.actualMonthSalary * 100) / 100;//去掉小数后面的0
      },
      //待遇对比计算
      compareDataChange() {
        let data = this.formData.hireSalaryContrastDtos || [];
        let obj = {};

        //求总计
        let allCountList = data.filter(item => {
          return (item.state == 1 || item.state == 3);
        })
        let data5 = data.filter(item => {
          return (item.state == 5);
        }) || [];
        let total = 0;
        let total_new = 0;
        allCountList.forEach(item => {
          total = (total + (item.moneyAmount / 1 * item.frequency / 1)) || null;
          total_new = (total_new + (item.hwMoneyAmount / 1 * item.hwFrequency / 1)) || null;
        })
        obj = {
          yearMoneyAmount: total
          , proportion: (total > 0 ? 1 : 0)
          , hwYearMoneyAmount: total_new
          , hwProportion: (total_new > 0 ? 1 : 0)
        };
        obj.proportionText = obj.proportion * 100 + '%';
        obj.hwProportionText = obj.proportion * 100 + '%';
        data5.length > 0 ? data5[0] = Object.assign(data5[0], obj) : data5[0] = data5[0];

        //涨幅
        let data6 = data.filter(item => {
          return (item.state == 6);
        }) || [];
        let totalDiff = total_new - total;
        let rate = (total > 0 ? totalDiff / total : null).toFixed(2);
        let rateText = Math.round(rate * 100 * 100) / 100 + '%';
         obj = {hwProportionText: rateText}
        data6.length > 0 ? data6[0] = Object.assign(data6[0], obj) : data6[0] = data6[0];

        //小计1
        let data1 = data.filter(item => {
          return item.state == 1;
        }) || [];
        let data2 = data.filter(item => {
          return item.state == 2;
        })
        obj = this.sumData(data1, total, total_new);
        data1.length > 0 ? data2[0] = Object.assign(data2[0], obj) : data2[0] = data2[0];

        //小计2
        let data3 = data.filter(item => {
          return item.state == 3;
        })
        let data4 = data.filter(item => {
          return item.state == 4;
        })
        obj = this.sumData(data3, total, total_new);
        data3.length > 0 ? data4[0] = Object.assign(data4[0], obj) : data4[0] = data4[0];


      },
      sumData(list, total, total_new) {
        let obj = {
          moneyAmount: 0, yearMoneyAmount: 0, frequency: 0, proportion: 0, proportionText: ''
          , hwMoneyAmount: 0, hwYearMoneyAmount: 0, hwFrequency: 0, hwProportion: 0, hwProportionText: ''
        };
        list.forEach(item => {
          item.yearMoneyAmount = item.moneyAmount * item.frequency || null;
          item.proportion = Math.round(((total > 0 ? item.yearMoneyAmount / total : 0).toFixed(2) || null) * 100) / 100;
          item.proportionText = Math.round((item.proportion * 100).toFixed(2) * 100) / 100 + '%';
          obj.yearMoneyAmount = (obj.yearMoneyAmount / 1 + item.yearMoneyAmount) || null;

          item.hwYearMoneyAmount = (item.hwMoneyAmount * item.hwFrequency) || null;
          item.hwProportion = Math.round(((total_new > 0 ? item.hwYearMoneyAmount / total_new : 0).toFixed(2) || null) * 100) / 100;
          item.hwProportionText = Math.round((item.hwProportion * 100).toFixed(2)) * 100 / 100 + '%';
          obj.hwYearMoneyAmount = (obj.hwYearMoneyAmount / 1 + item.hwYearMoneyAmount) || null;
        });

        obj.proportion = Math.round((total > 0 ? obj.yearMoneyAmount / (total * 1.0) : 0).toFixed(2) || null) * 100 / 100;
        obj.proportionText = Math.round((obj.proportion * 100).toFixed(2)) * 100 / 100 + '%';
        obj.hwProportion = Math.round((total_new > 0 ? obj.hwYearMoneyAmount / (total_new * 1.0) : 0).toFixed(2) || null) * 100 / 100;
        obj.hwProportionText = Math.round((obj.hwProportion * 100).toFixed(2)) * 100 / 100 + '%';
        return obj;
      },
      //录用职等职级选择
      showGradeEdit() {
        this.salaryRankObj = JSON.parse(JSON.stringify(this.formData.hireEntrySalaryConfirmDto || {}));
        this.keyVal = new Date().getTime() + '_';
        this.dialogSalaryGrade = true;
      },

      //入职薪酬职等选择
      doConfirmSalaryGrade() {
        let obj = this.$refs.salaryGrade.formData || {};

        this.formData.hireEntrySalaryConfirmDto.salaryGrade = obj.salaryGrade;
        this.dialogSalaryGrade = false;
        this.$refs.salaryGrade.formData = {};
        this.gradeChange(this.formData.hireEntrySalaryConfirmDto.salaryGrade);
      },
      gradeChange(salaryGrade) {
        this.salaryRankList = [];
        this.formData.hireEntrySalaryConfirmDto.salaryRank = '';
        if (salaryGrade != null && salaryGrade != '') {
          let params = {
            salarySystem: this.formData.hireEntrySalaryConfirmDto.salarySystem,
            salaryGrade: salaryGrade
          };
          this.queryRankListByGrade(params);
        }

      },
      queryRankListByGrade(params) {
        SalarySys_API.queryRankListByGrade_payAuditSalaryGrade(params).then(res => {
          this.salaryRankList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '数据列表请求异常：' + err.msg})
        });
      },
      salaryRankChange() {
        let arr = this.salaryRankList.filter(_item => {
          return _item.salaryRank === this.formData.hireEntrySalaryConfirmDto.salaryRank
        }) || [];
        this.formData.hireEntrySalaryConfirmDto.entryMonthSalary = arr.length > 0 ? arr[0].rankSalary : null;
        this.formData.hireEntrySalaryConfirmDto.entrySalary = (this.formData.hireEntrySalaryConfirmDto.entryMonthSalary * 12 / 10000).toFixed(4);
        ;
      },
      entryMonthSalaryChange() {
        this.formData.hireEntrySalaryConfirmDto.entrySalary = (this.formData.hireEntrySalaryConfirmDto.entryMonthSalary * 12 / 10000).toFixed(4);
      },

      //入职薪酬职级选择
      showRankEdit(val) {
        // this.$refs.salaryRank.salaryGradeList=[];
        // this.$refs.salaryRank.salaryRankList=[];
        this.salaryRankObj = JSON.parse(JSON.stringify(this.formData.hireEntrySalaryConfirmDto || {}));
        this.keyVal = new Date().getTime() + '_';
        this.dialogSalaryRank = true;
      },
      doConfirmSalaryRank() {
        let obj = this.$refs.salaryRank.formData || {};
        this.formData.hireEntrySalaryConfirmDto.salaryRank = obj.salaryRank;
        this.formData.hireEntrySalaryConfirmDto.entryMonthSalary = obj.entryMonthSalary;
        this.formData.hireEntrySalaryConfirmDto.entrySalary = obj.entrySalary;
        this.formData.hireEntrySalaryConfirmDto.salaryGrade = obj.salaryGrade;
        this.dialogSalaryRank = false;
        this.$refs.salaryRank.formData = {};
        this.formObjChange();
      },


      //扣减项编辑
      saveAllSubProject(params) {
        Hire_API.saveAllSubProject(params).then(res => {
          if (res.success) {
            this.$message({type: 'success',showClose:true, message: '明细保存成功！'})
          }
          else {
            this.$message({type: 'error',showClose:true, message: '明细保存失败！' + res.msg});
          }
        }).catch(err => {
          this.$message({type: 'error',showClose:true, message: '明细保存失败：' + err.msg})
        });
      },
      showDeduDialog(val) {
        let list = this.formData.hireSalarySubProjectDtos || [];
        this.keyVal = new Date().getTime() + '_';
        let l = [];
        let obj = {};
        //月薪减项
        switch (val) {
          //工资借款
          case 'salaryBorrow':
            l = list.filter(item => {
              return item.type == 1;
            }) || [];

            obj = l.length > 0 ? l[0] : {};
            this.deduFormData = obj || {};
            this.dialogDeduBorrow = true;
            break;
          //报账工资
          case 'accountSalary':
            l = list.filter(item => {
              return item.type == 2;
            }) || [];
            obj = l.length > 0 ? l[0] : {};
            this.deduFormData = obj || {};
            this.dialogAccount = true;
            break;
          //契约津贴
          case 'contractAllowance':
            l = list.filter(item => {
              return item.type == 3;
            }) || [];
            obj = l.length > 0 ? l[0] : {};
            this.deduFormData = obj || {};
            this.dialoContract = true;
            break;
          //福利借款
          case 'awardBorrow':
            l = list.filter(item => {
              return item.type == 4;
            }) || [];
            obj = l.length > 0 ? l[0] : {};
            this.deduFormData = obj || {};
            this.dialogAward = true;
            break;
          default:
            break;
        }

      },
      doDeduConfirm(val) {
        let obj = this.$refs[val].formData || {};
        let params = [];
        params.push(obj);
        this.saveAllSubProject(params);
        switch (val) {
          //工资借款
          case 'salaryBorrow':
            this.formData.hireEntrySalaryDto.salaryBorrow = obj.monthBorrowAmount || null;
            this.dialogDeduBorrow = false;
            break;
          //报账工资
          case 'accountSalary':
            this.formData.hireEntrySalaryDto.accountSalary = obj.perTaxMonthSalary * 1000 || null;
            this.dialogAccount = false;
            break;
          //契约津贴
          case 'contractAllowance':
            this.formData.hireEntrySalaryDto.contractAllowance = obj.allowance || null;
            this.dialoContract = false;
            break;
          //福利借款
          case 'awardBorrow':
            this.formData.hireEntrySalaryDto.awardBorrow = obj.monthRepaymentAmount || null;
            this.dialogAward = false;
            break;
          default:
            break;
        }
        this.formObjChange();
      },


      /**
       *
       * 弹出框界面功能
       */
      showFlowNode() {
        this.dialogFlow = true;
      },
      //职等工资标准查看
      showSalaryStand() {
        this.salaryRankObj = this.formData.hireEntrySalaryConfirmDto || {};
        if (!this.salaryRankObj.salaryGradeStandard) {
          this.salaryRankObj.salaryGradeStandard = this.salaryRankObj.salaryGrade;
        }
        this.dialogSalaryStand = true;
      },
      showEmployeeSelect() {
        this.dialogEmployeeSelect = true;
      },

      //银行流水附件
      showBankAccount() {
        let url = '';
        let action = '查阅';//行为包括：查阅、编辑、关闭
        // `2F769D4A-C504-4EE3-A0A7-006FF5C710D6|陈少佳|A02939|合同|FL1001121-1|无烟煤购销合同|编辑|1|打印|0`)).replace('=',':').replace('=',':').replace('&','')
        action = this.formObj.isEditAtt ? '编辑' : '查阅';
        url = this.attTokenKey
          + '|' + this.login_user.name
          + '|' + this.login_user.fdEmployeeNumber
          + '|' + '薪酬'
          + '|' + this.formObj.documentCode
          + '|' + this.formObj.documentTitle
          + '|' + action
          + '|' + '1'
          + '|' + ''
          + '|' + '0';
        url = `hwagain-attch:` + (Base64.encode(url)).replace('=', ':').replace('=', ':').replace('&', '');
        console.log('bankPageurl1:',url);
        window.location.href = url;
      },


    },
    created() {

    },
    computed: {
      ...mapGetters(['login_user']),
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



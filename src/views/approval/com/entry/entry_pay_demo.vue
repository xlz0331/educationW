<template>
  <div class="demo_container">
    <div>
      <el-form label-width="120px" :model="formData.hireEntrySalaryConfirmDto" :rules="rules">
        <!--岗位信息及入职薪酬-->
        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>1.岗位信息</b></span>
            <el-button style="float: right;" type="primary" @click="showSalaryStand()">职等工资标准查看</el-button>
          </div>
          <div>
            <el-row :span="24">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="录用人:" prop="name" class="text-left ">
                    {{formData.hireEntrySalaryConfirmDto.name}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="性别:" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.sex}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="身份证号:" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.nid}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="录用公司:" label-width="120px" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.company}}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
            <el-row :span="24">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="录用部门:" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.dept}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="录用岗位:" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.position}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="计划入职时间:" label-width="120px" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.planEntryDay}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="试用期:" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.tryrangeText}}
                  </el-form-item>
                </el-col>

              </el-row>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>1.1入职薪酬</b></span>
          </div>
          <div>
            <el-row :span="24">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="录用职等:" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.salaryGrade}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="录用职级:" prop="salaryJobLevel" class="text-left">
                    <el-input class="text-center"
                              v-model="formData.hireEntrySalaryConfirmDto.salaryJobLevel"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="薪酬职级:" prop="salaryRank" class="text-left">
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
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="类型:" label-width="120px" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.salaryRank?'标准':'特资'}}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
            <el-row :span="24">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="月薪(元):" class="text-left">
                    <el-input v-if="!formData.hireEntrySalaryConfirmDto.salaryRank"
                              v-model="formData.hireEntrySalaryConfirmDto.entryMonthSalary"
                              @change="entryMonthSalaryChange"></el-input>
                    <span v-else>{{formData.hireEntrySalaryConfirmDto.entryMonthSalary}}</span>

                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="年薪(万元):" class="text-left">
                    {{formData.hireEntrySalaryConfirmDto.entrySalary}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="入职借款：" class="text-left">
                    <el-input type="number" v-model="formData.hireEntrySalaryConfirmDto.entryBorrow"
                              @change="entryBorrowChange()"></el-input>
                  </el-form-item>
                </el-col>


              </el-row>
            </el-row>
          </div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>1.2薪酬结构</b></span>
          </div>
          <div>
            <el-row :span="24">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="年薪资奖励:" prop="yearSalaryAward" class="text-left">
                    <el-input type="number" v-model="formData.hireEntrySalaryDto.yearSalaryAward"
                              @change="formObjChange"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="年绩效工资:" prop="yearPerformanceAppraisal" class="text-left">
                    <el-input type="number" v-model="formData.hireEntrySalaryDto.yearPerformanceAppraisal"
                              @change="formObjChange"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="12个月月薪:" class="text-left">
                    {{formData.hireEntrySalaryDto.yearSalary}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="合计:" class="text-left">
                    {{formData.hireEntrySalaryDto.totalYearSalary}}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="月工资:" class="text-left">
                  {{formData.hireEntrySalaryDto.monthSalary}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="年休假工资:" prop="annualHoliday" class="text-left">
                  <el-input type="number" v-model="formData.hireEntrySalaryDto.annualHoliday"
                            @change="formObjChange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="满勤奖:" prop="fullFrequentlyAward" class="text-left">
                  <el-input type="number" v-model="formData.hireEntrySalaryDto.fullFrequentlyAward"
                            @change="formObjChange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="交通餐饮补助:" label-width="120px" class="text-left">
                  <el-input type="number" v-model="formData.hireEntrySalaryDto.trafficaAllowance"
                            @change="formObjChange"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="5">-->
                <!--<el-form-item label="小计:" class="text-left">-->
                  <!--{{formData.hireEntrySalaryDto.totalMoneySalary}}-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="5">-->
                <!--<el-form-item label="12个月月薪(万元):" label-width="130px" class="text-left">-->
                  <!--{{formData.hireEntrySalaryDto.yearSalary}}-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="小计:" class="text-left">
                  {{formData.hireEntrySalaryDto.totalMoneySalary}}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="12个月月薪(万元):" label-width="130px" class="text-left">
                  {{formData.hireEntrySalaryDto.yearSalary}}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="绩效工资:" prop="meritPay" class="text-left">
                  <el-input type="number" v-model="formData.hireEntrySalaryDto.meritPay"
                            @change="formObjChange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="工资借款:" class="text-left">
                  <el-input type="number" readonly v-model="formData.hireEntrySalaryDto.salaryBorrow"
                            @change="formObjChange">
                    <el-button slot="append" icon="el-icon-edit" @click="showDeduDialog('salaryBorrow')"></el-button>
                  </el-input>
                  <!--{{formData.hireEntrySalaryDto.salaryBorrow?formData.hireEntrySalaryDto.salaryBorrow:'&#45;&#45;'}}-->
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="报账工资:" class="text-left">
                  <el-input type="number" readonly v-model="formData.hireEntrySalaryDto.accountSalary"
                            @change="formObjChange">
                    <el-button slot="append" icon="el-icon-edit" @click="showDeduDialog('accountSalary')"></el-button>
                  </el-input>
                  <!--{{formData.hireEntrySalaryDto.accountSalary?formData.hireEntrySalaryDto.accountSalary:'&#45;&#45;'}}-->
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="契约津贴:" label-width="120px" class="text-left">
                  <el-input type="number" readonly v-model="formData.hireEntrySalaryDto.contractAllowance"
                            @change="formObjChange">
                    <el-button slot="append" icon="el-icon-edit"
                               @click="showDeduDialog('contractAllowance')"></el-button>
                  </el-input>
                  <!--{{formData.hireEntrySalaryDto.contractAllowance?formData.hireEntrySalaryDto.contractAllowance:'&#45;&#45;'}}-->
                </el-form-item>
              </el-col>
              <!--<el-col :span="5">-->
                <!--<el-form-item label="福利借款:" class="text-left">-->
                  <!--<el-input type="number" readonly v-model="formData.hireEntrySalaryDto.awardBorrow"-->
                            <!--@change="formObjChange">-->
                    <!--<el-button slot="append" icon="el-icon-edit" @click="showDeduDialog('awardBorrow')"></el-button>-->
                  <!--</el-input>-->
                  <!--&lt;!&ndash;{{formData.hireEntrySalaryDto.contractAllowance?formData.hireEntrySalaryDto.contractAllowance:'&#45;&#45;'}}&ndash;&gt;-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="5">-->
                <!--<el-form-item label="小计:" label-width="130px" class="text-left">-->
                  <!--{{formData.hireEntrySalaryDto.contractAllowance?formData.hireEntrySalaryDto.contractAllowance:'&#45;&#45;'}}-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="福利借款:" class="text-left">
                  <el-input type="number" readonly v-model="formData.hireEntrySalaryDto.awardBorrow"
                            @change="formObjChange">
                    <el-button slot="append" icon="el-icon-edit" @click="showDeduDialog('awardBorrow')"></el-button>
                  </el-input>
                  <!--{{formData.hireEntrySalaryDto.contractAllowance?formData.hireEntrySalaryDto.contractAllowance:'&#45;&#45;'}}-->
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="小计:" class="text-left">
                  {{formData.hireEntrySalaryDto.contractAllowance?formData.hireEntrySalaryDto.contractAllowance:'--'}}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <el-card class="box-card" v-if="formData.hireEntryBorrowMoneyDto.isBorrowText==='是'">
          <div slot="header" class="text-left">
            <span><b>1.3 入职借款</b></span>
          </div>
          <div>
            <el-row :span="24">
              <el-row>
                <el-col :span="5">
                  <el-form-item label-width="130px"  label="是否有入职借款:" prop="yearSalaryAward" class="text-left">
                    <el-input type="number" v-model="formData.hireEntrySalaryDto.yearSalaryAward"
                              @change="formObjChange"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="借款总额(万元):"  label-width="130px"  prop="yearPerformanceAppraisal" class="text-left">
                    <el-input type="number" v-model="formData.hireEntrySalaryDto.yearPerformanceAppraisal"
                              @change="formObjChange"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="还款月数:" label-width="130px"  class="text-left">
                    {{formData.hireEntrySalaryDto.yearSalary}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label-width="130px"  label="每月还款金额:" class="text-left">
                    {{formData.hireEntrySalaryDto.totalYearSalary}}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </div>
        </el-card>


        <!--薪酬结构-->
        <!--<el-card class="box-card">-->
        <!--<div slot="header" class="text-left">-->
        <!--<span><b>1.1 薪酬结构</b></span>-->
        <!--</div>-->
        <!--<table class="table el-table el-table&#45;&#45;border table2">-->
        <!--<thead>-->
        <!--<tr class="text-center">-->
        <!--<th colspan="4">年薪（万元）</th>-->
        <!--<th colspan="6">月薪结构（元）</th>-->
        <!--<th colspan="6">月薪减项（元）</th>-->
        <!--<th rowspan="2">月应发工资<br>(元)</th>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<th>合计</th>-->
        <!--<th>年薪资<br>奖励</th>-->
        <!--<th>年绩效<br>工资</th>-->
        <!--<th>12个月<br>月薪</th>-->

        <!--<th>月工资</th>-->
        <!--<th>年休假<br>工资</th>-->
        <!--<th>满勤奖</th>-->
        <!--<th>交通餐饮<br>补助</th>-->
        <!--<th style="min-width: 80px">小计</th>-->
        <!--<th>12个月月薪<br>(万元)</th>-->

        <!--<th>绩效<br>工资</th>-->
        <!--<th>工资<br>借款</th>-->
        <!--<th>报账<br>工资</th>-->
        <!--<th>契约<br>津贴</th>-->
        <!--<th>福利<br>借款</th>-->
        <!--<th style="min-width: 80px">小计</th>-->
        <!--</tr>-->
        <!--</thead>-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.totalYearSalary}}-->
        <!--</td>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.yearSalaryAward}}-->
        <!--&lt;!&ndash;<el-input v-model="formData.hireEntrySalaryDto.yearSalaryAward" @change="formObjChange"></el-input>&ndash;&gt;-->
        <!--</td>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.yearPerformanceAppraisal}}-->
        <!--&lt;!&ndash;<el-input v-model="formData.hireEntrySalaryDto.yearPerformanceAppraisal"&ndash;&gt;-->
        <!--&lt;!&ndash;@change="formObjChange"></el-input>&ndash;&gt;-->
        <!--</td>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.yearSalary}}-->
        <!--</td>-->

        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.monthSalary}}-->
        <!--</td>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.annualHoliday}}-->
        <!--&lt;!&ndash;<el-input v-model="formData.hireEntrySalaryDto.annualHoliday" @change="formObjChange"></el-input>&ndash;&gt;-->
        <!--</td>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.fullFrequentlyAward}}-->
        <!--&lt;!&ndash;<el-input v-model="formData.hireEntrySalaryDto.fullFrequentlyAward" @change="formObjChange"></el-input>&ndash;&gt;-->
        <!--</td>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.trafficaAllowance}}-->
        <!--&lt;!&ndash;<el-input v-model="formData.hireEntrySalaryDto.trafficaAllowance" @change="formObjChange"></el-input>&ndash;&gt;-->
        <!--</td>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.totalMoneySalary}}-->
        <!--</td>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.yearSalary}}-->
        <!--</td>-->

        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.meritPay}}-->
        <!--&lt;!&ndash;<el-input type="number" v-model="formData.hireEntrySalaryDto.meritPay"&ndash;&gt;-->
        <!--&lt;!&ndash;@change="formObjChange"></el-input>&ndash;&gt;-->
        <!--</td>-->
        <!--<td @click="showDeduDialog('salaryBorrow')">-->
        <!--<a style="color:#45a1ff">-->
        <!--{{formData.hireEntrySalaryDto.salaryBorrow}}-->
        <!--</a>-->
        <!--</td>-->
        <!--<td @click="showDeduDialog('accountSalary')">-->
        <!--<a style="color:#45a1ff">-->
        <!--{{formData.hireEntrySalaryDto.accountSalary}}-->
        <!--</a>-->
        <!--</td>-->
        <!--<td @click="showDeduDialog('contractAllowance')">-->
        <!--<a style="color:#45a1ff">-->
        <!--{{formData.hireEntrySalaryDto.contractAllowance}}-->
        <!--</a>-->
        <!--</td>-->
        <!--<td @click="showDeduDialog('awardBorrow')">-->
        <!--<a style="color:#45a1ff">-->
        <!--{{formData.hireEntrySalaryDto.awardBorrow}}-->
        <!--</a>-->
        <!--</td>-->

        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.totalSubtract}}-->
        <!--</td>-->
        <!--<td>-->
        <!--{{formData.hireEntrySalaryDto.actualMonthSalary}}-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</el-card>-->

        <!--有入职借款的时候显示-->
        <!--<el-card class="box-card" v-if="formData.hireEntryBorrowMoneyDto.isBorrowText==='是'">-->
          <!--<div slot="header" class="text-left">-->
            <!--<span><b>1.2 入职借款</b></span>-->
          <!--</div>-->
          <!--<table class="table el-table el-table&#45;&#45;border" style="width: 35%">-->
            <!--<thead>-->
            <!--<tr>-->
              <!--<th>是否有<br>入职借款</th>-->
              <!--<th>借款总额<br>（万元）</th>-->
              <!--<th>还款月数<br>（月）</th>-->
              <!--<th>每月还款金额<br>（万元）</th>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr>-->
              <!--<td>-->
                <!--{{formData.hireEntryBorrowMoneyDto.isBorrowText}}-->
              <!--</td>-->
              <!--<td>-->
                <!--{{formData.hireEntryBorrowMoneyDto.totalBorrowMoney}}-->
              <!--</td>-->
              <!--<td>-->
                <!--{{formData.hireEntryBorrowMoneyDto.periods}}-->
                <!--&lt;!&ndash;<el-input v-model="formData.hireEntryBorrowMoneyDto.periods" @change="periodsChange()"></el-input>&ndash;&gt;-->
              <!--</td>-->
              <!--<td>-->
                <!--{{formData.hireEntryBorrowMoneyDto.perRepay}}-->
              <!--</td>-->
            <!--</tr>-->
            <!--</tbody>-->
          <!--</table>-->
        <!--</el-card>-->

        <!--v-if="formData.hireEntrySalaryConfirmDto.isOfferBankAccount"-->
        <el-card v-if="formObj.isOfferBankAccount" class="box-card">
          <div slot="header" class="text-left">
            <span><b>2.原公司待遇与我司待遇对比</b></span>
            <div style="float: right;">
              <!--<el-button type="primary">上传银行流水</el-button>-->
              <el-button type="primary" v-if="formObj.isShowUploadAtt" @click="showBankAccount()">银行流水</el-button>
              <el-button type="primary" @click="addRowContras(1)">新增固定收入</el-button>
              <el-button type="primary" @click="addRowContras(3)">新增绩效收入</el-button>
            </div>
          </div>
          <table class="table el-table el-table--border">
            <thead>
            <tr style="text-align: left;">
              <th colspan="8" style="text-align: center;">
                <span>原单位：{{formData.hireEntrySalaryConfirmDto.oldCompany}}</span>
              </th>
              <!--<th colspan="4" style="text-align: left!important;"><span class="text-left">工作地点：{{formData.hireEntrySalaryConfirmDto.oldAddress}}  </span></th>-->
              <th colspan="8" style="text-align: center;">
                <span class="text-left">
                我司：{{formData.hireEntrySalaryConfirmDto.company}}
              </span>
              </th>
              <!--<th colspan="4" style="text-align: left!important;"><span class="text-left"> 工作地点：{{formData.hireEntrySalaryConfirmDto.newAddress}}</span></th>-->
            </tr>
            <tr>
              <th style="width: 35px">序号</th>
              <th>项目</th>
              <th>金额</th>
              <th colspan="2" style="width: 140px">发放周期及频率</th>
              <th>年度总额</th>
              <th style="width: 60px">占比</th>
              <th>备注说明</th>
              <th>项目</th>
              <th>金额</th>
              <th colspan="2" style="width: 140px">发放周期及频率</th>
              <th>年度总额</th>
              <th style="width: 60px">占比</th>
              <th>备注说明</th>
              <th style="width: 40px">操作</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(item,index) in formData.hireSalaryContrastDtos.filter(_fi=>_fi.state===1)">
              <td>
                {{item.seq}}
              </td>
              <td style="text-align: left">
                {{item.project}}
                <!--<el-input v-model="item.project" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.moneyAmount}}
                <!--<el-input v-model="item.moneyAmount" placeholder=""></el-input>-->
              </td>
              <td style="width: 80px">
                {{item.period}}
                <!--<el-select v-model="item.period" placeholder="请选择">-->
                <!--<el-option-->
                <!--key="1"-->
                <!--label="按月"-->
                <!--value="按月">-->
                <!--</el-option>-->
                <!--<el-option-->
                <!--key="2"-->
                <!--label="按年"-->
                <!--value="按年">-->
                <!--</el-option>-->
                <!--</el-select>-->

                <!--<el-input v-model="item.period" placeholder=""></el-input>-->
              </td>
              <td style="width: 60px">
                {{item.frequency}}
                <!--<el-input v-model="item.frequency" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.yearMoneyAmount}}
              </td>
              <td>
                {{item.proportionText}}
              </td>
              <td style="max-width: 140px;text-align:left">
                {{item.remark}}
                <!--<el-input v-model="item.remark" placeholder=""></el-input>-->
              </td>


              <td style="text-align: left">
                {{item.hwProject}}
                <!--<el-input v-model="item.hwProject" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.hwMoneyAmount}}
                <!--<el-input v-model="item.hwMoneyAmount" placeholder=""></el-input>-->
              </td>
              <td style="width: 80px">
                {{item.hwPeriod}}

                <!--<el-select v-model="item.hwPeriod" placeholder="请选择">-->
                <!--<el-option-->
                <!--key="1"-->
                <!--label="按月"-->
                <!--value="按月">-->
                <!--</el-option>-->
                <!--<el-option-->
                <!--key="2"-->
                <!--label="按年"-->
                <!--value="按年">-->
                <!--</el-option>-->
                <!--</el-select>-->

                <!--<el-input v-model="item.hwPeriod" placeholder=""></el-input>-->
              </td>
              <td style="width: 60px">
                {{item.hwFrequency}}
                <!--<el-input v-model="item.hwFrequency" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.hwYearMoneyAmount}}
              </td>
              <td>
                {{item.hwProportionText}}
              </td>
              <td style="max-width: 140px;text-align:left">
                {{item.hwRemark}}
                <!--<el-input v-model="item.hwRemark" placeholder=""></el-input>-->
              </td>
              <td>
                <el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>
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
                {{item.proportionText}}
              </td>
              <td style="max-width: 140px;text-align:left">
                {{item.remark}}
              </td>

              <td :colspan="4" style="text-align: left">
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
              <td style="max-width: 140px;text-align:left">
                {{item.hwRemark}}
              </td>
              <td></td>
              <!--<td>-->
              <!--&lt;!&ndash;<el-button  type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>&ndash;&gt;-->
              <!--</td>-->
            </tr>
            <tr v-for="(item,index) in formData.hireSalaryContrastDtos.filter(_fi=>_fi.state===3)">
              <td>
                {{item.seq}}
              </td>
              <td style="text-align: left">
                {{item.project}}
                <!--<el-input v-model="item.project" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.moneyAmount}}
                <!--<el-input v-model="item.moneyAmount" placeholder=""></el-input>-->
              </td>
              <td style="width: 80px">
                {{item.period}}
                <!--<el-select v-model="item.period" placeholder="请选择">-->
                <!--<el-option-->
                <!--key="1"-->
                <!--label="按月"-->
                <!--value="按月">-->
                <!--</el-option>-->
                <!--<el-option-->
                <!--key="2"-->
                <!--label="半年"-->
                <!--value="半年">-->
                <!--</el-option>-->
                <!--</el-select>-->

                <!--<el-input v-model="item.period" placeholder=""></el-input>-->
              </td>
              <td style="width: 60px">
                {{item.frequency}}
                <!--<el-input v-model="item.frequency" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.yearMoneyAmount}}
              </td>
              <td>
                {{item.proportionText}}
              </td>
              <td style="max-width: 140px;text-align:left">
                {{item.remark}}
                <!--<el-input v-model="item.remark" placeholder=""></el-input>-->
              </td>


              <td style="text-align: left">
                {{item.hwProject}}
                <!--<el-input v-model="item.hwProject" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.hwMoneyAmount}}
                <!--<el-input v-model="item.hwMoneyAmount" placeholder=""></el-input>-->
              </td>
              <td style="width: 80px">
                {{item.hwPeriod}}

                <!--<el-select v-model="item.hwPeriod" placeholder="请选择">-->
                <!--<el-option-->
                <!--key="1"-->
                <!--label="年度"-->
                <!--value="年度">-->
                <!--</el-option>-->
                <!--<el-option-->
                <!--key="2"-->
                <!--label="半年"-->
                <!--value="半年">-->
                <!--</el-option>-->
                <!--</el-select>-->

                <!--<el-input v-model="item.hwPeriod" placeholder=""></el-input>-->
              </td>
              <td style="width: 60px">
                {{item.hwFrequency}}
                <!--<el-input v-model="item.hwFrequency" placeholder=""></el-input>-->
              </td>
              <td>
                {{item.hwYearMoneyAmount}}
              </td>
              <td>
                {{item.hwProportionText}}
              </td>
              <td style="max-width: 140px;text-align:left">
                {{item.hwRemark}}
                <!--<el-input v-model="item.hwRemark" placeholder=""></el-input>-->
              </td>
              <td>
                <el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>
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
              <td style="max-width: 140px">
                {{item.remark}}
              </td>

              <td :colspan="4" style="text-align: left">
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
              <td style="max-width: 140px">
                {{item.hwRemark}}
              </td>
              <!--<td>-->
              <!--&lt;!&ndash;<el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>&ndash;&gt;-->
              <!--</td>-->
              <td></td>
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
                {{item.proportionText}}
                <!--<el-input v-model="item.proportionText" placeholder=""></el-input>-->
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
              <td></td>
              <!--<td>-->
              <!--&lt;!&ndash;<el-button type="danger" icon="el-icon-delete" round @click="doDeleteOne(item)"></el-button>&ndash;&gt;-->
              <!--</td>-->
            </tr>

            </tbody>
          </table>

        </el-card>

        <el-row class="text-left">
          <el-col :span="24" class="text-left">
            <el-form-item label-width="120px" label="录用理由:">
              <el-input readonly type="textarea" :autosize="{ minRows: 2}"
                        v-model="formData.hireEntrySalaryConfirmDto.hireReason"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="text-left">
          <el-col :span="24" class="text-left">
            <el-form-item label-width="120px" label="薪酬确定理由:">
              <el-input readonly type="textarea" :autosize="{ minRows: 2}"
                        v-model="formData.hireEntrySalaryConfirmDto.salaryComfireReason"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-dialog :title="formData.hireEntrySalaryConfirmDto.company+'【入职薪酬】职等、职级选择'" width="50%" :close-on-click-modal="false"
               :visible.sync="dialogSalaryRank">
      <div>
        <!--<el-row class="text-left">-->
        <!--<el-col :span="24" class="text-right">-->
        <!--<div>-->
        <!--<el-button type="primary" @click="doConfirmSalaryRank()">保存</el-button>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <salary-rank-edit ref="salaryRank"
                          :keyVal="keyVal"
                          :salaryObj="formData.hireEntrySalaryConfirmDto"
                          :salarySystem="formData.hireEntrySalaryConfirmDto.company">
        </salary-rank-edit>
      </div>
    </el-dialog>

    <el-dialog title="【职等工资标准】查看" width="80%" :close-on-click-modal="false"
               :visible.sync="dialogSalaryStand">
      <salary-standard-grade :salarySystem="formData.hireEntrySalaryConfirmDto.company"
                             :salaryGrade="formData.hireEntrySalaryConfirmDto.salaryGrade"
                             :isReadOnly="true"
                             :salaryObj="salaryRankObj">
      </salary-standard-grade>
    </el-dialog>

    <el-dialog title="【工资借款标准】" width="65%" :visible.sync="dialogDeduBorrow">
      <div>
        <!--<el-row>-->
        <!--<el-col :span="24" class="text-right">-->
        <!--<div>-->
        <!--<el-button type="primary" @click="doDeduConfirm('salaryBorrow')">保存</el-button>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <dedu-borrow ref="salaryBorrow" :keyVal="keyVal" :formObj="deduFormData">
        </dedu-borrow>
      </div>
    </el-dialog>
    <el-dialog title="【报账工资】" width="75%"  :close-on-click-modal="false" :visible.sync="dialogAccount">
      <div>
        <!--<el-row>-->
        <!--<el-col :span="24" class="text-right">-->
        <!--<div>-->
        <!--<el-button type="primary" @click="doDeduConfirm('accountSalary')">保存</el-button>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <dedu-account ref="accountSalary" :keyVal="keyVal" :formObj="deduFormData">
        </dedu-account>
      </div>
    </el-dialog>
    <el-dialog title="【契约津贴】" width="65%" :close-on-click-modal="false" :visible.sync="dialoContract">
      <div>
        <!--<el-row>-->
        <!--<el-col :span="24" class="text-right">-->
        <!--<div>-->
        <!--<el-button type="primary" @click="doDeduConfirm('contractAllowance')">保存</el-button>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <dedu-contract ref="contractAllowance" :keyVal="keyVal" :formObj="deduFormData">
        </dedu-contract>
      </div>
    </el-dialog>
    <el-dialog title="【福利借款】" width="65%" :close-on-click-modal="false" :visible.sync="dialogAward">
      <div>
        <!--<el-row>-->
        <!--<el-col :span="24" class="text-right">-->
        <!--<div>-->
        <!--<el-button type="primary" @click="doDeduConfirm('awardBorrow')">保存</el-button>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <dedu-award ref="awardBorrow" :keyVal="keyVal" :formObj="deduFormData">
        </dedu-award>
      </div>
    </el-dialog>

    <el-dialog title="固定收入" width="35%" :close-on-click-modal="false" :visible.sync="dialogBank">
      <div>
        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>原单位</b></span>
          </div>
          <el-form size="mini" :model="editForm" ref="editForm" :rules="rules" label-position="right"
                   label-width="110px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="项目" prop="dicKey" class="text-left">
                  <el-input v-model="editForm.dicKey"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="金额" prop="project" class="text-left">
                  <el-col :span="24">
                    <el-input placeholder="" v-model="editForm.project" :min="0">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="周期" prop="dicVal" class="text-left">
                  <el-col :span="24">
                    <el-select v-model="editForm.period" placeholder="请选择">
                      <el-option key="1" label="月度" value="月度"></el-option>
                      <el-option key="2" label="季度" value="季度"></el-option>
                      <el-option key="3" label="半年度" value="半年度"></el-option>
                      <el-option key="4" label="年度" value="年度"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="频率" prop="frequency" class="text-left">
                  <el-col :span="24">
                    <el-input placeholder="" v-model="editForm.frequency" :min="0">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="text-left">
            <span><b>我司</b></span>
          </div>
          <el-form size="mini" :model="editForm" ref="editForm" :rules="rules" label-position="right"
                   label-width="110px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="项目" prop="dicKey" class="text-left">
                  <el-input v-model="editForm.dicKey"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="金额" prop="project" class="text-left">
                  <el-col :span="24">
                    <el-input placeholder="" v-model="editForm.project" :min="0">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="周期" prop="dicVal" class="text-left">
                  <el-col :span="24">
                    <el-select v-model="editForm.period" placeholder="请选择">
                      <el-option key="1" label="月度" value="月度"></el-option>
                      <el-option key="2" label="季度" value="季度"></el-option>
                      <el-option key="3" label="半年度" value="半年度"></el-option>
                      <el-option key="4" label="年度" value="年度"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="频率" prop="frequency" class="text-left">
                  <el-col :span="24">
                    <el-input placeholder="" v-model="editForm.frequency" :min="0">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="addRow(1)">保存</el-button>
            <el-button @click="dialogBank=false">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>


  </div>
</template>
<style lang="scss" scoped>
  .demo_container {

    .bg-purple-dark {
      background: #99a9bf;
    }
    max-width: 1320px;
    .el-select, el-input-number, .el-autocomplete {
      width: 100%;
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
  }
</style>
<style lang="scss">
  .demo_container {
    .el-row {
      margin-bottom: 0px;
      border-bottom: 1px solid #e0dddd
    }
    .el-form-item {
      margin-bottom: 0px;
    }
    .el-form-item__label {
      background: #EBEEF5;
    }
    .el-input-group__append, .el-input-group__prepend {
      padding: 0 10px;
    }
    .el-input {
      /*border: none;*/
      width: 90%;
      margin: 1px 3px;
    }
    .el-textarea {
      /*border: none;*/
      width: 90%;
      margin: 1px auto;
    }
    .el-input__inner {
      padding: 0px 5px;
    }
    .el-textarea__inner {
      padding: 5px 2px;
    }
    .el-input-group__append .el-button {
      color: #000000;
    }
    .box-card {
      margin-bottom: 0px;
    }
    .el-card {
      border: 1px solid #ccc;
      .el-card__header {
        padding: 4px;
        font-size: 14px;
        border-bottom: 1px solid #e0dddd;
        /*border-bottom: none;*/
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #DCDFE6;
      }
      .el-card__body {
        margin: 0px;
        padding: 0px;
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
      background: #e5e9f2;
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

  import Hire_API from '@/api/hire/hire';
  import WaittingApproval_API from '@/api/approval/waittingApproval'
  import FlowNode from "@/views/approval/com/flow_node";
  import EmployeeSelect from "@/views/approval/com/employee_select";
  import SalaryStandardGrade from "@/views/approval/com/entry/salary_standard_grade";

  import DeduBorrow from "@/views/approval/com/dedu/dedu_borrow";
  import DeduAccount from "@/views/approval/com/dedu/dedu_account";
  import DeduContract from "@/views/approval/com/dedu/dedu_contract";
  import DeduAward from "@/views/approval/com/dedu/dedu_award";

  import SalaryRankEdit from "@/views/approval/com/entry/salary_rank_edit";
  import ElForm from "element-ui/packages/form/src/form";
  import ElInput from "element-ui/packages/input/src/input";
  import LabelWrap from "element-ui/packages/form/src/label-wrap";
  import ElRadio from "element-ui/packages/radio/src/radio";
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
        dialogBank: false,
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
        tableData: [
          {
            subject: '1',
            title: '2',
            createrName: '3',
            createTime: '4',
            currentNodeName: '5',
          }
        ],
        salaryRankObj: {},//入职薪酬职等职级
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
            , lastAlterId: null
            , lastAlterTime: null
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
          hireSalarySubProjectDtos: []
        },
        flowData: {instanceId: ''},//
        state4Row: [2, 4, 5],
        stateRow: [6],
        salaryJobLevelList: [
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
        deduFormData: {},
        attTokenKey: '',
        salaryRankList: [],
        ruleForm: {},
        rules: {
          // name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
          salaryJobLevel: [{required: true, message: '职级不能为空', trigger: 'blur'}],
          salaryRank: [{required: true, message: '薪酬不能为空', trigger: 'blur'}],

          // yearSalaryAward: [{required: true, message: '年薪资奖励不能为空', trigger: 'blur'}],
          // yearPerformanceAppraisal: [{required: true, message: '年绩效工资不能为空', trigger: 'blur'}],
          // annualHoliday: [{required: true, message: '年休假工资不能为空', trigger: 'blur'}],
          // fullFrequentlyAward: [{required: true, message: '满勤奖不能为空', trigger: 'blur'}],
          // meritPay: [{required: true, message: '绩效工资不能为空', trigger: 'blur'}],
        },

        editForm: {project:'',frequency:''}
      }
    },
    components: {
      ElRadio,
      LabelWrap,
      ElInput,
      ElForm,
      EmployeeSelect,
      FlowNode,
      SalaryStandardGrade,
      SalaryRankEdit,
      DeduBorrow,
      DeduAccount,
      DeduContract,
      DeduAward,
    },
    methods: {
      //公共方法
      getTableHeight() {
        this.tableHeight = window.innerHeight - 120;
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
        let params = {personalId: this.instanceId};
        this.findAllByPersonalId(params);
        //判断是否拟稿节点
        this.findOneInstance(params);
      },
      findAllByPersonalId(params) {
        Hire_API.findAllByPersonalId(params).then(res => {
          this.formData = res.data || {};
          this.formObj = Object.assign(this.formObj, this.formData.hireDraftDto);//目的是给父组件赋值
          //特殊处理银行流水字段
          this.formObj.isOfferBankAccount = this.formData.hireEntrySalaryConfirmDto
          && this.formData.hireEntrySalaryConfirmDto.isOfferBankAccount === '是' ? true : false;
          let data = this.formData.hireSalaryContrastDtos || [];
          data.forEach((item, index) => {
            item.seq = index + 1;
          })

          this.formData.hireDraftDto = this.formData.hireDraftDto || {};
          this.formData.hireEntryBorrowMoneyDto = this.formData.hireEntryBorrowMoneyDto || {};
          this.formData.hireEntrySalaryConfirmDto = this.formData.hireEntrySalaryConfirmDto || {};
          this.formData.hireEntrySalaryDto = this.formData.hireEntrySalaryDto || {};
          this.formData.hireSalaryContrastDtos = this.formData.hireSalaryContrastDtos || [];
          this.formData.hireSalarySubProjectDtos = this.formData.hireSalarySubProjectDtos || [];

        }).catch(err => {
          this.$message({type: 'error', showClose: true, message: '数据初始化请求异常：' + err.msg})
        });
      },
      //判断是否拟稿节点
      findOneInstance(params) {
        WaittingApproval_API.findOneInstance(params).then(res => {
          console.log(res)
          // this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },
      //获取及初始化atttoken
      getAndInitAttToken(params) {
        WaittingApproval_API.getAndInitAttToken(params).then(res => {
          console.log(111, res)
          // this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },

      //-----待遇对比-----
      addRow(val) {
        this.dialogBank=false;
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
          console.log('shuzu :', contrasData)
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
          = this.formData.hireEntrySalaryDto.yearSalary / 12 * 10000; //小计
        this.formData.hireEntrySalaryDto.totalMoneySalary =
          this.formData.hireEntrySalaryDto.totalMoneySalary.toFixed(2);

        this.formData.hireEntrySalaryDto.monthSalary
          = this.formData.hireEntrySalaryDto.totalMoneySalary
          - this.formData.hireEntrySalaryDto.annualHoliday
          - this.formData.hireEntrySalaryDto.fullFrequentlyAward
          - this.formData.hireEntrySalaryDto.trafficaAllowance;  // 月工资

        // 2.3 月薪酬减项
        this.formData.hireEntrySalaryDto.totalSubtract =
          this.formData.hireEntrySalaryDto.meritPay
          + this.formData.hireEntrySalaryDto.salaryBorrow
          + this.formData.hireEntrySalaryDto.accountSalary
          + this.formData.hireEntrySalaryDto.contractAllowance
          + this.formData.hireEntrySalaryDto.awardBorrow;  // 小计

        // this.formData.hireEntrySalaryDto.totalSubtract=
        //   this.formData.hireEntrySalaryDto.totalSubtract.toFixed(2);

        //月应发工资
        this.formData.hireEntrySalaryDto.actualMonthSalary =
          this.formData.hireEntrySalaryDto.totalMoneySalary
          + this.formData.hireEntrySalaryDto.totalSubtract;


      },
      entryMonthSalaryChange() {
        this.formData.hireEntrySalaryConfirmDto.entrySalary = (this.formData.hireEntrySalaryConfirmDto.entryMonthSalary * 12 / 10000).toFixed(4);
      },
      //待遇对比计算
      compareDataChange() {

      },

      //入职薪酬职级选择
      showRankEdit(val) {
        // this.$refs.salaryRank.salaryGradeList=[];
        // this.$refs.salaryRank.salaryRankList=[];
        this.keyVal = new Date().getTime() + '_';
        this.dialogSalaryRank = true;
      },
      doConfirmSalaryRank() {
        console.log(this.$refs.salaryRank.formData);
        let obj = this.$refs.salaryRank.formData || {};
        this.formData.hireEntrySalaryConfirmDto.salaryRank = obj.salaryRank;
        this.formData.hireEntrySalaryConfirmDto.entryMonthSalary = obj.entryMonthSalary;
        this.formData.hireEntrySalaryConfirmDto.entrySalary = obj.entrySalary;
        this.formData.hireEntrySalaryConfirmDto.salaryGrade = obj.salaryGrade;
        this.dialogSalaryRank = false;
        this.$refs.salaryRank.formData = {};
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


      //扣减项编辑
      saveAllSubProject(params) {
        Hire_API.saveAllSubProject(params).then(res => {
          if (res.success) {
            this.$message({type: 'success', message: '明细保存成功！'})
            this.initPage();
          }
          else {
            this.$message({type: 'error', message: '明细保存失败！' + res.msg});
          }
        }).catch(err => {
          this.$message({type: 'error', message: '明细保存失败：' + err.msg})
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
            console.log(obj)
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
            this.formData.hireEntrySalaryDto.salaryBorrow = obj.monthRepaymentAmount || null;
            this.dialogDeduBorrow = false;
            break;
          //报账工资
          case 'accountSalary':
            this.formData.hireEntrySalaryDto.accountSalary = obj.beforeTaxMonthSalary || null;
            this.dialogAccount = false;
            break;
          //契约津贴
          case 'contractAllowance':
            this.formData.hireEntrySalaryDto.contractAllowance = obj.perTaxYearSalary || null;
            this.dialoContract = false;
            break;
          //福利借款
          case 'awardBorrow':
            this.formData.hireEntrySalaryDto.awardBorrow = obj.monthBorrowAmount || null;
            this.dialogAward = false;
            break;
          default:
            break;
        }
      },

      /**
       *
       * 弹出框界面功能
       */
      showFlowNode() {
        this.dialogFlow = true;
      },
      showSalaryStand() {
        this.salaryRankObj = this.formData.hireEntrySalaryConfirmDto || {};
        if (!this.salaryRankObj.salaryGradeStandard) {
          this.salaryRankObj.salaryGradeStandard = this.salaryRankObj.salaryGrade;
        }
        console.log('salaryGradeStandard2', this.salaryRankObj.salaryGradeStandard)
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
        // action = this.formObj.isEditAtt ? '编辑' : '查阅';
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
        console.log(url);
        console.log('bankPageurl1:', url);
        window.location.href = url;
      },


      //新增固定收入
      addRowContras(val) {
        this.dialogBank = true;
      }
    },
    created() {

    },
    computed: {
      ...mapGetters(['login_user']),
    },
    mounted() {
      this.initPage();
      this.getTableHeight();
      let attkey = getCookie(TokenKey);
      this.attTokenKey = attkey.substring(0, 16) || '';
      this.getAndInitAttToken({tokenId: this.attTokenKey});
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>



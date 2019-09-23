<template>
  <div class="app-container" style="text-align: center;width: 100%;">
    <div style="margin:0 auto;width:604px">
      <!-- <div class="text-center"><h3><b>入职借条</b></h3></div> -->
      <!-- <span>模板未确认</span> -->
      <el-row>
        <div class="PageNext">
          <el-col class="text-center" style="font-size:22pt;font-family:SimHei;">工资确认书</el-col>
          <el-col
            class="text-center"
            style="font-size:15pt;font-family:FangSong_GB2312;"
          >（适用于高级管理人员）</el-col>
          <el-col>&#12288;</el-col>
          <el-col style="text-align: justify;">
            <span class="text1">
              甲方：<span style="text-decoration:;">{{companyName}}</span>
              <br />乙方：<span style="text-decoration:;">{{name}}</span>
              <br />&#12288;&#12288;经甲乙双方平等协商，达成一致意见，双方就劳务报酬等相关事宜确认如下：
              <br />
              <span class="text2">
                &#12288;&#12288;一、聘任职务
                <br />
              </span>&#12288;&#12288;甲方聘任乙方为<input class="inputText" v-model="position" />
              <br />
              <span class="text2">
                &#12288;&#12288;二、工资报酬
                <br />
              </span>
              <span class="text1">
                <b>&#12288;&#12288;（一）乙方的年工资总额：<span
                    style="text-decoration:underline;"
                  >&#8194;&#8194;{{totalYearSalary}}&#8194;&#8194;</span>万元。
                </b>
                <br />
              </span>
              <span class="text1">
                <b>&#12288;&#12288;（二）年工资构成分解如下：</b>
                <br />
              </span>
            </span>
          </el-col>
          <el-table
            border
            :cell-style="cellStyle"
            :header-cell-style="getRowClass"
            :data="salaryList"
            class="borderLine"
            style="font-family:FangSong_GB2312;font-size:15pt;color:#000;line-height:22pt;letter-spacing:0px;width:590px;z-index:-100"
          >
            <el-table-column type="index" header-align="center" align="center" label="序号"></el-table-column>
            <el-table-column prop="project" header-align="center" align="center" label="构成项目"></el-table-column>
            <el-table-column prop="amount" header-align="center" align="center" label="金额（万元）"></el-table-column>
            <el-table-column prop="giveType" header-align="center" align="center" label="发放方式"></el-table-column>
          </el-table>
          <el-col class="text-left" style="margin-top:10px">
            <span class="text1">
             
              <span class="text1">
                <b> &#12288;&#12288;（三）特别说明</b>
                <br />
              </span>&#12288;&#12288;
              <b>1、年绩效工资：</b>
              <br />&#12288;&#12288;（1）为年工资总额的<span
                style="text-decoration:underline;"
              >&#8194;&#8194;{{proportion}}%&#8194;&#8194;</span>。
              <br />&#12288;&#12288;（2）甲方公布并执行相关绩效考核管理制度（方案）前，根据实际出勤计发绩效考核工资。
              <br />&#12288;&#12288;（3）甲方公布并执行相关绩效考核管理制度（方案）后，根据绩效考核的结果发放绩效考核工资。
              <br />&#12288;&#12288;
              <b>2、年薪资奖励：</b>
              <br />&#12288;&#12288;（1）为2个月的月薪（含基本工资、满勤奖、交通餐饮补助）。
              <br />&#12288;&#12288;（2）入职第一年或年内离职的按实际出勤计发。
              <br />&#12288;&#12288;
              <b>3、每月月薪</b>：已包含基本工资、满勤奖、交通餐饮补助。
              <br />
              <span class="text2">&#12288;&#12288;三、年休假：</span>乙方每年度可享受的带薪年休假天数按国家法规执行。
              <br />
              <span class="text2">&#12288;&#12288;四、说&#8194; 明：</span>上述工资为税前薪资，均以法定出勤的满勤设定金额，按实际出勤和绩效考核结果计算当月或当年应得的金额。
            </span>
          </el-col>
        </div>

        <div class="PageNext">
          <el-col style="text-align: justify;">
            <span class="text1">
              <span class="text2">
                <br />&#12288;&#12288;五、股权激励：
              </span>按照甲方的股权激励方案执行。
              <span class="text2">
                <br />&#12288;&#12288;六、签订协议的目的及保密
              </span>
              <br />&#12288;&#12288;1、签订本协议的目的：说明乙方的年薪酬标准，甲方的内部流程已审批。
              <br />&#12288;&#12288;2、为了薪酬的保密，本协议由甲方负责保管。
              <br />&#12288;&#12288;3、本协议一式一份，自双方签字之日生效。
              <br />
              <br />
              <br />
              <br />
              <br />&#12288;&#12288;甲方法人代表：&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;乙方：
              <br />&#12288;&#12288;签订日期：&#12288;&#12288;年&#12288;月&#12288;日&#12288;&#12288;&#12288;&#12288;签订日期：&#12288;&#12288;年&#12288;月&#12288;日
            </span>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
import Hire_API from "@/api/hire/hire";
import Vue from "vue";
export default {
  name: "price-list",
  data() {
    return {
      loading: false,
      tableData: [],
      item: [],
      name: "",
      nid: "",
      totalYearSalary: "",
      minDay: "10日",
      year: "",
      month: "",
      day: "",
      periods: "",
      period: "",
      perRepay: "",
      companyName: "",
      position: "",
      salaryList: [],
      proportion: ""
    };
  },
  components: {},
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'border-color: #000 !important'
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return 'border-color: #000 !important;background-color:transparent;'
    },
    //初始化
    initPage() {
      // this.first();
      this.getAllIsOrgCompany();
      this.name = this.$route.query.name;
      this.nid = this.$route.query.nid;
      this.companyName = this.$route.query.company;
      this.position = this.$route.query.position;
      var timearr = this.$route.query.planEntryDay.split("-");
      this.year = timearr[0];
      this.month = timearr[1];
      this.day = timearr[2];
      this.findByPersonalIdSalary();
    },
    getAllIsOrgCompany() {
      Hire_API.getAllIsOrgCompany().then(res => {
        this.companyList = res.data || []
        this.companyName = this.$route.query.company;
        if (this.companyList) {
          for (let i = 0; i < this.companyList.length; i++) {
            if (this.companyName == this.companyList[i].descrShort) {
              this.companyName = this.companyList[i].descr
            }
          }
        }
      })
    },
    findByPersonalIdSalary() {
      Hire_API.findByPersonalIdSalary(this.$route.query.fdId).then(res => {
        console.log(res.data);
        this.totalYearSalary = res.data.totalYearSalary;
        this.salaryList = [
          {
            project: "年绩效工资",
            amount: res.data.yearPerformanceAppraisal,
            giveType: "次年1月发放上年"
          },
          {
            project: "年薪资奖励",
            amount: res.data.yearSalaryAward,
            giveType: "次年1月发放上年"
          },
          {
            project: "12个月月薪",
            amount: res.data.yearSalary,
            giveType: "每月发放"
          }
        ];
        this.proportion =
          (res.data.yearPerformanceAppraisal / res.data.totalYearSalary) * 100;
        var s = this.proportion;
        var aNew;
        var re = /([0-9]+.[0-9]{1})[0-9]*/;
        aNew = s.toFixed(2);
        // alert(aNew);
        let aanew = aNew.split('.')[1]
        if (aanew == '00') {
          this.proportion = s.toFixed(0)
        } else {
          this.proportion = aNew
        }
        console.log(aNew);
        //汉字的数字
        var cnNums = new Array(
          "零",
          "壹",
          "贰",
          "叁",
          "肆",
          "伍",
          "陆",
          "柒",
          "捌",
          "玖"
        );
        //基本单位
        var cnIntRadice = new Array("", "拾", "佰", "仟");
        //对应整数部分扩展单位
        var cnIntUnits = new Array("", "万", "亿", "兆");
        //对应小数部分单位
        var cnDecUnits = new Array("角", "分", "毫", "厘");
        //整数金额时后面跟的字符
        var cnInteger = "整";
        //整型完以后的单位
        var cnIntLast = "元";
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = "";
        //分离金额后用的数组，预定义
        var parts;
        var money = this.borrowMoneyNum;
        if (money == "") {
          return "";
        }
        money = parseFloat(money);
        if (money >= maxNum) {
          //超出最大处理数字
          return "";
        }
        if (money == 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf(".") == -1) {
          integerNum = money;
          decimalNum = "";
        } else {
          parts = money.split(".");
          integerNum = parts[0];
          decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
          var zeroCount = 0;
          var IntLen = integerNum.length;
          for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == "0") {
              zeroCount++;
            } else {
              if (zeroCount > 0) {
                chineseStr += cnNums[0];
              }
              //归零
              zeroCount = 0;
              chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
              chineseStr += cnIntUnits[q];
            }
          }
          chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != "") {
          var decLen = decimalNum.length;
          for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != "0") {
              chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
          }
        }
        if (chineseStr == "") {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == "") {
          chineseStr += cnInteger;
        }
        this.borrowMoneText = chineseStr;
        console.log(chineseStr);
      });
    }
  },
  created() { },
  mounted() {
    this.initPage();
  }
};
</script>
<style lang="scss" scoped>
.text {
  font-family: FangSong_GB2312;
  font-size: 15pt;
  text-align: center;
}
.text1 {
  font-family: FangSong_GB2312;
  font-size: 15pt;
  color: #000;
  line-height: 22pt;
  letter-spacing: 0px;
}
.text2 {
  font-family: SimHei;
  font-size: 15pt;
}
.inputText {
  border-left-width: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0.5px;
  border-bottom-color: #090909 !important;
  font-size: 15pt;
  text-align: center;
  font-family: FangSong_GB2312;
  font-size: 15pt;
  width: 150px;
  background-color: rgba(255, 255, 255, 0);
}
.borderLine {
  border-color: #000 !important;
}
.PageNext {
  page-break-after: always;
  margin: 0 auto;
  // width: 690px;
  height: 970px;
  background: url("../image/watermark.png") no-repeat;
  // background: url("/hwagain/el-salary/static/img/watermark.png") no-repeat
  //   center;
  // background-image: url("/hwagain/el-salary/static/img/watermark.png");
}

.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background: #000;
}
.el-table th,
.el-table td {
  border-color: #000 !important;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #000 !important;
}
.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid #000 !important;
}
.watermark {
  margin: 0 auto;
  // width: 690px;
  // height: 1000px;
  background: url("/static/img/watermark.png") no-repeat center;
  background-image: url("/static/img/watermark.png");
}
</style>
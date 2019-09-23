<template>
  <div class="app-container" style="text-align: center;width: 100%;">
    <div class="watermark" style="margin:0 auto;width:604px">
      <!-- <div class="text-center"><h3><b>入职借条</b></h3></div> -->
      <!-- <span>模板未确认</span> -->
      <el-row>
        <el-col class="text-center" style="font-size:28px;font-family:SimHei;">借条</el-col>
        <el-col>&#12288;</el-col>
        <el-col
          style="text-align: justify;font-family:FangSong_GB2312;font-size:15pt;color:#000;line-height:20pt;letter-spacing:0px"
        >
          <span>&#12288;&#12288;借款人:</span><span style="text-decoration:underline;">{{name}}</span>（身份证号：<span style="text-decoration:underline;">{{nid}}</span>&#8197;）拟入职出借人投资的公司。为安置家庭，借款人向出借人借款，借款本金：<span style="text-decoration:underline;"
          >{{borrowMoneText}}</span>（￥<span style="text-decoration:underline;">{{borrowMoneyNum}}</span>元）。借款人出具本借条后由出借人在<input
            class="inputText"
            style="width:50px;text-align:center;font-family:FangSong_GB2312;font-size:15pt;"
            v-model="minDay"
          />内将借款本金通过转账方式汇入借款人以下账户：
          <br />&#12288;&#12288;户&#12288;名：
          <input
            class="inputText"
            style="width:350px;font-family:FangSong_GB2312;font-size:15pt;"
          />
          <br />&#12288;&#12288;开户行：
          <input
            class="inputText"
            style="width:350px;font-family:FangSong_GB2312;font-size:15pt;"
          />
          <br />&#12288;&#12288;账&#12288;号：
          <input
            class="inputText"
            style="width:350px;font-family:FangSong_GB2312;font-size:15pt;"
          />
          <br />
          <br />
          <span style="font-size:16pt;font-family:'黑体';">&#12288;&#12288;一、借款人承诺如下：</span>
          <br />
          <span>
            &#12288;&#12288;借款人在收到借款后于<input
              class="inputText"
              style="width:60px;text-align:center;font-family:FangSong_GB2312;font-size:15pt;"
              v-model="year"
            />年<input
              class="inputText"
              style="width:30px;text-align:center;font-family:FangSong_GB2312;font-size:15pt;"
              v-model="month"
            />月<input
              class="inputText"
              style="width:30px;text-align:center;font-family:FangSong_GB2312;font-size:15pt;"
              v-model="day"
            />日前与出借人投资的公司或关联公司签订《劳动合同书》，并到公司报到、工作。借款人逾期不签订《劳动合同书》或逾期不到公司报到、工作的，借款人在&#8197;5日内一次性归还借款本金，并同时向出借人支付借款本金&#8197;50%&#8197;的违约金。逾期归还借款本金及违约金的，每逾期&#8197;1&#8197;日借款人按借款本金的千分之一支付给出借人利息。
          </span>
          <br />
          <span style="font-size:16pt;font-family:'黑体';">&#12288;&#12288;二、还款办法：</span>
          <br />
          <span style="font-family:FangSong_GB2312;font-size:15pt;">
            <b>&#12288;&#12288;1、开始还款时间：</b>
          </span><span>借款人自入职出借人所投资公司或关联公司的次月开始逐月还款；</span>
          <br />
          <span style="font-family:FangSong_GB2312;font-size:15pt;">
            <b>&#12288;&#12288;2、还款月数：</b></span><span>分<span style="text-decoration:underline;">&#8194;{{periods}}&#8194;</span>月归还；
          </span><br /><span style="font-family:FangSong_GB2312;font-size:15pt;">
            <b>&#12288;&#12288;3、每月还款金额：</b></span><span style="text-decoration:underline;">&#8194;{{perRepay}}&#8194;</span>万元；<br />
          <span style="font-family:FangSong_GB2312;font-size:15pt;">
            <b>&#12288;&#12288;4、离职还款：</b></span><span>如借款人在出借人投资的公司或关联公司服务不满&#8197;<input
              class="inputText"
              style="width:30px;text-align:center;font-family:FangSong_GB2312;font-size:15pt;"
              v-model="period"
            />&#8197;个月而离职的（无论是借款人原因还是公司原因），借款人在离职后&#8197;5&#8197;日内将剩余未归还的借款本金归还给出借人。逾期的，每逾期1日借款人按应归还借款本金的千分之一支付出借人利息。
          </span>
          <br />
          <span>&#12288;&#12288;&#8197;（&#8197;注&#8197;：出借人投资的公司及关联公司包括华劲集团股份有限公司、华劲集团纸品销售有限公司、华劲集团股份有限公司南宁纸业分公司、广西华劲竹林发展有限公司、赣州华劲纸业有限公司、华劲集团赣州纸品有限公司、赣州华劲竹林发展有限公司、广西华劲人纸品销售有限公司）</span>
          <br />
          <br />&#12288;&#12288;出借人：&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;借款人：
          <br />
          <br />&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;年&#12288;&#12288;月&#12288;&#12288;日
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Hire_API from '@/api/hire/hire'
import Vue from 'vue';
export default {
  name: 'price-list',
  data() {
    return {
      loading: false,
      tableData: [],
      item: [],
      name: "",
      nid: '',
      borrowMoneyNum: '',
      borrowMoneText: '',
      minDay: '10日',
      year: '',
      month: '',
      day: '',
      periods: '',
      period: '',
      perRepay: '',

    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      // this.first();
      this.name = this.$route.query.name;
      this.nid = this.$route.query.nid;
      var timearr = this.$route.query.planEntryDay.split('-');
      this.year = timearr[0];
      this.month = timearr[1];
      this.day = timearr[2];
      this.findByPersonalIdBorrow();
    },
    findByPersonalIdBorrow() {
      Hire_API.findByPersonalIdBorrow(this.$route.query.fdId).then(res => {
        this.borrowMoneyNum = res.data.totalBorrowMoney * 10000;
        // this.borrowMoneyNum = this.borrowMoneyNum.toFixed(2);
        this.periods = res.data.periods;
        this.period = res.data.periods;
        this.perRepay = res.data.perRepay;
        //汉字的数字
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        //基本单位
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        //对应整数部分扩展单位
        var cnIntUnits = new Array('', '万', '亿', '兆');
        //对应小数部分单位
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        //整数金额时后面跟的字符
        var cnInteger = '整';
        //整型完以后的单位
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = '';
        //分离金额后用的数组，预定义
        var parts;
        var money = this.borrowMoneyNum;
        if (money == '') { return ''; }
        money = parseFloat(money);
        if (money >= maxNum) {
          //超出最大处理数字
          return '';
        }
        if (money == 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
          integerNum = money;
          decimalNum = '';
        } else {
          parts = money.split('.');
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
            if (n == '0') {
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
        if (decimalNum != '') {
          var decLen = decimalNum.length;
          for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
              chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
          }
        }
        if (chineseStr == '') {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
          chineseStr += cnInteger;
        }
        this.borrowMoneText = chineseStr;
      })
    },


  },
  created() {
  },
  mounted() {
    this.initPage();
  },

}
</script>
<style lang="scss" scoped>
.text {
  font-family: FangSong_GB2312;
  font-size: 15pt;
  text-align: center;
}
.inputText {
  border-left-width: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0.5px;
  border-bottom-color: #000;
  font-size: 15pt;
  background-color: rgba(255, 255, 255, 0);
}
.watermark {
  margin: 0 auto;
  // width: 690px;
  // height: 1000px;
  background: url("../image/watermark.png") no-repeat;
  // background: url("/hwagain/el-salary/static/img/watermark.png") no-repeat
  //   center;
  // background-image: url("/hwagain/el-salary/static/img/watermark.png");
}
</style>

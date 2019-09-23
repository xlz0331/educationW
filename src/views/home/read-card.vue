<template>
  <div class="readcard-container home-bg">
    <div class="read-card text-center">

      <!--<OBJECT classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7"-->
      <!--id="CVR_IDCard" name="CVR_IDCard" width="0" height="0">-->
      <!--</OBJECT>-->
      <object id="CertCtl" type="application/cert-reader" width="0" height="0">
        <p style="color:#FF0000;">控件不可用，可能未正确安装控件及驱动，或者控件未启用。</p>
      </object>
      <el-form :inline="true" label-width="100px">
        <el-form-item label="请刷身份证">
          <el-input size="small" v-model="nid"  :readonly="readMultiple"  :title="errorPlaceholder"
                    :placeholder="errorPlaceholder"></el-input>
        </el-form-item>
        <el-form-item v-if="readMultiple==false" >
          <el-button type="primary" @click="readCert()">读取身份证</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {setCookie, getCookie, IdCardKey} from '@/utils/Cookie'
  import System_API from '@/api/system/system'

  export default {
    name: "read-card",
    data() {
      return {
        nid: '',
        name: '',
        IDCardInfo: {
          nid: '',
          name: '',
          sex: ''
        },
        flag: true,//是否读取身份证
        errorPlaceholder: '请刷身份证......',
        timer: null,
        times: 1500, //读卡频率,
        readMultiple: true  //连续读卡
      }
    },
    created() {

    },
    components: {},
    methods: {
      ...mapActions(['idCardInfo']),
      //身份校验
      checkNid(nid) {
        System_API.checkNid_sysBaseData({nid: nid}).then(res => {
          if (res.success) {//身份验证成功之后，将身份证信息保存至混存
            // 跳转进入首页，验证不成功继续刷身份证
            this.flag = false;//关闭
            this.$message({type: 'success', showClose: true, message: '身份校验成功'})
            this.IDCardInfo.nid = nid;
            this.IDCardInfo.name = this.name;
            setCookie(IdCardKey, this.IDCardInfo)
            let url = '/home';//跳转进入首页
            this.$router.push(url);
            // this.idCardInfo({//暂存本地的做法
            //   params: this.IDCardInfo, cb: () => {
            //     this.$router.push(url)
            //   }
            // })
          } else {
            this.$confirm('【' + res.msg + "】，点击【确认】重新读取身份证？", '错误提示', {
              distinguishCancelAndClose: true,
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'error',
            })
              .then(() => {
                this.flag = true;
                this.nid = "";
              })
              .catch(action => {
                this.$message({type: 'error', duration: 0, showClose: true, message: '如要重新刷身份证，请右键刷新页面......'})
                this.flag = false;
              });

          }
        }).catch(err => {
          this.$confirm('【' + (err.msg||err) + "】，点击【确认】重新读取身份证？", '错误提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'error',
          })
            .then(() => {
              this.flag = true;
              this.nid = "";
            })
            .catch(action => {
              this.$message({type: 'warning', duration: 0, showClose: true, message: '如要重新刷身份证，请右键刷新页面......'})
              this.flag = false;
            });
        });
      },
      timeOut() {
        // this.timer = setInterval(this.readCard, this.times);//读取频率1s
        this.timer = setInterval(this.readCert, this.times);//读取频率1s
      },

      //插件cert的写法
      readCert() {//使用cert插件

        if(!this.readMultiple){
          this.checkNid(this.nid);
          return;//测试使用 ，暂时手工输入身份证。测试使用时候  把两行代码注释去掉
        }

        if (!this.flag) return;
        this.flag = false;//关闭
        this.nid = "";
        var CertCtl = document.getElementById("CertCtl");
        try {
          var statusObj = CertCtl.getStatus() || {};//获取状态
          var jsonStatus = JSON.parse(statusObj);
          if (jsonStatus["resultFlag"] == 0) {//获取状态值成功！
            if (jsonStatus.status == 0) {//正常连接
              var result = CertCtl.readCert();
              // this.$message({type: 'success', duration: 0, showClose: true, message: '读取身份证完成......'})
              var resultObj = this.toJson(result);
              if (resultObj.resultFlag == 0) {
                // this.$message({type: 'success', duration: 0, showClose: true, message: '身份证读取成功，正在校验当中......'})
                this.nid = resultObj.resultContent.certNumber;
                this.name = resultObj.resultContent.partyName;
                this.checkNid(this.nid);
                return false;
              }
              else {
                this.flag = true;//开启
                this.errorPlaceholder = '请刷身份证......';
              }
            }
            else {
              this.flag = true;//开启
              // console.log('连接不成功重新开启')
              this.connect();//重新连接设备
              this.$message({type: 'error', duration: 0, showClose: true, message: '连接异常：' + jsonStatus.errorMsg})
            }
          } else {
            this.flag = true;//开启
            // console.log('读取不到状态重新开启')
            this.$message({type: 'error', duration: 0, showClose: true, message: '获取状态信息失败：' + jsonStatus.errorMsg})
          }
        } catch (ex) {
          this.flag = true;//开启
          // this.$message({type: 'error', duration: 0, showClose: true, message: '读卡异常：' + ex})
          return false;
        }
      },
      toJson(str) {
        //var obj = JSON.parse(str);
        //return obj;
        return eval('(' + str + ')');
      },
      connect() {
        var CertCtl = document.getElementById("CertCtl");
        try {
          var result = CertCtl.connect();
          var jsonResult = JSON.parse(result);
          if (jsonResult.resultFlag == 0) {//判断到连接正常之后再打开定时器
            this.$message({type: 'info', showClose: true, message: '设备连接成功......'})
            this.flag = true;//开启
            clearInterval(this.timer);//清空定时器
            if (this.readMultiple) this.timeOut();//定时器读卡
          }
          else {
            this.flag = false;//关闭
            this.$message({type: 'error', duration: 0, showClose: true, message: '连接错误：' + jsonResult.errorMsg})
          }
        } catch (e) {
          this.flag = false;//关闭
          this.$message({type: 'error', duration: 0, showClose: true, message: '连接设备异常：' + e})
        }

      },
      disconnect() {
        var CertCtl = document.getElementById("CertCtl");
        try {
          var result = CertCtl.disconnect();
          // var jsonResult = JSON.parse(result)||{};
          // this.$message({type: 'info', duration: 0, showClose: true, message: '设备断开：' + jsonResult.errorMsg})
        } catch (e) {
          console.log(e)
          // this.$message({type: 'error', duration: 0, showClose: true, message: '设备断开异常：' + e})
        }

      }
    },
    mounted() {
      // // 判断是不是IE浏览器,如果不是IE，直接进入
      if (!(window.ActiveXObject || "ActiveXObject" in window)) {
        var _this = this;
        _this.errorPlaceholder = "当前不是IE浏览器,无法刷身份证。请使用IE11及以上版本访问";
        this.$confirm('当前不是IE浏览器,无法刷身份证。请使用IE11及以上版本访问', '提示', {
          confirmButtonText: '确定',
          // cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          // window.opener = null;
          // window.open('', self);
          // window.close();
          _this.errorPlaceholder = "当前不是IE浏览器,无法刷身份证。请使用IE11及以上版本访问";
        }).catch(() => {
          _this.errorPlaceholder = "当前不是IE浏览器,无法刷身份证。请使用IE11及以上版本访问";
        });
        return false;
      }
      this.nid = "";
      if (getCookie(IdCardKey)) {//判断是否有值  如果已经存在则直接进入菜单
        this.$router.push({path: 'home'})
      } else {
        this.$message({type: 'info', showClose: true, message: '正在尝试连接设备......'})
        try{
          this.disconnect();
        }catch(e) {
        }
        this.connect();//如果需要手工录入测试 ，注释本行，将文本框readonly 去掉
      }
    },
    destroyed() {
      this.disconnect();
      clearInterval(this.timer);
    }
  }
</script>

<style lang="scss" scoped>
  .readcard-container {
    /*width: 800px;*/
    /*height: 600px;*/
  }

  .read-card {
    position: fixed;
    left: 30%;
    background: url("../image/bg-card.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    /*background-size: 400px 200px;*/
    /*background-position-x: 340px;*/
    /*background-position-y: 160px;*/
    height: 400px;
    width: 500px;
    text-align: center;
    /*margin: 0px 100px;*/
    /*padding-top: 200px;*/
  }

  .home-bg {
    height: 100%;
    background: url("../image/bg-2.png");
    background-size: 100% 100%;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-top: 300px;
    .el-input {
      width: 280px;
    }
  }

</style>

<template>
  <div >
    <!--<a href="./static/plug/hdhFramer.CAB">下载插件222</a>-->
    <object id="oframe" width="100%" :height="objectHeight"
            classid="clsid:C9BC4DFF-4248-4a3c-8A49-63A7D317F404"
            codebase="./static/plug/hdhFramer.CAB#version=3,0,0,7" aria-checked="false">
      <p style="color:#FF0000;" v-if="!isIE"> 【当前不是IE浏览器，请使用IE打开】</p>
      <p style="color:#FF0000;"> 控件不可用，请检查安装或启用。  <a  style="text-decoration-line:underline" href="./static/plug/hdhFramer.CAB">下载插件</a></p>
      <param name="BorderStyle" value="1"/>
      <param name="TitlebarColor" value="52479"/>
      <param name="TitlebarTextColor" value="0"/>
      <param name="Titlebar" value="0"/>
      <param name="IsShowToolMenu" value="true"/>
      <param name="TitleBar" value="false"/>
    </object>
  </div>
</template>

<script>

  export default {
    name: "doc-control",
    props: {
      filePath: {
        type: String,
        required: true,
      },
      objectHeight: {
        type: Number,
        required: false
      }
    },
    data() {
      return {
        fdId: '',
        isIE: false
      }
    },
    components: {},
    mounted() {
      let _this=this;
      if (!(window.ActiveXObject || "ActiveXObject" in window)) {
        this.isIE = false
      } else {
        this.isIE = true;
      }
      this.$nextTick(_ => {
        var oframe = document.getElementById("oframe");
        try {
          oframe.OpenFromURL(_this.filePath, true);
          this.$message({type: 'success', showClose: true, message: '附件加载成功！'})
        } catch (ex) {
          // this.$message({type: 'info', showClose: true, message: '没有加载到附件列表正文，请进入【附件列表】查看'})
        }
      })
    }
  }
</script>

<style scoped>

</style>

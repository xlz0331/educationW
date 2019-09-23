<template>
  <div>
    正文控件
    <object id="oframe" width="100%" height="500"
            classid="clsid:C9BC4DFF-4248-4a3c-8A49-63A7D317F404"
            codebase="hdhFramer.CAB#version=3,0,0,7" aria-checked="false">
      <p style="color:#FF0000;">控件不可用，可能未正确安装控件及驱动，或者控件未启用。</p>
      <param name="BorderStyle" value="1" />
      <param name="TitlebarColor" value="52479" />
      <param name="TitlebarTextColor" value="0" />
      <param name="Titlebar" value="0" />
      <param name="IsShowToolMenu" value="true" />
      <param name="IsNoCopy" value="0" />
    </object>
  </div>
</template>

<script>
  import WaittingApproval_API from '@/api/approval/waittingApproval'

  export default {
    name: "doc-control",
    data() {
      return {
        fdId: ''
      }
    },
    components: {},
    methods: {
      initPage() {
        // let params = {fdid: '1142964991513739264'}
        // let url = this.wfFileDownload(params);
        // console.log(1,url);
        // url=decodeURIComponent(url);

        // url=encodeURIComponent(' D:\\资料\\华劲集团信息部-XXX项目概要设计模板-年-月-日-v版本序号.doc')
        // url=`http://hwtest1.hwagain.com:8181/salary-manage/workflow/wfInstance/wfFileDownload?fdid=1142964991513739264`;
url="http://hwtest1.hwagain.com:8181/salary-manage/workflow/wfInstance/wfFileDownload?fdid=1142964991513739264";
        this.$nextTick(_=>{
          var oframe = document.getElementById("oframe");
          oframe.OpenFromURL(url, true);
        })
        //
        // document.getElementById("oframe").Toolbars = !document.getElementById("oframe").Toolbars;
        // document.getElementById("oframe").Activate();
        //
        // document.getElementById("oframe").Menubar = !document.getElementById("oframe").Menubar;
        // document.getElementById("oframe").Activate();
        //
        // oframe.ActiveDocument.Protect(3, true, "");
        // try {
        //   // oframe.OpenFromURL(url, true);
        // } catch (ex) {
        //   console.log(332)
        // }
      },

      wfFileDownload(params) {
        return WaittingApproval_API.wfFileDownload(params);
      },
    },
    mounted() {
      this.initPage();
    }
  }
</script>

<style scoped>

</style>

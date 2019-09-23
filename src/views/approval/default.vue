<template>
    <div class="approval-default-container" style="text-align: left;">
    <div style="text-align: center"> <b>薪酬报批模块系统说明</b></div>
     <b> 一、模块作用</b>
     <br> 1.副经理及以上人员的【薪酬调整】报批。
     <br>2.新入职的副经理及以上人员的【入职薪酬】报批。
     <br>3.其他工资绝密内容的报批。
     <br><b>二、模块保密性说明</b>
     <br>1.系统使用区域范围：仅在专用的工资网中进行拟稿、审核和审批。
     <br>2.数据库安全：数据库的相关账号及密码由薪酬管理员单独设置掌握。
     <br>3.系统用户权限：系统的用户仅添加了薪酬报批流程中的相关人员，非流程上的人员无法查看。
     <br>4.系统问题处理：需在普通网的测试系统发起流程重现问题并优化程序，问题解决后再拷入到工资网中进行更新，更新时由薪酬管理员、硬件系统维护、开发人员三方共同监督实施。
    <br>
    </div>
</template>

<script>
    export default {
        name: "default"
    }
</script>

<style scoped>
.approval-default-container{
  /*width: 60%;*/
margin:auto 260px;
  line-height: 1.8;
}
</style>

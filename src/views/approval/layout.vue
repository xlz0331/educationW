<template>
  <div>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--<router-view  class="salary-container"></router-view>-->
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss" >
  .salary-container{
    /*.el-row {*/
      /*margin-bottom: 10px;*/
      /*&:last-child {*/
        /*margin-bottom: 0;*/
      /*}*/
    /*}*/
  }

</style>

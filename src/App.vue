<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
html, body, body {
  margin: 0;
  height:100%;
  width:100%;
}
#nprogress .bar {
  background: #67C23A !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  height:100%;
  width:100%;
}
body .el-table th.gutter{
    display: table-cell!important;
}

body .el-table colgroup.gutter{
    display: table-cell!important;
}

.warning-row{
  background: #f9d6a7 !important;
}
.close-right{
  position: absolute;
  top: 10px;
  right: 20px;
  /*padding: 0;*/
  /*background: transparent;*/
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
}
</style>

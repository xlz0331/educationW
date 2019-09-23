<template>
<div>
  <el-input v-model="auditOpinion" type="textarea" :autosize="{ minRows: 8, maxRows: 20}">
  </el-input>
</div>
</template>

<script>
    export default {
      components: {},
      name: "opinion",
      props:{
        opinion: {
          type: String,
          required: false
        }
      },
      data(){
        return {
          auditOpinion:''
        }
      },
      mounted(){
        this.auditOpinion=this.opinion;
      },
      methods:{

      }

    }
</script>

<style scoped>

</style>

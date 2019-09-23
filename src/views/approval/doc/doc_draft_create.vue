<template>
  <div>
    <draft-component  :mainObj="mainObj" :is-new="isNew" ></draft-component>
  </div>
</template>

<script>
  import DraftComponent from "./draft_component";

  export default {
    name: "doc_draft_create",
    data() {
      return {
        isNew:true,
        mainObj: {
          codePre: '',//公文编号前缀，
          subjectType:null,
          subject: '',
          title:'',
          isEditAtt:true
        },
      }
    },
    created() {
      let routerParams=this.$store.state.salary.routerCommParams||{};
      console.log('routerParams',routerParams)
      this.mainObj.subjectType=routerParams.keyVal1.name||'';
      this.mainObj.subject=routerParams.keyVal1.name||'';
      this.mainObj.codePre=routerParams.keyVal1.values||'';//前缀
      console.log('mainObj',this.mainObj)
      this.mainObj.isEditAtt=true;
    },
    mounted() {
      // let meta=this.$route.meta||{};
      // this.mainObj.subjectType=meta.subjectType;
      // let  obj=this.getFlowSubject(this.mainObj.subjectType)
      // this.mainObj.codePre=obj.codePre||'';
      // this.mainObj.subject=obj.subject||'';
      // this.mainObj.isEditAtt=true;
      // console.log(obj)
    },
    components: {DraftComponent},
    methods: {}

  }
</script>

<style scoped>

</style>

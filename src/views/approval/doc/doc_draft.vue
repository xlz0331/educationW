<template>
  <div>
    <!--<comp-draft  :mainObj="mainObj" :is-new="isNew" ></comp-draft>-->
    <draft-component  :mainObj="mainObj" :is-new="isNew" ></draft-component>
  </div>
</template>

<script>
  import DraftComponent from "./draft_component";

  export default {
    name: "doc_draft_create",
    data() {
      return {
        isNew:false,
        mainObj: {
          codePre: '',//公文编号前缀，
          subject: '',
        }
      }
    },
    created() {
      var obj = this.$store.state.salary.commParams || {};
      this.mainObj = obj || {};
      this.mainObj.isEditAtt=true;
    },
    mounted() {

    },
    components: {DraftComponent},
    methods: {}

  }
</script>

<style scoped>

</style>

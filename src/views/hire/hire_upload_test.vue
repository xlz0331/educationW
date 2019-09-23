<template>
  <div>
    <el-row>
      <el-col>&#12288;</el-col>
      <el-col>
        <div>
          <label for="file">
            <span>方式一</span>
            <input
              id="file"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              @change="_onChange"
              v-show="false"
            />
          </label>
        </div>
        <div>
          <span v-if="!tableData1">&#12288;</span>
          <span>{{tableData1}}</span>
        </div>
        <div>
          <el-upload
            style="display:inline-block"
            class="upload-demo"
            ref="upload"
            action="/hire/hireProofFiles/singlefile"
            :show-file-list="false"
            :http-request="uploadSectionFile"
            :auto-upload="true"
          >
            <span>
              <b>方式二</b>
            </span>
          </el-upload>
        </div>
        <div>
          <span>{{tableData}}</span>
        </div>
      </el-col>
    </el-row>
    <div></div>
  </div>
</template>
<script>
import Hire_API from '@/api/hire/hire'
import directive from '@/views/hire/hire_edit_grade'
import { mapGetters } from 'vuex'
export default {
  name: 'price-list',
  data() {
    return {
      loading: false,
      tableData: '',
      tableData1: ''
    }
  },
  components: {},
  methods: {
    //初始化
    initPage() {
      var str = this.$route.path;
      // this.companyIdA = str.split('=')[1];
      var index = str.lastIndexOf("\/");
      this.companyIdA = str.substring(index + 1, str.length);
      this.personalId = this.$route.query.fdId;
    },
    renderheader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('</br>')[0]),
        h('br'),
        h('span', {}, column.label.split('</br>')[1])
      ])
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.rowType == 1) {
        return [1, 20];
      }
    },
    proofOut(item) {
      this.proofSrc = '';
      this.proofSrc = item;
      this.dialogProof = true;
    },

    uploadSectionFile(param) {
      var fileObj = param.file;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("multipartFile", fileObj);
      console.log(form)
      Hire_API.testUploadFile(form, 'test').then(res => {
        this.tableData = res.data
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
      });
    },
    _onChange: function (event) {
      event.preventDefault()
      let target = event.target
      let files = target.files
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("multipartFile", files[0]);
      Hire_API.testUploadFile(form, 'test').then(res => {
        this.tableData1 = res.data
      }).catch(err => {
        this.$message({ type: 'error', message: '异常：' + err.msg })
      });
    },
  },
  created() {
  },
  watch: {
    "$route": function () {
      this.initPage();
    }
  },
  mounted() {
    var str = this.$route.path;
    // this.companyIdA = str.split('=')[1];
    var index = str.lastIndexOf("\/");
    this.companyIdA = str.substring(index + 1, str.length);
    this.initPage();
  },
  computed: {
    ...mapGetters(['login_user']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
        // mobile: this.device === 'mobile'
      }
    }
  },
}
</script>
<style lang="scss" scoped>
</style>

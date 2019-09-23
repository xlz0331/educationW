<template>
  <div>
    <el-row>
      <el-col :span="4" class="text-right">&#12288;</el-col>
      <el-col :span="16">
        <b>人员权限配置</b>
      </el-col>
      <el-col :span="4" class="text-right">
        &#12288;
        <!-- <el-button type="primary">说明</el-button> -->
        <el-button id="abc" type="primary" style="display:none" @click="dialogAddOne=true">新增</el-button>
      </el-col>
    </el-row>
    <el-table border :data="tableData" :max-height="tableHeight">
      <el-table-column type="index" header-align="center" align="center" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" header-align="center" label="姓名" align="center" width="200"></el-table-column>
      <el-table-column prop="role" header-align="center" label="角色" align="center" min-width="100"></el-table-column>
      <el-table-column
        prop="company2"
        header-align="center"
        label="查阅公司"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="rightName"
        header-align="center"
        label="权限"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-html="scope.row.rightName"></span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="删除" align="center" min-width="50">
        <template slot-scope="scope">
          <span
            @click="deleteById(scope.row)"
            style="cursor:pointer;color:#409EFF;text-decoration:underline;"
          >删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogAddOne" width="320px" v-dialogDrag title="新增">
        <el-row>
          <el-col :span="6">姓&#8194;名</el-col>
          <el-col :span="18">
            <el-input style="width:200px" v-model="name" aria-required="true"></el-input>
          </el-col>
        </el-row>
        <el-row class="row-top">
          <el-col :span="6">角&#8194;色</el-col>
          <el-col :span="18">
            <el-input style="width:200px" v-model="role"></el-input>
          </el-col>
        </el-row>
        <el-row class="row-top">
          <el-col :span="6">公&#8194;司</el-col>
          <el-col :span="18">
            <el-select v-model="company2" placeholder="请选择" @change="getBaseRight()">
              <el-option
                v-for="item in companyList"
                :key="item.fdId"
                :label="item.companyName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row-top">
          <el-col :span="6">权&#8194;限</el-col>
          <el-col :span="18">
            <el-select v-model="rightName" placeholder="请选择">
              <el-option
                v-for="item in BaseRightList"
                :key="item.fdId"
                :label="item.code"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <span slot="footer">
          <el-button type="primary" @click="addOne()">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Hire_API from '@/api/hire/hire'
import Vue from 'vue';
import { mapGetters } from 'vuex'
export default {
  name: 'price-list',
  data() {
    return {
      loading: false,
      tableHeight: null,
      tableData: [],
      dialogAddOne: false,
      personalId: "",
      name: '',
      company2: '',
      role: '',
      rightName: '',
      BaseRightList: [],
      companyList: [],
    }
  },
  components: {},
  watch: {
    '$route': function () {
      this.getTableHeight();
    }
  },
  methods: {
    //初始化
    getTableHeight() {
      this.tableHeight = window.innerHeight - 140;
    },
    initPage() {
      this.personalId = this.$route.query.fdId;
      this.findAllRight();
      this.getCompanyList();
      // console.log(this.login_user.name)
      // this.first();
      // console.log(this.personalId);
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
    getCompanyList() {
      Hire_API.getCompanyList().then(res => {
        this.companyList = res.data || [];
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    findAllRight() {
      var params = this.$route.query.fdId;
      Hire_API.findAllRight(params).then(res => {
        this.tableData = res.data || [];
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.login_user.name == this.tableData[i].name) {
            document.getElementById('abc').style.display = "";
            break;
          }
          if (i == this.tableData.length - 1) {
            this.tableData = [];
          }
        }
        // console.log(this.tableData)
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    getBaseRight() {
      var params = this.company2;
      Hire_API.getBaseRight(params).then(res => {
        this.BaseRightList = res.data || [];
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
    addOne() {
      var params = { name: this.name, role: this.role, company2: this.company2, rightName: this.rightName };
      Hire_API.addOnePersonalRight(params).then(res => {
        this.$message({ type: 'success', message: '新增成功' });
        this.dialogAddOne = false;
        this.name = "";
        this.role = "";
        this.company2 = "";
        this.rightName = "";
        this.findAllRight();
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
        console.log(err.errorCode);
      });
    },
    deleteById(item) {
      var params = item.fdId;
      Hire_API.deleteRightById(params).then(res => {
        this.$message({ type: 'success', message: '删除成功' });
        this.findAllRight();
      }).catch(err => {
        this.$message({ type: 'error', message: '请求异常：' + err.msg })
      });
    },
  },
  created() {
  },
  mounted() {
    this.initPage();
    this.getTableHeight();
  },
  beforeMount() {
    window.addEventListener('resize', this.getTableHeight);
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
// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');
    dialogHeaderEl.style.cursor = 'move';

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      };

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${t + styT}px`;

        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
})
</script>
<style lang="scss" scoped>
.row-top {
  margin-top: 10px;
}
</style>

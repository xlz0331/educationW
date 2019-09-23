<template>
  <div>
    <el-row>
      <el-col><b>{{companyName}}权限配置</b></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" class="text-left">
       <!-- <span>请选择公司</span> -->
       <el-select v-model="companyId" filterable placeholder="请选择公司" @change="getGradeByCompanyId">
          <el-option
            v-for="item in companyList"
            :key="item.fdId"
            :label="item.companyName"
            :value="item.deptId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="text-left">
        &#12288;
      </el-col>
      <el-col :span="12" class="text-right">
        &#12288;
        <!-- <el-button type="primary">保存</el-button> -->
        <el-button type="primary" @click="$router.go(-1)">返回上一级</el-button>
      </el-col>
    </el-row>
    <el-table border="" :data="tableData">
      <el-table-column type="index" header-align="center" align="center" label="序号" width="50"></el-table-column>
      <!-- <el-table-column prop="companyId" header-align="center" label="公司" align="center" min-width="100"></el-table-column> -->
      <el-table-column prop="jobGrade" header-align="center" label="职级" align="center" min-width="100"></el-table-column>
      <el-table-column prop="menuGrade" header-align="center" label="配置" align="center" min-width="100">
        <template slot-scope="scope">
          <span  style="cursor:pointer;color:#409EFF;text-decoration:underline" v-html="scope.row.menuGrade"  @click="update1(scope.row)"></span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogUpdate" width="350px" v-dialogDrag title="修改">
        <el-row>
          <el-col :span="4">配&#8194;置</el-col>
          <el-col :span="18">
            <el-input v-model="menuGrade" aria-required="true"></el-input>
          </el-col>
        </el-row>
        <span slot="footer" >
          <el-button type="primary" @click="updateGrade()">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Hire_API from '@/api/hire/hire'
import Vue from 'vue';
export default {
  name:'price-list',
  data(){
    return{
      loading: false,
      tableData:[],
      dialogUpdate:false,
      companyList:[],
      companyId:"",
      companyName:'',
      menuGrade:'',
      grade:[],
    }
  },
  components:{},
  methods:{
    //初始化
    initPage(){
      this.personalId=this.$route.query.fdId;
      this.getCompanyList();
      // this.first();
      // console.log(this.personalId);
    },
    renderheader(h, {column, $index}) {
      return h('span', {}, [
        h('span', {}, column.label.split('</br>')[0]),
        h('br'),
        h('span', {}, column.label.split('</br>')[1])
      ])
    },
    arraySpanMethod({row, column, rowIndex, columnIndex}) {
      if (row.rowType == 1) {
        return [1, 20];
      }
    },
    getGradeByCompanyId(){
      var params=this.companyId;
      for(var i=0;i<this.companyList.length;i++){
        if(this.companyId==this.companyList[i].deptId){
          this.companyName=this.companyList[i].companyName;
        }
      }
      Hire_API.getGradeByCompanyId(params).then(res=>{
        this.tableData=res.data||[];
      }).catch(err => {
        this.$message({type: 'error', message: '请求异常：' + err.msg})
      });
    },
    getCompanyList(){
      Hire_API.getCompanyList().then(res=>{
        this.companyList=res.data||[];
      }).catch(err => {
        this.$message({type: 'error', message: '请求异常：' + err.msg})
      });
    },
    update1(item){
      this.dialogUpdate=true;
      this.grade=item;
      if(item.menuGrade!="配置"){
        this.menuGrade=item.menuGrade;
      }else{
        this.menuGrade="";
      }
    },
    updateGrade(){
      this.grade.menuGrade=this.menuGrade;
      var params=this.grade;
      console.log(this.grade)
      Hire_API.updateGrade(params).then(res=>{
        this.dialogUpdate=false;
        Hire_API.getGradeByCompanyId(this.companyId).then(res=>{
          this.tableData=res.data||[];
        }).catch(err => {
          this.$message({type: 'error', message: '异常：' + err.msg})
        });
        this.$message({type: 'success', message: '更新成功'})
      }).catch(err => {
        this.$message({type: 'error', message: '请求异常：' + err.msg})
      });
    },
  },
  created() {
  },
  mounted() {
    this.initPage();
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
            if(sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            }else {
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
  .row-top{
    margin-top:10px;
  }
</style>

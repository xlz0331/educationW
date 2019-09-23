<template>
  <div class="home-container home-bg">
    <div class="home-menus">
      <!--<keep-alive>-->
      <!--<vertical-menu is-parent :data="menus" :index="0" v-if="$route.meta.keepAlive"></vertical-menu>-->
      <!--</keep-alive>-->
      <!--<vertical-menu is-parent :data="menus" :index="0" v-if="!$route.meta.keepAlive"></vertical-menu>-->
      <!---->
      <vertical-menu is-parent :data="menus" :index="0"></vertical-menu>
    </div>
  </div>
</template>

<script>
  import VerticalMenu from './vertical-menu.vue'
  import {mapState} from 'vuex'
  import CircularJson from 'circular-json'
  import System_API from '@/api/system/system'

  export default {
    data() {
      return {
        menus: [],
        menusRouterData: [],
        companyList: [],//公司列表
        taxCompanyList: [],//个税公司列表
        hireCompanyList: [],//预录用公司列表
        gradeCategoryList: [],//职等分类
        menuDataList: []
      }
    },
    components: {
      VerticalMenu
    },
    computed: {
      ...mapState({
        menus_str: state => state.app.menu_json_str,
        // id_card_info: state => state.app.id_card_info
      })
    },
    methods: {
      menuGenerator(self, parent, root) {
        self.meta = self.meta || {}
        self.meta.parent = parent
        self.meta.root = root
        if (self.children) {
          self.children.forEach(item => {
            this.menuGenerator(item, self, root)
          });
        }
      },
      getMenuData(routeMenus) {
        // 判断sessionStorage里能否取到menu对象
        if (this.menus_str && this.menus_str !== '[]') { // 能则表示为已记录之前点击的历史
          this.menus = CircularJson.parse(this.menus_str)
          this.$nextTick(() => {
            this.menus.forEach(menu => {
              this.menuGenerator(menu, {}, this.menus)
            })
            // console.log(this.menus)
          })
        } else { // 不能则创建menu对象
          let menus = [], children = [];
          // for (let index = 0; index < 10; index++) {
          //   children.push({
          //     index:index,
          //     showChildren: false,
          //     children: [
          //       {
          //         index: index + '-1',
          //         showChildren: false,
          //         children: []
          //       }
          //     ]
          //   });
          // }

          // menus.push({
          //   index:1,
          //   showChildren: false,
          //   children: children
          // })
          // this.menus = menus;

          routeMenus.forEach(menu => {
            this.menuGenerator(menu, {}, routeMenus)
          })
          this.menus = routeMenus
        }
      },



      /**
       * 重构菜单数据
       */
      getCompanyList() {
        SalarySys_API.getCompanyList_orgDepartment().then(res => {
          this.companyList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '公司列表请求异常：' + err.msg})
        });
      },
      findByType(typeObj) {
        SalarySys_API.findByType_sysBaseData(typeObj).then(res => {
          this.gradeCategoryList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '工资职等分类加载异常：' + err.msg})
        });
      },
      initPage() {
        System_API.getMenu_sysBaseData().then(res => {
          this.menuDataList = res.data || [];
          this.menuDataList.forEach(item=>{
            switch (item.text){
              case "月工资发放审核": this.gradeCategoryList=item.subList||[];
                break;
              case "个人所得税计算": this.taxCompanyList=item.subList||[];
                break;
              case "预录用": this.hireCompanyList=item.subList||[];
                break;
            }
          })
          this.reCombingMenu(this.menusRouterData);//重新构造菜单
        }).catch(err => {
          this.$message({type: 'error', message: '菜单加载异常：' + err.msg})
        });

        // SalarySys_API.findByType_sysBaseData({type: '工资职等分类'}).then(res => {
        //   this.gradeCategoryList = res.data || [];
        //   SalarySys_API.getCompanyList_orgDepartment().then(res1 => {
        //     this.companyList = res1.data || [];
        //     this.reCombingMenu();//重新构造菜单
        //   }).catch(err1 => {
        //     this.$message({type: 'error', message: '公司列表请求异常：' + err1.msg})
        //   });
        // }).catch(err => {
        //   this.$message({type: 'error', message: '工资职等分类加载异常：' + err.msg})
        // });

      },
      //重新构造路由参数数据
      reCombingMenu(menusRouterData) {
        var menudData = [];
        menusRouterData.forEach(item => {
          if (item.children) {
            if (item.meta && item.meta.childrenDataFrom && item.meta.childrenDataFrom == 'gradeApi') {
              //职等
              // console.log('path',item.path)
              var path = "/calcSalary/salary/salary_pay_audit_list";
              item.path=item.path;
              item.children = this.gradeMenuCombine(this.gradeCategoryList,path,true);
            }
            if (item.meta && item.meta.childrenDataFrom && item.meta.childrenDataFrom == 'FINcompanyApi') {
              //个税  查找财务公司
              item.path=item.children[0].path;//取第一行的数据
              item.children = this.menuCombine(this.taxCompanyList,item.path);
            }
             if (item.meta && item.meta.childrenDataFrom && item.meta.childrenDataFrom == 'companyApi') {
              //组织机构公司
              item.path=item.children[0].path;//取第一行的数据
              item.children = this.menuCombine(this.hireCompanyList,item.path);
            }
          }
          menudData.push(item);
          if(item.children)this.reCombingMenu(item.children);//循环到底层
        });
        this.getMenuData(menudData);
      },
      //菜单职等动态数据组合
      gradeMenuCombine(gradeCategoryList,path, isCombineCompany) {//列表值、路径、是否构建公司
        var menuGradeList = [];
        // var path = "/salary/salary/salary_pay_audit_list";
        gradeCategoryList.forEach((item ,_index)=> {
          if (isCombineCompany) {
            var cList=item.subList||[];
            var companyArr = this.menuCombine(cList,path);//path + "/" + item.code
            var jsonComb = {
              path: path,
              name: (_index+1)+"."+item.text,
              children: companyArr,
              meta: {
                showChildren: false,
                title: item.text,
                keyVal: item.code
              },
            }
            menuGradeList.push(jsonComb);
          }
          else {
            var jsonComb = {
              path: path,
              name: item.text,
              meta: {
                showChildren: false,
                title: item.text,
                keyVal: item.code
              },
            }
            menuGradeList.push(jsonComb);
          }
        });
        return menuGradeList;
      },
      //重构公司列表
      menuCombine(data, path) {
        var dataList = [];
        data.forEach(item => {
          var pathjson = {
            // path: path + "/" + item.company,
            path: path,
            name: item.text,
            meta: {
              showChildren: false,
              keepAlive: true,  //使用缓存
              title: item.text,
              keyVal: item.code
            },
          }
          dataList.push(pathjson);
        })
        return dataList;
      }
    },
    mounted() {
      // this.menusRouterData = this.$router.options.routes.splice(2);
      // this.initPage();

      let routerList=this.$router.options.routes.splice(2)||[];
      let approvalList=  routerList.filter(item=>{
        return item.path.indexOf('/approval')>-1;
      })||[];
      let router=approvalList.length>0?(approvalList[0].children||[]):[];
      // console.log(approvalList)
      this.getMenuData(router);

    },
  }
</script>

<style lang="scss" scoped>
  .home-container {
    /*width: 800px;*/
    /*height: 600px;*/
  }

  .home-menus {
    height: 600px;
    margin: 0px 0px;
    /*background: url("../image/logo.png");*/
    background-repeat: no-repeat;
    background-size: 30% 30%;
    background-position-x: 300px;
  }

  .layout-container {
    margin: 0px !important;
    padding: 0px !important;
  }

  .home-bg {
    height: 100%;
    overflow-y: hidden;
    /*background: url("../image/bg-menu.png");*/
    background-size: 100% 100%;
  }
</style>

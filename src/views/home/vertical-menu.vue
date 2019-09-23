<template>
  <ul :class="[isParent?'my-menu-parent':'menu-index-'+menuIndex]" >
    <template v-for="(item,index) in data">
      <!-- @mouseover="mouseoverHandle(item)" @mouseleave="mouseleaveHandle(item)" -->
      <li v-if=" !item.hidden" :key="index" @click="clickHandle(item)"  >
          <div  :class="item.meta && item.meta.activeClass?('menu-active-'+menuIndex):''" >
          <a @click="pageTo(item.path,item)" >{{item.name}}</a>
          <i v-if="item.children && item.meta &&!item.meta.activeClass" class="text-right el-icon-arrow-right" ></i>
          <i v-if="item.children && item.meta && item.meta.activeClass" class="text-right el-icon-caret-right"></i>
          </div>
        <vertical-menu v-show="!!item.children && item.meta.showChildren" :class="{'child-menu':item.children}"
                       :data="item.children||[]" :index="menuIndex + 1"></vertical-menu>
      </li>
    </template>
  </ul>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'vertical-menu',
    props: {
      index: {
        type: Number,
        required: true
      },
      isParent: {
        type: Boolean,
        default: () => false
      },
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      let menuIndex = this.index
      return {
        menuIndex,
      }
    },
    methods: {
      ...mapActions(['cacheMenu']),
      resetMenuState(data, cb) {
        let pathArr = [] // this array item dont'n need reset
        const getAllShowPath = (menu) => {
          pathArr.push(menu.path)
          if (menu.meta.parent && menu.meta.parent.path) {
            getAllShowPath(menu.meta.parent, pathArr)
          }
        }
        getAllShowPath(data)
        // reset other showChildren false
        this.setMenuDisplay(data.meta.root, pathArr)
        setTimeout(() => {
          data.meta.showChildren = true
          data.meta.activeClass = true;
          this.setMenuParentsDisplay(data)
          cb && cb()
        }, 50)
      },
      clickHandle(menu) {
        // menu.meta.activeClass=true
        // this.activeClass = this.menuIndex + "_" + _index;
        // console.log(this.activeClass)
        // debugger
        // let pathArr = [] // this array item dont'n need reset
        // const getAllShowPath = (menu)=>{
        //   pathArr.push(menu.path)
        //   if(menu.meta.parent&&menu.meta.parent.path){
        //     getAllShowPath(menu.meta.parent,pathArr)
        //   }
        // }
        // getAllShowPath(menu)
        // // reset other showChildren false
        // this.setMenuDisplay(menu.meta.root,pathArr)
        // setTimeout(()=>{
        //   menu.meta.showChildren = true
        //   this.setMenuParentsDisplay(menu)
        // },200)
        this.resetMenuState(menu)
      },
      setMenuDisplay(menus, displayMenus) {
        menus.forEach((menu) => {
          if (displayMenus.indexOf(menu.path) === -1) {
            // console.log(menu.path, displayMenus)
            menu.meta.showChildren = false;
            menu.meta.activeClass=false;
          }
          if (menu.children && menu.children.length > 0) {
            this.setMenuDisplay(menu.children, displayMenus)
          }
        })
      },
      setMenuParentsDisplay(menu) {
        menu.meta.showChildren = true;
        menu.meta.activeClass = true;
        if (menu.meta.parent.path) {
          this.setMenuParentsDisplay(menu.meta.parent);
        }
      },
      mouseoverHandle(menu) {
        let pathArr = [] // this array item dont'n need reset
        const getAllShowPath = (menu) => {
          pathArr.push(menu.path)
          if (menu.meta.parent && menu.meta.parent.path) {
            getAllShowPath(menu.meta.parent, pathArr)
          }
        }
        getAllShowPath(menu)
        // reset other showChildren false
        this.setMenuDisplay(menu.meta.root, pathArr)
        setTimeout(() => {
          menu.meta.showChildren = true
          this.setMenuParentsDisplay(menu)
        }, 200)
      },
      mouseleaveHandle(menu) {
        setTimeout(() => {
          menu.meta.showChildren = false
        }, 400)
      },
      pageTo(url, item) {
        if (item.children && item.children.length !== 0) {
          return;
        }
        let keyTitle=item.meta.title||'';
        let keyValues=item.meta.keyVal||'';
        let keyTitle2="";
        let keyValues2="";
        let keyName2="";
        if(Object.keys(item.meta.parent).length){
          keyTitle2=item.meta.parent.meta.title||'';
          keyValues2=item.meta.parent.meta.keyVal||'';
          keyName2=item.meta.parent.meta.name||'';
        }

        var params = {
          keyVal1: {name: item.name||'', title: keyTitle, values: keyValues},
          keyVal2: {name: keyName2, title:keyTitle2, values: keyValues2}
        };
        this.$store.commit('setRouterCommParams', params);//临时保存参数(传参)
        this.resetMenuState(item, () => {
          this.cacheMenu({
            json: item.meta.root, cb: () => {
              this.$router.push(url)
            }
          })
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  $parent-color: #0077ff;
  $parent-z-index: 1;
  $menu-width: 250px;
  $each_menu_height: 40px;
  ul {
    padding: 10px 0;
    margin: 0;
    color: #fff;
  }

  .my-menu-parent {
    list-style: none;
    text-align: left;
    width: $menu-width;
    // overflow: hidden;
    white-space: normal;
    word-break: break-word;
    position: relative;
    height: 100%;
    z-index: $parent-z-index - 1;
    /*background: rgba(119, 161, 211, 1);*/
    background: rgba(9, 51, 98, 1);
    li {
      width: 100%;
      font-size: 14px;
      // min-height: 36px;
      // padding: 0 10px;
      & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
         min-height: $each_menu_height;
        a {
          height: 100%;
          padding: 3px 3px 3px 10px;
          display: inline-block;
          line-height: 1.5;
          width: calc(100% - 18px);
        }
        i {
          width: 14px;
          font-size: 18px;
          /*padding-right: 5px;*/
        }
       /*i .el-icon-caret-right{*/
          /*width: 16px;*/
          /*height: 15px;*/
        /*}*/
      }
    }
    & > li {
      .child-menu {
        list-style: none;
        position: absolute;
        left: $menu-width;
        top: 0;
      }
    }
    *[class^="menu-index-"] {
      height: 100%;
      width: $menu-width;
      display: inline-block;
    }
    @for $i from 0 through 10 {
      .menu-index-#{$i} {
        z-index: $parent-z-index + $i;
      @if($i % 5==0){background: #003265} ;
        @if($i % 5==1){background: #004f9f} ;
        @if($i % 5==2){background: #0066ce} ;
        @if($i % 5==3){background: #0e80f3} ;
        @if($i % 5==4){background: #45a1ff} ;
      }
      .menu-active-#{$i} {
        color: #96dece;
        @if($i % 5==0){background:-webkit-linear-gradient(left,#003265,#004f9f);} ;
        @if($i % 5==1){background:-webkit-linear-gradient(left,#004f9f,#0066ce);} ;
        @if($i % 5==2){background:-webkit-linear-gradient(left,#0066ce,#0e80f3);} ;
        @if($i % 5==3){background:-webkit-linear-gradient(left,#0e80f3,#45a1ff);} ;
        @if($i % 5==4){background:-webkit-linear-gradient(left,#0e80f3,#45a1ff);} ;

      }
    }
  }
  [v-cloak]{
    display: none;
  }
</style>
<!--background:  rgba(9, 51, 98, .9 - ($i/10));-->

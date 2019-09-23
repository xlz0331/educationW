import Cookies from 'js-cookie'
import CircularJson from 'circular-json'

const app = {
  state: {
    sidebar: {
      rightShow: false,
      width: '260px',
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    menu_json_str: '',
    // size: Cookies.get('size') || 'medium'
    id_card_info:{}
  },
  mutations: {
    CACHE_MENU: (state,{jsonStr,cb}) => {
      state.menu_json_str = jsonStr || ''
      cb&&cb()
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    SHOW_SIDEBAR: state => {
      state.sidebar.rightShow = true
    },
    HIDE_SIDEBAR: state => {
      state.sidebar.rightShow = false
    },
    IDCARD_INFO:(state,{params,cb})=>{
      state.id_card_info=params;
      cb&&cb();
    }
  },
  actions: {
  idCardInfo({commit}, {params,cb}){
      commit('IDCARD_INFO',{params,cb})
    },
    cacheMenu({commit}, {json,cb}){
      commit('CACHE_MENU',{jsonStr:CircularJson.stringify(json),cb})
    },
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    showSideBar({ commit }) {
      commit('SHOW_SIDEBAR')
    },
    hideSideBar({ commit }) {
      commit('HIDE_SIDEBAR')
    },
    // closeSideBar({ commit }, { withoutAnimation }) {
    //   commit('CLOSE_SIDEBAR', withoutAnimation)
    // },
    // setSize({ commit }, size) {
    //   commit('SET_SIZE', size)
    // }
  }
}

export default app

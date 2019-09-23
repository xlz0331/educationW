const salary = {
  state: {  //存储变量
    name: "",      //用户名
    commParams:{},//公共参数
    monthStandardParams: {},//月发工资标准参数
    routerCommParams:{},//路由跳转公共参数
  },
  mutations: {  //设置变量方法
    setName(state, name) {
      state.name = name;
    },
    setMonthStandardParams(state, params) {
      state.monthStandardParams = params;
    },
    setCommParams(state, params){
      state.commParams = params;
    },
    setRouterCommParams(state, params){
      state.routerCommParams = params;
    },
    setSelectMonth(state, params) {
      state.selectMonth = params;
    },
  }
};

export default salary;  //抛出模块

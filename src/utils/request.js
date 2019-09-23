import axios from 'axios';

// axios.defaults.withCredentials = true
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: window.global_config.BASE_API, // api的base_url
  timeout: 1000000,                  // 请求超时时间
  withCredentials: true
});
//
// // request拦截器
// service.interceptors.request.use(config => {
//   // // Do something before request is sent
//   // if (store.getters.token) {
//   //   config.headers['X-Token'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
//   // }
//
//   //时间戳 add at 2019/06
//   if (config.method === 'post') {
//     config.data = {
//       ...config.data,
//       t: Date.parse(new Date()) / 1000,
//     }
//   }
//   else if (config.method === 'get') {
//     config.params = {
//       t: Date.parse(new Date()) / 1000,
//       ...config.params
//     }
//   }
//
//   return config;
// }, error => {
//   // Do something with request error
//   console.log(error); // for debug
//   Promise.reject(error);
// })

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data || {};

    if (!res.success) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 401) {
      }
      else {
      }
      return Promise.reject(response.data);
    } else {
      return response.data;
    }

  },
  error => {
    console.log('error response: ' + (error.response ? JSON.stringify(error.response.data) : '' || error));// for debug
    var err = error.response.data || {};
    if (err.success) {
      var errData = err.data || {};
      if (errData.code == 401) { //401 未登录
        console.log(errData.code)
        window.location.href = window.global_config.LOGIN_PATH + window.location.href;
      }
    }
    return Promise.reject(error);
  }
)

export default service;

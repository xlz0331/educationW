import router from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getCookie, TokenKey, IdCardKey} from '@/utils/Cookie'

NProgress.configure({showSpinner: false})// NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!getCookie(TokenKey)) {
    // window.location.href = process.env.LOGIN_PATH + window.location.href;
    window.location.href = window.global_config.LOGIN_PATH + window.location.href;
  }
  else if (!getCookie(IdCardKey)
    && window.global_config.NODE_ENV === 'production'
    && !window.global_config.IS_FLOW
  ) {//身份证校验(只有正式系统才进行身份校验、流程审批的页面不需要身份证校验)
    if (to.fullPath === '/readcard') {
      next();
    } else {
      next({path: '/readcard'});
    }
  }
  else {
    next();
  }
  NProgress.done()
});

router.afterEach((to, from) => {
  NProgress.done() // finish progress bar
})

# hwagain-sp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
注意事项：
1.发布到正式环境要将cookie.js 的hwagain_sso_token_test 改为hwagain_sso_token
2.修改config/index.js中 assetsPublicPath: '/hwagain/salary/'（当前的正式环境路径）的路劲,
3.prod.env.js中的地址改为正式地址

```




For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

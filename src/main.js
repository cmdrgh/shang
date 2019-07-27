import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'
import '../config/axios'

import $ from 'jquery'
import App from './App'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import router from './router'
import toastRegistry from './toast/toast'

Vue.prototype.$ajax = axios

Vue.use(VueCookies)
Vue.use(toastRegistry)

Vue.prototype.axios = axios
Vue.config.productionTip = false

// Vue.prototype.baseUrl = '/api';
 Vue.prototype.baseUrl = 'http://chamber.huanglexing.com';
// Vue.prototype.baseUrl = 'http://localhost:6919';
// Vue.prototype.baseUrl = 'https://chamber.w2fzu.com';


function checkToken() {
  $.ajax({
    url: router.app.baseUrl + '/user/tokenCheck',
    type: "get",
    headers: {
      'S-TOKEN': router.app.$cookies.get('token2')
    },
    async: false,
    dataType: "json",
    success: function(res) {
      router.app.$cookies.set('token', router.app.$cookies.get('token2'), 3600*24*7);
      router.app.$cookies.set('token2', router.app.$cookies.get('token2'), 3600*24*8);
      router.app.$cookies.set('signCheck', router.app.$cookies.get('signCheck'), 3600*24*7);
      router.app.$cookies.set('infoCheck', router.app.$cookies.get('infoCheck'), 3600*24*7);
      router.app.$cookies.set('identity', res.data.data.code, 3600*24*7);
      console.log("test->>" +router.app.$cookies.get('token'));
      config.headers.common['S-TOKEN'] = router.app.$cookies.get('token');
    },
    error: function(err) {
      router.app.$toast('登录过期，请重新登录');
      router.app.$cookies.remove('token');
      router.app.$cookies.remove('token2');
      router.app.$cookies.remove('signCheck');
      router.app.$cookies.remove('infoCheck');
      router.app.$cookies.remove('identity');
      setTimeout(() => {
        router.app.$router.push("/login");
      }, 2200);
    }
  })
}

Vue.prototype.$checkToken = checkToken;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
　// 在发送请求之前做些什么
  let token = router.app.$cookies.get('token');
  if(token === null) {
    if(router.app.$cookies.get('token2')) {
      // console.log('token2存在');
      checkToken();
    }
  }
  else {
    config.headers.common['S-TOKEN'] = token;
  }

　return config
}, function (error) {
　// 对请求错误做些什么
  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
　// 对响应数据做点什么
  // console.log(response.status);

　return response
}, function (error) {
　// 对响应错误做点什么
  if(error && error.response.status) {
    if(error.response.status === 401) {
      router.app.$toast('登录过期，请重新登录');
      if(router.app.$cookies.get('identity') === '10000') {
        router.app.$cookies.remove('token');
        router.app.$cookies.remove('token2');
        router.app.$cookies.remove('signCheck');
        router.app.$cookies.remove('infoCheck');
        router.app.$cookies.remove('identity');
        console.log('登录过期，请重新登录');
        setTimeout(() => {
          router.app.$router.push("/login");
        }, 2200);
      }
      else if(router.app.$cookies.get('identity') === '10001' || router.app.$cookies.get('identity') === '10002') {
        router.app.$cookies.remove('token');
        router.app.$cookies.remove('token2');
        router.app.$cookies.remove('signCheck');
        router.app.$cookies.remove('infoCheck');
        router.app.$cookies.remove('identity');
        console.log('登录过期，请重新登录');
        setTimeout(() => {
          router.app.$router.push("/admin");
        }, 2200);
      }
    }
    else if(error.response.status === 418) {
      switch(error.response.data.status) {
        case 401:
          break;
        case 430:
          router.app.$toast('该用户名已被注册');
          break;
        case 431:
          router.app.$toast('密码错误');
          break;
        case 432:
          router.app.$toast('用户不存在');
          break;
        case 330:
          router.app.$toast('暂无签到活动');
          break;
        case 331:
          router.app.$toast('不在签到时间范围内');
          break;
        case 131:
          router.app.$message.error('还没有人签到过');
          break;
        case 133:
          router.app.$message.error('奖品数大于参与抽奖人数');
          break;
        default:
          router.app.$toast('获取信息失败');
          console.log('获取信息失败');
      }
    }
    else {
      router.app.$toast('未知错误');
    }
  }
　return Promise.reject(error)
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

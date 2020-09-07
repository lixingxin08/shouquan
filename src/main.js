// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css/base.css'
import './css/style.css'
import Vue from 'vue'
import App from './App'
import './config/rem.js'
import router from './router'
Vue.config.productionTip = true
import axios from './js/axios_config.js';
import api from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
import 'ant-design-vue/dist/antd.css';

import moment from 'moment';
import locale from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { Layout, Button, Icon, Select, Dropdown, Menu, Input, Tree, TreeSelect, Breadcrumb, Table , DatePicker ,Switch,Popconfirm,Modal,message ,Radio,Upload,Steps} from 'ant-design-vue';

Vue.use(Dropdown);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Tree);
Vue.use(TreeSelect);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Popconfirm);
Vue.use(Modal);
Vue.prototype.$message = message
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Steps);

import md5 from 'js-md5';
Vue.prototype.$md5 = md5
// const isDebug_mode = process.env.NODE_ENV !== 'production'
// Vue.config.debug = isDebug_mode
// Vue.config.devtools = isDebug_mode
// Vue.config.productionTip = isDebug_mode



// 拦截器
let instance = axios.create({ timeout: 10000 });
// instance.defaults.headers.common['Authorization'] = "Bearer " + getCookie("userToken");//携带cookie
//instance.defaults.withCredentials = true;//让ajax携带cookie
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let token="1"
instance.defaults.headers.common["operatorId"] = token;
instance.interceptors.request.use(
  config => {
    // if (sessionStorage.getItem('token')) { // 若存在token，则每个Http Header都加上token
    //   config.headers.Authorization = `token ${sessionStorage.getItem('token')}`
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  })

// http response 拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面

          router.replace({
            path: 'error404',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          case 504:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面

          router.replace({
            path: 'error500',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          case 500:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面

          router.replace({
            path: 'error500',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          case 403:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面

          router.replace({
            path: 'error403',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)










//校验2到16个中文字符
Vue.prototype.vify_cn = function (phone) {
  let myreg = /^[\u4e00-\u9fa5a-z\d_]{2,16}$/gi;
  if (myreg.test(phone) !== true) {

    return false;
  } else {

    return true;
  }
  return true;
};
//校验中文字符
Vue.prototype.vify_cn2 = function (phone) {
  let myreg = /^[\u4e00-\u9fa5]+$/gi;
  if (myreg.test(phone) !== true) {
    console.log(211);
    return false;
  } else {
    console.log(3111);
    return true;
  }
  return true;
};
//验证邮箱格式
Vue.prototype.verEmail = function (str) {
  var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (re.test(str) !== true) {
    return false;
  } else {
    return true;
  }
};
//验证手机号码
Vue.prototype.verPhone = function (str) {
  var re =/^1[3456789]\d{9}$/
  if (re.test(str) !== true) {
    return false;
  } else {
    return true;
  }
};







/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css/base.css'
import './css/style.css'
import Vue from 'vue'
import App from './App'
import './config/rem.js'
import store from './store'
import router from './router'

Vue.config.productionTip = true
import axios from './js/axios_config.js';
import api from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
import 'ant-design-vue/dist/antd.css';
import config from './utils/config.js'
Vue.prototype.$config=config
import moment from 'moment';
import locale from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { Layout, Button, Icon, Select, Dropdown, Menu, Input, Tree, TreeSelect, Breadcrumb, Table, DatePicker, Switch, Popconfirm, Modal, message, Radio, Upload, Steps, Tabs, InputNumber, ConfigProvider } from 'ant-design-vue';

Vue.use(Dropdown);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Menu);0
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
Vue.use(Tabs);
Vue.use(InputNumber);
Vue.use(ConfigProvider);

window.addEventListener(
  "message",
  function (e) {
    if (e.data.type !== "webpackOk") {
      if (e.data.accountId == "" || e.data.accountId == undefined) {
      } else {
        localStorage.setItem("authorization", JSON.stringify(e.data), 10000000000000);
      }
    }
  },
  false
);

// http response 拦截器
axios.create({
  timeout: 5000
})

axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    let token = ""
    if (window.location.host.indexOf("localhost") >= 0) {
      token ="eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJleHBpcmVzIjoxNjAyNTgyNzQ1MzEwLCJ0b2tlbklkIjoiMzEzOGNmODYzZDQ4NDI0Mzg3OGI5NjY5MmEzYThhODMiLCJ1c2VySWQiOiI2ODAyMDgwNDM3MGU0MGY3OWNkNTE5ODI5MTdiY2EwMiJ9.W9JeKwFYZ8aK1fvNViMS6TIQt3gnDN7aAWHwv8v-OJY"

    } else {
      token = JSON.parse(localStorage.getItem('authorization')).token || ""
    }
    config.headers.common['token'] = token
    return config;
  },
  error => {
    return Promise.error(error);
  }
)
let thisurl = window.location.href.split('/#')
let bb = thisurl[0].split('/authorization')
axios.interceptors.response.use(
  response => {
    let aa = JSON.parse(localStorage.getItem('authorization'))
    aa.token = response.headers.token
    localStorage.setItem('authorization', JSON.stringify(aa))
    if (response.data.resultMsg == "执行成功，但没有获取到数据") {
      response.data.data=[]
      response.data.data.list=[]

    }
    if (response.data.resultCode == "20100") {
      message.error("令牌错误，请重新登录",5)

        window.location.href = bb[0]

    }
    if (response.data.resultCode == "20101") {
      message.error("未登录，请先登录",5)

        window.location.href = bb[0]

    }
    if (response.data.code == "20102") {
      message.error("你的账号已在其他地方登录，请重新登录",5)

        window.location.href = bb[0]

    }
    if (response.data.resultCode == "20103") {
      message.error("登录已过期，请重新登录！",5)

        window.location.href = bb[0]

    }
    if (response.data.resultCode == "20104") {
      message.error("登录已失效，请重新登录！",5)
        window.location.href = bb[0]
    }
    if (response.data.resultCode == "20105") {
      message.error("登录已失效，请重新登录！",5)
        window.location.href = bb[0]
    }

    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response.status, 'errorerrorerrorerror');
      if (error.response.status==404) {
        router.replace({
          path: '/error404',
        })
      }
      if (error.response.status==403) {
        router.replace({
          path: '/error403',
        })
      }
      if (error.response.status==404) {
        router.replace({
          path: '/error404',
        })
      }
      if (error.response.status==500) {
        router.replace({
          path: '/error500',
        })
      }
      if (error.response.status==504) {
        router.replace({
          path: '/error504',
        })
      }
    }
    return Promise.reject(error.response.data)
  }
)




//校验中英文文字符
Vue.prototype.vify_cn = function (phone) {
  let myreg = /^[\u4e00-\u9fa5a-zA-Z\d_]{0,50}$/gi;
  if (myreg.test(phone) !== true) {
    return false;
  } else {
    return true;
  }
};
//校验中英文文字符
Vue.prototype.vify_cn16 = function (phone) {
  let myreg = /^[\u4e00-\u9fa5a-zA-Z\d_]{2,16}$/gi;
  if (myreg.test(phone) !== true) {

    return false;
  } else {

    return true;
  }
};
//校验中文字符
Vue.prototype.vify_cn2 = function (phone) {
  let myreg = /^[\u4e00-\u9fa5]+$/gi;
  if (myreg.test(phone) !== true) {
    return false;
  } else {
    return true;
  }
};
//校验50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号
Vue.prototype.vify_cn3 = function (phone) {
  let myreg = /^[\u4e00-\u9fa5a-z0-9A-Z\（\）\(\)\d_]{0,50}$/gi;
  if (myreg.test(phone) !== true) {
    return false;
  } else {
    return true;
  }
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
  var re = /^1[3456789]\d{9}$/
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
  store,
  components: { App },
  template: '<App/>'
})

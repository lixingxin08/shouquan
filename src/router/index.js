import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('@/views/home/home')
const supervision = () => import('@/views/supervision/supervision') //运行监控
const administrativedivision = () => import('@/views/base/administrativedivision/administrativedivision') //行政区划
const dictionary = () => import('@/views/base/dictionary/dictionary') //数字字典
const RunParameters = () => import('@/views/base/RunParameters/RunParameters') //运行参数
const systemmenu = () => import('@/views/base/systemmenu/systemmenu') //系统菜单

const devicetypes = () => import('@/views/deviceconfig/devicetypes/devicetypes') //设备类型
const brand = () => import('@/views/deviceconfig/brand/brand') //设备品牌
const DeviceModel = () => import('@/views/deviceconfig/DeviceModel/DeviceModel') //设备型号
const deviceevent = () => import('@/views/deviceconfig/deviceevent/deviceevent') //设备事件
const devicewarning = () => import('@/views/deviceconfig/devicewarning/devicewarning') //设备警报


const customerprofile = () => import('@/views/customer/customerprofile/customerprofile') //客户档案
const essentialinformation = () => import('@/views/customer/essentialinformation/essentialinformation') //基本信息
const dpartmentManagement = () => import('@/views/customer/dpartmentManagement/dpartmentManagement') //部门管理
const personnelManagement = () => import('@/views/customer/personnelManagement/personnelManagement') //人员管理
const project = () => import('@/views/customer/project/project') //项目管理



const error_404 = () => import('@/components/error_page/404.vue')
const error_403 = () => import('@/components/error_page/403.vue')
const error_500 = () => import('@/components/error_page/500.vue')
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '',
      redirect: '/administrativedivision'
  },
    {
      path: '/home',
      name: 'home',
      redirect: '/administrativedivision',
      meta: {
        title: '首页'
      },
      component: home,
      children: [
        {
          path: '/administrativedivision',
          name: 'administrativedivision',
          meta: {
            title: '行政区划'
          },
          component: administrativedivision
        },
        {
          path: '/dictionary',
          name: 'dictionary',
          meta: {
            title: '数字字典'
          },
          component: dictionary
        },
        {
          path: '/RunParameters',
          name: 'RunParameters',
          meta: {
            title: '运行参数'
          },
          component: RunParameters
        },
        {
          path: '/systemmenu',
          name: 'systemmenu',
          meta: {
            title: '系统菜单'
          },
          component: systemmenu
        },
        {
          path: '/devicetypes',
          name: 'devicetypes',
          meta: {
            title: '设备类型'
          },
          component: devicetypes
        },
        {
          path: '/brand',
          name: 'brand',
          meta: {
            title: '设备品牌'
          },
          component: brand
        },
        {
          path: '/DeviceModel',
          name: 'DeviceModel',
          meta: {
            title: '设备型号'
          },
          component: DeviceModel
        },
        {
          path: '/deviceevent',
          name: 'deviceevent',
          meta: {
            title: '设备事件'
          },
          component: deviceevent
        },
        {
          path: '/devicewarning',
          name: 'devicewarning',
          meta: {
            title: '设备警报'
          },
          component: devicewarning
        },
      ]
    },
    {
      path: '/error404',
      name: 'error_404',
      component: error_404
    },
    {
      path: '/error403',
      name: 'error_403',
      component: error_403
    },
    {
      path: '/error500',
      name: 'error_500',
      component: error_500
    },
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('@/views/home/home')

const administrativedivision = () => import('@/views/base/administrativedivision/administrativedivision') //行政区划
const addadministrativedivision = () => import('@/views/base/administrativedivision/add/add') //行政区划新增
const editadministrativedivision = () => import('@/views/base/administrativedivision/edit/edit') //行政区划编辑
const dictionary = () => import('@/views/base/dictionary/dictionary') //数字字典
const adddictionary = () => import('@/views/base/dictionary/adddictionary') //添加编辑数字字典
const RunParameters = () => import('@/views/base/RunParameters/RunParameters') //运行参数
const systemmenu = () => import('@/views/base/systemmenu/systemmenu') //系统菜单
const addsystemmenu = () => import('@/views/base/systemmenu/addsystem') //系统菜单

const devicetypes = () => import('@/views/deviceconfig/devicetypes/devicetypes') //设备类型
const adddevicetypes = () => import('@/views/deviceconfig/devicetypes/add/add') //设备类型
const brand = () => import('@/views/deviceconfig/brand/brand') //设备品牌
const DeviceModel = () => import('@/views/deviceconfig/DeviceModel/DeviceModel') //设备型号
const deviceevent = () => import('@/views/deviceconfig/deviceevent/deviceevent') //设备事件
const devicewarning = () => import('@/views/deviceconfig/devicewarning/devicewarning') //设备警报


const customerprofile = () => import('@/views/customer/customerprofile/customerprofile') //客户档案
const essentialinformation = () => import('@/views/customer/essentialinformation/essentialinformation') //基本信息
const dpartmentManagement = () => import('@/views/customer/dpartmentManagement/dpartmentManagement') //部门管理
const personnelManagement = () => import('@/views/customer/personnelManagement/personnelManagement') //人员管理
const project = () => import('@/views/customer/project/project') //项目管理

const wechat= () => import('@/views/message/wechat/wechat') //微信账号
const email= () => import('@/views/message/email/email') //邮箱账号
const sms= () => import('@/views/message/sms/sms') //微信账号

const template= () => import('@/views/business/template/template') //菜单模板
const menuauthorization= () => import('@/views/business/menuauthorization/menuauthorization') //菜单授权
const zoningauthorization= () => import('@/views/business/zoningauthorization/zoningauthorization') //区划授权
const modelauthorization= () => import('@/views/business/modelauthorization/modelauthorization') //型号授权
const alertauthorization= () => import('@/views/business/alertauthorization/alertauthorization') //警报授权
const messageauthorization= () => import('@/views/business/messageauthorization/messageauthorization') //消息授权

const CustomerAuthorization= () => import('@/views/MaintenanceAuthorization/CustomerAuthorization/CustomerAuthorization') //客户授权
const Myclients= () => import('@/views/MaintenanceAuthorization/Myclients/Myclients') //我的客户


const SystemRole= () => import('@/views/accountManagement/SystemRole/SystemRole') //系统角色
const systemAccount= () => import('@/views/accountManagement/systemAccount/systemAccount') //系统帐号
const CustomerRole= () => import('@/views/accountManagement/CustomerRole/CustomerRole') //客户角色
const CustomerUser= () => import('@/views/accountManagement/CustomerUser/CustomerUser') //客户帐号
const MyAccount= () => import('@/views/accountManagement/MyAccount/MyAccount') //我的帐号

const LogManagement= () => import('@/views/LogManagement/LogManagement') //日志管理


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
          component: administrativedivision,
        },
        {
          path: '/addadministrativedivision',
          name: 'administrativedivision',
          component:addadministrativedivision,
          meta: {
            title: '行政区划'
          },
        },
        {
          path: '/editadministrativedivision',
          name: 'administrativedivision',
          component:addadministrativedivision,
          meta: {
            title: '行政区划'
          },
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
          path: '/adddictionary',
          name: 'dictionary',
          meta: {
            title: '数字字典'
          },
          component: adddictionary
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
          path: '/addsystem',
          name: 'systemmenu',
          meta: {
            title: '系统菜单'
          },
          component: addsystemmenu
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
		  path: '/adddevicetypes',
		  name: 'devicetypes',
		  meta: {
		    title: '添加设备类型'
		  },
		  component: adddevicetypes
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
        {
          path: '/customerprofile',
          name: 'customerprofile',
          meta: {
            title: '客户档案'
          },
          component: customerprofile
        },
        {
          path: '/essentialinformation',
          name: 'essentialinformation',
          meta: {
            title: '基本信息'
          },
          component: essentialinformation
        },
        {
          path: '/dpartmentManagement',
          name: 'dpartmentManagement',
          meta: {
            title: '部门管理'
          },
          component: dpartmentManagement
        },
        {
          path: '/personnelManagement',
          name: 'personnelManagement',
          meta: {
            title: '人员管理'
          },
          component: personnelManagement
        },
        {
          path: '/project',
          name: 'project',
          meta: {
            title: '项目管理'
          },
          component: project
        },
        {
          path: '/wechat',
          name: 'wechat',
          meta: {
            title: '微信账号'
          },
          component: wechat
        },
        {
          path: '/email',
          name: 'email',
          meta: {
            title: '邮箱账号'
          },
          component: email
        },
        {
          path: '/sms',
          name: 'sms',
          meta: {
            title: '短信账号'
          },
          component: sms
        },
        {
          path: '/template',
          name: 'template',
          meta: {
            title: '菜单模板'
          },
          component: template
        },
        {
          path: '/menuauthorization',
          name: 'menuauthorization',
          meta: {
            title: '菜单授权'
          },
          component: menuauthorization
        },
        {
          path: '/zoningauthorization',
          name: 'zoningauthorization',
          meta: {
            title: '区划授权'
          },
          component: zoningauthorization
        },
        {
          path: '/modelauthorization',
          name: 'modelauthorization',
          meta: {
            title: '型号授权'
          },
          component: modelauthorization
        },
        {
          path: '/alertauthorization',
          name: 'alertauthorization',
          meta: {
            title: '警报授权'
          },
          component: alertauthorization
        },
        {
          path: '/messageauthorization',
          name: 'messageauthorization',
          meta: {
            title: '消息授权'
          },
          component: messageauthorization
        },
        {
          path: '/CustomerAuthorization',
          name: 'CustomerAuthorization',
          meta: {
            title: '客户授权'
          },
          component: CustomerAuthorization
        },
        {
          path: '/Myclients',
          name: 'Myclients',
          meta: {
            title: '我的客户'
          },
          component: Myclients
        },
        {
          path: '/SystemRole',
          name: 'SystemRole',
          meta: {
            title: '系统角色'
          },
          component: SystemRole
        },
        {
          path: '/systemAccount',
          name: 'systemAccount',
          meta: {
            title: '系统帐号'
          },
          component: systemAccount
        },
        {
          path: '/CustomerRole',
          name: 'CustomerRole',
          meta: {
            title: '客户角色'
          },
          component: CustomerRole
        },
        {
          path: '/CustomerUser',
          name: 'CustomerUser',
          meta: {
            title: '客户帐号'
          },
          component: CustomerUser
        },
        {
          path: '/MyAccount',
          name: 'MyAccount',
          meta: {
            title: '我的帐号'
          },
          component: MyAccount
        },
        {
          path: '/LogManagement',
          name: 'LogManagement',
          meta: {
            title: '日志管理'
          },
          component: LogManagement
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

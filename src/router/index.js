import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('@/views/home/home')

const administrativedivision = () => import('@/views/base/administrativedivision/administrativedivision') //行政区划
const addadministrativedivision = () => import('@/views/base/administrativedivision/add/add') //行政区划新增
const dictionary = () => import('@/views/base/dictionary/dictionary') //数字字典
const adddictionary = () => import('@/views/base/dictionary/adddictionary') //添加编辑数字字典
const RunParameters = () => import('@/views/base/RunParameters/RunParameters') //运行参数
const addRunParameters = () => import('@/views/base/RunParameters/add/add') //运行参数
const systemmenu = () => import('@/views/base/systemmenu/systemmenu') //系统菜单
const addsystemmenu = () => import('@/views/base/systemmenu/addsystem') //系统菜单

const devicetypes = () => import('@/views/deviceconfig/devicetypes/devicetypes') //设备类型
const adddevicetypes = () => import('@/views/deviceconfig/devicetypes/add/add') //设备类型新增/编辑
const devicetypesatt = () => import('@/views/deviceconfig/devicetypes/att/att') //设备类型属性

const brand = () => import('@/views/deviceconfig/brand/brand') //设备品牌
const addbrand = () => import('@/views/deviceconfig/brand/add/add') //设备品牌新增/编辑

const DeviceModel = () => import('@/views/deviceconfig/DeviceModel/DeviceModel') //设备型号
const adddeviceModel = () => import('@/views/deviceconfig/DeviceModel/add/add') //设备型号新增/编辑
const deviceModelParam = () => import('@/views/deviceconfig/DeviceModel/param/param') //设备型号属性
const deviceModelAtt = () => import('@/views/deviceconfig/DeviceModel/att/att') //设备型号属性

const deviceevent = () => import('@/views/deviceconfig/deviceevent/deviceevent') //设备事件
const adddeviceevent = () => import('@/views/deviceconfig/deviceevent/add/add') //设备事件添加/编辑

const devicewarning = () => import('@/views/deviceconfig/devicewarning/devicewarning') //设备警报
const adddevicewarning = () => import('@/views/deviceconfig/devicewarning/add/add') //设备警报添加/编辑

const customerprofile = () => import('@/views/customer/customerprofile/customerprofile') //客户档案
const addcustomerprofile = () => import('@/views/customer/customerprofile/add/add') //客户档案
const essentialinformation = () => import('@/views/customer/essentialinformation/essentialinformation') //基本信息
const dpartmentManagement = () => import('@/views/customer/dpartmentManagement/dpartmentManagement') //部门管理
const adddpartmentManagement = () => import('@/views/customer/dpartmentManagement/add/add') //部门管理
const personnelManagement = () => import('@/views/customer/personnelManagement/personnelManagement') //人员管理
const addpersonnelManagement = () => import('@/views/customer/personnelManagement/add/add') //人员管理
const project = () => import('@/views/customer/project/project') //项目管理
const addproject = () => import('@/views/customer/project/add/add') //项目管理
const stageproject = () => import('@/views/customer/stageproject/stageproject') //项目管理
const addstageproject = () => import('@/views/customer/stageproject/add/add') //项目管理

const wechat = () => import('@/views/message/wechat/wechat') //微信账号
const addwechat = () => import('@/views/message/wechat/add/add') //微信账号
const email = () => import('@/views/message/email/email') //邮箱账号
const addemail = () => import('@/views/message/email/add/add') //邮箱账号
const sms = () => import('@/views/message/sms/sms') //微信账号
const addsms = () => import('@/views/message/sms/add/add') //微信账号

const template = () => import('@/views/business/template/template') //菜单模板
const addtemplate = () => import('@/views/business/template/add/add') //菜单模板
const menuauthorization = () => import('@/views/business/menuauthorization/menuauthorization') //菜单授权
const zoningauthorization = () => import('@/views/business/zoningauthorization/zoningauthorization') //区划授权
const modelauthorization = () => import('@/views/business/modelauthorization/modelauthorization') //型号授权
const alertauthorization = () => import('@/views/business/alertauthorization/alertauthorization') //警报授权
const messageauthorization = () => import('@/views/business/messageauthorization/messageauthorization') //消息授权
const CustomerAuthorization = () => import('@/views/MaintenanceAuthorization/CustomerAuthorization/CustomerAuthorization') //客户授权
const Myclients = () => import('@/views/MaintenanceAuthorization/Myclients/Myclients') //我的客户


const SystemRole = () => import('@/views/accountManagement/SystemRole/SystemRole') //系统角色
const addsystemRole = () => import('@/views/accountManagement/SystemRole/add/add') //系统角色
const systemAccount = () => import('@/views/accountManagement/systemAccount/systemAccount') //系统帐号
const addsystemAccount = () => import('@/views/accountManagement/systemAccount/add/add') //系统帐号
const CustomerRole = () => import('@/views/accountManagement/CustomerRole/CustomerRole') //客户角色
const addCustomerRole = () => import('@/views/accountManagement/CustomerRole/add/add') //客户角色
const CustomerUser = () => import('@/views/accountManagement/CustomerUser/CustomerUser') //客户帐号
const addCustomerUser = () => import('@/views/accountManagement/CustomerUser/add/add') //客户帐号
const MyAccount = () => import('@/views/accountManagement/MyAccount/MyAccount') //我的帐号

const LogManagement = () => import('@/views/LogManagement/LogManagement') //日志管理


const error_404 = () => import('@/components/error_page/404.vue')
const error_403 = () => import('@/components/error_page/403.vue')
const error_500 = () => import('@/components/error_page/500.vue')
const error_504 = () => import('@/components/error_page/504.vue')
Vue.use(Router)
export default new Router({
  routes: [{
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
      children: [{
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
          component: addadministrativedivision,
          meta: {
            title: '行政区划'
          },
        },
        {
          path: '/editadministrativedivision',
          name: 'administrativedivision',
          component: addadministrativedivision,
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
          path: '/runparameters',
          name: 'RunParameters',
          meta: {
            title: '运行参数'
          },
          component: RunParameters
        },
        {
          path: '/addrunparameters',
          name: 'RunParameters',
          meta: {
            title: '运行参数'
          },
          component: addRunParameters
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
            title: '设备类型'
          },
          component: adddevicetypes
        },
        {
          path: '/devicetypesatt',
          name: 'devicetypes',
          meta: {
            title: '设备类型'
          },
          component: devicetypesatt
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
          path: '/addbrand',
          name: 'brand',
          meta: {
            title: '设备品牌'
          },
          component: addbrand
        },
        {
          path: '/devicemodel',
          name: 'DeviceModel',
          meta: {
            title: '设备型号'
          },
          component: DeviceModel
        },
        {
          path: '/adddevicemodel',
          name: 'DeviceModel',
          meta: {
            title: '设备型号'
          },
          component: adddeviceModel
        },
        {
          path: '/devicemodelparam',
          name: 'DeviceModel',
          meta: {
            title: '设备型号'
          },
          component: deviceModelParam
        },
        {
          path: '/devicemodelatt',
          name: 'DeviceModel',
          meta: {
            title: '设备型号'
          },
          component: deviceModelAtt
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
          path: '/adddeviceevent',
          name: 'deviceevent',
          meta: {
            title: '设备事件'
          },
          component: adddeviceevent
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
          path: '/adddevicewarning',
          name: 'devicewarning',
          meta: {
            title: '设备警报'
          },
          component: adddevicewarning
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
          path: '/addcustomerprofile',
          name: 'customerprofile',
          meta: {
            title: '客户档案'
          },
          component: addcustomerprofile
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
          path: '/dpartmentmanagement',
          name: 'dpartmentManagement',
          meta: {
            title: '部门管理'
          },
          component: dpartmentManagement
        },
        {
          path: '/adddpartmentmanagement',
          name: 'dpartmentManagement',
          meta: {
            title: '部门管理'
          },
          component: adddpartmentManagement
        },
        {
          path: '/personnelmanagement',
          name: 'personnelManagement',
          meta: {
            title: '人员管理'
          },
          component: personnelManagement
        },
        {
          path: '/addpersonnelmanagement',
          name: 'personnelManagement',
          meta: {
            title: '人员管理'
          },
          component: addpersonnelManagement
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
          path: '/addproject',
          name: 'project',
          meta: {
            title: '项目管理'
          },
          component: addproject
        },
        {
          path: '/stageproject',
          name: 'project',
          meta: {
            title: '项目管理'
          },
          component: stageproject
        },
        {
          path: '/addstageproject',
          name: 'project',
          meta: {
            title: '项目管理'
          },
          component: addstageproject
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
          path: '/addwechat',
          name: 'wechat',
          meta: {
            title: '微信账号'
          },
          component: addwechat
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
          path: '/addemail',
          name: 'email',
          meta: {
            title: '邮箱账号'
          },
          component: addemail
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
          path: '/addsms',
          name: 'sms',
          meta: {
            title: '短信账号'
          },
          component: addsms
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
          path: '/addtemplate',
          name: 'template',
          meta: {
            title: '菜单模板'
          },
          component: addtemplate
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
          path: '/customerauthorization',
          name: 'CustomerAuthorization',
          meta: {
            title: '客户授权'
          },
          component: CustomerAuthorization
        },
        {
          path: '/myclients',
          name: 'Myclients',
          meta: {
            title: '我的客户'
          },
          component: Myclients
        },
        {
          path: '/systemrole',
          name: 'SystemRole',
          meta: {
            title: '系统角色'
          },
          component: SystemRole
        },
        {
          path: '/addsystemrole',
          name: 'SystemRole',
          meta: {
            title: '系统角色'
          },
          component: addsystemRole
        },

        {
          path: '/systemaccount',
          name: 'systemAccount',
          meta: {
            title: '系统帐号'
          },
          component: systemAccount
        },
        {
          path: '/addaccount',
          name: 'systemAccount',
          meta: {
            title: '系统帐号'
          },
          component: addsystemAccount
        },
        {
          path: '/customerrole',
          name: 'CustomerRole',
          meta: {
            title: '客户角色'
          },
          component: CustomerRole
        },
		{
		  path: '/addcustomerRole',
		  name: 'CustomerRole',
		  meta: {
		    title: '客户角色'
		  },
		  component: addCustomerRole
		},
        {
          path: '/customeruser',
          name: 'CustomerUser',
          meta: {
            title: '客户帐号'
          },
          component: CustomerUser
        },
		{
		  path: '/addcustomeruser',
		  name: 'CustomerUser',
		  meta: {
		    title: '客户帐号'
		  },
		  component: addCustomerUser
		},
        {
          path: '/myaccount',
          name: 'MyAccount',
          meta: {
            title: '我的帐号'
          },
          component: MyAccount
        },
        {
          path: '/logmanagement',
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
    {
      path: '/error504',
      name: 'error_504',
      component: error_504
    },
  ]
})

// export const domain= process.env.API_ROOT; //silke矿池接口线上环境


export default {
  areadetail: `/config/area/detail`, //行政区划详情接口
  areaform: `/config/area/form`, //行政区划表单接口
  areapage: `/config/area/page`, //行政区划分页列表接口
  arearemove: `/config/area/remove`, //行政区划删除接口
  areatree: `/config/area/tree`, //行政区划树

  dictionarycombobox: `/config/dictionary/combobox`, //数据字典下拉列表框接口
  dictionarydetail: `/config/dictionary/detail`, //数据字典详情接口
  dictionaryform: `/config/dictionary/form`, //数据字典表单接口
  dictionarypage: `/config/dictionary/page`, //数据字典分页列表接口
  dictionaryremove: `/config/dictionary/remove`, //数据字典删除接口
  dictionarytree: `/config/dictionary/tree`, //数据字典树接口

  menudetail: `/config/menu/detail`, //系统菜单详情接
  menuform: `/config/menu/form`, //系统菜单表单接
  menupage: `/config/menu/page`, //系统菜单列表接口
  menuremove: `/config/menu/remove`, //系统菜单删除接口
  menutree: `/config/menu/tree`, //系统菜单树
  menucombobox: `/config/menu/combobox`, //子系统菜单下拉列表数据接口



  rundetail: `/config/parameter/detail `, //运行参数详情接口
  runform: `/config/parameter/form`, //运行参数表单接
  runpage: `/config/parameter/page`, //运行参数列表接口
  runremove: `/config/dictionary/remove`, //运行参数删除接口

  //客户人员信息表API
  persondeleteByPersonId: `/customer/person/deleteByPersonId`,
  persondetail: `/customer/person/detail`,
  personform: `/customer/person/form`,
  personpage: `/customer/person/page`,

  //客户档案基础信息表API
  deleteByInformationId: `/customer/information/deleteByInformationId`,
  informationdetail: `/customer/information/detail`,
  informationform: `/customer/information/form`,
  informationpage: `/customer/information/page`,

  //客户部门信息表API
  departmentdeleteByDepartmentId: `/customer/department/deleteByDepartmentId`,
  departmentdetail: `/customer/department/detail`,
  departmentform: `/customer/department/form`,
  departmentpage: `/customer/department/page`,
  departmenttree: `/customer/department/tree`,

  //客户项目信息表API
  deleteByProjectId: `/customer/project/deleteByProjectId `,
  projectdetail: `/customer/project/detail `,
  projectpage: `/customer/project/page `,
  projectform: `/customer/project/form `,

  //客户项目阶段信息表API
  deleteByProjectPhaseId: `/customer/projectPhase/deleteByProjectPhaseId`,
  projectPhasedetail: `/customer/projectPhase/detail `,
  projectPhaselist: `/customer/projectPhase/list `,
  projectPhaseform: `/customer/projectPhase/form `,

  smspage: `/message/sms/account/page`,

  //短信账号基本信息API
  deleteBySmsAccountId: `/message/sms/account/deleteBySmsAccountId`, //微信帐号基础信息分页查询接口
  smsform: `/message/sms/account/form`,
  smsdetail: `/message/sms/account/detail`,
  smspage: `/message/sms/account/page`,
  smsremove: `/message/sms/account/deleteBySmsAccountId`,

  deleteByemailAccountId: `/message/email/account/deleteByEmailAccountId`, //邮箱帐号基础信息删除接口
  emailtAccountdetail: `/message/email/account/detail`, //邮箱帐号基础信息查询详情接口
  emailAccountform: `/message/email/account/form`, // 邮箱帐号基础信息表单接口
  emailAccountpage: `/message/email/account/page`, //邮箱帐号基础信息分页查询接口

  devicetypedetail: `/device/type/detail`, //设备类型查询详情接口
  devicetypeform: `/device/type/form`, //设备类型表单接口)
  devicetypepage: `/device/type/page`, //设备类型分页查询接口
  devicetyperemove: `/device/type/remove`, //设备类型删除接口

  devicebrandsdetail: `/device/brands/detail`, //设备品牌查询详情接口
  devicebrandsform: `/device/brands/form`, //设备品牌表单接口
  devicebrandspage: `/device/brands/page`, //设备品牌分页查询接口
  devicebrandsremove: `/device/brands/remove`, //设备品牌删除接口

  devicemodeldetail: `/device/model/detail`, //设备型号查询详情接口
  devicemodelform: `/device/model/form`, //设备型号表单接口
  devicemodelpage: `/device/model/page`, //设备型号分页查询接口
  devicemodelremove: `/device/model/remove`, //设备型号删除接口

  deviceeventdetail: `/device/event/detail`, //设备型号查询详情接口
  deviceeventform: `/device/event/form`, //设备型号表单接口
  deviceeventpage: `/device/event/page`, //设备型号分页查询接口
  deviceeventremove: `/device/event/remove`, //设备型号删除接口

  propertylist: `/device/property/list`, //设备属性列表接口
  propertyform: `/device/property/form`, //设备属性表单接口
  propertyremove: `/device/property/remove`, //设备属性删除接口


//系统角色
  rolesystempage: `/account/role/page`,
  rolesystemlist: `/account/role/page`, //系统角色列表接口
  rolesystemform: `/account/role/form`, //系统角色表单接口
  rolesystemremove: `/account/role/remove`, //系统角色删除接口
  rolesystemdetail: `/account/role/detail`, //系统角色详情接口
  rolesystemrolelist: `/account/role/roleSystemList`, //系统角色查询列表接口
  rolesystemroletreelist: `/account/role/tree`, //系统treeList接口




  //系统菜单模板API
  deleteByTemplateId: `/auth/template/deleteByTemplateId`,
  templatedetail: `/auth/template/detail`,
  templateform: `/auth/template/form`,
  templatepage: `/auth/template/page`,
  templatelist: `/auth/template/list`,

  //系统菜单权限API
  customertemplatedetail: `/auth/customer-template/detail`,
  customertemplateform: `/auth/customer-template/form`,

  //区划授权API
  customerareaform: `/auth/customer-area/form`,
  customerareatree: `/auth/customer-area/tree`,

  //型号授权API
  customermodel: `/auth/customer-model/form`,
  customermodel: `/auth/customer-model/list`,


  //客户账号授权API
  customeraccountform: `/auth/customer-account/form`,
  customeraccountlist: `/auth/customer-account/list`,
  customeraccountmylist: `/auth/customer-account/my-list`,


  //微信帐号基础信息API
  deleteByWechatAccountId: `/message/wechat/account/deleteByWechatAccountId`, //微信帐号基础信息分页查询接口
  wechtTemplateList: `/message/wechat/template/list`,
  wechatform: `/message/wechat/account/form`,
  wechatdetail: `/message/wechat/account/detail`,
  wechatpage: `/message/wechat/account/page`,

  //系统账号
  accountinfodetail: `/account/info/detail`,
  accountinfoform: `/account/info/form`,
  accountinfolist: `/account/info/list`,
  accountinfopage: `/account/info/page`,
  accountinforemove: `/account/info/remove`,
  accountinforeset: `/account/info/reset`,

  //日志
   journalpage:`/logger/platform/page`,
   journaldetail:`/logger/detail`,
   journaltree:`/tree`
}

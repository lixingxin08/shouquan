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



  rundetail: `/config/parameter/detail `, //运行参数详情接口
  runform: `/config/parameter/form`, //运行参数表单接
  runpage: `/config/parameter/page`, //运行参数列表接口
  runremove: `/config/dictionary/remove`, //运行参数删除接口

  //客户人员信息表API
  persondeleteByPersonId: `/customer/person/deleteByPersonId`,
  persondetail: `/customer/person/detail`,
  personform: `/customer/person/form`,
  personpage: `/customer/person/page`,

  //客户基础信息表API
  informationdeleteByInformationId: `/customer/information/deleteByInformationId`,
  informationdetail: `/customer/information/detail`,
  informationform: `/customer/information/form`,
  informationpage: `/customer/information/page`,

  //客户部门信息表API
  departmentdeleteByDepartmentId: `/customer/department/deleteByDepartmentId`,
  departmentdetail: `/customer/department/detail`,
  departmentform: `/customer/department/form`,
  departmentpage: `/customer/department/page`,
  departmenttree: `/customer/department/tree`,


  wechatAccountpage: `/message/wechat/account/page`, //微信帐号基础信息分页查询接口
  wechatAccountform: `/message/wechat/account/form`, //微信帐号基础信息查询详情接口
  wechatAccountdetail: `/message/wechat/account/detail`, //微信帐号基础信息表单接口
  wechatAccountremove: `/message/wechat/account/deleteByWechatAccountId`, //微信帐号基础信息删除接口
  messagewechattemplatelist :`/message/wechat/template/list`,//微信消息模板列表


  messagesmstemplatelist :`/message/sms/template/list`,//微信消息模板列表
  
  deleteByemailAccountId: `/message/email/account/deleteByWechatAccountId`, //邮箱帐号基础信息删除接口
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

  alramlist: `/device/alarm/page`, //事件警报表分页查询接口
  alramform: `/device/alarm/form`, //事件警报表单接口
  alramdetail: `/device/alarm/detail`, //事件警报详情接口
  alramremove: `/device/alarm/remove`, //事件警报删除接口

  paramdetail: `/config/parameter/detail`, //运行参数详情接口
  paramform: `/config/parameter/form`, //运行参数表单接口
  parampage: `/config/parameter/page`, //运行参数列表接口
  paramremove: `/config/parameter/remove`, //运行参数删除接口

  propertyvaluelist: `/propertyValue/page`, //属性值列表接口
  propertyvalueform: `/propertyValue/form`, //属性值表单接口
  propertyvaluedetail: `/propertyValue/detail`, //属性值详情接口





}

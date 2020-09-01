// export const domain= process.env.API_ROOT; //silke矿池接口线上环境


export default {
    areadetail: `/config/area/detail`,//行政区划详情接口
    areaform: `/config/area/form`,//行政区划表单接口
    areapage: `/config/area/page`,//行政区划分页列表接口
    arearemove: `/config/area/remove`,//行政区划删除接口
    areatree: `/config/area/tree`,//行政区划树

    dictionarycombobox: `/config/dictionary/combobox`,//数据字典下拉列表框接口
    dictionarydetail: `/config/dictionary/detail`,//数据字典详情接口
    dictionaryform: `/config/dictionary/form`,//数据字典表单接口
    dictionarypage: `/config/dictionary/page`,//数据字典分页列表接口
    dictionaryremove: `/config/dictionary/remove`,//数据字典删除接口
    dictionarytree: `/config/dictionary/tree`,//数据字典树接口

    menudetail: `/config/menu/detail`,//系统菜单详情接
    menuform: `/config/menu/form`,//系统菜单表单接
    menupage: `/config/menu/page`,//系统菜单列表接口
    menuremove: `/config/menu/remove`,//系统菜单删除接口
    menutree: `/config/menu/tree`,//系统菜单树



    rundetail:`/config/parameter/detail ` , //运行参数详情接口
    runform: `/config/parameter/form`,//运行菜单表单接
    runpage: `/config/parameter/page`,//运行菜单列表接口
    runremove: `/config/dictionary/remove`,//运行菜单删除接口




    deleteByWechatAccountId :`/message/wechat/account/deleteByWechatAccountId`,//微信帐号基础信息删除接口
    WwchatAccountdetail:`/message/wechat/account/detail`,//微信帐号基础信息查询详情接口
    WechatAccountform:`/message/wechat/account/form`,// 微信帐号基础信息表单接口
    WechatAccountpage:`/message/wechat/account/page`,//微信帐号基础信息分页查询接口



    deleteByemailAccountId :`/message/email/account/deleteByWechatAccountId`,//邮箱帐号基础信息删除接口
    emailtAccountdetail:`/message/email/account/detail`,//邮箱帐号基础信息查询详情接口
    emailAccountform:`/message/email/account/form`,// 邮箱帐号基础信息表单接口
    emailAccountpage:`/message/email/account/page`,//邮箱帐号基础信息分页查询接口

}

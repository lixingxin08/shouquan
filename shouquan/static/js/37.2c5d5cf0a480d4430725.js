webpackJsonp([37],{Sg4w:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),r=a.n(s),i=a("exGp"),o=a.n(i);var n={inject:["reload"],data:function(){return{istoken:{token:JSON.parse(localStorage.getItem("usermsg")).token||""},loading:!1,imageUrl:"",sel_data:[{val:"启用",id:1},{val:"备用",id:2},{val:"关闭",id:0}],form:{customerId:"",customerName:"",shortName:"",customerLogo:"111",address:"",telephone:"",linkman:"",linkphone:"",position:"",statusCode:"",remark:"",operatorId:"1"},detailparam:{customerId:""}}},created:function(){"add"==this.$route.query.type&&(this.form.parentName=this.$route.query.name,this.form.parentId=this.$route.query.id,this.form.gradeno=this.$route.query.levelType),"edit"==this.$route.query.type&&(this.detailparam.customerId=this.$route.query.id,this.getdetail())},methods:{getdetail:function(){var t=this;return o()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post(t.$api.informationdetail,t.detailparam);case 2:"10000"==(a=e.sent).data.resultCode?(t.form=a.data.data,t.imageUrl=t.form.customerLogo):t.$message.error(a.data.resultMsg),console.log(a,8888);case 5:case"end":return e.stop()}},e,t)}))()},getform:function(){var t=this;return o()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.form.operatorId=1,t.vify_cn3(t.form.customerName)){e.next=4;break}return t.form.customerName="",e.abrupt("return",t.$message.error("客户全称格式不正确"));case 4:if(""!=t.form.customerName){e.next=6;break}return e.abrupt("return",t.$message.error("请输入客户全称"));case 6:if(t.vify_cn3(t.form.shortName)){e.next=9;break}return t.form.shortName="",e.abrupt("return",t.$message.error("客户简称格式不正确"));case 9:if(""!=t.form.shortName){e.next=11;break}return e.abrupt("return",t.$message.error("请输入客户简称"));case 11:if(""!=t.form.customerLogo){e.next=13;break}return e.abrupt("return",t.$message.error("请选择客户logo"));case 13:if(""!=t.form.statusCode){e.next=15;break}return e.abrupt("return",t.$message.error("请选择客户状态"));case 15:if(t.vify_cn(t.form.linkman)){e.next=18;break}return t.form.linkman="",e.abrupt("return",t.$message.error("联系人姓名格式不正确"));case 18:if(t.verPhone(t.form.linkphone)){e.next=21;break}return t.form.linkphone="",e.abrupt("return",t.$message.error("联系人手机号码格式不正确"));case 21:if(t.vify_cn(t.form.position)){e.next=24;break}return t.form.position="",e.abrupt("return",t.$message.error("联系人职务格式不正确"));case 24:return e.next=26,t.$http.post(t.$api.informationform,t.form);case 26:"10000"==(a=e.sent).data.resultCode?(t.$message.success(a.data.resultMsg),t.$router.go(-1)):t.$message.error(a.data.resultMsg);case 28:case"end":return e.stop()}},e,t)}))()},reset:function(){this.reload()},handleChange:function(t){var e,a,s,r=this;"uploading"!==t.file.status?("done"===t.file.status&&(e=t.file.originFileObj,a=function(t){r.imageUrl=t,r.form.customerLogo=t,r.loading=!1},(s=new FileReader).addEventListener("load",function(){return a(s.result)}),s.readAsDataURL(e)),console.log(this.imageUrl,88999,t)):this.loading=!0},beforeUpload:function(t){var e="image/jpeg"===t.type||"image/png"===t.type||"image/jpg"===t.type;e||this.$message.error("只能上传jpeg,jpg,png格式的图片");var a=t.size/1024/1024<2;return a||this.$message.error("图片大小不能超过2MB!"),e&&a},handleChange2:function(t){console.log("selected "+t),console.log(this.runpageparam)},filterOption:function(t,e){return e.componentOptions.children[0].text.toLowerCase().indexOf(t.toLowerCase())>=0}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"isedit"},[a("div",{staticClass:"flexrow flexac edit_item"},[t._m(0),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{maxLength:50,placeholder:"请输入客户全称"},model:{value:t.form.customerName,callback:function(e){t.$set(t.form,"customerName",e)},expression:"form.customerName"}}),t._v(" "),a("div",{staticClass:"edit_item_toast"},[t._v("注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[t._m(1),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{maxLength:10,placeholder:"请输入客户简称"},model:{value:t.form.shortName,callback:function(e){t.$set(t.form,"shortName",e)},expression:"form.shortName"}}),t._v(" "),a("div",{staticClass:"edit_item_toast"},[t._v("注:10字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[t._m(2),t._v(" "),a("div",{staticClass:"isupload"},[a("a-upload",{staticClass:"avatar-uploader",attrs:{name:"avatar","list-type":"picture-card","show-upload-list":!1,action:"http://192.168.3.101:8808/upload","before-upload":t.beforeUpload},on:{change:t.handleChange}},[t.imageUrl?a("img",{attrs:{src:t.imageUrl,alt:"avatar"}}):a("div",[a("a-icon",{attrs:{type:t.loading?"loading":"plus"}}),t._v(" "),a("div",{staticClass:"ant-upload-text"},[t._v("Upload")])],1)]),t._v(" "),a("div",{staticClass:"col_red"},[t._v("支持PNG、JPEG、JPG格式，1KB至2M")])],1)]),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[t._v("公司地址:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{maxLength:100,placeholder:"请输入公司地址"},model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}}),t._v(" "),a("div",{staticClass:"edit_item_toast"},[t._v("注:100字以内，格式不限制")])],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[t._v("公司电话:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{placeholder:"请输入公司电话"},model:{value:t.form.telephone,callback:function(e){t.$set(t.form,"telephone",e)},expression:"form.telephone"}}),t._v(" "),a("div",{staticClass:"edit_item_toast"},[t._v("注:请输入公司座机号，20字以内")])],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[t._v("联系人姓名:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{maxLength:50,placeholder:"请输入联系人姓名"},model:{value:t.form.linkman,callback:function(e){t.$set(t.form,"linkman",e)},expression:"form.linkman"}}),t._v(" "),a("div",{staticClass:"edit_item_toast"},[t._v("注:50字以内，支持中英文")])],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[t._v("联系人手机:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{placeholder:"请输入 联系人手机"},model:{value:t.form.linkphone,callback:function(e){t.$set(t.form,"linkphone",e)},expression:"form.linkphone"}})],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[t._v("联系人职务:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{maxLength:10,placeholder:"请输入联系人职务"},model:{value:t.form.position,callback:function(e){t.$set(t.form,"position",e)},expression:"form.position"}}),t._v(" "),a("div",{staticClass:"edit_item_toast"},[t._v("注:10字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[t._m(3),t._v(" "),a("a-select",{staticStyle:{width:"667px","margin-right":"20px"},attrs:{"show-search":"",placeholder:"全部","option-filter-prop":"children","filter-option":t.filterOption,headers:t.istoken},on:{change:t.handleChange2},model:{value:t.form.statusCode,callback:function(e){t.$set(t.form,"statusCode",e)},expression:"form.statusCode"}},[a("a-select-option",{attrs:{value:""}},[t._v("全部")]),t._v(" "),t._l(t.sel_data,function(e,s){return a("a-select-option",{key:s,attrs:{value:e.id}},[t._v(t._s(e.val))])})],2)],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[t._v("备注信息:")]),t._v(" "),a("div",{staticStyle:{position:"relative"}},[a("a-textarea",{staticClass:"edit_a_input",attrs:{rows:5,placeholder:"500字以内，格式不限制"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)]),t._v(" "),a("div",{staticClass:"flexrow",staticStyle:{"margin-top":"30px","justify-item":"flex-start","margin-left":"325px"}},[a("a-button",{on:{click:function(e){return t.getform()}}},[t._v("保存")]),t._v(" "),a("a-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:function(e){return t.reset()}}},[t._v("重置")])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_title"},[e("span",{staticClass:"col_red"},[this._v("*")]),this._v("客户全称:\n    ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_title"},[e("span",{staticClass:"col_red"},[this._v("*")]),this._v("客户简称:\n    ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_title"},[e("span",{staticClass:"col_red"},[this._v("*")]),this._v("客户logo:\n    ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_title"},[e("span",{staticClass:"col_red"},[this._v("*")]),this._v("客户状态:\n    ")])}]};var c=a("VU/8")(n,l,!1,function(t){a("fmZH")},null,null);e.default=c.exports},fmZH:function(t,e){}});
webpackJsonp([40],{"d/5y":function(e,t){},wxzh:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("bOdI"),i=a.n(s),n=a("Xxa5"),r=a.n(n),o=a("exGp"),l=a.n(o),d=a("pytN"),c=a.n(d);function m(e,t){var a=new FileReader;a.addEventListener("load",function(){return t(a.result)}),a.readAsDataURL(e)}var u={data:function(){return{dictionaryColumns:c.a.data.add,selectedRowKeys:[],brandList:[],brandSelect:"",typeList:[],typeSelect:"",severList:[],severSelect:"",msgList:[{comboBoxId:"",comboBoxName:"无"}],msgSelect:"",warningList:[],modelName:"",modelCode:"",remark:"",num:0,szList:[],loading:!1,imageUrl:"",Id:""}},created:function(){this.getCombobox("device_service_type"),this.getCombobox("device_communication_mode"),this.getBrandList(),this.Id=this.$route.query.id,this.Id?(this.getModelInfo(),this.getTypeList()):this.getWarninngData()},methods:i()({getModelInfo:function(){var e=this;return l()(r.a.mark(function t(){var a,s,i;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={modelId:e.Id},t.next=3,e.$http.post(e.$api.devicemodeldetail,a);case 3:if(1e4==(s=t.sent).data.resultCode&&(e.msgSelect=s.data.data.communicationMode,e.brandSelect=s.data.data.brandId,e.typeSelect=s.data.data.deviceTypeId,e.severSelect=s.data.data.serviceTypeName,e.modelName=s.data.data.modelName,e.modelCode=s.data.data.modelCode,e.imageUrl=s.data.data.imageJson,e.remark=s.data.data.remark,e.warningList=s.data.data.deviceAlarmList,e.warningList.length>0))for(e.selectedRowKeys=[],e,i=0;i<e.warningList.length;i++)e.warningList[i].select&&e.selectedRowKeys.push(i);case 5:case"end":return t.stop()}},t,e)}))()},submit:function(){var e=this;return l()(r.a.mark(function t(){var a,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.severSelect){t.next=3;break}return e.$message.warning("请选择业务类别"),t.abrupt("return");case 3:if(e.typeSelect){t.next=6;break}return e.$message.warning("请选择设备类型"),t.abrupt("return");case 6:if(e.brandSelect){t.next=9;break}return e.$message.warning("请选择设备品牌"),t.abrupt("return");case 9:if(e.modelName){t.next=12;break}return e.$message.warning("型号名称不能为空"),t.abrupt("return");case 12:if(e.modelCode){t.next=15;break}return e.$message.warning("型号代码不能为空"),t.abrupt("return");case 15:if(!(e.selectedRowKeys.length<=0)){t.next=18;break}return e.$message.warning("请至少关联一个警报"),t.abrupt("return");case 18:return a={modelId:e.Id,modelName:e.modelName,modelCode:e.modelCode,serviceType:e.severSelect,deviceTypeId:e.typeSelect,brandId:e.brandSelect,communicationMode:e.msgSelect,imageJson:e.imageUrl,operatorId:JSON.parse(localStorage.getItem("usermsg")).accountId,remark:e.remark,deviceAlarmList:e.getAlramList()},t.next=21,e.$http.post(e.$api.devicemodelform,a);case 21:1e4==(s=t.sent).data.resultCode?(e.Id||e.$router.go(-1),e.$message.success(s.data.resultMsg)):e.$message.error(s.data.resultMsg);case 23:case"end":return t.stop()}},t,e)}))()},getAlramList:function(){for(var e=[],t=0;t<this.selectedRowKeys.length;t++)e.push(this.warningList[this.selectedRowKeys[t]].alarmId);return e},handleImageChange:function(e){var t=this;"uploading"!==e.file.status?"done"===e.file.status&&m(e.file.originFileObj,function(e){t.imageUrl=e,t.loading=!1}):this.loading=!0},beforeUpload:function(e){var t="image/jpeg"===e.type||"image/png"===e.type;t||this.$message.error("You can only upload JPG file!");var a=e.size/1024/1024<2;return a||this.$message.error("Image must smaller than 2MB!"),t&&a},getBrandList:function(){var e=this;return l()(r.a.mark(function t(){var a,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={pageIndex:1,pageSize:200,keyword:""},t.next=3,e.$http.post(e.$api.devicebrandspage,a);case 3:1e4==(s=t.sent).data.resultCode&&(e.brandList=e.brandList.concat(s.data.data.list));case 5:case"end":return t.stop()}},t,e)}))()},getTypeList:function(){var e=this;return l()(r.a.mark(function t(){var a,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={keyword:"",serviceType:e.severSelect,pageIndex:1,pageSize:200},t.next=3,e.$http.post(e.$api.devicetypepage,a);case 3:1e4==(s=t.sent).data.resultCode&&(e.typeList=s.data.data.list);case 5:case"end":return t.stop()}},t,e)}))()},getCombobox:function(e){var t=this;return l()(r.a.mark(function a(){var s,i;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s={classCode:e},a.next=3,t.$http.post(t.$api.dictionarycombobox,s);case 3:1e4==(i=a.sent).data.resultCode&&("device_communication_mode"==e?t.msgList=t.msgList.concat(i.data.data):t.severList=i.data.data);case 5:case"end":return a.stop()}},a,t)}))()},onSelectChange:function(e){this.selectedRowKeys=e},getWarninngData:function(){var e=this;return l()(r.a.mark(function t(){var a,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={pageIndex:1,pageSize:200,keyword:""},t.next=3,e.$http.post(e.$api.alramlist,a);case 3:1e4==(s=t.sent).data.resultCode&&(e.warningList=s.data.data.list);case 5:case"end":return t.stop()}},t,e)}))()},handleServerChange:function(e){this.severSelect=e,this.getTypeList(),this.typeSelect=""},handleTypeChange:function(e){this.typeSelect=e},handleBrandChange:function(e){this.brandSelect=e},handleMsgChange:function(e){this.msgSelect=e},reset:function(){this.Id?this.getModelInfo():(this.msgSelect="",this.brandSelect="",this.typeSelect="",this.severSelect="",this.modelName="",this.modelCode="",this.remark="",this.selectedRowKeys=[])},onChangeConfig:function(e){this.num=this.remark.length},handleChange:function(e){var t=this;"uploading"!==e.file.status?("done"===e.file.status&&m(e.file.originFileObj,function(e){t.imageUrl=e,t.form.customerLogo=e,t.loading=!1}),console.log(this.imageUrl,88999,e)):this.loading=!0}},"beforeUpload",function(e){var t="image/jpeg"===e.type||"image/png"===e.type||"image/jpg"===e.type;t||this.$message.error("只能上传jpeg,jpg,png格式的图片");var a=e.size/1024/1024<2;return a||this.$message.error("图片大小不能超过2MB!"),t&&a})},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"flexcolumn",staticStyle:{"background-color":"#FFFFFF"}},[a("div",{staticStyle:{margin:"0 auto"}},[a("div",{staticClass:"flexrow flexac edit_item_model"},[e._m(0),e._v(" "),a("a-select",{staticClass:"select_item_model",attrs:{value:e.severSelect?e.severSelect:"请选择业务类别"},on:{change:e.handleServerChange}},e._l(e.severList,function(t,s){return a("a-select-option",{key:s,attrs:{value:t.comboBoxId}},[e._v("\n            "+e._s(t.comboBoxName)+"\n          ")])}),1),e._v(" "),a("div",{staticClass:"edit_item_model_toast"},[e._v("注：可直接选择业务类型")])],1),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_model"},[e._m(1),e._v(" "),a("a-select",{staticClass:"select_item_model",attrs:{value:e.typeSelect?e.typeSelect:"请选择设备类型",disabled:!e.severSelect},on:{change:e.handleTypeChange}},e._l(e.typeList,function(t,s){return a("a-select-option",{key:s,attrs:{value:t.deviceTypeId}},[e._v("\n            "+e._s(t.deviceTypeName)+"\n          ")])}),1),e._v(" "),a("div",{staticClass:"edit_item_model_toast"},[e._v("注：可直接选择设备类型")])],1),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_model"},[e._m(2),e._v(" "),a("a-select",{staticClass:"select_item_model",attrs:{value:e.brandSelect?e.brandSelect:"请选择设备品牌",disabled:!e.typeSelect},on:{change:e.handleBrandChange}},e._l(e.brandList,function(t,s){return a("a-select-option",{key:s,attrs:{value:t.brandId}},[e._v("\n            "+e._s(t.brandName)+"\n          ")])}),1),e._v(" "),a("div",{staticClass:"edit_item_model_toast"},[e._v("注：可直接选择设备品牌")])],1),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_model"},[e._m(3),e._v(" "),a("div",{staticClass:"edit_a_input_model"},[a("a-input",{attrs:{placeholder:"请输入您选择的型号名称"},model:{value:e.modelName,callback:function(t){e.modelName=t},expression:"modelName"}})],1),e._v(" "),a("div",{staticClass:"edit_item_model_toast"},[e._v("注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_model"},[e._m(4),e._v(" "),a("div",{staticClass:"edit_a_input_model"},[a("a-input",{attrs:{placeholder:"请输入您选择的型号代码"},model:{value:e.modelCode,callback:function(t){e.modelCode=t},expression:"modelCode"}})],1),e._v(" "),a("div",{staticClass:"edit_item_model_toast"},[e._v("注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_model"},[a("div",{staticClass:"edit_item_model_title3"},[e._v("通信方式:")]),e._v(" "),a("a-select",{staticClass:"select_item_model",attrs:{value:e.msgSelect?e.msgSelect:"请选择通信方式"},on:{change:e.handleMsgChange}},e._l(e.msgList,function(t,s){return a("a-select-option",{key:s,attrs:{value:t.comboBoxId}},[e._v("\n            "+e._s(t.comboBoxName)+"\n          ")])}),1),e._v(" "),a("div",{staticClass:"edit_item_model_toast"},[e._v("注：通信方式数据字典设置")])],1),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_model"},[a("div",{staticClass:"edit_item_model_title3"},[e._v("备注信息:")]),e._v(" "),a("div",{staticStyle:{position:"relative",width:"667px"}},[a("a-textarea",{staticClass:"edit_a_input_model",attrs:{rows:5,maxLength:250,placeholder:"请输入描述"},on:{change:e.onChangeConfig},model:{value:e.remark,callback:function(t){e.remark=t},expression:"remark"}}),e._v(" "),a("div",{staticClass:"edit_number"},[e._v(e._s(e.num)+"/250")])],1)]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_model"},[a("div",{staticClass:"edit_item_model_title3"},[e._v("设备图标:")]),e._v(" "),a("div",{staticClass:"isupload"},[a("a-upload",{staticClass:"avatar-uploader",attrs:{name:"avatar","list-type":"picture-card","show-upload-list":!1,action:"http://192.168.3.101:8808/upload","before-upload":e.beforeUpload},on:{change:e.handleChange}},[e.imageUrl?a("img",{attrs:{src:e.imageUrl,alt:"avatar"}}):a("div",[a("a-icon",{attrs:{type:e.loading?"loading":"plus"}}),e._v(" "),a("div",{staticClass:"ant-upload-text"},[e._v("Upload")])],1)]),e._v(" "),a("div",{staticClass:"col_red"},[e._v("支持PNG、JPEG、JPG格式，1KB至2M")])],1)]),e._v(" "),e._m(5),e._v(" "),a("a-table",{attrs:{columns:e.dictionaryColumns,"data-source":e.warningList,pagination:!1,bordered:!0,size:"small","row-selection":{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange}},scopedSlots:e._u([{key:"index",fn:function(t,a,s){return[e._v("\n          "+e._s(s+1)+"\n        ")]}}])}),e._v(" "),a("div",{staticClass:"flexrow flexjc",staticStyle:{"margin-top":"40px","margin-bottom":"100px"}},[a("a-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("保存")]),e._v(" "),a("a-button",{staticStyle:{"margin-left":"20px"},on:{click:e.reset}},[e._v("重置")])],1)],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_model_title3"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("业务类别:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_model_title3"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("设备类型:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_model_title3"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("设备品牌:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_model_title3"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("型号名称:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_model_title3"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("型号代码:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"flexrow edit_item_model_title3",staticStyle:{width:"100%","margin-top":"40px","justify-item":"flex-start","margin-bottom":"10px","font-size":"16px"}},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("关联警报")])}]};var _=a("VU/8")(u,v,!1,function(e){a("d/5y")},null,null);t.default=_.exports}});
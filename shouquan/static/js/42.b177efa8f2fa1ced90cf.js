webpackJsonp([42],{FmQf:function(e,t){},XiZG:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),s=a.n(r),i=a("exGp"),o=a.n(i),n=(a("+aT9"),{data:function(){return{sel_data:"",form:{parameterId:"",typeCode:"",parameterName:"",parameterCode:"",parameterValue:"",operatorId:"1",description:""},typeName:"",rundetailparam:{parameterId:""}}},created:function(){this.sel_data=JSON.parse(localStorage.getItem("sel")),"edit"==this.$route.query.type&&(this.rundetailparam.parameterId=this.$route.query.id,this.typeName=this.$route.query.typeName||"",this.getrundetail())},methods:{getrundetail:function(){var e=this;return o()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.post(e.$api.rundetail,e.rundetailparam);case 2:"10000"==(a=t.sent).data.resultCode?e.form=a.data.data:e.$message.error(a.data.resultMsg),console.log(a,8888);case 5:case"end":return t.stop()}},t,e)}))()},getrunform:function(){var e=this;return o()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(""!=e.form.parameterName){t.next=2;break}return t.abrupt("return",e.$message.error("请输入参数名称"));case 2:if(""!=e.form.parameterValue){t.next=4;break}return t.abrupt("return",e.$message.error("请输入参数数值"));case 4:if(""!=e.form.parameterCode){t.next=6;break}return t.abrupt("return",e.$message.error("请输入参数代码"));case 6:return e.form.operatorId=1,t.next=9,e.$http.post(e.$api.runform,e.form);case 9:"10000"==(a=t.sent).data.resultCode?e.$message.success(a.data.resultMsg):e.$message.error(a.data.resultMsg);case 11:case"end":return t.stop()}},t,e)}))()},reset:function(){"add"==this.$route.query.type?this.form={parameterId:"",typeCode:"",parameterName:"",parameterCode:"",parameterValue:"",operatorId:"1",description:""}:(this.form.parameterName="",this.form.parameterCode="",this.form.parameterValue="",this.form.description="")},onComplete:function(e){console.log(e,"onComplete ")},onError:function(e){console.log(e,"onError ")},handleChange:function(e,t){this.form.typeCode=this.sel_data[t.data.key].comboBoxId,console.log(this.form.typeCode,88)},handleBlur:function(){console.log("blur")},handleFocus:function(){console.log("focus")},filterOption:function(e,t){return t.componentOptions.children[0].text.toLowerCase().indexOf(e.toLowerCase())>=0}}}),l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"isedit"},[a("div",{staticClass:"flexrow flexac edit_item"},[e._m(0),e._v(" "),a("div",[a("a-select",{staticStyle:{width:"667px",height:"32px"},attrs:{"show-search":"",placeholder:"请选择","option-filter-prop":"children","filter-option":e.filterOption},on:{focus:e.handleFocus,blur:e.handleBlur,change:e.handleChange},model:{value:e.typeName,callback:function(t){e.typeName=t},expression:"typeName"}},e._l(e.sel_data,function(t,r){return a("a-select-option",{key:r,attrs:{value:t.comboBoxId}},[e._v(e._s(t.comboBoxName))])}),1)],1)]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[e._m(1),e._v(" "),a("div",{staticClass:"edit_a_input_run "},[a("a-input",{attrs:{placeholder:"请输入参数名称"},model:{value:e.form.parameterName,callback:function(t){e.$set(e.form,"parameterName",t)},expression:"form.parameterName"}})],1),e._v(" "),a("div",{staticClass:"edit_item_toast"},[e._v("注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[e._m(2),e._v(" "),a("div",{staticClass:"edit_a_input_run "},[a("a-input",{attrs:{placeholder:"请输入参数代码"},model:{value:e.form.parameterCode,callback:function(t){e.$set(e.form,"parameterCode",t)},expression:"form.parameterCode"}})],1),e._v(" "),a("div",{staticClass:"edit_item_toast"},[e._v("注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[e._m(3),e._v(" "),a("div",{staticStyle:{position:"relative",width:"667px"}},[a("a-textarea",{staticClass:"edit_a_input",attrs:{rows:5,placeholder:"格式不限制，256个字符以内，包含标点符号"},model:{value:e.form.parameterValue,callback:function(t){e.$set(e.form,"parameterValue",t)},expression:"form.parameterValue"}}),e._v(" "),a("div",{staticClass:"edit_number"},[e._v("0/256")])],1)]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[e._v("参数描述:")]),e._v(" "),a("div",{staticStyle:{position:"relative",width:"667px"}},[a("a-textarea",{staticClass:"edit_a_input",attrs:{rows:5,placeholder:"格式不限制，256个字符以内，包含标点符号"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}}),e._v(" "),a("div",{staticClass:"edit_number"},[e._v("0/256")])],1)]),e._v(" "),a("div",{staticClass:"flexrow",staticStyle:{"margin-top":"30px","justify-item":"flex-start","margin-left":"325px"}},[a("a-button",{on:{click:function(t){return e.getrunform()}}},[e._v("保存")]),e._v(" "),a("a-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:function(t){return e.reset()}}},[e._v("重置")])],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_title"},[t("span",{staticClass:"col_red"},[this._v("*")]),this._v("参数分组:\n    ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_title"},[t("span",{staticClass:"col_red"},[this._v("*")]),this._v("参数名称:\n    ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_title"},[t("span",{staticClass:"col_red"},[this._v("*")]),this._v("参数代码:\n    ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_title"},[t("span",{staticClass:"col_red"},[this._v("*")]),this._v("参数数值:\n    ")])}]};var c=a("VU/8")(n,l,!1,function(e){a("FmQf")},null,null);t.default=c.exports}});
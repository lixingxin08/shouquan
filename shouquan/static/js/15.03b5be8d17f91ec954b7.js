webpackJsonp([15],{FDxY:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("Xxa5"),i=e.n(s),r=e("exGp"),n=e.n(r),l=e("pytN"),o=e.n(l),c={props:{param:{type:Object}},data:function(){return{}},methods:{submit:function(){this.param.parameterName?this.param.parameterCode?this.$emit("callback",this.param):this.$message.warning("参数代码不能为空"):this.$message.warning("参数名称不能为空")},closedialog:function(){this.$emit("callback")}}},d={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"ps_ab"},[e("div",{staticClass:"ps_flex",staticStyle:{padding:"0px","border-radius":"10px"}},[e("div",{staticClass:"dialog-title flexrow flexac flexsb"},[t._v("新增接口\n      "),e("a-icon",{attrs:{type:"close"},on:{click:t.closedialog}})],1),t._v(" "),e("div",{staticClass:"flexrow flexac item-model",staticStyle:{"margin-top":"20px"}},[e("a",{staticStyle:{color:"#FF0033"}},[t._v("*")]),t._v(" "),e("div",{staticClass:"item-title-model"},[t._v("参数名称：")]),t._v(" "),e("a-input",{attrs:{maxLenght:50,placeholder:"50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号"},model:{value:t.param.parameterName,callback:function(a){t.$set(t.param,"parameterName",a)},expression:"param.parameterName"}})],1),t._v(" "),e("div",{staticClass:"flexrow flexac item-model"},[e("a",{staticStyle:{color:"#FF0033"}},[t._v("*")]),t._v(" "),e("div",{staticClass:"item-title-model"},[t._v("参数代码：")]),t._v(" "),e("a-input",{attrs:{maxLenght:50,placeholder:"50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号"},model:{value:t.param.parameterCode,callback:function(a){t.$set(t.param,"parameterCode",a)},expression:"param.parameterCode"}})],1),t._v(" "),e("div",{staticClass:"flexrow flexac item-model"},[e("div",{staticClass:"item-title-model"},[t._v("参数数值：")]),t._v(" "),e("a-input",{attrs:{maxLenght:50,placeholder:"50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号"},model:{value:t.param.parameterValue,callback:function(a){t.$set(t.param,"parameterValue",a)},expression:"param.parameterValue"}})],1),t._v(" "),e("div",{staticClass:"flexrow flexac item-model"},[e("div",{staticClass:"item-title-model"},[t._v("参数描述：")]),t._v(" "),e("a-textarea",{attrs:{maxLenght:500,placeholder:"请输入参数描述,500字以内","auto-size":{minRows:3,maxRows:5}},model:{value:t.param.description,callback:function(a){t.$set(t.param,"description",a)},expression:"param.description"}})],1),t._v(" "),e("div",{staticClass:"flexrow flexjc",staticStyle:{"margin-top":"40px","margin-bottom":"100px"}},[e("a-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("确定")]),t._v(" "),e("a-button",{staticStyle:{"margin-left":"70px"}},[t._v("重置")])],1)])])},staticRenderFns:[]};var m={components:{isAdd:e("VU/8")(c,d,!1,function(t){e("vqVu")},null,null).exports},data:function(){return{isVis:!1,paramItem:{},dictionaryColumns:o.a.data.param,paramList:[],id:"",modelDetail:{}}},created:function(){this.id=this.$route.query.id,this.getModelInfo(),this.getParamData()},methods:{getModelInfo:function(){var t=this;return n()(i.a.mark(function a(){var e,s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e={modelId:t.id},a.next=3,t.$http.post(t.$api.devicemodeldetail,e);case 3:1e4==(s=a.sent).data.resultCode&&(t.modelDetail=s.data.data);case 5:case"end":return a.stop()}},a,t)}))()},getParamData:function(){var t=this;return n()(i.a.mark(function a(){var e,s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e={pageIndex:1,pageSize:200,modelId:t.id},a.next=3,t.$http.post(t.$api.parampage,e);case 3:1e4==(s=a.sent).data.resultCode&&(t.paramList=s.data.data.list);case 5:case"end":return a.stop()}},a,t)}))()},confirmDelete:function(t){var a=this;return n()(i.a.mark(function e(){var s,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s={parameterId:t.parameterId},e.next=3,a.$http.post(a.$api.paramremove,s);case 3:1e4==(r=e.sent).data.resultCode?(a.getParamData(),a.$message.success(r.data.resultMsg)):a.$message.warning(r.data.resultMsg);case 5:case"end":return e.stop()}},e,a)}))()},editParam:function(t){this.paramItem=t,this.isVis=!0},addCallBack:function(t){var a=this;return n()(i.a.mark(function e(){var s;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=8;break}return t.modelId=a.id,t.typeCode="sms_template_device_running",t.operatorId="5172dadd6d7c404e8ac657f32f81d969",e.next=6,a.$http.post(a.$api.paramform,t);case 6:1e4==(s=e.sent).data.resultCode?(a.getParamData(),a.$message.success(s.data.resultMsg)):a.$message.warning(s.data.resultMsg);case 8:a.isVis=!1;case 9:case"end":return e.stop()}},e,a)}))()}}},p={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"content2"},[e("div",{staticClass:"flexrow flexac",staticStyle:{"margin-bottom":"20px"}},[e("div",{staticClass:"title_tx"},[t._v("业务类别:")]),t._v(" "),e("div",{staticClass:"flexrow flexac flexsb title_item"},[t._v("\n      "+t._s(t.modelDetail.serviceTypeName)+"\n      "),e("a-icon",{attrs:{type:"down"}})],1),t._v(" "),e("div",{staticClass:"title_tx"},[t._v("设备类型:")]),t._v(" "),e("div",{staticClass:"flexrow flexac flexsb title_item"},[t._v("\n      "+t._s(t.modelDetail.deviceTypeName)+"\n      "),e("a-icon",{attrs:{type:"down"}})],1),t._v(" "),e("div",{staticClass:"title_tx"},[t._v("设备品牌:")]),t._v(" "),e("div",{staticClass:"flexrow flexac flexsb title_item"},[t._v("\n      "+t._s(t.modelDetail.brandName)+"\n      "),e("a-icon",{attrs:{type:"down"}})],1),t._v(" "),e("div",{staticClass:"title_tx"},[t._v("型号名称:")]),t._v(" "),e("div",{staticClass:"flexrow flexac flexsb title_item"},[t._v("\n      "+t._s(t.modelDetail.modelName)+"\n      "),e("a-icon",{attrs:{type:"down"}})],1)]),t._v(" "),e("a-button",{staticClass:"flexrow flexjc flexac addbtn",attrs:{type:"primary"},on:{click:function(a){return t.editParam({})}}},[e("a-icon",{attrs:{"two-tone-color":"#ffffff",type:"plus"}}),t._v(" 新增运行参数\n  ")],1),t._v(" "),e("a-table",{attrs:{scroll:{y:700},columns:t.dictionaryColumns,"data-source":t.paramList,bordered:"",size:"small",pagination:!1},scopedSlots:t._u([{key:"index",fn:function(a,e,s){return[t._v("\n      "+t._s(s+1)+"\n    ")]}},{key:"operation",fn:function(a,s){return[e("div",{staticClass:"flexrow flexac flexjc"},[e("a",{staticStyle:{"font-size":"12px"},attrs:{href:"#"},on:{click:function(a){return t.editParam(s)}}},[t._v("编辑")]),t._v(" "),e("div",{staticClass:"item-line"}),t._v(" "),e("a-popconfirm",{attrs:{title:"确定删除？","ok-text":"确定","cancel-text":"取消"},on:{confirm:function(a){return t.confirmDelete(s)}}},[e("a",{staticStyle:{color:"#FF0000","font-size":"12px"},attrs:{href:"#"}},[t._v("删除")])])],1)]}}])}),t._v(" "),t.isVis?e("is-add",{attrs:{param:t.paramItem},on:{callback:t.addCallBack}}):t._e()],1)},staticRenderFns:[]};var u=e("VU/8")(m,p,!1,function(t){e("QJWG")},null,null);a.default=u.exports},QJWG:function(t,a){},vqVu:function(t,a){}});
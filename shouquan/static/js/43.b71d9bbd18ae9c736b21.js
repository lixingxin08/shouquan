webpackJsonp([43],{g2uB:function(e,t){},zykx:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Xxa5"),s=n.n(a),i=n("exGp"),r=n.n(i),v={data:function(){return{eventSelect:"",eventList:[],event:{},id:"",num:0}},created:function(){this.id=this.$route.query.id,this.id&&this.getEventInfo(),this.getCombobox()},methods:{submit:function(){var e=this;return r()(s.a.mark(function t(){var n,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.event.eventName){t.next=3;break}return e.$message.warning("事件名称不能为空"),t.abrupt("return");case 3:if(e.event.eventCode){t.next=6;break}return e.$message.warning("事件代码不能为空"),t.abrupt("return");case 6:if(e.eventSelect){t.next=9;break}return e.$message.warning("请选择事件类型"),t.abrupt("return");case 9:return n={eventId:e.id,eventName:e.event.eventName,eventCode:e.event.eventCode,eventType:e.eventSelect,operatorId:JSON.parse(localStorage.getItem("usermsg")).accountId,remark:e.event.remark},t.next=12,e.$http.post(e.$api.deviceeventform,n);case 12:1e4==(a=t.sent).data.resultCode?(e.$message.success(a.data.resultMsg),e.id||e.$router.go(-1)):e.$message.error(a.data.resultMsg);case 14:case"end":return t.stop()}},t,e)}))()},getEventInfo:function(){var e=this;return r()(s.a.mark(function t(){var n,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={eventId:e.id},t.next=3,e.$http.post(e.$api.deviceeventdetail,n);case 3:1e4==(a=t.sent).data.resultCode&&(e.event=a.data.data,e.eventSelect=e.event.eventType);case 5:case"end":return t.stop()}},t,e)}))()},handleSelectChange:function(e){this.eventSelect=e},getCombobox:function(){var e=this;return r()(s.a.mark(function t(){var n,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={classCode:"device_event_type"},t.next=3,e.$http.post(e.$api.dictionarycombobox,n);case 3:1e4==(a=t.sent).data.resultCode&&(e.eventList=a.data.data);case 5:case"end":return t.stop()}},t,e)}))()},reset:function(){this.id?this.getEventInfo():this.event={}},onChangeConfig:function(){this.num=this.event.remark.length}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"flexcolumn",staticStyle:{"background-color":"#FFFFFF"}},[n("div",{staticStyle:{margin:"0 auto"}},[n("div",{staticClass:"flexrow flexac edit_item_event"},[e._m(0),e._v(" "),n("div",{staticClass:"edit_a_input_event"},[n("a-input",{attrs:{placeholder:"事件名称"},model:{value:e.event.eventName,callback:function(t){e.$set(e.event,"eventName",t)},expression:"event.eventName"}})],1),e._v(" "),n("div",{staticClass:"edit_item_event_toast"},[e._v("注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])]),e._v(" "),n("div",{staticClass:"flexrow flexac edit_item_event"},[e._m(1),e._v(" "),n("div",{staticClass:"edit_a_input_event"},[n("a-input",{attrs:{placeholder:"50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号"},model:{value:e.event.eventCode,callback:function(t){e.$set(e.event,"eventCode",t)},expression:"event.eventCode"}})],1),e._v(" "),n("div",{staticClass:"edit_item_event_toast"},[e._v("注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])]),e._v(" "),n("div",{staticClass:"flexrow flexac edit_item_event"},[e._m(2),e._v(" "),n("a-select",{staticStyle:{width:"667px"},attrs:{value:e.eventSelect?e.eventSelect:"请选择事件类型"},on:{change:e.handleSelectChange}},e._l(e.eventList,function(t,a){return n("a-select-option",{key:a,attrs:{value:t.comboBoxId}},[e._v("\n          "+e._s(t.comboBoxName)+"\n        ")])}),1),e._v(" "),n("div",{staticClass:"edit_item_event_toast"},[e._v("注：数字字典")])],1),e._v(" "),n("div",{staticClass:"flexrow flexac edit_item_event"},[n("div",{staticClass:"edit_item_event_event"},[e._v("事件描述:")]),e._v(" "),n("div",{staticStyle:{position:"relative",width:"667px"}},[n("a-textarea",{staticClass:"edit_a_input",attrs:{rows:5,maxLength:250,placeholder:"请输入描述"},on:{change:e.onChangeConfig},model:{value:e.event.remark,callback:function(t){e.$set(e.event,"remark",t)},expression:"event.remark"}}),e._v(" "),n("div",{staticClass:"edit_number"},[e._v(e._s(e.num)+"/250")])],1)]),e._v(" "),n("div",{staticClass:"flexrow flexjc",staticStyle:{"margin-top":"60px","margin-bottom":"100px"}},[n("a-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("保存")]),e._v(" "),n("a-button",{staticStyle:{"margin-left":"60px"},on:{click:e.reset}},[e._v("重置")])],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_event_event"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("事件名称:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_event_event"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("事件代码:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_event_event"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("事件类型:")])}]};var o=n("VU/8")(v,c,!1,function(e){n("g2uB")},null,null);t.default=o.exports}});
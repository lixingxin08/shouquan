webpackJsonp([24],{"8DWv":function(e,t){},"GL/3":function(e,t){e.exports={data:{dictionaryColumns:[{title:"序号",width:"80px",align:"center",ellipsis:!0,scopedSlots:{customRender:"index"}},{title:"警报名称",align:"center",ellipsis:!0,dataIndex:"alarmName"},{title:"警报代码",align:"center",ellipsis:!0,dataIndex:"alarmCode"},{title:"警报类型",align:"center",ellipsis:!0,dataIndex:"alarmTypeName"},{title:"警报等级",align:"center",ellipsis:!0,dataIndex:"gradeno",scopedSlots:{customRender:"gradeno"}},{title:"转警事件数",align:"center",ellipsis:!0,dataIndex:"eventTotal"},{title:"授权次数",align:"center",ellipsis:!0,dataIndex:"authTotal"},{title:"操作",align:"center",width:"320px",scopedSlots:{customRender:"operation"}}],add:[{title:"序号",scopedSlots:{customRender:"index"},width:"7%",align:"center"},{title:"事件名称",dataIndex:"eventName",align:"center",width:"30%"},{title:"事件代码",dataIndex:"eventCode",align:"center",width:"30%"},{title:"事件类型",dataIndex:"eventTypeName",align:"center"}]}}},rg3m:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),s=a("exGp"),r=a.n(s),l=a("GL/3"),o=a.n(l),c={data:function(){return{selectedRowKeys:[],gradeList:[{comboBoxId:1,comboBoxName:"高危"},{comboBoxId:2,comboBoxName:"普通"},{comboBoxId:3,comboBoxName:"忽略"}],eventList:[],warningTypeList:[],warningSelect:"",warning:{gradeno:0},dictionaryColumns:o.a.data.add,num:0,id:""}},created:function(){this.id=this.$route.query.id,this.getCombobox(),this.id?this.getWarnInfo():this.getEventList()},methods:{submit:function(){var e=this;return r()(i.a.mark(function t(){var a,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.warning.alarmName){t.next=3;break}return e.$message.warning("警报名字不能为空"),t.abrupt("return");case 3:if(e.warning.alarmCode){t.next=6;break}return e.$message.warning("警报代码不能为空"),t.abrupt("return");case 6:if(e.warningSelect){t.next=9;break}return e.$message.warning("请选择警报类型"),t.abrupt("return");case 9:if(!(e.warning.gradeno<=0)){t.next=12;break}return e.$message.warning("请选择警报等级"),t.abrupt("return");case 12:if(e.selectedRowKeys){t.next=15;break}return e.$message.warning("请至少勾选一个转警事件"),t.abrupt("return");case 15:return a={alarmId:e.id,alarmName:e.warning.alarmName,alarmCode:e.warning.alarmCode,alarmType:e.warningSelect,flowImage:e.warning.flowImage,gradeno:e.warning.gradeno,operatorId:"5172dadd6d7c404e8ac657f32f81d969",remark:e.warning.remark,eventIdList:e.getEventSelectList()},t.next=18,e.$http.post(e.$api.alramform,a);case 18:1e4==(n=t.sent).data.resultCode?(e.id||e.$router.go(-1),e.$message.success(n.data.resultMsg)):e.$message.error(n.data.resultMsg);case 20:case"end":return t.stop()}},t,e)}))()},getCombobox:function(){var e=this;return r()(i.a.mark(function t(){var a,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={classCode:"device_alarm_type"},t.next=3,e.$http.post(e.$api.dictionarycombobox,a);case 3:1e4==(n=t.sent).data.resultCode&&(e.warningTypeList=n.data.data);case 5:case"end":return t.stop()}},t,e)}))()},handleGradeSelectChange:function(e){this.warning.gradeno=e},getEventList:function(){var e=this;return r()(i.a.mark(function t(){var a,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={pageSize:200,pageIndex:1,keyword:"",eventType:""},t.next=3,e.$http.post(e.$api.deviceeventpage,a);case 3:1e4==(n=t.sent).data.resultCode&&(e.eventList=n.data.data.list);case 5:case"end":return t.stop()}},t,e)}))()},getWarnInfo:function(){var e=this;return r()(i.a.mark(function t(){var a,n,s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={alarmId:e.id},t.next=3,e.$http.post(e.$api.alramdetail,a);case 3:if(1e4==(n=t.sent).data.resultCode&&(e.warning=n.data.data,e.eventList=e.warning.eventList,e.warningSelect=e.warning.alarmType,e.eventList.length>0))for(e.selectedRowKeys=[],e,s=0;s<e.eventList.length;s++)e.eventList[s].select&&e.selectedRowKeys.push(s);case 5:case"end":return t.stop()}},t,e)}))()},getEventSelectList:function(){for(var e=[],t=0;t<this.selectedRowKeys.length;t++)e.push(this.eventList[this.selectedRowKeys[t]].eventId);return e},onChangeConfig:function(e){this.num=this.warning.remark.length},handleSelectChange:function(e){this.warningSelect=e},onSelectChange:function(e){this.selectedRowKeys=e},reset:function(){this.id?this.getWarnInfo():(this.selectedRowKeys=[],this.warning={})}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"flexcolumn",staticStyle:{"background-color":"#FFFFFF"}},[a("div",{staticStyle:{margin:"0 auto"}},[a("div",{staticClass:"flexrow flexac edit_item_warnings"},[e._m(0),e._v(" "),a("div",{staticClass:"edit_a_input_warnings"},[a("a-input",{attrs:{maxLength:50,placeholder:"请输入您选择的型号名称"},model:{value:e.warning.alarmName,callback:function(t){e.$set(e.warning,"alarmName",t)},expression:"warning.alarmName"}})],1),e._v(" "),a("div",{staticClass:"edit_item_warnings_toast"},[e._v("注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_warnings"},[e._m(1),e._v(" "),a("div",{staticClass:"edit_a_input_warnings"},[a("a-input",{attrs:{maxLength:50,placeholder:"请输入您选择的型号代码"},model:{value:e.warning.alarmCode,callback:function(t){e.$set(e.warning,"alarmCode",t)},expression:"warning.alarmCode"}})],1),e._v(" "),a("div",{staticClass:"edit_item_warnings_toast"},[e._v("注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号")])]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_warnings"},[e._m(2),e._v(" "),a("a-select",{staticClass:"select_item_warnings",attrs:{value:e.warningSelect?e.warningSelect:"请选择警报类型"},on:{change:e.handleSelectChange}},e._l(e.warningTypeList,function(t,n){return a("a-select-option",{key:n,attrs:{value:t.comboBoxId}},[e._v("\n            "+e._s(t.comboBoxName)+"\n          ")])}),1),e._v(" "),a("div",{staticClass:"edit_item_warnings_toast"},[e._v("注：可直接选择警报类型")])],1),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_warnings"},[e._m(3),e._v(" "),a("a-select",{staticClass:"select_item_warnings",attrs:{value:e.warning.gradeno?e.warning.gradeno:"请选择警报类型"},on:{change:e.handleGradeSelectChange}},e._l(e.gradeList,function(t,n){return a("a-select-option",{key:n,attrs:{value:t.comboBoxId}},[e._v("\n            "+e._s(t.comboBoxName)+"\n          ")])}),1),e._v(" "),a("div",{staticClass:"edit_item_warnings_toast"},[e._v("注：可直接选择警报等级")])],1),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_warnings"},[a("div",{staticClass:"edit_item_warnings_title3"},[e._v("警报描述:")]),e._v(" "),a("div",{staticStyle:{position:"relative",width:"667px"}},[a("a-textarea",{staticClass:"edit_a_input_warnings",attrs:{rows:5,maxLength:250,placeholder:"请输入描述"},on:{change:e.onChangeConfig},model:{value:e.warning.remark,callback:function(t){e.$set(e.warning,"remark",t)},expression:"warning.remark"}}),e._v(" "),a("div",{staticClass:"edit_number"},[e._v(e._s(e.num)+"/250")])],1)]),e._v(" "),a("div",{staticClass:"flexrow flexac edit_item_warnings"},[a("div",{staticClass:"edit_item_warnings_title3"},[e._v("设备图标:")]),e._v(" "),a("a-upload",{attrs:{action:"https://www.mocky.io/v2/5cc8019d300000980a055e76","list-type":"picture"}},[a("a-button",[a("a-icon",{attrs:{type:"upload"}}),e._v(" upload ")],1)],1)],1),e._v(" "),a("div",{staticClass:"flexrow edit_item_warnings_title3",staticStyle:{"margin-top":"40px","justify-item":"flex-start","margin-bottom":"10px","font-size":"16px"}},[e._v("转警事件")]),e._v(" "),a("a-table",{attrs:{columns:e.dictionaryColumns,"data-source":e.eventList,pagination:!1,bordered:!0,size:"small","row-selection":{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange}},scopedSlots:e._u([{key:"index",fn:function(t,a,n){return[e._v("\n          "+e._s(n+1)+"\n        ")]}}])}),e._v(" "),a("div",{staticClass:"flexrow flexjc",staticStyle:{"margin-top":"40px","margin-bottom":"100px"}},[a("a-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("保存")]),e._v(" "),a("a-button",{staticStyle:{"margin-left":"20px"},on:{click:e.reset}},[e._v("重置")])],1)],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_warnings_title3"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("警报名称:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_warnings_title3"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("警报代码:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_warnings_title3"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("警报类型:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"edit_item_warnings_title3"},[t("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("警报等级:")])}]};var g=a("VU/8")(c,d,!1,function(e){a("8DWv")},null,null);t.default=g.exports}});
webpackJsonp([26],{"GL/3":function(t,e){t.exports={data:{dictionaryColumns:[{title:"序号",width:"80px",align:"center",ellipsis:!0,scopedSlots:{customRender:"index"}},{title:"警报名称",align:"center",ellipsis:!0,dataIndex:"alarmName"},{title:"警报代码",align:"center",ellipsis:!0,dataIndex:"alarmCode"},{title:"警报类型",align:"center",ellipsis:!0,dataIndex:"alarmTypeName"},{title:"警报等级",align:"center",ellipsis:!0,dataIndex:"gradeno",scopedSlots:{customRender:"gradeno"}},{title:"转警事件数",align:"center",ellipsis:!0,dataIndex:"eventTotal"},{title:"授权次数",align:"center",ellipsis:!0,dataIndex:"authTotal"},{title:"操作",align:"center",width:"320px",scopedSlots:{customRender:"operation"}}],add:[{title:"序号",scopedSlots:{customRender:"index"},width:"7%",align:"center"},{title:"事件名称",dataIndex:"eventName",align:"center",width:"30%"},{title:"事件代码",dataIndex:"eventCode",align:"center",width:"30%"},{title:"事件类型",dataIndex:"eventTypeName",align:"center"}]}}},RBpP:function(t,e){},gMe3:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),r=a("exGp"),o=a.n(r),s=a("GL/3"),l=a.n(s),c={data:function(){return{keyword:"",warningTypeList:[{comboBoxId:"",comboBoxName:"全部"}],warningSelect:"",dictionaryColumns:l.a.data.dictionaryColumns,warningList:[],pagination:{total:0,size:"default",current:1,pageSize:20,showSizeChanger:!0,pageSizeOptions:["10","20","30","40"],showQuickJumper:!0}}},created:function(){this.getCombobox(),this.getWariningData()},methods:{handleTableChange:function(t){this.pagination.page=t.current,this.pagination.current=t.current,this.pagination.pageSize=t.pageSize,this.getWariningData()},handleSelectChange:function(t){this.warningSelect=t},getWariningData:function(){var t=this;return o()(i.a.mark(function e(){var a,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={keyword:t.keyword,alarmType:t.warningSelect,pageIndex:t.pagination.current,pageSize:t.pagination.pageSize},e.next=3,t.$http.post(t.$api.alramlist,a);case 3:1e4==(n=e.sent).data.resultCode?(t.pagination.total=n.data.data.length,t.warningList=n.data.data.list):(t.warningList=[],t.$message.error(n.data.resultMsg));case 5:case"end":return e.stop()}},e,t)}))()},deleteConfirm:function(t){var e=this;return o()(i.a.mark(function a(){var n,r;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n={alarmId:t.alarmId},a.next=3,e.$http.post(e.$api.alramremove,n);case 3:1e4==(r=a.sent).data.resultCode?(e.$message.success(r.data.resultMsg),e.getWariningData()):e.$message.error(r.data.resultMsg);case 5:case"end":return a.stop()}},a,e)}))()},cleanKeyWord:function(){this.warningSelect="",this.keyword="",this.getWariningData()},getCombobox:function(){var t=this;return o()(i.a.mark(function e(){var a,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={classCode:"device_alarm_type"},e.next=3,t.$http.post(t.$api.dictionarycombobox,a);case 3:1e4==(n=e.sent).data.resultCode&&(t.warningTypeList=t.warningTypeList.concat(n.data.data));case 5:case"end":return e.stop()}},e,t)}))()},edit:function(t){this.$router.push({path:"/adddevicewarning",query:{id:t.alarmId}})}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content2"},[a("div",{staticClass:"flexrow flexac"},[a("div",{staticClass:"title_tx"},[t._v("警报名称/代码:")]),t._v(" "),a("a-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入名称/代码"},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._v(" "),a("div",{staticClass:"title_tx",staticStyle:{"margin-left":"20px"}},[t._v("警报类别:")]),t._v(" "),a("a-select",{staticStyle:{width:"200px"},attrs:{value:t.warningSelect?t.warningSelect:"全部"},on:{change:t.handleSelectChange}},t._l(t.warningTypeList,function(e,n){return a("a-select-option",{key:n,attrs:{value:e.comboBoxId}},[t._v("\n        "+t._s(e.comboBoxName)+"\n      ")])}),1),t._v(" "),a("a-button",{staticClass:"title_btn",attrs:{type:"primary"},on:{click:t.getWariningData}},[t._v("查询")]),t._v(" "),a("a-button",{on:{click:t.cleanKeyWord}},[t._v("清除")])],1),t._v(" "),a("div",{staticClass:"view-title-line"}),t._v(" "),a("a-button",{staticClass:"addbtn",attrs:{type:"primary"},on:{click:function(e){return t.edit({})}}},[a("a-icon",{staticStyle:{"margin-right":"5px"},attrs:{"two-tone-color":"#ffffff",type:"plus"},on:{click:function(e){return t.edit({})}}}),t._v(" 新增\n  ")],1),t._v(" "),a("a-table",{attrs:{scroll:{y:700},columns:t.dictionaryColumns,"data-source":t.warningList,bordered:"",size:"small",pagination:t.pagination},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"index",fn:function(e,a,n){return[t._v("\n    "+t._s(n+1+10*(t.pagination.current-1))+"\n    ")]}},{key:"gradeno",fn:function(e,n){return a("div",{},[0==n.gradeno||3==n.gradeno?a("div",[t._v("忽略")]):t._e(),t._v(" "),2==n.gradeno?a("div",{staticStyle:{color:"#1890FF"}},[t._v("普通")]):t._e(),t._v(" "),1==n.gradeno?a("div",{staticStyle:{color:"#FF0033"}},[t._v("高危")]):t._e()])}},{key:"operation",fn:function(e,n){return[a("div",{staticClass:"flexrow flexac flexjc"},[a("a",{staticStyle:{"font-size":"12px"},attrs:{href:"#"},on:{click:function(e){return t.edit(n)}}},[t._v("编辑")]),t._v(" "),a("div",{staticClass:"item-line"}),t._v(" "),a("a-popconfirm",{attrs:{title:"确定删除？","ok-text":"确定","cancel-text":"取消"},on:{confirm:function(e){return t.deleteConfirm(n)}}},[a("a",{staticStyle:{color:"#FF0000","font-size":"12px"},attrs:{href:"#"}},[t._v("删除")])])],1)]}}])})],1)},staticRenderFns:[]};var u=a("VU/8")(c,d,!1,function(t){a("RBpP")},null,null);e.default=u.exports}});
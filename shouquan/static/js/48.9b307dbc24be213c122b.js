webpackJsonp([48],{iLwR:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),o=a.n(n),i=a("exGp"),r=a.n(i),s={components:{isDeleteDialog:a("wxRv").a},data:function(){return{ModalText:"您确定要删除吗？",visible:!1,tabletype:!1,tablecolumns:[{width:60,align:"center",title:"序号",dataIndex:"wechatConfigId",key:"wechatConfigId",ellipsis:!0,scopedSlots:{customRender:"wechatConfigId"}},{width:158,align:"center",title:"微信账号别名",dataIndex:"wechatConfigName",key:"wechatConfigName",ellipsis:!0},{width:138,align:"center",title:"微信应用标识",dataIndex:"wechatAppId",key:"wechatAppId",ellipsis:!0},{width:158,align:"center",title:"令牌过期时间",key:"expirationTime",dataIndex:"expirationTime",ellipsis:!0},{width:158,align:"center",title:"微信账号类型",key:"typeCode",dataIndex:"typeCode"},{width:208,align:"center",title:"操作",ellipsis:!0,scopedSlots:{customRender:"edit"}}],tabledata:"",pagination:{total:0,pageSize:10,showSizeChanger:!0,current:1,page:1,size:"default",pageSizeOptions:["10","20","50","100"],showTotal:function(e){return"共有 "+e+" 条数据"}},issearchdata:"",removeparam:{customerId:""},istotal:{type:1},wetchatTypeList:[{comboBoxId:"account_wechat_type",comboBoxName:"公众号"},{comboBoxId:"wechat_account_small",comboBoxName:"服务号"}],runpageparam:{typeCode:"",keyword:"",operatorId:"1",pageIndex:1,pageSize:10}}},created:function(){this.getpage(),this.getdictionarycombobox()},methods:{getdictionarycombobox:function(){var e=this;return r()(o.a.mark(function t(){var a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={classCode:"message_type_wechat"},t.next=3,e.$http.post(e.$api.dictionarycombobox,a);case 3:n=t.sent,console.log(n,12221),"10000"==n.data.resultCode?e.wetchatTypeList=n.data.data:e.$message.error(n.data.resultMsg);case 6:case"end":return t.stop()}},t,e)}))()},getpage:function(){var e=this;return r()(o.a.mark(function t(){var a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.tabletype=!1,e.runpageparam.pageIndex=e.pagination.current,e.runpageparam.pageSize=e.pagination.pageSize,t.next=5,e.$http.post(e.$api.wechatpage,e.runpageparam);case 5:"10000"==(a=t.sent).data.resultCode?(e.tabledata=a.data.data.list,e.runpageparam.keyword="",e.runpageparam.parameterCode="",1==e.istotal.type&&(e.pagination.total=a.data.data.length),e.istotal.type++,e.tabletype=!0):e.$message.error(a.data.resultMsg);case 7:case"end":return t.stop()}},t,e)}))()},getremove:function(e){var t=this;return r()(o.a.mark(function a(){var n,i;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n={wechatConfigId:e.wechatConfigId},a.next=3,t.$http.post(t.$api.deleteByWechatAccountId,n);case 3:"10000"==(i=a.sent).data.resultCode?(t.$message.success(i.data.resultMsg),t.getpage(),t.visible=!1):t.$message.error(i.data.resultMsg);case 5:case"end":return a.stop()}},a,t)}))()},toadd:function(e){console.log(e,9899),this.$router.push({path:"/addwechat",query:{id:e.wechatConfigId}})},tosearch:function(){this.pagination.current=1,this.pagination.pageSize=10,this.istotal.type=1,this.getpage()},clear:function(){this.runpageparam.keyword="",this.runpageparam.statusCode=""},showdialogwechat:function(e){console.log(e,221212),this.removeparam.wechatConfigId=e.wechatConfigId,this.visible=!0},cancel:function(){this.visible=!1},confirm:function(){this.getremove()},handleCancel:function(e){console.log("Clicked cancel button"),this.visible=!1},handleTableChange:function(e){this.pagination.current=e.current,this.pagination.pageSize=e.pageSize,this.getpage()},handleChange:function(e){console.log("selected "+e),this.runpageparam.typeCode=e,console.log(this.runpageparam)},handleBlur:function(){console.log("blur")},handleFocus:function(){console.log("focus")},filterOption:function(e,t){return t.componentOptions.children[0].text.toLowerCase().indexOf(e.toLowerCase())>=0}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content2"},[a("div",{staticClass:"r_top flex_f"},[a("div",{staticClass:"r_t_text",on:{click:function(t){return e.showdialogwechat()}}},[e._v("微信帐号别名:")]),e._v(" "),a("a-input",{staticClass:"r_t_inp",attrs:{placeholder:"请输入微信帐号别名"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.tosearch()}},model:{value:e.runpageparam.keyword,callback:function(t){e.$set(e.runpageparam,"keyword",t)},expression:"runpageparam.keyword"}}),e._v(" "),a("div",{staticClass:"r_t_text",on:{click:function(t){return e.showdialogwechat()}}},[e._v("微信帐号类型:")]),e._v(" "),a("a-select",{staticStyle:{width:"200px","margin-right":"20px"},attrs:{"show-search":"",placeholder:"全部","option-filter-prop":"children","filter-option":e.filterOption},on:{focus:e.handleFocus,blur:e.handleBlur,change:e.handleChange},model:{value:e.runpageparam.statusCode,callback:function(t){e.$set(e.runpageparam,"statusCode",t)},expression:"runpageparam.statusCode"}},[a("a-select-option",{attrs:{value:""}},[e._v("全部")]),e._v(" "),e._l(e.wetchatTypeList,function(t,n){return a("a-select-option",{key:n,attrs:{value:t.comboBoxId}},[e._v(e._s(t.comboBoxName))])})],2),e._v(" "),a("div",{staticClass:"btn_blue btn",on:{click:function(t){return e.tosearch()}}},[e._v("查询")]),e._v(" "),a("div",{staticClass:"btn_gray",on:{click:function(t){return e.clear()}}},[e._v("清除")])],1),e._v(" "),a("div",{staticClass:"view-title-line"}),e._v(" "),a("div",{staticClass:"btn_blue btn2",on:{click:function(t){return e.toadd({})}}},[e._v("新增")]),e._v(" "),a("a-table",{attrs:{columns:e.tablecolumns,"data-source":e.tabledata,bordered:"",pagination:e.pagination,size:"small"},on:{change:e.handleTableChange},scopedSlots:e._u([{key:"wechatConfigId",fn:function(t,n,o){return a("div",{},[e._v(e._s(o+1+10*(e.pagination.current-1)))])}},{key:"edit",fn:function(t,n){return a("div",{staticClass:"flex_a"},[a("div",{staticClass:"col_blue ispointer",on:{click:function(t){return e.toadd(n)}}},[e._v("编辑")]),e._v(" "),a("a-popconfirm",{attrs:{title:"确定删除？","ok-text":"确定","cancel-text":"取消"},on:{confirm:function(t){return e.getremove(e.record)}}},[a("a",{staticStyle:{color:"#FF0000","font-size":"12px"},attrs:{href:"#"}},[e._v("删除")])])],1)}}])}),e._v(" "),e.visible?a("is-delete-dialogwechat",{on:{confirm:e.confirm,cancle:e.cancel}}):e._e()],1)},staticRenderFns:[]};var l=a("VU/8")(s,c,!1,function(e){a("ivLr")},"data-v-39bd21e4",null);t.default=l.exports},ivLr:function(e,t){}});
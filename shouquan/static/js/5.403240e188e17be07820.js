webpackJsonp([5],{"Q2+f":function(e,t){},bhiU:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),s=a("exGp"),r=a.n(s),o=a("c/w/"),l=a("qj7D"),d=a.n(l),c={components:{isDeleteDialog:a("wxRv").a},data:function(){return{isShowDelete:!1,keyword:"",dictionaryColumns:d.a.data.dictionaryColumns,menuList:[],pagination:{total:0,pageSize:10,showSizeChanger:!0,current:1,page:1,size:"default",pageSizeOptions:["10","20","50","100"],showTotal:function(e){return"共有 "+e+" 条数据"}},pageSize:20,pageIndex:1,parentItem:"",deleteItem:{}}},methods:{handleTableChange:function(e){this.pageSize=e.pageSize,this.pageIndex=e.current,this.pagination.page=e.current,this.pagination.current=e.current,this.pagination.pageSize=e.pageSize,this.getMenuData()},setMenuItem:function(e){this.parentItem=e,this.getMenuData()},cleanKeyWord:function(){this.keyword="",this.getMenuData()},getMenuData:function(){var e=this;return r()(i.a.mark(function t(){var a,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.pagination.total=0,a={keyword:e.keyword,parentId:e.parentItem.id,pageSize:e.pageSize,pageIndex:e.pageIndex},t.next=4,e.$http.post(e.$api.menupage,a);case 4:n=t.sent,console.log(n),"10000"==n.data.resultCode?(e.menuList=n.data.data.list,1==e.pagination.current&&(e.pagination.total=n.data.data.length)):e.menuList=[];case 7:case"end":return t.stop()}},t,e)}))()},confirm:function(){this.deletMenu(this.deleteItem)},cancel:function(){this.isShowDelete=!this.isShowDelete},showDelete:function(e){console.log(e),this.deleteItem=e,this.isShowDelete=!this.isShowDelete},deletMenu:function(e){var t=this;return r()(i.a.mark(function a(){var n,s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n={menuId:e.menuId},a.next=3,t.$http.post(t.$api.menuremove,n);case 3:"10000"==(s=a.sent).data.resultCode?(t.getMenuData(),t.isShowDelete=!t.isShowDelete,t.$message.success(s.data.resultMsg)):t.$message.error(s.data.resultMsg);case 5:case"end":return a.stop()}},a,t)}))()},editDictionary:function(e){console.log(e),this.$router.push({path:"/addsystem",query:{add:!1,grade:this.parentItem.levelType+1,id:e.menuId}})},add:function(){this.$router.push({path:"/addsystem",query:{add:!0,grade:this.parentItem.levelType+1,name:this.parentItem.name,id:this.parentItem.id}})}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"flexrow flexac flexsb",staticStyle:{"margin-bottom":"20px"}},[a("div",{staticClass:"flexrow flexac"},[a("div",{staticClass:"title_tx"},[e._v("菜单名称:")]),e._v(" "),a("a-input",{attrs:{maxLenght:"50",placeholder:"请输入菜单名称"},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}}),e._v(" "),a("a-button",{staticClass:"title_btn",attrs:{type:"primary"},on:{click:e.getMenuData}},[e._v("查询")]),e._v(" "),a("a-button",{on:{click:e.cleanKeyWord}},[e._v("清除")])],1),e._v(" "),a("a-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("新增")])],1),e._v(" "),a("a-table",{attrs:{scroll:{y:700},columns:e.dictionaryColumns,"data-source":e.menuList,bordered:"",size:"small",pagination:e.pagination},on:{change:e.handleTableChange},scopedSlots:e._u([{key:"index",fn:function(t,a,n){return[e._v("\n     "+e._s(n+1+10*(e.pagination.current-1))+"\n    ")]}},{key:"authFlag",fn:function(t,n,i){return[0==n.authFlag?a("div",[e._v("默认拥有类")]):e._e(),e._v(" "),1==n.authFlag?a("div",[e._v("系统配置类")]):e._e(),e._v(" "),2==n.authFlag?a("div",[e._v("客户授权类")]):e._e(),e._v(" "),2==n.authFlag?a("div",[e._v("均可操作类")]):e._e()]}},{key:"operation",fn:function(t,n){return[a("div",{staticClass:"flexrow flexac flexjc"},[a("a",{staticStyle:{color:"#FF0000","font-size":"12px"},attrs:{href:"#"},on:{click:function(t){return e.showDelete(n)}}},[e._v("删除")]),e._v(" "),a("div",{staticStyle:{height:"20px",width:"1px","background-color":"#e5e5e5","margin-left":"10px","margin-right":"10px"}}),e._v(" "),a("a",{staticStyle:{"font-size":"12px"},attrs:{href:"#"},on:{click:function(t){return e.editDictionary(n)}}},[e._v("编辑")])])]}}])}),e._v(" "),e.isShowDelete?a("is-delete-dialog",{on:{confirm:e.confirm,cancle:e.cancel}}):e._e()],1)},staticRenderFns:[]};var p=a("VU/8")(c,u,!1,function(e){a("lALw")},null,null).exports,h={components:{isLeft:o.a,isList:p},data:function(){return{showtree:!1,treedata:null,isselectdata:"",replaceFields:{title:"name",key:"id"},defaultExpandedKeys:[],data:""}},created:function(){this.getdictionarytree()},methods:{getdictionarytree:function(){var e=this;return r()(i.a.mark(function t(){var a,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.showtree=!1,a={},t.next=4,e.$http.post(e.$api.menutree,a);case 4:"10000"==(n=t.sent).data.resultCode&&(e.data=n.data.data),e.setdata(),e.showtree=!0,e.getselectdata(e.treedata[0]);case 9:case"end":return t.stop()}},t,e)}))()},toTree:function(e){var t=[];if(!Array.isArray(e))return t;e.forEach(function(e){delete e.children});var a={};return e.forEach(function(e){a[e.id]=e}),e.forEach(function(e){var n=a[e.pid];n?(n.children||(n.children=[])).push(e):t.push(e)}),t},setdata:function(){for(var e=0;e<this.data.length;e++)1==this.data[e].open&&this.defaultExpandedKeys.push(this.data[e].id);this.treedata=this.toTree(this.data)},getselectdata:function(e){e&&(this.isselectdata=e,this.$refs.menulist.setMenuItem(e))}}},f={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"administrativedivision flex_fs"},[t("div",{staticClass:"isleft"},[this.showtree?t("is-left",{attrs:{treedata:this.treedata,replaceFields:this.replaceFields,defaultExpandedKeys:this.defaultExpandedKeys},on:{selectdata:this.getselectdata}}):this._e()],1),this._v(" "),t("div",{staticClass:"flexcolumn",staticStyle:{width:"100%",padding:"20px"}},[t("is-list",{ref:"menulist"})],1)])},staticRenderFns:[]};var g=a("VU/8")(h,f,!1,function(e){a("Q2+f")},"data-v-b9319446",null);t.default=g.exports},lALw:function(e,t){},qj7D:function(e,t){e.exports={data:{dictionaryColumns:[{title:"序号",width:"80px",align:"center",ellipsis:!0,scopedSlots:{customRender:"index"}},{title:"菜单名称",align:"center",dataIndex:"menuName",ellipsis:!0},{title:"菜单类型",align:"center",dataIndex:"menuTypeName",ellipsis:!0},{title:"菜单等级",align:"center",dataIndex:"grade",ellipsis:!0},{title:"上级名称",align:"center",dataIndex:"parentName",ellipsis:!0},{title:"授权类型",align:"center",dataIndex:"authFlag",ellipsis:!0,scopedSlots:{customRender:"authFlag"}},{title:"菜单图标",align:"center",dataIndex:"menuIcon",ellipsis:!0},{title:"操作",align:"center",width:"160px",scopedSlots:{customRender:"operation"}}],adddictionaryColumns:[{title:"接口名称",dataIndex:"actionName",width:"25%",align:"center",scopedSlots:{customRender:"actionName"}},{title:"URL地址",dataIndex:"linkURL",width:"25%",align:"center",scopedSlots:{customRender:"linkURL"}},{title:"是否默认",dataIndex:"defaultFlag",width:"25%",align:"center",scopedSlots:{customRender:"defaultFlag"}},{title:"编辑",dataIndex:"operation",width:"25%",align:"center",scopedSlots:{customRender:"operation"}}]}}}});
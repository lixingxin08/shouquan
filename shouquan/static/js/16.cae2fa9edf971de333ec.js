webpackJsonp([16],{TpsG:function(t,e){},YKqD:function(t,e){},x7ds:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Xxa5"),s=a.n(i),n=a("exGp"),o=a.n(n),c={data:function(){return{statusCode:[{id:1,val:"正常"},{id:0,val:"休假"},{id:2,val:"离岗"}],pagination:{total:0,pageSize:10,showSizeChanger:!0,current:1,page:1,pageSizeOptions:["10","20","50","100"],showTotal:function(t){return"共有 "+t+" 条数据"}},tablecolumns:[{align:"center",title:"序号",width:10,dataIndex:"departmentId",ellipsis:!0},{align:"center",title:"账号名称",width:10,dataIndex:"realName",ellipsis:!0,scopedSlots:{customRender:"realName"}},{align:"center",title:"姓名",width:10,dataIndex:"gender",ellipsis:!0,scopedSlots:{customRender:"gender"}},{align:"center",title:"手机号码",width:10,dataIndex:"mobilePhone",ellipsis:!0},{width:10,align:"center",title:"账号状态",dataIndex:"statusCode",ellipsis:!0,scopedSlots:{customRender:"statusCode"}}],tabledata:"",pageparam:{keyword:"",statusCode:""},selectId:"",istotal:{type:1}}},methods:{setSelectId:function(t){this.selectId=t},getpersonpage:function(){var t=this;return o()(s.a.mark(function e(){var a,i;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.tabletype=!1,a={departmentId:t.selectId,keyword:t.pageparam.keyword,statusCode:t.pageparam.statusCode,pageIndex:t.pagination.page,pageSize:t.pagination.pageSize},e.next=4,t.$http.post(t.$api.personpage,a);case 4:"10000"==(i=e.sent).data.resultCode?(t.tabledata=i.data.data.list,1==t.pagination.current&&(t.pagination.total=i.data.data.length),t.istotal.type++,t.tabletype=!0):(t.tabletype=!1,t.$message.success(i.data.resultMsg));case 6:case"end":return e.stop()}},e,t)}))()},closedialogchoose:function(){this.$emit("cancleDialog")},handleTableChange:function(t){this.pagination.page=t.current,this.pagination.current=t.current,this.pagination.pageSize=t.pageSize,this.getpersonpage()},tosearch:function(){this.istotal.type=1,this.pagination.page=1,this.pagination.pageSize=10,this.isselectdata.id="",this.getpersonpage()},clear:function(){this.pageparam.keyword="",this.pageparam.statusCode=""},handleChange:function(t){this.pageparam.statusCode=t},chooseItem:function(t){this.$emit("confirm",t)}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ps_ab"},[a("div",{staticClass:"ps_flex",staticStyle:{padding:"0px","border-radius":"10px",width:"auto"}},[a("div",{staticClass:"dialogchoose-title flexrow flexac flexsb"},[t._v("选择关联人员\n      "),a("a-icon",{attrs:{type:"close"},on:{click:t.closedialogchoose}})],1),t._v(" "),a("div",{staticClass:"r_top flex_f",staticStyle:{padding:"20px"}},[a("div",{staticClass:"r_t_text"},[t._v("人员姓名/手机号码:")]),t._v(" "),a("a-input",{staticClass:"r_t_inp",attrs:{placeholder:"请输入人员姓名/手机号码"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.tosearch()}},model:{value:t.pageparam.keyword,callback:function(e){t.$set(t.pageparam,"keyword",e)},expression:"pageparam.keyword"}}),t._v(" "),a("div",{staticClass:"r_t_text"},[t._v("人员状态:")]),t._v(" "),a("a-select",{staticStyle:{width:"200px","margin-right":"20px",height:"36px","border-radius":"8px"},attrs:{"show-search":"",placeholder:"全部","option-filter-prop":"children"},on:{change:t.handleChange},model:{value:t.pageparam.statusCode,callback:function(e){t.$set(t.pageparam,"statusCode",e)},expression:"pageparam.statusCode"}},[a("a-select-option",{attrs:{value:""}},[t._v("全部")]),t._v(" "),t._l(t.statusCode,function(e,i){return a("a-select-option",{key:i,attrs:{value:e.id}},[t._v(t._s(e.val))])})],2),t._v(" "),a("div",{staticClass:"btn_blue btn",on:{click:function(e){return t.tosearch()}}},[t._v("查询")]),t._v(" "),a("div",{staticClass:"btn_gray",on:{click:function(e){return t.clear()}}},[t._v("清除")])],1),t._v(" "),t.tabledata.length>0?a("div",{staticClass:"table"},[a("a-table",{staticStyle:{margin:"20px"},attrs:{scroll:{x:700},columns:t.tablecolumns,"data-source":t.tabledata,bordered:"",pagination:t.pagination,size:"small"},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"gender",fn:function(e){return a("div",{staticClass:"flex_a"},[a("div",1==e?[t._v("男")]:[t._v("女")])])}},{key:"realName",fn:function(e,i){return a("div",{staticClass:"flex_a",on:{click:function(e){return t.chooseItem(i)}}},[a("a",[t._v(t._s(i.realName))])])}},{key:"statusCode",fn:function(e){return a("div",{staticClass:"flex_a"},[1==e?a("div",[t._v("正常")]):t._e(),t._v(" "),0==e?a("div",[t._v("休假")]):t._e(),t._v(" "),2==e?a("div",[t._v("离岗")]):t._e()])}}],null,!1,1556079272)})],1):a("div",{staticStyle:{height:"100px","font-size":"22px","font-weight":"500","margin-top":"40px"}},[t._v("\n      暂无人员可以关联\n    ")])])])},staticRenderFns:[]};var l=[{name:"正常",key:1},{name:"锁定",key:2}],d={components:{isChooseAccount:a("VU/8")(c,r,!1,function(t){a("YKqD")},null,null).exports},data:function(){return{plainOptions:l,selectId:"",accountid:"",selectName:"",config:{statusCode:1},num:0,isShow:!1,tableList:[],tableTitle:[{title:"序号",width:"80px",align:"center",ellipsis:!0,scopedSlots:{customRender:"index"}},{title:"角色名称",align:"center",dataIndex:"roleName",ellipsis:!0},{title:"角色描述",align:"center",dataIndex:"remark",ellipsis:!0}],selectedRowKeys:[]}},created:function(){this.selectId=this.$route.query.id,this.accountid=this.$route.query.accountid,this.selectName=this.$route.query.name,this.accountid?this.getAccountDetail():this.getRoles()},methods:{confirm:function(t){this.config=t,this.config.personStatus=t.statusCode,this.isShow=!1},submit:function(){var t=this;return o()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.config.realName){e.next=3;break}return t.$message.error("请关联人员"),e.abrupt("return");case 3:if(t.config.userName){e.next=6;break}return t.$message.error("请输入账号名称"),e.abrupt("return");case 6:if(!(t.config.userName.length<5)){e.next=9;break}return t.$message.error("账号长度要求5-11位"),e.abrupt("return");case 9:if(t.accountid){e.next=19;break}if(t.config.cipher&&t.config.cipher2){e.next=13;break}return t.$message.error("请输入密码"),e.abrupt("return");case 13:if(!(t.config.cipher.length<5||t.config.cipher2.length<5)){e.next=16;break}return t.$message.error("密码格式不对"),e.abrupt("return");case 16:if(t.config.cipher==t.config.cipher2){e.next=19;break}return t.$message.error("两次密码不一致"),e.abrupt("return");case 19:if(!(t.selectedRowKeys.length<=0)){e.next=22;break}return t.$message.error("请关联角色"),e.abrupt("return");case 22:return t.config.operatorId="5172dadd6d7c404e8ac657f32f81d969",t.config.roleList=t.getRolesId(),e.next=26,t.$http.post(t.$api.accountinfoform,t.config);case 26:1e4==(a=e.sent).data.resultCode?(t.$message.success(a.data.resultMsg),t.$router.go(-1)):t.$message.error(a.data.resultMsg);case 28:case"end":return e.stop()}},e,t)}))()},reset:function(){this.accountid?this.getAccountDetail():(this.config={},this.selectedRowKeys={})},getRolesId:function(){var t=this,e=[];return this.selectedRowKeys.forEach(function(a){e.push(t.tableList[a].roleId)}),e},cancle:function(){this.isShow=!1},chooseAccount:function(){this.isShow=!0,this.$refs.ca.setSelectId(this.selectId),this.$refs.ca.getpersonpage()},onChangeConfig:function(t){this.num=this.config.remark.length},onSelectChange:function(t){this.selectedRowKeys=t},onChange:function(t){this.config.statusCode=t.target.value},getAccountDetail:function(){var t=this;return o()(s.a.mark(function e(){var a,i,n,o,c;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={accountId:t.accountid},e.next=3,t.$http.post(t.$api.accountinfodetail,a);case 3:if(1e4!=(i=e.sent).data.resultCode){e.next=15;break}return n={},n=i.data.data,t.tableList=i.data.data.roleList,o={personId:n.personId},e.next=11,t.$http.post(t.$api.persondetail,o);case 11:1e4==(c=e.sent).data.resultCode&&(n.personStatus=c.data.data.statusCode,n.email=c.data.data.email,n.gender=c.data.data.gender,n.position=c.data.data.position),t.config=n,t.tableList.forEach(function(e,a){e.select&&t.selectedRowKeys.push(a)});case 15:case"end":return e.stop()}},e,t)}))()},getRoles:function(){var t=this;return o()(s.a.mark(function e(){var a,i;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={pageIndex:1,pageSize:100},e.next=3,t.$http.post(t.$api.rolesystemlist,a);case 3:1e4==(i=e.sent).data.resultCode&&(t.tableList=i.data.data.list);case 5:case"end":return e.stop()}},e,t)}))()}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flexcolumn",staticStyle:{"background-color":"#FFFFFF"}},[a("div",{staticStyle:{margin:"0 auto"}},[a("div",{staticClass:"flexrow flexac edit_item_zzx"},[t._m(0),t._v(" "),a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:"请选择人员"},model:{value:t.config.realName,callback:function(e){t.$set(t.config,"realName",e)},expression:"config.realName"}}),t._v(" "),a("a-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.chooseAccount}},[t._v("选择人员")])],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item_zzx"},[a("div",{staticClass:"edit_item_zzx_title2_zzx"},[t._v("所属部门:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:t.config.realName?"无":"请选择人员"},model:{value:t.config.departmentName,callback:function(e){t.$set(t.config,"departmentName",e)},expression:"config.departmentName"}})],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item_zzx"},[a("div",{staticClass:"edit_item_zzx_title2_zzx"},[t._v("人员性别:")]),t._v(" "),t.config.realName?a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:t.config.realName?"无":"请选择人员"},model:{value:1==t.config.gender?"男":"女",callback:function(e){t.$set(t.config,"gender==1?'男':'女'",e)},expression:"config.gender==1?'男':'女'"}}):a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:"请选择人员"}})],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item_zzx"},[a("div",{staticClass:"edit_item_zzx_title2_zzx"},[t._v("手机号码:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:t.config.realName?"无":"请选择人员"},model:{value:t.config.mobilePhone,callback:function(e){t.$set(t.config,"mobilePhone",e)},expression:"config.mobilePhone"}})],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item_zzx"},[a("div",{staticClass:"edit_item_zzx_title2_zzx"},[t._v("电子邮箱:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:t.config.realName?"无":"请选择人员"},model:{value:t.config.email,callback:function(e){t.$set(t.config,"email",e)},expression:"config.email"}})],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item_zzx"},[a("div",{staticClass:"edit_item_zzx_title2_zzx"},[t._v("人员状态:")]),t._v(" "),t.config.realName?t._e():a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:"请选择人员"}}),t._v(" "),0==t.config.personStatus&&t.config.realName?a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:"休假"}}):t._e(),t._v(" "),1==t.config.personStatus&&t.config.realName?a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:"正常"}}):t._e(),t._v(" "),2==t.config.personStatus&&t.config.realName?a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:"离岗"}}):t._e()],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item_zzx"},[a("div",{staticClass:"edit_item_zzx_title2_zzx"},[t._v("岗位职务:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input_zzx",attrs:{disabled:!0,placeholder:t.config.realName?"无岗位职务":"请选择人员"},model:{value:t.config.position,callback:function(e){t.$set(t.config,"position",e)},expression:"config.position"}})],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item_zzx"},[t._m(1),t._v(" "),a("a-input",{staticClass:"edit_a_input_zzx",attrs:{placeholder:"5-11位，支持英文和数字，字母区分大小写"},model:{value:t.config.userName,callback:function(e){t.$set(t.config,"userName",e)},expression:"config.userName"}})],1),t._v(" "),t.accountid?t._e():a("div",{staticClass:"flexrow flexac edit_item_zzx"},[t._m(2),t._v(" "),a("a-input-password",{staticClass:"edit_a_input_zzx",attrs:{placeholder:"6-16位，须包含数字、字母和符号，区分大小写"},model:{value:t.config.cipher,callback:function(e){t.$set(t.config,"cipher",e)},expression:"config.cipher"}})],1),t._v(" "),t.accountid?t._e():a("div",{staticClass:"flexrow flexac edit_item_zzx"},[t._m(3),t._v(" "),a("a-input-password",{staticClass:"edit_a_input_zzx",attrs:{placeholder:"6-16位，须包含数字、字母和符号，区分大小写"},model:{value:t.config.cipher2,callback:function(e){t.$set(t.config,"cipher2",e)},expression:"config.cipher2"}})],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item_zzx"},[t._m(4),t._v(" "),a("a-radio-group",{on:{change:t.onChange},model:{value:t.config.statusCode,callback:function(e){t.$set(t.config,"statusCode",e)},expression:"config.statusCode"}},t._l(t.plainOptions,function(e,i){return a("a-radio",{key:i,attrs:{value:e.key}},[t._v("\n          "+t._s(e.name)+"\n        ")])}),1)],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item_zzx"},[a("div",{staticClass:"edit_item_zzx_title2_zzx"},[t._v("账号描述:")]),t._v(" "),a("div",{staticStyle:{position:"relative"}},[a("a-textarea",{staticClass:"edit_a_input_zzx",attrs:{rows:5,maxLength:250,placeholder:"500字以内，格式不限制"},on:{change:t.onChangeConfig},model:{value:t.config.remark,callback:function(e){t.$set(t.config,"remark",e)},expression:"config.remark"}}),t._v(" "),a("div",{staticClass:"edit_number_zzx"},[t._v(t._s(t.num)+"/250")])],1)]),t._v(" "),t._m(5),t._v(" "),a("a-table",{staticStyle:{width:"447px","margin-left":"130px"},attrs:{columns:t.tableTitle,"data-source":t.tableList,pagination:!1,bordered:!0,size:"small","row-selection":{selectedRowKeys:t.selectedRowKeys,onChange:t.onSelectChange}},scopedSlots:t._u([{key:"index",fn:function(e,a,i){return[t._v("\n        "+t._s(i+1)+"\n      ")]}}])}),t._v(" "),a("div",{staticClass:"flexrow flexjc",staticStyle:{"margin-top":"40px","margin-bottom":"100px"}},[a("a-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("保存")]),t._v(" "),a("a-button",{staticStyle:{"margin-left":"20px"},on:{click:t.reset}},[t._v("重置")])],1)],1),t._v(" "),a("is-choose-account",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],ref:"ca",on:{confirm:t.confirm,cancleDialog:t.cancle}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_zzx_title2_zzx"},[e("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("关联人员姓名:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_zzx_title2_zzx"},[e("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("账号名称:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_zzx_title2_zzx"},[e("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("账号密码:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_zzx_title2_zzx"},[e("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("确认密码:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_zzx_title2_zzx"},[e("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("账号状态:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flexrow edit_item_zzx_title2_zzx",staticStyle:{width:"100%","margin-left":"50px","margin-top":"40px","justify-item":"flex-start","margin-bottom":"10px","font-size":"16px"}},[e("a",{staticStyle:{color:"#FF0000"}},[this._v("*")]),this._v("分配角色")])}]};var p=a("VU/8")(d,u,!1,function(t){a("TpsG")},null,null);e.default=p.exports}});
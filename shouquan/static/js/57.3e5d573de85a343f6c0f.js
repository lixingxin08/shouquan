webpackJsonp([57],{aj3T:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Xxa5"),r=a.n(i),n=a("exGp"),s=a.n(n),o=a("+aT9"),l=a.n(o),c={inject:["reload"],data:function(){return{visible:!1,inttype:!0,inp_data:"",lng:[116.397428,39.90923],city:"",markertype:!1,marker:"",form:{areaId:"",areaName:"",levelType:"",position:"",remark:"",parentId:"",parentName:"",operatorId:1},areadetailprame:{areaId:"",keyword:"",latitude:0,list:[{}],longitude:0,pageIndex:0,pageSize:0,parentId:"",remark:"",searchIndex:0}}},created:function(){"add"==this.$route.query.type&&(this.form.parentId=this.$route.query.id,this.form.parentName=this.$route.query.name),"edit"==this.$route.query.type&&(this.areadetailprame.areaId=this.$route.query.id,this.getareadetail())},methods:{getareadetail:function(){var t=this;return s()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post(t.$api.areadetail,t.areadetailprame);case 2:"10000"==(a=e.sent).data.resultCode?t.form=a.data.data:t.$message.error(a.data.resultMsg),console.log(a,8888);case 5:case"end":return e.stop()}},e,t)}))()},getareaform:function(){var t=this;return s()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!=t.form.areaName){e.next=2;break}return e.abrupt("return",t.$message.error("请输入区划名称"));case 2:if(""!=t.form.position){e.next=4;break}return e.abrupt("return",t.$message.error("请输入地图位置"));case 4:return t.form.operatorId="1",e.next=7,t.$http.post(t.$api.areaform,t.form);case 7:"10000"==(a=e.sent).data.resultCode?(t.$message.success(a.data.resultMsg),t.$router.go(-1)):t.$message.error(a.data.resultMsg);case 9:case"end":return e.stop()}},e,t)}))()},define:function(){if(""==this.form.position)return this.$message.error("请选择地图位置");this.visible=!1},cancel:function(){this.visible=!1,this.form.position=""},showdialogadminadd:function(){var t=this;this.visible=!0,this.$nextTick(function(){t.init()})},init:function(){var t=this;console.log(this.lng,222);var e=new l.a.Map("map-container",{zoom:13,center:t.lng,viewMode:"3D"});e.plugin(["AMap.ToolBar","AMap.MapType","AMap.Geolocation"],function(){e.addControl(new l.a.ToolBar),e.addControl(new l.a.MapType({showTraffic:!1,showRoad:!1}));var a=new l.a.Geolocation({enableHighAccuracy:!0,showButton:!0,buttonPosition:"LB",buttonOffset:new l.a.Pixel(10,20),showMarker:!0,showCircle:!1,circleOptions:{strokeColor:"#0093FF",noSelect:!0,strokeOpacity:.5,strokeWeight:1,fillColor:"#02B0FF",fillOpacity:.25},zoomToAccuracy:!0,timeout:1e4});e.addControl(a),l.a.event.addListener(a,"complete",t.onComplete),l.a.event.addListener(a,"error",t.onError),console.log(a,2222),1==t.inttype&&a.getCurrentPosition()}),e.on("click",function(a){console.log(a,112),1==t.markertype&&e.remove(t.marker),t.form.position=a.lnglat.lng+","+a.lnglat.lat,t.marker=new l.a.Marker({position:new l.a.LngLat(a.lnglat.lng,a.lnglat.lat),offset:new l.a.Pixel(-10,-10),icon:"//vdata.amap.com/icons/b18/1/2.png"}),t.$message.success("当前经纬度为"+t.form.position),e.add(t.marker),t.markertype=!0})},getLatLngLocation:function(){var t=this;if(""==this.city)return this.$message.error("请先输入位置名称");this.inttype=!1;var e=this;(new l.a.Geocoder).getLocation(e.city,function(a,i){if("complete"===a&&i.geocodes.length){console.log(i);var r=i.geocodes[0].location;e.lng[1]=r.lat,e.lng[0]=r.lng,e.form.position=r.lng+","+r.lat,t.init()}else console.log(i)})},reset:function(){this.reload()},onComplete:function(t){console.log(t,"onComplete ")},onError:function(t){console.log(t,"onError ")}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"isedit"},[a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[t._v("上级区域:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{disabled:""},model:{value:t.form.parentName,callback:function(e){t.$set(t.form,"parentName",e)},expression:"form.parentName"}}),t._v(" "),a("div",{staticClass:"edit_item_toast"},[t._v("注：不可选")])],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[t._v("区划等级:")]),t._v(" "),a("a-input",{staticClass:"edit_a_input",model:{value:t.form.levelType,callback:function(e){t.$set(t.form,"levelType",e)},expression:"form.levelType"}}),t._v(" "),a("div",{staticClass:"edit_item_toast"},[t._v("注：不可选")])],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[t._m(0),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{placeholder:"2-16个中文汉字组合"},model:{value:t.form.areaName,callback:function(e){t.$set(t.form,"areaName",e)},expression:"form.areaName"}})],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[t._m(1),t._v(" "),a("a-input",{staticClass:"edit_a_input",attrs:{placeholder:"在地图定位后获取"},model:{value:t.form.position,callback:function(e){t.$set(t.form,"position",e)},expression:"form.position"}}),t._v(" "),a("div",{staticClass:"edit_item_toast btn_blue mapbtn",on:{click:function(e){return t.showdialogadminadd()}}},[a("a-icon",{attrs:{type:"environment"}}),t._v("地图定位\n    ")],1)],1),t._v(" "),a("div",{staticClass:"flexrow flexac edit_item"},[a("div",{staticClass:"edit_item_title"},[t._v("备注:")]),t._v(" "),a("div",{staticStyle:{position:"relative"}},[a("a-textarea",{staticClass:"edit_a_input",attrs:{rows:5,placeholder:"格式不限制，256个字符以内，包含标点符号"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}}),t._v(" "),a("div",{staticClass:"edit_number"},[t._v("0/256")])],1),t._v(" "),a("div",{staticClass:"edit_item_toast"},[t._v("注：不可选")])]),t._v(" "),a("div",{staticClass:"flexrow",staticStyle:{"margin-top":"30px","justify-item":"flex-start","margin-left":"325px"}},[a("a-button",{on:{click:function(e){return t.getareaform()}}},[t._v("保存")]),t._v(" "),a("a-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:function(e){return t.reset()}}},[t._v("重置")])],1),t._v(" "),t.visible?a("div",{staticClass:"dialogadminadd"},[a("div",{staticClass:"dialogadminadd_t flex_b"},[a("div",[t._v("地理位置")]),t._v(" "),a("div",{on:{click:function(e){return t.cancel()}}},[a("a-icon",{attrs:{type:"close"}})],1)]),t._v(" "),a("div",{staticClass:"dialogadminadd_c"},[a("div",{staticClass:"flex_f dialogadminadd_c_t"},[a("div",[a("a-input",{staticClass:"dialogadminadd_inp",attrs:{placeholder:"输入位置名称",id:"searinp"},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}})],1),t._v(" "),a("div",{staticClass:"edit_item_toast btn_blue mapbtn",on:{click:function(e){return t.getLatLngLocation()}}},[a("a-icon",{attrs:{type:"environment"}}),t._v("地图定位\n        ")],1)]),t._v(" "),a("div",{staticClass:"map",attrs:{id:"map-container"}})]),t._v(" "),a("div",{staticClass:"dialogadminadd_f flex_a"},[a("div",{staticClass:"flex_f"},[a("div",{staticClass:"ok_btn",on:{click:function(e){return t.define()}}},[t._v("确定")]),t._v(" "),a("div",{staticClass:"cancel_btn",on:{click:function(e){return t.cancel()}}},[t._v("取消")])])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_title"},[e("span",{staticClass:"col_red"},[this._v("*")]),this._v("区划名称:\n    ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"edit_item_title"},[e("span",{staticClass:"col_red"},[this._v("*")]),this._v("地图位置:\n    ")])}]};var m=a("VU/8")(c,d,!1,function(t){a("zvUU")},null,null);e.default=m.exports},zvUU:function(t,e){}});
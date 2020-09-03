<template>
  <div class="isedit">
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">上级区域:</div>
      <a-input class="edit_a_input" v-model="form.parentName" disabled />
      <div class="edit_item_toast">注：不可选</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">区划等级:</div>
      <a-input class="edit_a_input" v-model="form.levelType"  />
      <div class="edit_item_toast">注：不可选</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>区划名称:
      </div>
      <a-input class="edit_a_input" placeholder="2-16个中文汉字组合" v-model="form.areaName" />
      <!-- <div class="edit_item_toast">注：区划名字不超过30个字</div> -->
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>地图位置:
      </div>
      <a-input class="edit_a_input" v-model="form.position" placeholder="在地图定位后获取" />
      <div class="edit_item_toast btn_blue mapbtn" @click="showdialog()">
        <a-icon type="environment"></a-icon>地图定位
      </div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">备注:</div>
      <div style="position: relative;">
        <a-textarea
          class="edit_a_input"
          :rows="5"
          placeholder="格式不限制，256个字符以内，包含标点符号"
          v-model="form.remark"
        />
        <div class="edit_number">0/256</div>
      </div>
      <div class="edit_item_toast">注：不可选</div>
    </div>
    <div class="flexrow" style="margin-top: 30px;justify-item: flex-start;margin-left: 325px;">
      <a-button @click="getareaform()">保存</a-button>
      <a-button type="primary" style="margin-left: 20px;" @click="reset()">重置</a-button>
    </div>

    <div class="dialog" v-if="visible">
      <div class="dialog_t flex_b">
        <div>地理位置</div>
        <div @click="cancel()">
          <a-icon type="close" />
        </div>
      </div>
      <div class="dialog_c">
        <div class="flex_f dialog_c_t">
          <div>
            <a-input placeholder="输入位置名称" id="searinp" class="dialog_inp" v-model="city" />
          </div>
          <div class="edit_item_toast btn_blue mapbtn" @click="getLatLngLocation()">
            <a-icon type="environment"></a-icon>地图定位
          </div>
        </div>
        <div id="map-container" class="map"></div>
      </div>
      <div class="dialog_f flex_a">
        <div class="flex_f">
          <div class="ok_btn" @click="define()">确定</div>
          <div class="cancel_btn" @click="cancel()">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  data() {
    return {
      visible: false,
      inttype: true,
      inp_data: "",
      lng: [116.397428, 39.90923],
      city: "",
      markertype: false,
      marker: "",
      form:{
        areaId: "",
        areaName: "",
        levelType: "",
        position: "",
        remark: "",
        parentId: "",
        parentName: "",
        operatorId:1
      },
      areadetailprame: {
        //行政区划详情接口参数
        areaId: "",
        keyword: "",
        latitude: 0,
        list: [{}],
        longitude: 0,
        pageIndex: 0,
        pageSize: 0,
        parentId: "",
        remark: "",
        searchIndex: 0,
      },
    };
  },
  created() {
    if (this.$route.query.type == "add") {
      this.form.parentId = this.$route.query.id;
      this.form.parentName = this.$route.query.name;
    }
    if (this.$route.query.type == "edit") {
      this.areadetailprame.areaId = this.$route.query.id;
      this.getareadetail();
    }
  },
  methods: {
    //行政区划详情接口
    async getareadetail() {
      let res = await this.$http.post(
        this.$api.areadetail,
        this.areadetailprame
      );
      if (res.data.resultCode == "10000") {
        this.form = res.data.data;
      } else {
        this.$message.error(res.data.resultMsg);
      }
      console.log(res, 8888);
    },
        //行政区划表单接口
    async getareaform() {
      if (this.form.areaName=="") {
        return  this.$message.error("请输入区划名称")
      }
      if (this.form.position=="") {
        return  this.$message.error("请输入地图位置")
      }
      this.form.operatorId="1"
      let res = await this.$http.post(this.$api.areaform, this.form);
      if (res.data.resultCode == "10000") {
         this.$message.success(res.data.resultMsg);
            this.$router.go(-1)
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    define() {
      if (this.form.position == "") {
        return this.$message.error("请选择地图位置");
      } else {
      this.visible = false;
      }
    },
    cancel() {
      this.visible = false;
      this.form.position = "";
    },
    showdialog() {
      this.visible = true;
      this.$nextTick(() => {
        this.init();
      });
    },
    //地图
    init() {
      let _that = this;
      console.log(this.lng, 222);
      const map = new AMap.Map("map-container", {
        zoom: 13,
        center: _that.lng,
        viewMode: "3D",
      });
      map.plugin(
        ["AMap.ToolBar", "AMap.MapType", "AMap.Geolocation"],
        function () {
          map.addControl(new AMap.ToolBar());
          map.addControl(
            new AMap.MapType({ showTraffic: false, showRoad: false })
          );
          const geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            showButton: true, // 是否显示定位按钮
            buttonPosition: "LB", // 定位按钮的位置
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮距离对应角落的距离
            showMarker: true, // 是否显示定位点
            showCircle: false, // 是否显示定位精度圈
            circleOptions: {
              // 定位精度圈的样式
              strokeColor: "#0093FF",
              noSelect: true,
              strokeOpacity: 0.5,
              strokeWeight: 1,
              fillColor: "#02B0FF",
              fillOpacity: 0.25,
            },
            zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
          });

          // 把定位插件加入地图实例
          map.addControl(geolocation);

          // 添加地图全局定位事件
          AMap.event.addListener(geolocation, "complete", _that.onComplete); //返回定位信息
          AMap.event.addListener(geolocation, "error", _that.onError); //返回定位出错信息
          console.log(geolocation, 2222);
          // 调用定位
          if (_that.inttype == true) {
            geolocation.getCurrentPosition();
          }
        }
      );
      map.on("click", function (params) {
        console.log(params, 112);
        if (_that.markertype == true) {
          map.remove(_that.marker);
        }
        _that.form.position = params.lnglat.lng + "," + params.lnglat.lat;
        _that.marker = new AMap.Marker({
          position: new AMap.LngLat(params.lnglat.lng, params.lnglat.lat),
          offset: new AMap.Pixel(-10, -10),
          icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
        });
        _that.$message.success(
          "当前经纬度为" + _that.form.position
        );
        map.add(_that.marker);
        _that.markertype = true;
      });
    },
    getLatLngLocation() {
      if (this.city == "") {
        return this.$message.error("请先输入位置名称");
      }
      this.inttype = false;
      let _that = this;
      let geocoder = new AMap.Geocoder();
      geocoder.getLocation(_that.city, (status, result) => {
        if (status === "complete" && result.geocodes.length) {
          console.log(result);
          const lnglat = result.geocodes[0].location;
          _that.lng[1] = lnglat.lat;
          _that.lng[0] = lnglat.lng;
          _that.form.position = lnglat.lng + "," + lnglat.lat;
          this.init();
        } else {
          console.log(result);
        }
      });
    },
    reset(){
      this.form={
         areaId: "",
        areaName: "",
        levelType: "",
        position: "",
        remark: "",
        parentId: "",
        parentName: "",
        operatorId:1
      }
    },

    onComplete(e) {
      console.log(e, "onComplete ");
    },
    onError(e) {
      console.log(e, "onError ");
    },
  },
};
</script>
<style>
.edit_item_title {
  width: 315px;
  text-align: right;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  margin-right: 10px;
  text-align: right;
  color: #000000;
  flex-shrink: 0;
}

.edit_item {
  margin-top: 24px;
}

.edit_item_toast {
  font-size: 12px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #999999;
  margin-left: 20px;
}

.edit_a_input {
  width: 667px;
  height: 32px;
}

.edit_number {
  position: absolute;
  right: 10px;
  bottom: 3px;
  font-size: 14px;
  color: #999999;
}
.mapbtn {
  width: 100px;
  color: #fff;
  text-align: center;
}

.dialog {
  width: 920px;
  height: 810px;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  border-radius: 8px;
  background-color: #fff;
  z-index: 2;
}
.dialog_t {
  width: 920px;
  height: 72px;
  background-color: #1890ff;
  color: #fff;
  font-size: 24px;
  padding: 0 40px;
}
.dialog_c {
  width: 920px;
  height: 554px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
  z-index: 3;
  padding: 0 40px;
}
.dialog_c_t {
  height: 32px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.dialog_inp {
  width: 744px;
  height: 32px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}
.map {
  width: 840px;
  height: 472px;
}
.dialog_f {
  margin-top: 40px;
}
</style>

<template>
  <div class="isedit">
    <div class="toggle flex_f">
      <div class="ok_btn">消息帐号</div>
      <div class="ok_btn">消息模板</div>
    </div>
    <div v-if="toggletype">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">
          <span class="col_red">*</span>短信帐号别名:
        </div>
        <a-input
          class="edit_a_input"
          :maxlength="50"
          v-model="form.smsConfigName"
          placeholder="请输入短信帐号别名"
        />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">
          <span class="col_red">*</span>帐号应用标识:
        </div>
        <a-textarea
          class="edit_a_input"
          :rows="5"
          placeholder="500字以内，格式不限制"
          v-model="form.smsAppId"
        />
      </div>

      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">
          <span class="col_red">*</span>帐号应用密钥:
        </div>
        <a-textarea
          class="edit_a_input"
          :rows="5"
          placeholder="500字以内，格式不限制"
          v-model="form.smsKey"
        />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">
          <span class="col_red">*</span>短信签名:
        </div>
        <a-input class="edit_a_input" v-model="form.signName" placeholder="请输入短信签名" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">
          <span class="col_red">*</span>短信价格:
        </div>
        <a-input class="edit_a_input" v-model="form.price" placeholder="请输入短信价格" />
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">
          <span class="col_red">*</span>网关类型:
        </div>
        <a-select
          show-search
          placeholder="全部"
          option-filter-prop="children"
          style="width: 667px;margin-right:20px"
          v-model="form.typeCode"
          :filter-option="filterOption"
          @change="handleChange2"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in sel_data"
            :key="index"
            :value="item.id"
          >{{item.val}}</a-select-option>
        </a-select>
      </div>

      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">备注信息:</div>
        <div style="position: relative;">
          <a-textarea
            class="edit_a_input"
            :rows="5"
            placeholder="500字以内，格式不限制"
            v-model="form.remark"
          />
        </div>
      </div>
      <div class="flexrow" style="margin-top: 30px;justify-item: flex-start;margin-left: 325px;">
        <a-button @click="getform()">保存</a-button>
        <a-button type="primary" style="margin-left: 20px;" @click="reset()">重置</a-button>
      </div>
    </div>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      loading: false,
      toggletype: true,
      imageUrl: "",
      sel_data: [
        { val: "启用", id: 1 },
        { val: "备用", id: 2 },
        { val: "关闭", id: 0 },
      ],
      form: {
        smsConfigId: "",
        smsConfigName: "",
        smsAppId: "",
        smsKey: "",
        signName: "",
        price: "",
        typeCode: "",
        remark: "",
        operatorId: "1",
      },
      detailparam: {
        customerId: "",
      },
    };
  },
  created() {
    if (this.$route.query.type == "add") {
      this.form.parentName = this.$route.query.name;
      this.form.parentId = this.$route.query.id;
      this.form.gradeno = this.$route.query.levelType;
    }
    if (this.$route.query.type == "edit") {
      this.detailparam.customerId = this.$route.query.id;
      this.getdetail();
    }
  },
  methods: {
    //详情接口
    async getdetail() {
      let res = await this.$http.post(
        this.$api.informationdetail,
        this.detailparam
      );
      if (res.data.resultCode == "10000") {
        this.form = res.data.data;
        this.imageUrl = this.form.customerLogo;
      } else {
        this.$message.error(res.data.resultMsg);
      }
      console.log(res, 8888);
    },
    //运行参数表单接口
    async getform() {
      if (this.form.smsConfigName == "") {
        return this.$message.error("请输入短信帐号别名");
      }
      if (this.form.smsAppId == "") {
        return this.$message.error("请输入帐号应用标识");
      }
      if (this.form.smsKey == "") {
        return this.$message.error("请输入帐号应用密钥");
      }
      if (this.form.signName == "") {
        return this.$message.error("请输入短信签名");
      }
      if (this.form.price == "") {
        return this.$message.error("请输入短信价格");
      }
      if (this.form.typeCode == "") {
        return this.$message.error("请选择网关类型");
      }
      this.form.operatorId = 1;

      let res = await this.$http.post(this.$api.informationform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.$router.go(-1);
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    reset() {
      this.form.smsConfigName = "";
      this.form.smsAppId = "";
      this.form.smsKey = "";
      this.form.signName = "";
      this.form.price = "";
      this.form.typeCode = "";
      this.form.remark = "";
    },
    handleChange2(value) {
      console.log(`selected ${value}`);
      console.log(this.runpageparam);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>
<style>
.edit_item_title {
  width: 315px;
  height: 100%;
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
.isupload {
  height: 72px;
  margin-bottom: 50px;
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

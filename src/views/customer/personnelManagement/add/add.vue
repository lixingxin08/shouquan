<template>
  <div class="isedit">
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>人员姓名:
      </div>
      <div>
        <a-input
          class="edit_a_input"
          :maxLength="50"
          v-model="form.realName"
          placeholder="请输入人员姓名"
        />
      </div>
      <div class="edit_item_toast">注:50字以内，支持中英文</div>
    </div>
    <div class="flexrow flexac edit_item" v-if="gendertype">
      <div class="edit_item_title">
        <span class="col_red">*</span>人员性别:
      </div>
      <div class="edit_a_input flex_f">
        <a-radio-group :options="plainOptions" :default-value="value1" @change="onChange1" />
      </div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>手机号码:
      </div>
      <a-input class="edit_a_input" v-model="form.mobilePhone" placeholder="请输入11位数手机号" />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">电子邮箱:</div>
      <a-input class="edit_a_input" v-model="form.email" placeholder="50字以内，请输入@格式且合法的邮箱帐号" />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>人员状态:
      </div>
      <a-select
        show-search
        option-filter-prop="children"
        style="width: 667px;margin-right:20px;height:36px;border-radius: 8px;"
        v-model="form.statusCode"
        @change="handleChange"
      >
        <a-select-option
          v-for="(item,index) in statusCode"
          :key="index"
          :value="item.id"
        >{{item.val}}</a-select-option>
      </a-select>
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">岗位职务:</div>
      <a-input class="edit_a_input" placeholder="请输岗位职务" :maxLength="50" v-model="form.position" />
      <div class="edit_item_toast">注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">所属部门:</div>
      <a-input class="edit_a_input" v-model="form.departmentName" disabled placeholder="请输入所属部门" />
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">备注信息:</div>
      <div style="position: relative;">
        <a-textarea
          class="edit_a_input"
          :rows="5"
            :maxlength="255"
          placeholder="500字以内，格式不限制"
          v-model="form.remark"
        />
         <div class="edit_number">{{remarklen}}/255</div>
      </div>
    </div>
    <div class="flexrow" style="margin-top: 30px;justify-item: flex-start;margin-left: 325px;">
      <a-button @click="getform()">保存</a-button>
      <a-button type="primary" style="margin-left: 20px;" @click="reset()">重置</a-button>
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
   inject:['reload'],
     computed: {
    remarklen(){
      return this.form.remark.length
    }
  },
  data() {
    return {
      sel_data: "",
      gendertype:true,
      form: {
        personId: "",
        realName: "",
        gender: 0,
        mobilePhone: "",
        statusCode: "",
        position: "",
        departmentId: "",
        remark: "",
        email: "",
        operatorId: JSON.parse(localStorage.getItem('authorization')).accountId,
      },
      detailparam: {
        personId: "",
      },
      plainOptions: ["男", "女"],
      value1: "男",
      statusCode: [
        { id: 1, val: "在岗" },
        { id: 0, val: "休假" },
        { id: 2, val: "离岗" },
      ],
    };
  },
  created() {
    this.sel_data = JSON.parse(localStorage.getItem("sel"));
    if (this.$route.query.type == "add") {
      this.form.departmentName = this.$route.query.name;
      this.form.departmentId = this.$route.query.id;
    }
    if (this.$route.query.type == "edit") {
      this.detailparam.personId = this.$route.query.id;
      this.getpersondetail();
    }
  },
  methods: {
    //详情接口
    async getpersondetail() {
      this.gendertype=false
      let res = await this.$http.post(this.$api.persondetail, this.detailparam);
      if (res.data.resultCode == "10000") {
        this.form = res.data.data;
        this.form.realName = res.data.data.realName;
        if (this.form.gender==0) {
          this.value1="男"
        }else{
           this.value1="女"
        }
      } else {
        this.$message.error(res.data.resultMsg);
      }
          this.gendertype=true
    },
    //运行参数表单接口
    async getform() {
      if (!this.verEmail(this.form.email)&&this.form.email!=="") {
          this.form.email=""
        return this.$message.error("邮箱地址格式不正确");
      }
      if (!this.verPhone(this.form.mobilePhone)) {
          this.form.mobilePhone=""
        return this.$message.error("手机号码格式不正确");
      }
         if (!this.vify_cn16(this.form.realName)) {
           this.form.realName=""
        return this.$message.error("人员姓名格式不正确");
      }
      if (this.form.realName == "") {
        return this.$message.error("请输入人员姓名");
      }
      if (this.form.mobilePhone == "") {
        return this.$message.error("请输入手机号码");
      }

      if (this.form.statusCode === "") {
        return this.$message.error("请选择人员状态");
      }
      this.form.operatorId = 1;
      let res = await this.$http.post(this.$api.personform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.$router.go(-1);
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    reset() {
       this.reload()
    },

    onComplete(e) {
      console.log(e, "onComplete ");
    },
    onError(e) {
      console.log(e, "onError ");
    },
    handleChange(value, key) {
      console.log(this.form.typeCode, 88);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onChange1(e) {
      //菜单类型选择
      console.log("radio1 checked", e.target.value);
      if (e.target.value == "男") {
        this.form.gender = 0;
      } else {
        this.form.gender = 1;
      }
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

.dialogaddperson {
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
.dialogaddperson_t {
  width: 920px;
  height: 72px;
  background-color: #1890ff;
  color: #fff;
  font-size: 24px;
  padding: 0 40px;
}
.dialogaddperson_c {
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
.dialogaddperson_c_t {
  height: 32px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.dialogaddperson_inp {
  width: 744px;
  height: 32px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}
.map {
  width: 840px;
  height: 472px;
}
.dialogaddperson_f {
  margin-top: 40px;
}
</style>

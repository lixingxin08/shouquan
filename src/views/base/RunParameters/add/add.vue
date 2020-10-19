<template>
  <div class="isedit">
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>参数分组:
      </div>
      <div>
        <a-select
         show-search
          placeholder="请选择"
          option-filter-prop="children"
          style=" width: 667px;height: 32px;"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          v-model="typeName"
          @change="handleChange"
        >
          <a-select-option
            v-for="(item,index) in sel_data"
            :key="index"
            :value="item.comboBoxId"
          >{{item.comboBoxName}}</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>参数名称:
      </div>
      <div class="edit_a_input_run "><a-input  v-model="form.parameterName" placeholder="请输入参数名称" /></div>

      <div class="edit_item_toast">注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>参数代码:
      </div>
      <div class="edit_a_input_run "><a-input  placeholder="请输入参数代码" v-model="form.parameterCode" /></div>

      <div class="edit_item_toast">注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>参数数值:
      </div>
      <div style="position: relative;width: 667px;">
        <a-textarea
          class="edit_a_input"
          :rows="5"
          :maxlength='256'
          placeholder="格式不限制，256个字符以内，包含标点符号"
          v-model="form.parameterValue"
        />
      <div class="edit_number">{{parameterValuelen}}/256</div>
      </div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">参数描述:</div>
      <div style="position: relative;width: 667px;">
        <a-textarea
          class="edit_a_input"
          :rows="5"
           :maxlength='256'
          placeholder="格式不限制，256个字符以内，包含标点符号"
          v-model="form.description"
        />
      <div class="edit_number">{{descriptionlen}}/256</div>
      </div>
    </div>
    <div class="flexrow" style="margin-top: 30px;justify-item: flex-start;margin-left: 325px;">
      <a-button @click="getrunform()">保存</a-button>
      <a-button type="primary" style="margin-left: 20px;" @click="reset()">重置</a-button>
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  inject: ["reload"],
    computed: {
    parameterValuelen(){
      return this.form.parameterValue.length
    },
    descriptionlen(){
      return this.form.description.length
    },
  },
  data() {
    return {
      sel_data: "",
      form: {
        parameterId: "",
        typeCode: "",
        parameterName: "",
        parameterCode: "",
        parameterValue: "",
        operatorId: JSON.parse(localStorage.getItem('auth')).accountId,
        description: "",
      },
      typeName:"",
      rundetailparam: {
        parameterId: "",
      },
    };
  },
  created() {
      this.sel_data = JSON.parse(localStorage.getItem("sel"));
    if (this.$route.query.type == "edit") {
      this.rundetailparam.parameterId = this.$route.query.id;
      this.typeName=this.$route.query.typeName||"";
      this.getrundetail();
    }
  },
  methods: {
    //运行参数详情接口
    async getrundetail() {
      let res = await this.$http.post(this.$api.rundetail, this.rundetailparam);
      if (res.data.resultCode == "10000") {
        this.form = res.data.data;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    //运行参数表单接
    async getrunform() {
      if (this.form.parameterName == "") {
        return this.$message.error("请输入参数名称");
      }
      if (!this.vify_cn3(this.form.parameterName)) {
        this.form.parameterName = ""
        return this.$message.error("参数名称格式不正确");
      }
      
      if (this.form.parameterValue == "") {
        return this.$message.error("请输入参数数值");
      }
       if (!this.vify_cn3(this.form.parameterCode)) {
        this.form.parameterCode = ""
        return this.$message.error("参数代码格式不正确");
      }
      if (this.form.parameterCode == "") {
        return this.$message.error("请输入参数代码");
      }
      this.form.operatorId = 1
      let res = await this.$http.post(this.$api.runform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
		this.$router.push({
		  path: '/runparameters',
		});
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
    handleChange(value,key) {
      console.log(value,key,6666);
      this.form.typeCode=this.sel_data[key.data.key].comboBoxId
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

.edit_a_input_run {
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

.dialogaddrun {
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
.dialogaddrun_t {
  width: 920px;
  height: 72px;
  background-color: #1890ff;
  color: #fff;
  font-size: 24px;
  padding: 0 40px;
}
.dialogaddrun_c {
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
.dialogaddrun_c_t {
  height: 32px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.dialogaddrun_inp {
  width: 744px;
  height: 32px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}
.map {
  width: 840px;
  height: 472px;
}
.dialogaddrun_f {
  margin-top: 40px;
}
</style>

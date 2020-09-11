<template>
  <div class="isedit">

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>部门名称:
      </div>
      <a-input class="edit_a_input" v-model="form.departmentName" placeholder="请输入部门名称" />
         <div class="edit_item_toast">注:2-16个字，支持中英文</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        上级部门:
      </div>
      <a-input class="edit_a_input" v-model="form.parentName" disabled />
     
    </div>


    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">部门介绍:</div>
      <div style="position: relative;">
        <a-textarea
          class="edit_a_input"
          :rows="5"
          placeholder="500字以内，格式不限制"
          v-model="form.introduce"
        />
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
  data() {
    return {
      sel_data: "",
      form: {
        departmentId:"",
        departmentName:"",
        parentId:"",
        introduce:"",
        gradeno:"",
        operatorId: "1",
      },
      detailparam: {
        departmentId: "",
      },
    };
  },
  created() {
    this.sel_data = JSON.parse(localStorage.getItem("sel"));
    if (this.$route.query.type == "add") {
      this.form.parentName = this.$route.query.name;
      this.form.parentId = this.$route.query.id;
      this.form.gradeno = this.$route.query.levelType;

    }
    if (this.$route.query.type == "edit") {
      this.detailparam.departmentId = this.$route.query.id;
      this.getdetail();
    }
  },
  methods: {
    //详情接口
    async getdetail() {
      let res = await this.$http.post(this.$api.departmentdetail,this.detailparam);
      if (res.data.resultCode == "10000") {
        this.form = res.data.data;
        this.form.realName = res.data.data.realName;
      } else {
        this.$message.error(res.data.resultMsg);
      }
      console.log(res, 8888);
    },
    //表单接口
    async getform() {
      this.form.operatorId = 1;
         if (this.form.departmentName=="") {
     return  this.$message.error('请输入部门名称')
     }
      if (!this.vify_cn16(this.form.departmentName)) {
       this.form.departmentName=""
     return  this.$message.error('部门名称格式不正确')
     }
      let res = await this.$http.post(this.$api.departmentform, this.form);
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
        this.form.gender = 1;
      } else {
        this.form.gender = 0;
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

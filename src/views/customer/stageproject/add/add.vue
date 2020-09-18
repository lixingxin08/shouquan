<template>
  <div class="isedit">
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">项目名称:</div>
      <div>
        <a-input
          class="edit_a_input"
          :maxLength="50"
          v-model="projectName"
          placeholder="请输入项目名称"
          disabled
        />
      </div>
      <div class="edit_item_toast">注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>阶段名称:
      </div>
      <div>
        <a-input
          class="edit_a_input"
          :maxLength="50"
          v-model="form.phaseName"
          placeholder="请输入阶段名称"
        />
      </div>
      <div class="edit_item_toast">注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">合同编号:</div>
      <a-input class="edit_a_input" v-model="form.contractNo" placeholder="请输入合同编号" />
      <div class="edit_item_toast">注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">合同描述:</div>
      <div style="position: relative;">
        <a-textarea
          class="edit_a_input"
          :rows="5"
          :maxlength="500"
          placeholder="500字以内，格式不限制"
          v-model="form.description"
        />
        <div class="edit_number">{{contractDesklen}}/500</div>
      </div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">阶段期始:</div>
      <a-date-picker
        @change="onChange"
        v-model="form.startDate "
        placeholder="请选择日期"
        format="YYYY-MM-DD"
        class="edit_a_input"
      />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">阶段期止:</div>
      <a-date-picker
        @change="onChange1"
        format="YYYY-MM-DD"
        v-model="form.endDate "
        placeholder="请选择日期"
        class="edit_a_input"
      />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">上线日期:</div>
      <a-date-picker
        @change="onChange3"
        v-model="form.onlineDate "
        placeholder="请选择日期"
        format="YYYY-MM-DD"
        class="edit_a_input"
      />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">验收日期:</div>
      <a-date-picker
        @change="onChange4"
        format="YYYY-MM-DD"
        v-model="form.acceptanceDate "
        placeholder="请选择日期"
        class="edit_a_input"
      />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>阶段状态:
      </div>
      <a-select
        show-search
        placeholder="全部"
        option-filter-prop="children"
        style="width: 667px;margin-right:20px;height:36px;border-radius: 8px;"
        v-model="form.statusCode"
        @change="handleChange"
      >
        <a-select-option value>全部</a-select-option>
        <a-select-option
          v-for="(item,index) in statusCode"
          :key="index"
          :value="item.id"
        >{{item.val}}</a-select-option>
      </a-select>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>默认标识:
      </div>
      <a-switch @change="onChange2" v-model="isdefaultChecked" />
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">项目经理:</div>
      <a-input class="edit_a_input" placeholder="请输项目经理名称" v-model="form.leader" />
      <div class="edit_item_toast">注:2-16个字，支持中英文</div>
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">联系手机:</div>
      <a-input class="edit_a_input" placeholder="请输入11位数字手机号" v-model="form.linkphone" />
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">备注信息:</div>
      <div style="position: relative;">
        <a-textarea
          class="edit_a_input"
          :rows="5"
          :maxlength="500"
          placeholder="500字以内，格式不限制"
          v-model="form.remark"
        />
        <div class="edit_number">{{remarklen}}/500</div>
      </div>
    </div>
    <div class="flexrow" style="margin-top: 30px;justify-item: flex-start;margin-left: 325px;">
      <a-button @click="getform()">保存</a-button>
      <a-button type="primary" style="margin-left: 20px;" @click="reset()">重置</a-button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      sel_data: "",
      form: {
        projectId: "",
        projectName: "",
        contractNo: "",
        description: "",
        startDate: "",
        endDate: "",
        statusCode: "",
        defaultChecked: 0,
        leader: "",
        linkphone: "",
        remark: "",
        operatorId: JSON.parse(localStorage.getItem("usermsg")).accountId,
      },
      detailparam: {
        phaseId: "",
      },
      projectName: "",
      plainOptions: ["男", "女"],
      value1: "男",
      statusCode: [
        { id: 1, val: "是" },
        { id: 0, val: "否" },
      ],
    };
  },
  computed: {
    isdefaultChecked() {
      if (this.form.defaultChecked == 0) {
        return false;
      } else {
        return true;
      }
    },
    remarklen() {
      return this.form.remark.length;
    },
    contractDesklen() {
      return this.form.description.length;
    },
  },
  created() {
    this.projectName = this.$route.query.name;
    if (this.$route.query.type == "edit") {
      this.detailparam.phaseId = this.$route.query.id;
      this.getdetail();
    }
  },
  methods: {
    //详情接口
    async getdetail() {
      let res = await this.$http.post(
        this.$api.projectPhasedetail,
        this.detailparam
      );
      if (res.data.resultCode == "10000") {
        this.form = res.data.data;
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    //运行参数表单接口
    async getform() {
      this.form.projectId = this.$route.query.projectid;
      this.form.customerId = this.$route.query.customerId;
      this.form.operatorId = 1;
      if (
        new Date(this.form.startDate).getTime() >
        new Date(this.form.endDate).getTime()
      ) {
        let a = this.form.startDate;
        this.form.startDate = this.form.endDate;
        this.form.endDate = a;
      }
      let res = await this.$http.post(this.$api.projectPhaseform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.$router.go(-1);
      } else {
        this.$message.error(res.data.resultMsg);
      }
    },
    reset() {
      this.reload();
    },

    handleChange(value, key) {
      console.log(this.form.typeCode, 88);
    },

    onChange(date, dateString) {
      this.form.startDate = dateString;
    },
    onChange1(date, dateString) {
      this.form.endDate = dateString;
    },
    onChange3(date, dateString) {
      this.form.onlineDate = dateString;
    },
    onChange4(date, dateString) {
      this.form.acceptanceDate = dateString;
    },
    onChange2(checked) {
      console.log(`a-switch to ${checked}`);
      if (checked) {
        this.form.defaultChecked = 1;
      } else {
        this.form.defaultChecked = 0;
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
  margin-top: 15px;
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

.dialogaddstage {
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
.dialogaddstage_t {
  width: 920px;
  height: 72px;
  background-color: #1890ff;
  color: #fff;
  font-size: 24px;
  padding: 0 40px;
}
.dialogaddstage_c {
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
.dialogaddstage_c_t {
  height: 32px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.dialogaddstage_inp {
  width: 744px;
  height: 32px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}
.map {
  width: 840px;
  height: 472px;
}
.dialogaddstage_f {
  margin-top: 40px;
}
</style>

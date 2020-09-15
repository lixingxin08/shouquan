<template>
  <div class="isedit">
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>客户全称:
      </div>
      <a-input
        class="edit_a_input"
        v-model="form.customerName"
        :maxLength="50"
        placeholder="请输入客户全称"
      />
      <div class="edit_item_toast">注:50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>客户简称:
      </div>
      <a-input class="edit_a_input" v-model="form.shortName"  :maxLength="10" placeholder="请输入客户简称" />
      <div class="edit_item_toast">注:10字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>客户logo:
      </div>
      <div class="isupload">
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="http://192.168.3.101:8808/upload"
          :before-upload="beforeUpload"
          :headers='istoken'
          @change="handleChange"
           
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <div class="col_red">支持PNG、JPEG、JPG格式，1KB至2M</div>
      </div>
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">公司地址:</div>
      <a-input class="edit_a_input" v-model="form.address" :maxLength="100" placeholder="请输入公司地址" />
      <div class="edit_item_toast">注:100字以内，格式不限制</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">公司电话:</div>
      <a-input class="edit_a_input" v-model="form.telephone" placeholder="请输入公司电话" />
      <div class="edit_item_toast">注:请输入公司座机号，20字以内</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">联系人姓名:</div>
      <a-input class="edit_a_input" v-model="form.linkman" :maxLength="50" placeholder="请输入联系人姓名" />
      <div class="edit_item_toast">注:50字以内，支持中英文</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">联系人手机:</div>
      <a-input class="edit_a_input" v-model="form.linkphone" placeholder="请输入 联系人手机" />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">联系人职务:</div>
      <a-input class="edit_a_input" v-model="form.position" :maxLength="10" placeholder="请输入联系人职务" />
      <div class="edit_item_toast">注:10字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>客户状态:
      </div>
      <a-select
        show-search
        placeholder="全部"
        option-filter-prop="children"
        style="width: 667px;margin-right:20px"
        v-model="form.statusCode"
        :filter-option="filterOption"
        @change="handleChange2"
      >
        <a-select-option value>全部</a-select-option>
        <a-select-option v-for="(item,index) in sel_data" :key="index" :value="item.id">{{item.val}}</a-select-option>
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
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
   inject:['reload'],
  data() {
    return {
      istoken:{token:JSON.parse(localStorage.getItem('usermsg')).token||""},
      loading: false,
      imageUrl: "",
      sel_data: [
        { val: "启用", id: 1 },
        { val: "备用", id: 2 },
        { val: "关闭", id: 0 },
      ],
      form: {
        customerId: "",
        customerName: "",
        shortName: "",
        customerLogo: "111",
        address: "",
        telephone: "",
        linkman: "",
        linkphone: "",
        position: "",
        statusCode: "",
        remark: "",
        operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId,
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
    //表单接口
    async getform() {
      this.form.operatorId = 1;
     if (!this.vify_cn3(this.form.customerName)) {
       this.form.customerName=""
     return  this.$message.error('客户全称格式不正确')
     }
     if (this.form.customerName=="") {
     return  this.$message.error('请输入客户全称')
     }
     if (!this.vify_cn3(this.form.shortName)) {
       this.form.shortName=""
     return  this.$message.error('客户简称格式不正确')
     }
      if (this.form.shortName=="") {
     return  this.$message.error('请输入客户简称')
     }
       if (this.form.customerLogo=="") {
     return  this.$message.error('请选择客户logo')
     }
       if (this.form.statusCode=="") {
     return  this.$message.error('请选择客户状态')
     }
      if (!this.vify_cn(this.form.linkman)) {
       this.form.linkman=""
     return  this.$message.error('联系人姓名格式不正确')
     }
      if (!this.verPhone(this.form.linkphone)) {
       this.form.linkphone=""
     return  this.$message.error('联系人手机号码格式不正确')
     }
      if (!this.vify_cn(this.form.position)) {
       this.form.position=""
     return  this.$message.error('联系人职务格式不正确')
     }

      let res = await this.$http.post(this.$api.informationform, this.form);
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
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.form.customerLogo = imageUrl;
          this.loading = false;
        });
      }
      console.log(this.imageUrl, 88999, info);
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      if (!isJpgOrPng) {
        this.$message.error("只能上传jpeg,jpg,png格式的图片");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小不能超过2MB!");
      }
      return isJpgOrPng && isLt2M;
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

.dialogess {
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
.dialogess_t {
  width: 920px;
  height: 72px;
  background-color: #1890ff;
  color: #fff;
  font-size: 24px;
  padding: 0 40px;
}
.dialogess_c {
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
.dialogess_c_t {
  height: 32px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.dialogess_inp {
  width: 744px;
  height: 32px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}
.map {
  width: 840px;
  height: 472px;
}
.dialogess_f {
  margin-top: 40px;
}
</style>

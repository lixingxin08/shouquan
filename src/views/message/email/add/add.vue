<template>
  <div class="isedit">
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>邮箱账号别名:
      </div>
      <a-input class="edit_a_input" v-model="form.emailConfigName" placeholder="请输入邮箱账号别名" />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>发送邮箱:
      </div>
      <a-input class="edit_a_input" v-model="form.sender" placeholder="请输入邮箱" />
    </div>


    <div class="flexrow flexac edit_item">
      <div class="edit_item_title"><span class="col_red">*</span>邮箱服务地址:</div>
      <a-input class="edit_a_input" v-model="form.emailHost" placeholder="请输入邮箱服务地址" />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title"><span class="col_red">*</span>邮箱服务端口:</div>
      <a-input-number class="edit_a_input" v-model="form.emailPort" placeholder="请输入邮箱服务端口" />
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title"><span class="col_red">*</span>是否身份验证:</div>
      <a-radio-group v-model="form.authType" @change="onChange1">
        <a-radio v-for="(item,index) in plainOptions" :key="index" :value="item.key">
          {{item.name}}
        </a-radio>
      </a-radio-group>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title"><span class="col_red">*</span>采用安全链接:</div>
      <a-radio-group v-model="form.sslType" @change="onChange2">
        <a-radio v-for="(item,index) in plainOptions" :key="index" :value="item.key">
          {{item.name}}
        </a-radio>
      </a-radio-group>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title"><span class="col_red">*</span>打印调试模式:</div>
      <a-radio-group v-model="form.debugType" @change="onChange3">
        <a-radio v-for="(item,index) in plainOptions" :key="index" :value="item.key">
          {{item.name}}
        </a-radio>
      </a-radio-group>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>邮箱网关类型:
      </div>
      <a-select show-search placeholder="全部" option-filter-prop="children" style="width: 667px;margin-right:20px"
        v-model="form.typeCode" @change="handleChange2">
        <a-select-option value>全部</a-select-option>
        <a-select-option v-for="(item,index) in sel_data" :key="index" :value="item.comboBoxId">{{item.comboBoxName}}</a-select-option>
      </a-select>
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">备注信息:</div>
      <div style="position: relative;">
        <a-textarea class="edit_a_input" :rows="5" :maxLength='250' placeholder="500字以内，格式不限制" v-model="form.remark" />
      </div>
    </div>
    <div class="flexrow" style="margin-top: 30px;justify-item: flex-start;margin-left: 325px;">
      <a-button @click="getform()">保存</a-button>
      <a-button type="primary" style="margin-left: 20px;" @click="reset()">重置</a-button>
    </div>
  </div>
</template>

<script>
  const plainOptions = [{
    name: '关闭',
    key: 'false'
  }, {
    name: '打开',
    key: 'true'
  }];
  export default {
    data() {
      return {
        plainOptions,
        loading: false,
        imageUrl: "",
        sel_data: [],
        form: {
          emailConfigId: "",
          emailConfigName: "",
          sender: "",
          emailHost: "",
          emailPort: 0,
          authType: "",
          sslType: "",
          debugType: "",
          typeCode: "",
          remark: "",
          operatorId: '5172dadd6d7c404e8ac657f32f81d969'
        },
        detailparam: {
          customerId: "",
        },
      };
    },
    created() {
      this.form.emailConfigId = this.$route.query.id
      if (this.form.emailConfigId) {
        this.getdetail()
      }
      this.getCombobox()
    },
    methods: {
      //详情接口
      async getdetail() {
        let param = {
          emailConfigId: this.form.emailConfigId
        }
        let res = await this.$http.post(
          this.$api.emailtAccountdetail,
          param
        );
        if (res.data.resultCode == "10000") {
          this.form = res.data.data;
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      //运行参数表单接口
      async getform() {
        this.form.operatorId='5172dadd6d7c404e8ac657f32f81d969'
        let res = await this.$http.post(this.$api.emailAccountform, this.form);
        if (res.data.resultCode == "10000") {
          this.$message.success(res.data.resultMsg);
          this.$router.go(-1);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      async getCombobox() {
        let param = {
          classCode: 'message_type_email'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          this.sel_data = res.data.data
        }
      },
      reset() {
        if (this.form.emailConfigId) {

           this.getdetail()
        } else {
           this.form = {
              
           }
        }
      },

      handleChange2(value) {
        console.log(`selected ${value}`);
        // console.log(this.runpageparam);
      },
      onChange1(e) {
        this.form.authType = e.target.value
      },
      onChange2(e) {
        this.form.sslType = e.target.value
      },
      onChange3(e) {
        this.form.debugType = e.target.value
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

  .dialogaddemail {
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

  .dialogaddemail_t {
    width: 920px;
    height: 72px;
    background-color: #1890ff;
    color: #fff;
    font-size: 24px;
    padding: 0 40px;
  }

  .dialogaddemail_c {
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

  .dialogaddemail_c_t {
    height: 32px;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .dialogaddemail_inp {
    width: 744px;
    height: 32px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
  }

  .map {
    width: 840px;
    height: 472px;
  }

  .dialogaddemail_f {
    margin-top: 40px;
  }
</style>

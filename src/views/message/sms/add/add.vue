<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">


    <div style="margin: 0 auto;">
      <a-steps :current="current" type="navigation" @change="onChange">
        <a-step v-for="item in steps" :key="item.status" :title="item.title" />
      </a-steps>
      <div v-if="current==0" class="flexcolumn flexjc" style="width: 100%;">
        <div class="flexrow flexac edit_item_sms">
          <div class="edit_item_sms_title2_sms"><a style="color: #FF0000;">*</a>短信账号别名:</div>
          <a-input class='edit_a_input_sms' style='width: 667px;' :maxLength='50' v-model='config.smsConfigName'
            placeholder="50字以内，支持中英文" />
          <!-- <div class="edit_item_sms_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item_sms">
          <div class="edit_item_sms_title2_sms"><a style="color: #FF0000;">*</a>帐号应用标识:</div>
          <a-input class='edit_a_input_sms' style='width: 667px;' :maxLength='50' v-model='config.smsAppId' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
          <!--     <div class="edit_item_sms_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item_sms">
          <div class="edit_item_sms_title2_sms"><a style="color: #FF0000;">*</a>帐号应用密钥:</div>
          <a-input class='edit_a_input_sms' style='width: 667px;' :maxLength='50' v-model='config.smsKey' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
          <!--     <div class="edit_item_sms_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item_sms">
          <div class="edit_item_sms_title2_sms"><a style="color: #FF0000;">*</a>短信签名:</div>
          <a-input class='edit_a_input_sms' style='width: 667px;' :maxLength='32' v-model='config.signName' placeholder="32字以内，支持中英文" />
          <!--     <div class="edit_item_sms_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item_sms">
          <div class="edit_item_sms_title2_sms"><a style="color: #FF0000;">*</a>短信价格:</div>
          <a-input style='width: 610px;' placeholder="金额范围:0.001~10元" v-model='config.price' @change='priceChange' />
          <div class="edit_item_sms_toast">元/条</div>
        </div>
        <div class="flexrow flexac edit_item_sms">
          <div class="edit_item_sms_title2_sms"><a style="color: #FF0000;">*</a>网关类型:</div>
          <a-select :value="config.typeCode?config.typeCode:'请选择短信账号类型'" style="width: 667px;" @change="handleSelectChange">
            <a-select-option v-for='(item,index) in smsTypeList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>
          <!--  <div class="edit_item_sms_toast">注：数字字典</div> -->
        </div>
        <div class="flexrow flexac edit_item_sms">
          <div class="edit_item_sms_title2_sms">备注信息:</div>
          <div style="position: relative;">
            <a-textarea style='width: 667px;' :rows="5" :maxLength='250' v-model='config.remark' placeholder="请输入描述"
              @change="onChangeConfig" />
            <div class="edit_number_sms">{{config.remark.length}}/250</div>
          </div>
        </div>

      </div>
      <a-table v-else style='margin-top: 20px;margin-bottom: 20px;width: 820px; ' :columns="addcolumns" :data-source="msgList"
        :pagination='false' :bordered='true' size='small'>
        <template slot="index" slot-scope="text, record, index">
          <div>{{index+1}}</div>
        </template>
        <div slot='serviceIdTitle'> <span style="color: #FF0033;">*</span>服务序号</div>
        <template slot="serviceId" slot-scope="text, record, index">
          <a-input style="margin: -5px 0;border: 0px;" v-model='text' @change="e => handleChange(e.target.value,index)"></a-input>
        </template>
      </a-table>
      <div class="flexrow flexjc" style="margin-top: 60px;margin-bottom: 100px;">
        <a-button type="primary" v-if='current==1' @click='submit'>保存</a-button>
        <a-button type="primary" v-if='current==0' @click='onChange(1)'>下一步</a-button>
        <a-button style="margin-left: 60px;" @click='reset'>重置</a-button>
      </div>
    </div>

  </div>
</template>

<script>
  import table from '../table.json'
  export default {
    data() {
      return {
        current: 0,
        stepStyle: {
          marginBottom: '60px',
          boxShadow: '0px -1px 0 0 #e8e8e8 inset',
        },
        steps: [{
            title: '短信账号',
            status: '0'
          },
          {
            title: '消息模板',
            status: '1'
          },
        ],
        smsTypeList: [],
        addcolumns: table.data.adddColumns,
        msgList: [],
        config: {
          typeCode: 0,
          remark: ''
        },
        id: null,
        num: 0 //描述长度
      }
    },
    created() {
      this.id = this.$route.query.id
      if (this.id) { //编辑
        this.getSmsInfo();
      }
      this.getCombobox()

    },
    methods: {
      onChange(current) {
        if (current == 1) {
          if (!this.config.smsConfigName) {
            this.$message.warning('请先填写短信账号别名')
            return
          }
          if (!this.config.smsAppId) {
            this.$message.warning('请先填写短信应用标识')
            return
          }
          if (!this.config.smsKey) {
            this.$message.warning('请先填写短信应用密钥')
            return
          }
          if (!this.config.signName) {
            this.$message.warning('请先填写短信签名')
            return
          }
          if (!this.vify_cn(this.config.signName)) {
            this.$message.warning('短信签名格式错误')
            return
          }
          if (!this.config.price) {
            this.$message.warning('请先填写短信价格')
            return
          }
          if (!this.config.typeCode) {
            this.$message.warning('请先选则短信账号类型')
            return
          }
        }
        this.current = current;
      },
      /* 提交事件*/
      async submit() {
        if (this.checkMsgInputList()) {
          this.$message.warning('消息服务序号不能为空')
          return
        }
        if (this.checkMsgList()) {
          this.$message.warning('消息服务序号不能有重复值')
          return
        }

        this.config.smsModelList = this.msgList
        this.config.price = this.config.price * 1000
        let res = await this.$http.post(this.$api.smsform, this.config)
        if (res.data.resultCode == 10000) {
          // if (!this.id)
          this.$router.go(-1)
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      priceChange(e) {
        this.config.price = this.clearNoNum(this.config.price)
      },
      checkMsgInputList() {
        let has = false
        console.log("===",this.msgList)
        if (this.msgList) {
           console.log("===",this.msgList)
          this.msgList.forEach((item) => {
            if (!item.serviceId) {
              has = true
            }
          })
        }
        return has
      },

      /* 获取短信账号详情*/
      async getSmsInfo() {
        let param = {
          smsConfigId: this.id,
        }
        let res = await this.$http.post(this.$api.smsdetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
          this.config.price = this.config.price / 1000
          this.msgList = res.data.data.smsModelList
          if (this.msgList)
            this.msgList = []
        }
      },
      async getSmsMsgList() {
        this.msgList = []
        let param = {
          classCode: this.config.typeCode,
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          res.data.data.forEach((item) => {
            this.msgList.push({
              serviceId: '',
              modelCode: item.comboBoxId,
              remark: item.remark
            })
          })
        }
      },

      checkMsgList() {
        let list = []
        let has = false
        if(this.msgList){
        this.msgList.forEach((item) => {
          if (list.indexOf(item.serviceId) >= 0) {
            has = true
          } else {
            list.push(item.serviceId)
          }
        })}
        return has
      },
      /* 修改数值*/
      handleChange(value, index) {
        const newData = [...this.msgList];
        const target = newData[index];
        if (target) {
          target['serviceId'] = value;
          this.msgList = newData;
        }
      },
      /* 授权类型下拉选择 */
      handleSelectChange(e) {
        console.log(e)
        this.config.typeCode = e
        this.getSmsMsgList()
      },
      /* 获取业务类别*/
      async getCombobox() {
        let param = {
          classCode: 'message_type_sms'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          this.smsTypeList = res.data.data
        }
      },
      /* 重置*/
      reset() {
        this.current = 0
        if (this.id) {
          this.getSmsInfo()
        } else {
          this.config = {
            remark: ''
          }
        }
      },
      /* 描述字符长度*/
      onChangeConfig() {
        this.num = this.config.remark.length
      },
      clearNoNum(obj) {
        //先把非数字的都替换掉，除了数字和.
        obj = obj.replace(/[^\d.]/g, "");
        //保证只有出现一个.而没有多个.
        obj = obj.replace(/\.{2,}/g, ".");
        //必须保证第一个为数字而不是.
        obj = obj.replace(/^\./g, "");
        //保证.只出现一次，而不能出现两次以上
        obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //只能输入四个小数 (\d\d\d\d)
        obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');
        if (obj > 10) {
          obj = "10.000"
        }
        if (obj.startsWith('00')) {
          obj = "0.0"
        }
        return obj
      }

    },
  }
</script>

<style>
  .edit_item_sms_title2_sms {
    width: 120px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    margin-right: 10px;
    text-align: right;
    color: #000000;
  }

  .edit_item_sms {
    margin: 0 auto;

    margin-top: 24px;
  }

  .edit_item_sms_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    flex-shrink: 0;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input_sms {
    width: 667px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
  }

  .edit_number_sms {
    position: absolute;
    right: 10px;
    bottom: 3px;
    font-size: 14px;
    color: #999999;
  }

  .upload-list-inline>>>.ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }

  .topic-info {
    background-color: #F5F5F5;
  }

  .upload-list-inline>>>.ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }

  .upload-list-inline>>>.ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
</style>

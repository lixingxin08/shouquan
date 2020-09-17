<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">


    <div style="margin: 0 auto;">
      <a-steps :current="current" type="navigation" @change="onChange">
        <a-step v-for="item in steps" :key="item.status" :title="item.title" />
      </a-steps>
      <div v-if="current==0">
        <div class="flexrow flexac edit_item_wechat">
          <div class="edit_item_wechat_title2_wechat"><a style="color: #FF0000;">*</a>微信账号别名:</div>
          <a-input class='edit_a_input_wechat' v-model='wechat.wechatConfigName' :maxLength='50' placeholder="50字以内，支持中英文" />
          <!-- <div class="edit_item_wechat_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item_wechat">
          <div class="edit_item_wechat_title2_wechat"><a style="color: #FF0000;">*</a>帐号应用标识:</div>
          <a-input class='edit_a_input_wechat' v-model='wechat.wechatAppId' :maxLength='50' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
          <!--     <div class="edit_item_wechat_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item_wechat">
          <div class="edit_item_wechat_title2_wechat"><a style="color: #FF0000;">*</a>帐号应用密钥:</div>
          <a-input class='edit_a_input_wechat' v-model='wechat.wechatKey' :maxLength='50' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
          <!--     <div class="edit_item_wechat_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
        </div>
        <div class="flexrow flexac edit_item_wechat" v-if="id">
          <div class="edit_item_wechat_title2_wechat"><a style="color: #FF0000;"></a>接口通行令牌:</div>
          <a-input class='edit_a_input_wechat' v-model='wechat.tokenCode' :maxLength='50' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
          <!-- <div class="edit_item_wechat_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->

        </div>
        <div class="flexrow flexac edit_item_wechat" v-if="id">
          <div class="edit_item_wechat_title2_wechat"><a style="color: #FF0000;"></a>令牌失效时间:</div>
          <!--   <a-input class='edit_a_input_wechat' v-model='wechat.expirationTime' :maxLength='50' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
            <div class="edit_item_wechat_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div> -->
          <a-date-picker style='width: 667px;' format="YYYY-MM-DD HH:mm:ss" :value='wechat.expirationTime' @change="onChangeTime" />
        </div>
        <div class="flexrow flexac edit_item_wechat">
          <div class="edit_item_wechat_title2_wechat"><a style="color: #FF0000;">*</a>微信账号类型:</div>
          <a-select :value="wechat.typeCode?wechat.typeCode:'请选择微信账号类型'" style="width: 667px;" @change="handleSelectChange">
            <a-select-option v-for='(item,index) in wetchatTypeList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>
          <!--  <div class="edit_item_wechat_toast">注：数字字典</div> -->
        </div>
        <div class="flexrow flexac edit_item_wechat">
          <div class="edit_item_wechat_title2_wechat">备注信息:</div>
          <div style="position: relative;">
            <a-textarea class='edit_a_input_wechat' :rows="5" :maxLength='250' v-model='wechat.remark' placeholder="请输入描述"
              @change="onChangeConfig" />
            <div class="edit_number_wechat">{{wechat.remark.length}}/250</div>
          </div>
        </div>

      </div>
      <a-table v-else style='margin-top: 20px;margin-bottom: 20px; width: 820px;' :columns="addcolumns" :data-source="msgList"
        :pagination='false' :bordered='true' size='small'>
        <template slot="index" slot-scope="text, record, index">
          <div>{{index+1}}</div>
        </template>


        <a-input slot="serviceId" slot-scope="text, record, index" style="margin: -5px 0;border: 0px;" v-model='text'
          @change="e => handleChange(e.target.value,index)"></a-input>

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
  import moment from 'moment';
  export default {
    data() {
      return {
        current: 0,
        stepStyle: {
          marginBottom: '60px',
          boxShadow: '0px -1px 0 0 #e8e8e8 inset',
        },
        steps: [{
            title: '微信账号',
            status: '0'
          },
          {
            title: '消息模板',
            status: '1'
          },
        ],
        wetchatTypeList: [],
        addcolumns: table.data.adddColumns,
        wechatSelect: '', //事件选择
        msgList: [],
        wechat: {
          typeCode: '',
          remark: ''
        }, //事件详情
        id: null,
        num: 0 //描述长度
      }
    },
    created() {
      this.id = this.$route.query.id
      if (this.id) { //编辑
        this.getWeChatInfo();
      }
      this.getCombobox()

    },
    methods: {
      moment,

      onChangeTime(date, dateString) {
        this.wechat.expirationTime = dateString
      },
      disabledDateTime() {
        return {
          disabledHours: () => this.range(0, 24).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      },
      range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      },
      onChange(current) {
        if (current == 1) {
          if (!this.wechat.wechatConfigName) {
            this.$message.warning('请先填写微信账号别名')
            return
          }
          if (!this.wechat.wechatAppId) {
            this.$message.warning('请先填写微信应用标识')
            return
          }
          if (!this.wechat.wechatKey) {
            this.$message.warning('请先填写微信应用密钥')
            return
          }
          if (!this.wechat.typeCode) {
            this.$message.warning('请先选则微信账号类型')
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

        let param = {
          wechatConfigId: this.id,
          wechatConfigName: this.wechat.wechatConfigName,
          wechatAppId: this.wechat.wechatAppId,
          wechatKey: this.wechat.wechatKey,
          tokenCode: this.wechat.tokenCode,
          expirationTime: this.wechat.expirationTime,
          typeCode: this.wechat.typeCode,
          operatorId: JSON.parse(localStorage.getItem('usermsg')).accountId, //操作者id
          remark: this.wechat.remark,
          modelList: this.msgList
        }
        let res = await this.$http.post(this.$api.wechatform, param)
        if (res.data.resultCode == 10000) {
          if (!this.id)
            this.$router.go(-1)
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },



      /* 获取微信账号详情*/
      async getWeChatInfo() {
        let param = {
          wechatConfigId: this.id,
        }
        let res = await this.$http.post(this.$api.wechatdetail, param)
        if (res.data.resultCode == 10000) {
          this.wechat = res.data.data
          this.msgList = res.data.data.modelList
        } else {}
      },
      async getWeChatMsgList() {
        let param = {
          classCode: this.wechat.typeCode,
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          this.msgList=[]
          res.data.data.forEach((item) => {
            this.msgList.push({
              serviceId: '',
              modelCode: item.comboBoxId,
              remark: item.comboBoxName
            })
          })
        }
      },

      checkMsgList() {
        let list = []
        let has = false
        this.msgList.forEach((item) => {
          if (list.indexOf(item.serviceId) >= 0) {
            has = true
          } else {
            list.push(item.serviceId)
          }
        })
        return has
      },
      checkMsgInputList() {

        let has = false
        this.msgList.forEach((item) => {
          if (!item.serviceId) {
            has = true
          }
        })
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
        this.wechat.typeCode = e
         this.getWeChatMsgList()
      },
      /* 获取业务类别*/
      async getCombobox() {
        let param = {
          classCode: 'message_type_wechat'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          this.wetchatTypeList = res.data.data
        }
      },
      /* 重置*/
      reset() {
        this.current = 0
        if (this.id) {
          this.getWeChatInfo()
        } else {
          this.wechat = {}
        }
      },
      /* 描述字符长度*/
      onChangeConfig() {
        this.num = this.wechat.remark.length
      },

    },
  }
</script>

<style>
  .edit_item_wechat_title2_wechat {
    width: 120px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    margin-right: 10px;
    text-align: right;
    color: #000000;
  }

  .edit_item_wechat {
    margin: 0 auto;
    margin-top: 24px;
  }

  .edit_item_wechat_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input_wechat {
    width: 667px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
  }

  .topic-info {
    background-color: #F5F5F5;
  }

  .edit_number_wechat {
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

  .upload-list-inline>>>.ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }

  .upload-list-inline>>>.ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
</style>

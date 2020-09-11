<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">

    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>事件名称:</div>
        <a-input class='edit_a_input' v-model='event.eventName' placeholder="平台" />
        <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>事件代码:</div>
        <a-input class='edit_a_input' v-model='event.eventCode' placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号" />
        <div class="edit_item_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>

      <div class="flexrow flexac edit_item">
        <div class="edit_item_title"><a style="color: #FF0000;">*</a>事件类型:</div>
        <a-select :value="eventSelect?eventSelect:'请选择事件类型'" style="width: 667px;" @change="handleSelectChange">
          <a-select-option v-for='(item,index) in eventList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
        <div class="edit_item_toast">注：数字字典</div>
      </div>
      <div class="flexrow flexac edit_item">
        <div class="edit_item_title">事件描述:</div>
        <div style="position: relative;">
          <a-textarea class='edit_a_input' :rows="5" v-model='event.remark' :maxLength='250' placeholder="请输入描述"
            @change="onChangeConfig" />
          <div class="edit_number">{{num}}/250</div>
        </div>
      </div>

      <div class="flexrow flexjc" style="margin-top: 60px;margin-bottom: 100px;">
        <a-button type="primary" @click='submit'>保存</a-button>
        <a-button style="margin-left: 60px;" @click='reset'>重置</a-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        eventSelect: '', //事件选择
        eventList: [], //事件类型
        event: {}, //事件详情
        id: "",
        num: 0 //描述长度
      }
    },
    created() {
      this.id = this.$route.query.id
      if (this.id) { //编辑
        this.getEventInfo();
      }
      this.getCombobox()
    },
    methods: {
      /* 提交事件*/
      async submit() {
        if (!this.event.eventName) {
          this.$message.warning('事件名称不能为空')
          return
        }
        if (!this.event.eventCode) {
          this.$message.warning('事件代码不能为空')
          return
        }
        if (!this.eventSelect) {
          this.$message.warning('请选择事件类型')
          return
        }
        let param = {
          eventId: this.id,
          eventName: this.event.eventName,
          eventCode: this.event.eventCode,
          eventType: this.eventSelect,
          operatorId: '5172dadd6d7c404e8ac657f32f81d969', //操作者id
          remark: this.event.remark
        }
        let res = await this.$http.post(this.$api.deviceeventform, param)
        if (res.data.resultCode == 10000) {

          this.$message.success(res.data.resultMsg);
          if (!this.id)
            this.$router.go(-1)
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 获取事件列表*/
      async getEventInfo() {
        let param = {
          eventId: this.id
        }
        let res = await this.$http.post(this.$api.deviceeventdetail, param);
        if (res.data.resultCode == 10000) {
          this.event = res.data.data
          this.eventSelect = this.event.eventType
        }
      },
      /* 授权类型下拉选择 */
      handleSelectChange(e) {
        this.eventSelect = e
      },
      /* 获取业务类别*/
      async getCombobox() {
        let param = {
          classCode: 'device_event_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)
        if (res.data.resultCode == 10000) {
          this.eventList = res.data.data
        }
      },
      /* 重置*/
      reset() {
        if (this.id) {
          this.getEventInfo()
        } else {
          this.event = {}
        }
      },
      /* 描述字符长度*/
      onChangeConfig() {
        this.num = this.event.remark.length
      }
    },
  }
</script>

<style>
  .edit_item_title {
    width: 70px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item {
    margin: 0 auto;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
  }

  .edit_number {
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

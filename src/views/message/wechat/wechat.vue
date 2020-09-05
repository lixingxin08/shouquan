<template>
  <div class="content2">
    <div class="flexrow flexac">
      <div class='title_tx'>微信账号别名:</div>
      <a-input style='width: 200px;' v-model='keyword' placeholder="请输入" />
      <div class='title_tx' style="margin-left: 20px;">微信账号类型:</div>
      <a-select :value="wechatType?wechatType:'全部'" style="width: 200px;" @change="wechatSelectChange">
        <a-select-option v-for='(item,index) in wechatSelectList' :key='index' :value="item.comboBoxId">
          {{item.comboBoxName}}
        </a-select-option>
      </a-select>
      <a-button type="primary" class="title_btn" @click='getWeChat'>查询</a-button>
      <a-button @click='cleanKeyWord'>清除</a-button>
    </div>
    <div style="width: 100%;height: 1px;margin: 10px auto;"></div>
    <div class="flexrow flexjc flexac addbtn" @click="editWechat({})">
      <a-icon two-tone-color="#ffffff" style='margin-right: 5px;' type="plus" /> 新增
    </div>
    <a-table :scroll="{  y: 700 }" :columns="dictionaryColumns" :data-source="wechatList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{index+1}}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="editWechat(record)">编辑</a>
          <div class="item-line"></div>
          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record)">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
  import tableTitleData from "./table.json";
  export default {
    data() {
      return {
        keyword: '', //搜索条件
        wechatType: '', //微信账号选择
        wechatSelectList: [{ //微信账号类型
          comboBoxId: '',
          comboBoxName: '全部'
        }],
        dictionaryColumns: tableTitleData.data.dictionaryColumns,
        wechatList: [], //微信账号数据
        pagination: {
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
          showQuickJumper: true,
        },
        pageSize: 20,
        pageIndex: 1,
      }
    },
    created() {
      this.getCombobox()
      this.getWeChat();
    },
    methods: {
      /* 切换页面 页码事件*/
      handleTableChange(pagination) {
        this.pageSize = pagination.pageSize
        this.pageIndex = pagination.current
        this.getWeChat()
      },
      /* 更换类型事件*/
      wechatSelectChange(e) {
        this.wechatType = e
      },
      /* 获取类型列表*/
      async getWeChat() {
        let param = {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          keyword: this.keyword,
          wechatType: this.wechatType
        }
        let res = await this.$http.post(this.$api.wechatAccountpage, param)
        if (res.data.resultCode == 10000) {
          this.wechatList = res.data.data.list
        } else {
          this.wechatList = []
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 确定*/
      async confirmDelete(item) {
        let param = {
          wechatConfigId: item.eventId,
        }
        let res = await this.$http.post(this.$api.wechatAccountremove, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
          this.getWeChat()()
        } else {

          this.$message.error(res.data.resultMsg);
        }
      },
      /* 清除搜索事件*/
      cleanKeyWord() {
        this.keyword = ''
        this.wechatType = ''
        this.getWeChat()
      },
      /* 获取微信账号类别 列表*/
      async getCombobox() {
        let param = {
          classCode: 'device_wechat_type'
        }
        let res = await this.$http.post(this.$api.dictionarycombobox, param)

        if (res.data.resultCode == 10000) {
          this.wechatSelectList = this.wechatSelectList.concat(res.data.data)
        }
      },
      /* 编辑事件*/
      editWechat(item) {
        this.$router.push({
          path: '/addwechat',
          query: {
            id: item.wechatConfigId
          }
        });
      },

    }
  }
</script>
<style>
  .title_tx {
    flex-shrink: 0;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    margin-right: 20px;
    color: #333333;
  }

  .title_btn {
    margin-left: 20px;
    margin-right: 20px;
  }

  .addbtn {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #ffffff;
    width: 80px;
    margin-bottom: 20px;
    height: 36px;
    background: #1890ff;
    border: 1px solid #1890ff;
    border-radius: 8px;
  }

  .item-line {
    height: 20px;
    width: 1px;
    background-color: #e5e5e5;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>

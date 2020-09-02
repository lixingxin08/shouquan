<template>
  <div>
    <div v-if="!isEdit" class='flexrow flexac flexsb' style="margin-bottom: 20px;">
      <div class="flexrow flexac">
        <div class='title_tx'>菜单名称:</div>
        <a-input placeholder="请输入菜单名称" />

        <a-button type="primary" v-model='keyword' class="title_btn" @click='getMenuData'>查询</a-button>
        <a-button @click='cleanKeyWord'>清除</a-button>
      </div>
      <a-button type="primary" @click="add">新增</a-button>
    </div>
    <a-table v-if="!isEdit" :scroll="{  y: 700 }" :columns="dictionaryColumns" :data-source="menuList" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{index+1}}
      </template>
      <template slot="authFlag" slot-scope="text, record,index">
        <div v-if="record.authFlag==0">默认拥有类</div>
        <div v-if="record.authFlag==1">系统配置类</div>
        <div v-if="record.authFlag==2">客户授权类</div>
        <div v-if="record.authFlag==2">均可操作类</div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirm">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>
          <div style="height: 20px;width: 1px;background-color: #e5e5e5;margin-left: 10px;margin-right: 10px;"></div>
          <a href="#" style='font-size: 12px;' @click="editDictionary(record)">编辑</a>
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
        isEdit: false,
        keyword: '',
        dictionaryColumns: tableTitleData.data.dictionaryColumns,
        menuList: [], //字典数据
        pagination: {
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
          showQuickJumper: true,
        },
        pageSize: 20,
        pageIndex: 1,
        menuItem: '',
      }
    },

    methods: {
      handleTableChange(pagination) {
        this.pageSize = pagination.pageSize
        this.pageIndex = pagination.current
        this.getMenuData()
      },
      setMenuItem(val) {
        this.menuItem = val
        this.getMenuData()
      },
      cleanKeyWord() {
        this.keyword = ''
        this.getMenuData()
      },
      async getMenuData() {
        let param = {
          keyword: this.keyword,
          parentId: this.menuItem.id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        };
        let res = await this.$http.post(this.$api.menupage, param);
        console.log(res)
        if (res.data.resultCode == "10000") {
          this.menuList = res.data.data.list;
        } else {
          this.menuList = []
        }
      },
      add() {
        this.$router.push({
          path: '/addsystem',
          query: {
            add: true,
            id: this.menuItem.id
          }
        });
      },
      confirm() {

      },
      editDictionary(item) {
        console.log(item)
        this.$router.push({
          path: '/addsystem',
          query: {
            add: false,
            id: item.menuId
          }
        });
      }
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
</style>

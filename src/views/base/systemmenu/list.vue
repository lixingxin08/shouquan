<template>
  <div class="content2">
    <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
      <div class="flexrow flexac">
        <div class='title_tx'>菜单名称:</div>
        <a-input maxLenght='50' v-model='keyword' placeholder="请输入菜单名称" />

        <a-button type="primary" class="title_btn" @click='getMenuData'>查询</a-button>
        <a-button @click='cleanKeyWord'>清除</a-button>
      </div>
    </div>
    <a-button type="primary" class='table-add-btn' @click="add">
      <a-icon two-tone-color="#ffffff" type="plus" /> 新增</a-button>
    <a-table :scroll="{  y: 610 }" :columns="dictionaryColumns" :data-source="menuList" bordered size="small"
      :pagination="$config.pagination" @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">
        {{(index+1)+(($config.pagination.current-1)*$config.pagination.pageSize)}}
      </template>
      <div slot="menuType" slot-scope="text, record,index">
        <div v-if="record.menuType==1000">子系统</div>
        <div v-if="record.menuType==2000">子栏目</div>
        <div v-if="record.menuType==3000">子菜单</div>
        <div v-if="record.menuType==4000">页签</div>
        <div v-if="record.menuType==5000">按钮</div>
      </div>
      <template slot="authFlag" slot-scope="text, record,index">
        <div v-if="record.authFlag==0">默认拥有类</div>
        <div v-if="record.authFlag==1">系统配置类</div>
        <div v-if="record.authFlag==2">客户操作类</div>
        <div v-if="record.authFlag==3">均可操作类</div>
      </template>
      <img href="#" slot="menuIcon" slot-scope="text, record,index" style='width: 30px;height: 30px;' :src="text">去维护</img>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="editDictionary(record)">编辑</a>
          <div style="height: 20px;width: 1px;background-color: #e5e5e5;margin-left: 20px;margin-right: 20px;"></div>
          <a href="#" v-if="record.childTotal<=0&&record.authTotal<=0" style='color: #FF0000;font-size: 12px;' @click='deleteItem(record)'>删除</a>

          <a href="#" v-else style='color: #CCCCCC;font-size: 12px;' >删除</a>
        </div>
      </template>
    </a-table>
 <a-popconfirm-delete ref='delete' @confirm="deletMenu">
    </a-popconfirm-delete>
  </div>
</template>

<script>
  import tableTitleData from "./table.json";
  export default {
<<<<<<< HEAD

=======
   
>>>>>>> e0a23f876db58690247cfc6fafd407ff1990c284
    data() {
      return {
        isShowDelete: false,
        keyword: '', //搜索条件
        dictionaryColumns: tableTitleData.data.dictionaryColumns,
        menuList: [], //字典数据
        pageSize: 20, //每页多少条
        pageIndex: 1, //当前页
        parentItem: '',
        deleteItem: {}
      }
    },

    methods: {
      handleTableChange(pagination) { //切换页数
        this.pageSize = pagination.pageSize
        this.pageIndex = pagination.current
        this.$config.pagination.page = pagination.current;
        this.$config.pagination.current = pagination.current;
        this.$config.pagination.pageSize = pagination.pageSize;
        this.getMenuData()
      },
      setMenuItem(val) { //设置当前的菜单
        this.parentItem = val
        this.getMenuData()
      },
      cleanKeyWord() { //清除搜索条件keyword
        this.keyword = ''
        this.getMenuData()
      },
      deleteItem(item){
        this.$refs.delete.show(item)
      },
      async getMenuData() { //获取菜单数据
        if (this.$config.pagination.current == 1)
          this.$config.pagination.total = 0
        this.menuList = []
        let param = {
          keyword: this.keyword,
          parentId: this.parentItem.id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        };
        let res = await this.$http.post(this.$api.menupage, param);
        if (res.data.resultCode == "10000") {
          if (res.data.data) {
            this.menuList = res.data.data.list;
            if (this.$config.pagination.current == 1)
              this.$config.pagination.total = res.data.data.length;
          }
        } else {
          this.menuList = []
        }
      },



      async deletMenu(item) { //删除菜单
        let param = {
          menuId: item.menuId,
        };
        let res = await this.$http.post(this.$api.menuremove, param);
        if (res.data.resultCode == "10000") {
          this.getMenuData()
          this.isShowDelete = !this.isShowDelete
          this.$message.success(res.data.resultMsg)
          this.$emit('refreshtree')
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      editDictionary(item) {
        console.log(item)
        this.$router.push({
          path: '/addsystem',
          query: {
            add: false,
            name: this.parentItem.name,
            grade: this.parentItem.levelType + 1,
            id: item.menuId
          }
        });
      },
      add() { //新增
        this.$router.push({
          path: '/addsystem',
          query: {
            add: true,
            grade: this.parentItem.levelType + 1,
            name: this.parentItem.name,
            id: this.parentItem.id,
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
</style>

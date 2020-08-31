<template>
  <div>
    <div v-if="!isEdit" class='flexrow flexac flexsb' style="margin-bottom: 20px;">
      <div class="flexrow flexac">
        <div class='title_tx'>字典名称:</div>
        <a-input placeholder="请输入字典名称" />

        <div class='title_tx' style="margin-left: 20px;">字典代码:</div>
        <a-input placeholder="请输入字典代码" />
        <a-button type="primary" class="title_btn">查询</a-button>
        <a-button>清除</a-button>
      </div>
      <a-button type="primary" @click="add">新增</a-button>
    </div>
    <a-table v-if="!isEdit" :scroll="{  y: 700 }"
      :columns="dictionaryColumns" :data-source="dictonaryList" bordered size="small" :pagination="pagination">
      <template slot="operation" slot-scope="text, record">
      <div class="flexrow flexac flexjc">
        <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirm" >
          <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
        </a-popconfirm>
        <div style="height: 20px;width: 1px;background-color: #e5e5e5;margin-left: 10px;margin-right: 10px;"></div>
        <a href="#" style='font-size: 12px;' @click="editDictionary">编辑</a>
      </div>
    </template>
    </a-table>
    <isEditDictionary v-if="isEdit"></isEditDictionary>
  </div>
</template>

<script>
    import tableTitleData from "./dictionary.json";
    import isEditDictionary from "./editdictionary.vue"
    export default{
      components:{
        isEditDictionary:isEditDictionary
      },
      data() {
        return {
         isEdit:false,
         dictionaryColumns:tableTitleData.data.dictionaryColumns,
         dictonaryList:[{}],//字典数据
         pagination: {
           pageSize: 20, // 默认每页显示数量
           showSizeChanger: true, // 显示可改变每页数量
           pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
           showQuickJumper: true,
           showSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
         }
        }
      },
   methods:{
     add(){
       this.$emit("addDictionary")
     },
     confirm(){

     },
     editDictionary(){
       this.isEdit=!this.isEdit
     }
   }
    }

</script>

<style>
  .title_tx{
    flex-shrink: 0;
   font-size: 12px;
   font-family: Microsoft YaHei, Microsoft YaHei-Regular;
   font-weight: 400;
   text-align: left;
   margin-right: 20px;
   color: #333333;
  }
  .title_btn{
    margin-left: 20px;
    margin-right: 20px;
  }
</style>

<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">

    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_brand">
        <div class="edit_item_brand_title3"><a style="color: #FF0000;">*</a>品牌名称:</div>
        <div class='edit_a_input_brand'>
          <a-input v-model='typeName' :maxLength='50' placeholder="请输入品牌名称" />
        </div>

        <div class="edit_item_brand_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>
      <div class="flexrow flexac edit_item_brand">
        <div class="edit_item_brand_title3"><a style="color: #FF0000;">*</a>品牌代码:</div>
        <div class='edit_a_input_brand'>
          <a-input v-model='typeCode' :maxLength='50' placeholder="请输入品牌代码" />
        </div>

        <div class="edit_item_brand_toast">注：50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号</div>
      </div>

      <div class="flexrow flexac edit_item_brand">
        <div class="edit_item_brand_title3">品牌描述:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea class='edit_a_input_brand' :rows="5" v-model='remark' :maxLength='250' placeholder="请输入描述"
            @change="onChangeConfig" />
          <div class="edit_number">{{num}}/250</div>
        </div>
      </div>

      <div class="flexrow edit_item_brand_title3" style="width: 100%; margin-top: 40px;justify-item: flex-start;margin-bottom: 10px;font-size: 16px;"><a
          style="color: #FF0000;">*</a>设备类型</div>

      <a-table :columns="dictionaryColumns" :data-source="typeList" :pagination='false' :bordered='true' size='small'
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template slot="index" slot-scope="text, record,index">
          {{index+1}}
        </template>
      </a-table>

      <div class="flexrow flexjc" style="margin-top: 30px;margin-bottom: 100px;">
        <a-button type="primary" @click='submit'>保存</a-button>
        <a-button style="margin-left: 60px;" @click='reset'>重置</a-button>
      </div>
    </div>

  </div>
</template>

<script>
  import tableTitleData from "../table.json";


  export default {

    data() {
      return {
        dictionaryColumns: tableTitleData.data.adddictionaryColumns,
        typeName: '',
        typeCode: '',
        remark: '', //备注
        num: 0, //描述长度
        typeList: [],
        selectedRowKeys: [],
        id: '',
      }
    },
    created() {
      this.id = this.$route.query.id
      if (this.id) { //编辑
        this.getBrandInfo();
      } else {
        this.getTypeList();
      }
    },
    methods: {
      /* 重置*/
      reset() {
        if (this.id) {
          this.getBrandInfo()
        } else {
          this.typeName = ''
          this.typeCode = ''
          this.remark = ''
          this.num = 0
          this.selectedRowKeys = []
        }
      },
      /* 提交设备类型*/
      async submit() {
        if (!this.typeName) {
          this.$message.warning('品牌名称不能为空')
          return
        }
        if (!this.typeCode) {
          this.$message.warning('品牌代码不能为空')
          return
        }
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请关联设备类型')
          return
        }
        let param = {
          brandId: this.id == '' ? '' : this.id,
          brandName: this.typeName, //品牌名称
          brandCode: this.typeCode, //品牌代码
          remark: this.remark, //描述
          typeIds: this.getTypeListIds()
        }
        let res = await this.$http.post(this.$api.devicebrandsform, param)
        if (res.data.resultCode == 10000) {
         // if (!this.id) {
            this.$router.go(-1)
        //  }

          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 修改字典描述*/
      onChangeConfig(e) {
        this.num = this.remark.length
      },
      /* 获取选择的类型列表*/
      getTypeListIds() {
        let typelist1 = []
        for (let i = 0; i < this.selectedRowKeys.length; i++) {
          typelist1.push(this.typeList[this.selectedRowKeys[i]].deviceTypeId)
        }
        return typelist1
      },
      /* 获取设备类型*/
      async getBrandInfo() {
        let param = { 
          brandId: this.id
        }
        let res = await this.$http.post(this.$api.devicebrandsdetail, param);
        if (res.data.resultCode == 10000) {

          this.typeName = res.data.data.brandName
          this.typeCode = res.data.data.brandCode
          this.remark = res.data.data.remark ? res.data.data.remark : ''
          this.num = this.remark.length
          this.typeList = res.data.data.deviceTypeList
          if (this.typeList.length > 0) {
            this.selectedRowKeys = []
            let that = this
            for (let i = 0; i < this.typeList.length; i++) {
              if (this.typeList[i].select)
                this.selectedRowKeys.push(i)
            }
          }
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 选择类型 */
      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      },
      /* 获取设备类型列表*/
      async getTypeList() {
        let param = {
          keyword: '',
          serviceType: '',
          pageIndex: 1,
          pageSize: 200
        }
        let res = await this.$http.post(this.$api.devicetypepage, param)
        if (res.data.resultCode == 10000) {
          this.typeList = res.data.data.list
        } else {
          this.typeList = []
        }
      }
    },
  }
</script>

<style>
  .edit_item_brand_title3 {
    width: 70px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item_brand {
    margin: 0 auto;
    margin-top: 24px;
  }

  .edit_item_brand_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input_brand {
    width: 667px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
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

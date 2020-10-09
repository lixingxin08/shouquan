<template>

  <div class="flexcolumn" style="background-color: #FFFFFF;">

    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title1_zzx"><a style="color: #FF0000;">*</a>角色名称:</div>
        <a-input class='edit_a_input_zzx' v-model='config.roleName' :maxLength='16' placeholder="2-16个字，支持中英文" />
      </div>
      <div class="flexrow flexac edit_item_zzx">
        <div class="edit_item_zzx_title1_zzx">角色描述:</div>
        <a-input class='edit_a_input_zzx' :maxLength='250' v-model='config.remark' placeholder="250字以内，格式不限制" />
      </div>
      <div class="flexrow flexac edit_item_zzx" style="align-items: flex-start;">

        <div class="edit_item_zzx_title1_zzx"><a style="color: #FF0000;">*</a>角色权限配置:</div>
        <div class="flexcolumn selet_bg_zzx">
          <div class="flexrow  flexac">
            <div style="flex-shrink: 0;margin-right: 7px;width: 100px;text-align: end;font-size: 14px;">
              <div style="color: #333333;"> 服务子系统:</div>

            </div>
            <a-select :value="selectValue?selectValue:'全部'" class='selet_bg_zzx' @change="handleSelectChange">
              <a-select-option v-for='(item,index) in selectList' :key='index' :value="item.menuId">
                {{item.menuName}}
              </a-select-option>
            </a-select>
          </div>
          <div class="tree_box_zzx">
            <is-left :treedata="treedata" @selectdata="getselectdata" :selectable="true" :replaceFields="replaceFields"
              :checkedKeys="defaultExpandedKeys" @checkedKeyslist="checkedKeyslist" v-if="showtree"></is-left>
          </div>
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
  import isLeft from "../../../../components/tree/check_seltree.vue";
  export default {
    components: {
      isLeft,
    },
    data() {
      return {
        selectValue: '', //事件选择
        selectList: [{
          menuId: '',
          menuName: '全部'
        }], //事件类型
        config: {}, //事件详情
        id: "",
        treedata: "",
        replaceFields: {
          title: "name",
          key: "id",
        },
        defaultExpandedKeys: [],
        defaultExpandedKeysUpload: [],
        data: "",
        showtree: false,
        num: 0 //描述长度
      }
    },
    created() {
      this.id = this.$route.query.id
      if (this.id) { //编辑
        this.getDetail();
      }
      this.getCombobox()
      this.gettree()

    },
    methods: {
      /* 提交事件*/
      async submit() {
        if (!this.config.roleName) {
          this.$message.warning('角色名称不能为空')
          return
        }
        if (this.config.roleName.length < 2) {
          this.$message.warning('角色名称要求2-16位')
          return
        }
        if (!this.vify_cn16(this.config.roleName)) {
          this.$message.warning('角色名称格式不对')
          return
        }
        if (this.defaultExpandedKeysUpload.length <= 0) {
          this.$message.warning('请配置角色权限')
          return
        }
        this.config.menuIdList = this.defaultExpandedKeysUpload
        this.config.operatorId = JSON.parse(localStorage.getItem('usermsg')).accountId
        let res = await this.$http.post(this.$api.rolesystemform, this.config)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg);
        } else {
          this.$message.error(res.data.resultMsg);
        }
      },
      /* 获取事件列表*/
      async getDetail() {
        let param = {
          roleId: this.id
        }
        let res = await this.$http.post(this.$api.rolesystemdetail, param);
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
        }
      },
      /* 授权类型下拉选择 */
      handleSelectChange(e) {
        this.selectValue = e
        this.gettree()
      },
      /* 获取业务类别*/
      async getCombobox() {
        let param = {

        }
        let res = await this.$http.post(this.$api.rolesystemrolelist, param)
        if (res.data.resultCode == 10000) {
          this.selectList = this.selectList.concat(res.data.data)
        }
      },
      /* 重置*/
      reset() {
        if (this.id) {
          this.getDetail()
          this.gettree()
        } else {
          this.defaultExpandedKeys = []
          this.config = {}
        }
      },
      /* 描述字符长度*/
      onChangeConfig() {
        this.num = this.config.remark.length
      },
      /* 获取角色roles List*/
      async gettree() {
        this.showtree = false;
        this.data = []
        let param = {
          systemId: this.selectValue ? this.selectValue.substring(0, 3) : '',
          roleId: this.id
        }
        let res = await this.$http.post(this.$api.rolesystemroletreelist, param);
        if (res.data.resultCode == "10000") {
          this.data = res.data.data;
        } else {
          this.$message.error(res.data.resultMsg);
        }
        this.setdata();
        this.showtree = true;
      },

      toTree(data) {
        let result = [];
        if (!Array.isArray(data)) {
          return result;
        }
        data.forEach((item) => {
          delete item.children;
        });
        let map = {};
        data.forEach((item) => {
          map[item.id] = item;
        });
        data.forEach((item) => {
          let parent = map[item.pid];
          if (parent) {
            (parent.children || (parent.children = [])).push(item);
          } else {
            result.push(item);
          }
        });
        return result;
      },
      setdata() {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].checked) {
            this.defaultExpandedKeysUpload.push(this.data[i].id);
            if (!this.data[i].isParent)
              this.defaultExpandedKeys.push(this.data[i].id);
          }
        }
        this.treedata = this.toTree(this.data);
      },
      //获取树搜索数据
      getsearchdata(val) {
        this.issearchdata = val;
        this.getareatree();
        if (val == "") {
          return;
        }

        this.filterdata = [];
        this.setfilltertree(this.treedata, this.issearchdata);
      },

      //过滤树搜索数据
      setfilltertree(datas, filtersdata) {
        let _that = this;
        for (var i in datas) {
          let name = datas[i].name + "";
          if (name.search(_that.issearchdata) != -1) {
            _that.filterdata.push(datas[i]);
          }
          if (datas[i].children) {
            _that.setfilltertree(datas[i].children);
          }
        }
        _that.treedata = _that.toTree(this.filterdata);
      },
      getselectdata(val) {
        this.isselectdata = val;
        this.isselectdata.id = val.id;
        this.isselectdata.name = val.name;
        this.isselectdata.pid = val.pid;
      },
      checkedKeyslist(val) {
        this.defaultExpandedKeys = val
        this.defaultExpandedKeysUpload = val
      },
    },
  }
</script>

<style>
  .edit_item_zzx_title1_zzx {
    width: 100px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item_zzx {

    margin: 0 auto;
    margin-top: 24px;
  }

  .selet_bg_zzx {
    padding: 10px;
    width: 667px;
    border: 1px solid #dcdcdc;
  }

  .selet_bg_zzx {
    width: 667px;
  }

  .edit_item_zzx_toast {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    margin-left: 20px;
  }

  .edit_a_input_zzx {
    width: 667px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
  }

  .tree_box_zzx {
    width: 600px;
    margin: 0 auto;
    background-color: #FFFFFF;
  }

  .edit_number_zzx {
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

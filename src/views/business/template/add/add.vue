<template>
  <div class="isedit">
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>模板名称:
      </div>
      <div>
        <a-input
          class="edit_a_input"
          :maxLength="30"
          v-model="form.templateName"
          placeholder="请输入模板名称"
        />
      </div>
      <div class="edit_item_toast">注:中英文，30字以内</div>
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">
        <span class="col_red">*</span>模板状态:
      </div>
      <a-select
        placeholder="请选择"
        option-filter-prop="children"
        style="width: 667px;margin-right:20px;height:36px;border-radius: 8px;"
        v-model="form.statusCode"
        @change="handleChange"
      >
        <a-select-option
          v-for="(item,index) in statusCode"
          :key="index"
          :value="item.id"
        >{{item.val}}</a-select-option>
      </a-select>
    </div>

    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">模板描述:</div>
      <div style="position: relative;">
        <a-textarea
          class="edit_a_input"
          :rows="5"
          :maxLength="255"
          placeholder="255字以内，格式不限制"
          v-model="form.remark"
        />
        <div class="edit_number">{{remarklen}}/255</div>
      </div>
    </div>
    <div class="flexrow flexac edit_item">
      <div class="edit_item_title">权限配置:</div>
      <div style="position: relative;">
        <div class="templatetree edit_item_tree">
          <div class="flex_f templatetree_sel">
            <span>服务子系统：</span>
            <div>
              <a-select
                show-search
                placeholder="全部"
                option-filter-prop="children"
                style="width:200px;margin-right:20px;height:36px;border-radius: 8px;"
                v-model="treeprame.templateId"
                @change="handleChange2"
                v-if="showtree"
              >
                <a-select-option value="all">全部</a-select-option>
                <a-select-option
                  v-for="(item,index) in oldtreedata"
                  :key="index"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
            </div>
          </div>
          <div>
            <is-left
              :treedata="treedata"
              :replaceFields="replaceFields"
              :defaultExpandedKeys="defaultExpandedKeys"
              :checkedKeys="checkedKeys"
              @checkedKeyslist="getcheckedKeys"
              @selectdata="getselectdata"
              :selectable="true"
              v-if="showtree"
            ></is-left>
          </div>
        </div>
      </div>
    </div>
    <div class="flexrow" style="margin-top: 30px;justify-item: flex-start;margin-left: 325px;">
      <a-button @click="getform()">保存</a-button>
      <a-button type="primary" style="margin-left: 20px;" @click="reset()">重置</a-button>
    </div>
  </div>
</template>

<script>
import isLeft from "../../../../components/tree/check_seltree.vue";
export default {
  name:'addtemplate',
  components: {
    isLeft,
  },
  data() {
    return {
      sel_data: "",
      form: {
        templateId: "",
        templateName: "",
        statusCode: "",
        remark: "",
        menuList: [],
        operatorId: JSON.parse(localStorage.getItem("usermsg")).accountId,
      },
      replaceFields: {
        title: "name",
        key: "id",
      },
      defaultExpandedKeys: [],
      checkedKeys: [],
      treedata: "",
      oldtreedata: "",
      detailparam: {
        templateId: "",
      },
      data: "",
      showtree: false,
      statusCode: [
        { id: 1, val: "启用" },
        { id: 0, val: "备用" },
        { id: 2, val: "停用" },
      ],
      islist: [],
      treeprame: {
        templateId: "",
      },
    };
  },
  computed: {
    isdefaultChecked() {
      if (this.form.defaultChecked == 0) {
        return false;
      } else {
        return true;
      }
    },
    remarklen() {
      return this.form.remark.length;
    },
  },
  created() {
     this.treeprame.templateId=''
    if (this.$route.query.type == "edit") {
      this.detailparam.templateId = this.$route.query.id;
      this.treeprame.templateId = this.$route.query.id; 
      this.getdetail();
      this.gettree();
    } else {     
      this.gettree();
    }
  },
  methods: {
    //数据字典树接口
    async gettree() {
      this.showtree = false;
      let res = await this.$http.post(this.$api.templatetree, this.treeprame);
      if (res.data.resultCode == "10000") {
        this.data = res.data.data;
      }
      this.setdata();
      this.showtree = true;
      this.oldtreedata = this.treedata;
      console.log(this.treedata, 6555555);
    },

    //详情接口
    async getdetail() {
      this.showtree = false;
      let res = await this.$http.post(
        this.$api.templatedetail,
        this.detailparam
      );
      if (res.data.resultCode == "10000") {
        this.form = res.data.data;
        this.data = this.form.menuTree;
        if (this.data!==undefined) {
           this.setdata();
             this.showtree = true;
        }
       
      
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    //表单接口
    async getform() {
      if (!this.vify_cn(this.form.templateName)) {
        this.form.templateName = "";
        return this.$message.error("模板名称格式不正确");
      }
      if (this.form.templateName == "") {
        return this.$message.error("请输入模板名称");
      }
      if (this.form.statusCode == "") {
        return this.$message.error("请选择模板状态");
      }
      if (this.form.menuList == "") {
        return this.$message.error("请选择权限配置");
      }
      this.form.operatorId = 1;
      let res = await this.$http.post(this.$api.templateform, this.form);
      if (res.data.resultCode == "10000") {
        this.$message.success(res.data.resultMsg);
        this.$router.go(-1);
      } else {
        return this.$message.error(res.data.resultMsg);
      }
    },
    reset() {
      this.$router.go(0);
    },

    handleChange(value, key) {
      console.log(this.form.typeCode, 88);
    },
    handleChange2(value, key) {
      console.log(this.treeprame.templateId, 88);
      this.showtree = false;
      this.treedata = this.oldtreedata;
      if (this.treeprame.templateId == "all") {
        this.treedata = this.oldtreedata;
      } else {
        let filterTreeNode = "";
        for (let i = 0; i < this.treedata.length; i++) {
          if (this.treedata[i].id == this.treeprame.templateId) {
            filterTreeNode = this.treedata[i];
          }
        }
        this.treedata = Array(filterTreeNode);
      }
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
      this.form.menuList = [];
      for (let i = 0; i < this.data.length; i++) {
        this.form.menuList.push(this.data[i].id);
        if (this.data[i].open == true) {
          this.defaultExpandedKeys.push(this.data[i].id);
        }
        if (this.data[i].checked == true) {
          this.checkedKeys.push(this.data[i].id);
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
      this.istotal.type = 1;
    },
    getcheckedKeys(val) {
      this.form.menuList = val;
      console.log(val, 44444);
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
.edit_item_tree {
  min-height: 300px;
}
.edit_a_input {
  width: 667px;
  height: 32px;
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

.dialogaddtem {
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
.dialogaddtem_t {
  width: 920px;
  height: 72px;
  background-color: #1890ff;
  color: #fff;
  font-size: 24px;
  padding: 0 40px;
}
.dialogaddtem_c {
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
.dialogaddtem_c_t {
  height: 32px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.dialogaddtem_inp {
  width: 744px;
  height: 32px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}
.map {
  width: 840px;
  height: 472px;
}
.dialogaddtem_f {
  margin-top: 40px;
}
</style>

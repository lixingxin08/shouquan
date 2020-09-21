<template>
  <a-layout-sider v-model="iscollapsed" :trigger="null" collapsible collapsedWidth="0">
    <div class="logo_box flex_a">
      <img class="logo_img" src="../../assets/nav_img/logo@2x.png" alt />
    </div>
    <a-menu theme="dark" mode="inline">
      <!--  <a-sub-menu v-if='menudata' v-for='(item,index) in menudata' :key='index'>
        <div slot="title" class="flex_F">
          <img class="nav_icon" src="../../assets/nav_img/icon_z_jichu@2x.png" alt />
          <span class="nav_title">基础配置</span>
        </div>
        <a-menu-item v-for='(item2,index2) in item.children' :key="index2">
          <span @click="gotoUrl(item.url)">行政区划</span>
        </a-menu-item>
      </a-sub-menu>-->
      <template v-for="item in menudata">
        <a-menu-item v-if="!item.children" :key="item.menuName">
          <router-link :to="{path:item.linkURL}">
            <span>{{item.menuName}}</span>
          </router-link>
        </a-menu-item>
        <sub-menu v-else :key="item.id" :menu-info="item"></sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { Menu } from "ant-design-vue";
const SubMenu = {
  template: `
        <a-sub-menu :key="menuInfo.menuName" v-bind="$props" v-on="$listeners">
          <span slot="title">
           <img style='width: 14px;height: 14px;margin-right:5px ' :src="menuInfo.menuIcon" alt /><span>{{ menuInfo.menuName }}</span>
          </span>
          <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.menuName" >
           <router-link :to="item.linkURL">
                    <span>{{item.menuName}}</span>
                  </router-link>
            </a-menu-item>
            <sub-menu v-else :key="item.menuName" :menu-info="item" />
          </template>
        </a-sub-menu>
      `,
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};

export default {
  name: "isnav",
  data() {
    return {
      menudata: [], //树数据
    };
  },
  components: {
    "sub-menu": SubMenu,
  },

  created() {
    this.getMenuList();
  },
  methods: {
    gotoUrl(url) {
      console.log("-");
      // this.$store.commit('setNavValue', value);
      // this.$router.push(url)
    },
    async getMenuList() {
      // let json = [
      //   {
      //     id: "1",
      //     name: "基础配置",
      //     linkURL: "/administrativedivision",
      //     levelType: "1",
      //     menuIcon:
      //       "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1147359824,2556928922&fm=26&gp=0.jpg",
      //     parentId: "",
      //   },
      //   {
      //     id: "1-1",
      //     name: "行政区划",
      //     levelType: "2",
      //     linkURL: "/administrativedivision",
      //     parentId: "1",
      //   },
      //   {
      //     id: "1-2",
      //     name: "数字字典",
      //     levelType: "2",
      //     linkURL: "/dictionary",
      //     parentId: "1",
      //   },
      //   {
      //     id: "1-3",
      //     name: "运行参数",
      //     levelType: "2",
      //     linkURL: "/RunParameters",
      //     parentId: "1",
      //   },
      //   {
      //     id: "4",
      //     name: "设备配置",
      //     levelType: "1",
      //     parentId: "",
      //     linkURL: "/dictionary",
      //   },
      //   {
      //     id: "5",
      //     name: "日志管理",
      //     levelType: "1",
      //     parentId: "",
      //     linkURL: "/dictionary",
      //   },
      // ];
   this.menudata=this.toTree(JSON.parse(localStorage.getItem('usermsg')).navlist)
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
        map[item.menuId] = item;
      });
      data.forEach((item) => {
        let parent = map[item.parentId];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    },
  },

  props: {
    iscollapsed: Boolean,
  },
};
</script>
<style scoped>
.nav_icon {
  width: 14px;
  height: 14px;
}

.nav_title {
  margin-left: 10px;
}

.rizhi {
  margin-left: 30px;
}

.logo_img {
  width: 120px;
  height: 42px;
}

.logo_box {
  width: 100%;
  height: 42px;
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>

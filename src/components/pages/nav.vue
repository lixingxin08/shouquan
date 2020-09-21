<template>
  <a-layout-sider v-model="iscollapsed" :trigger="null" collapsible collapsedWidth="0">
    <div class="logo_box flex_a">
      <img class="logo_img" src="../../assets/nav_img/logo@2x.png" alt />
    </div>
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[$route.name]" :selectedKeys="[$route.name]">
      <!--  <a-sub-menu v-if='menudata' v-for='(item,index) in menudata' :key='index'>
        <div slot="title" class="flex_F">
          <img class="nav_icon" src="../../assets/nav_img/icon_z_jichu@2x.png" alt />
          <span class="nav_title">基础配置</span>
        </div>
        <a-menu-item v-for='(item2,index2) in item.children' :key="index2">
          <span @click="gotoUrl(item.url)">行政区划</span>
        </a-menu-item>
      </a-sub-menu> -->
      <template v-for="item in menudata">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon type="pie-chart" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
  import {
    Menu
  } from 'ant-design-vue';
  const SubMenu = {
    template: `
        <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
          <span slot="title">
            <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
          </span>
          <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.key">
              <a-icon type="pie-chart" />
              <span>{{ item.title }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.key" :menu-info="item" />
          </template>
        </a-sub-menu>
      `,
    name: 'SubMenu',
    // must add isSubMenu: true
    isSubMenu: true,
    props: {
      ...Menu.SubMenu.props,
      // Cannot overlap with properties within Menu.SubMenu.props
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
      'sub-menu': SubMenu,
    },

    created() {
      this.getMenuList()
    },
    methods: {

      gotoUrl(url) {
        this.$store.commit('setNavValue', value);
        this.$router.push(url)
      },
      async getMenuList() {
        if (localStorage.getItem("menuList")) {
          this.menudata = this.toTree(JSON.parse(localStorage.getItem('menuList')))
        }
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
    },
    computed: {

      openkey() {
        if (
          this.$route.name == "administrativedivision" ||
          this.$route.name == "dictionary" ||
          this.$route.name == "RunParameters" ||
          this.$route.name == "systemmenu"
        ) {
          return ["base"];
        }
        if (
          this.$route.name == "devicetypes" ||
          this.$route.name == "brand" ||
          this.$route.name == "DeviceModel" ||
          this.$route.name == "deviceevent" ||
          this.$route.name == "devicewarning"
        ) {
          return ["device"];
        }
        if (
          this.$route.name == "customerprofile" ||
          this.$route.name == "essentialinformation" ||
          this.$route.name == "dpartmentManagement" ||
          this.$route.name == "personnelManagement" ||
          this.$route.name == "project"
        ) {
          return ["customerpro"];
        }
        if (
          this.$route.name == "wechat" ||
          this.$route.name == "email" ||
          this.$route.name == "sms"
        ) {
          return ["message"];
        }
        if (
          this.$route.name == "template" ||
          this.$route.name == "menuauthorization" ||
          this.$route.name == "zoningauthorization" ||
          this.$route.name == "modelauthorization" ||
          this.$route.name == "alertauthorization" ||
          this.$route.name == "messageauthorization"
        ) {
          return ["business"];
        }
        if (
          this.$route.name == "CustomerAuthorization" ||
          this.$route.name == "Myclients"
        ) {
          return ["MaintenanceAuthorization"];
        }
        if (
          this.$route.name == "SystemRole" ||
          this.$route.name == "systemAccount" ||
          this.$route.name == "CustomerRole" ||
          this.$route.name == "CustomerUser" ||
          this.$route.name == "MyAccount" ||
          this.$route.name == "project"
        ) {
          return ["accountManagement"];
        }
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
    vertical-align: middle;
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

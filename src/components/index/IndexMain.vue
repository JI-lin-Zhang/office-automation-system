<template>
  <div style="position: relative">
    <bread-crumbs :title="title" class="bread-crumbs"></bread-crumbs>
    <router-view class="router-view"></router-view>
  </div>
</template>
<script>
import menu from "@/utils/menu";
export default {
  data() {
    return {
      menuList: [],
      role: "",
      currentIndex: -2,
      itemMenu: [],
      title: "",
      isCollapse:false
    };
  },
  mounted() {
    let menus = menu.list();
    this.menuList = menus;
    this.role = this.$storage.get("role");
  },
  methods: {
    menuHandler(menu) {
      this.$router.push({
        name: menu.tableName,
      });
      this.title = menu.menu;
    },
    titleChange(index, menus) {
      this.currentIndex = index;
      this.itemMenu = menus;
      console.log(menus);
    },
    homeChange(index) {
      this.itemMenu = [];
      this.title = "";
      this.currentIndex = index;
      this.$router.push({
        name: "home",
      });
    },
    centerChange(index) {
      this.itemMenu = [
        {
          buttons: ["新增", "查看", "修改", "删除"],
          menu: "修改密码",
          tableName: "updatePassword",
        },
        {
          buttons: ["新增", "查看", "修改", "删除"],
          menu: "个人信息",
          tableName: "center",
        },
      ];
      this.title = "";
      this.currentIndex = index;
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.router-view {
  width: 100%;
  padding: 0 5px;
  background: #ffffff;
  box-sizing: border-box;
}

.bread-crumbs {
  width: 96%;
  box-sizing: border-box;
}
</style>

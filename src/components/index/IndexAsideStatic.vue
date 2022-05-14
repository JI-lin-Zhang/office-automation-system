<template>
  <div>
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      v-show="role == item.roleName"
      style="text-align: left; border: 0; margin-top: 5px"
      v-for="item in menuList"
      :key="item.roleName"
    >
      <el-menu-item index="0" @click="menuHandler('')">
        <i class="el-icon-s-home" />
        <span>首页</span>
      </el-menu-item>
      <el-submenu
        v-for="(menu, index) in item.backMenu"
        :key="menu.menu"
        :index="(index+1) + ''"
      >
        <template slot="title">
          <i :class="icons[index + 2]"></i>
          <span>{{ menu.menu }}</span>
        </template>
        <el-menu-item
          @click="menuHandler(child.tableName)"
          v-for="(child, sort) in menu.child"
          :key="sort"
          :index="index + 1 + ''"
          >{{ child.menu }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import menu from "@/utils/menu";
export default {
  data() {
    return {
      menuList: [],
      dynamicMenuRoutes: [],
      role: "",
      icons: [
        "el-icon-s-cooperation",
        "el-icon-s-order",
        "el-icon-s-platform",
        "el-icon-s-fold",
        "el-icon-s-unfold",
        "el-icon-s-operation",
        "el-icon-s-promotion",
        "el-icon-s-release",
        "el-icon-s-ticket",
        "el-icon-s-management",
        "el-icon-s-open",
        "el-icon-s-shop",
        "el-icon-s-marketing",
        "el-icon-s-flag",
        "el-icon-s-comment",
        "el-icon-s-finance",
        "el-icon-s-claim",
        "el-icon-s-custom",
        "el-icon-s-opportunity",
        "el-icon-s-data",
        "el-icon-s-check",
        "el-icon-s-grid",
        "el-icon-menu",
        "el-icon-chat-dot-square",
        "el-icon-message",
        "el-icon-postcard",
        "el-icon-position",
        "el-icon-microphone",
        "el-icon-close-notification",
        "el-icon-bangzhu",
        "el-icon-time",
        "el-icon-odometer",
        "el-icon-crop",
        "el-icon-aim",
        "el-icon-switch-button",
        "el-icon-full-screen",
        "el-icon-copy-document",
        "el-icon-mic",
        "el-icon-stopwatch",
      ],
      menulistStyle: "vertical",
      menulistBorderBottom: {},
    };
  },
  mounted() {
    const menus = menu.list();
    this.menuList = menus;
    this.role = this.$storage.get("role");
  },
  created() {
    setTimeout(() => {
      this.menulistStyleChange();
    }, 10);
    this.icons.sort(() => {
      return 0.5 - Math.random();
    });
    this.lineBorder();
  },
  methods: {
    lineBorder() {
      let style = "vertical";
      let w = "0px";
      let s = "solid";
      let c = "#ccc";
      if (style == "vertical") {
        this.menulistBorderBottom = {
          borderBottomWidth: w,
          borderBottomStyle: s,
          borderBottomColor: c,
        };
      } else {
        this.menulistBorderBottom = {
          borderRightWidth: w,
          borderRightStyle: s,
          borderRightColor: c,
        };
      }
    },
    menuHandler(name) {
      let router = this.$router;
      name = "/" + name;
      router.push(name);
    },
    // 菜单
    setMenulistHoverColor() {
      let that = this;
      this.$nextTick(() => {
        document.querySelectorAll(".menulist .el-menu-item").forEach((el) => {
          el.addEventListener("mouseenter", (e) => {
            e.stopPropagation();
            el.style.backgroundColor = "rgba(38, 198, 218, 1)";
          });
          el.addEventListener("mouseleave", (e) => {
            e.stopPropagation();
            el.style.backgroundColor = "#F5F7FA";
          });
          el.addEventListener("focus", (e) => {
            e.stopPropagation();
            el.style.backgroundColor = "rgba(38, 198, 218, 1)";
          });
        });
        document
          .querySelectorAll(".menulist .el-submenu__title")
          .forEach((el) => {
            el.addEventListener("mouseenter", (e) => {
              e.stopPropagation();
              el.style.backgroundColor = "rgba(38, 198, 218, 1)";
            });
            el.addEventListener("mouseleave", (e) => {
              e.stopPropagation();
              el.style.backgroundColor = "#F5F7FA";
            });
          });
      });
    },
    setMenulistIconColor() {
      this.$nextTick(() => {
        document
          .querySelectorAll(
            ".menulist .el-submenu__title .el-submenu__icon-arrow"
          )
          .forEach((el) => {
            el.style.color = "rgba(153, 153, 153, 1)";
          });
      });
    },
    menulistStyleChange() {
      this.setMenulistIconColor();
      this.setMenulistHoverColor();
      this.setMenulistStyleHeightChange();
      let str = "vertical";
      if ("horizontal" === str) {
        this.$nextTick(() => {
          document
            .querySelectorAll(".el-container .el-container")
            .forEach((el) => {
              el.style.display = "block";
              el.style.paddingTop = "80px"; // header 高度
            });
          document.querySelectorAll(".el-aside").forEach((el) => {
            el.style.width = "100%";
            el.style.height = "60px";
            el.style.paddingTop = "0";
          });
          document
            .querySelectorAll(".index-aside .index-aside-inner")
            .forEach((el) => {
              el.style.paddingTop = "0";
            });
        });
      }
      if ("vertical" === str) {
        this.$nextTick(() => {
          document
            .querySelectorAll(".index-aside .index-aside-inner")
            .forEach((el) => {
              el.style.paddingTop = "80px";
            });
        });
      }
    },
    setMenulistStyleHeightChange() {
      this.$nextTick(() => {
        document
          .querySelectorAll(".menulist-item>.el-menu--horizontal>.el-menu-item")
          .forEach((el) => {
            el.style.height = "60px";
            el.style.lineHeight = "60px";
          });
        document
          .querySelectorAll(
            ".menulist-item>.el-menu--horizontal>.el-submenu>.el-submenu__title"
          )
          .forEach((el) => {
            el.style.height = "60px";
            el.style.lineHeight = "60px";
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

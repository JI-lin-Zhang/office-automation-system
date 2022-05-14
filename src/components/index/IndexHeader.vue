<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64">
      <span
        style="color: white; font-size: 20px; float: left; margin-left: 25px"
        >办公自动化系统
      </span>
      <!--  -->
      <el-menu-item style="float: right; color: white" @click="onLogout"
        >退出登录</el-menu-item
      >
      <el-dropdown
        style="float: right"
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          个人中心
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="text-align: center">
          <el-dropdown-item
            >身份：{{ role }} 用户名：{{
              this.$storage.get("adminName")
            }}</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-edit" command="a"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-user" command="b"
            >个人信息</el-dropdown-item
          >
          <el-dropdown-item v-if="role === '管理员'" icon="el-icon-circle-plus-outline" command="c"
            >新增员工</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <!-- 对话框 -->
    <el-dialog :visible.sync="centerDialogVisible" width="50%" center>
      <h1 style="text-align: center">{{ diaTitle }}</h1>
      <div v-if="diaTitle === '修改密码'">
        <update-password @closeDialog="closeDialog" />
      </div>
      <div v-if="diaTitle === '个人信息'">
        <center @closeDialog="closeDialog" />
      </div>
      <div v-if="diaTitle === '新增员工'">
        <register @closeDialog="closeDialog"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import center from "../../views/center.vue";
import Register from "../../views/register.vue";
import UpdatePassword from "../../views/update-password.vue";
export default {
  components: { center, Register, UpdatePassword },
  data() {
    return {
      centerDialogVisible: false,
      diaTitle: "",
      role: this.$storage.get("role"),
    };
  },
  created() {
    this.setHeaderStyle();
  },
  mounted() {
    let sessionTable = this.$storage.get("sessionTable");
    this.$http({
      url: sessionTable + "/session",
      method: "get",
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.user = data.data;
      } else {
        let message = this.$message;
        message.error(data.msg);
      }
    });
  },
  methods: {
    handleCommand(command) {
      if (command === "a") {
        this.centerDialogVisible = true;
        this.diaTitle = "修改密码";
      } else if (command === "b") {
        this.centerDialogVisible = true;
        this.diaTitle = "个人信息";
      } else if (command === "c") {
        this.centerDialogVisible = true;
        this.diaTitle = "新增员工";
      }
    },
    onLogout() {
      let storage = this.$storage;
      let router = this.$router;
      storage.remove("Token");
      router.replace({
        name: "login",
      });
    },
    onIndexTap() {
      window.location.href = `${this.$base.indexUrl}`;
    },
    setHeaderStyle() {
      this.$nextTick(() => {
        document
          .querySelectorAll(".navbar .right-menu .logout")
          .forEach((el) => {
            el.addEventListener("mouseenter", (e) => {
              e.stopPropagation();
              el.style.backgroundColor = this.heads.headLogoutFontHoverBgColor;
              el.style.color = this.heads.headLogoutFontHoverColor;
            });
            el.addEventListener("mouseleave", (e) => {
              e.stopPropagation();
              el.style.backgroundColor = "transparent";
              el.style.color = this.heads.headLogoutFontColor;
            });
          });
      });
    },
    closeDialog() {
      this.centerDialogVisible = false;
    },
  },
};
</script>


<style lang="scss" scoped>
.el-dialog__header {
  padding: 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

<template>
  <el-container>
    <el-header><IndexHeader /></el-header>
    <el-container>
      <el-aside width="auto"><IndexAside/></el-aside>
      <el-main><IndexMain/></el-main>
    </el-container>
  </el-container>
</template>
<script>
import IndexHeader from "@/components/index/IndexHeader";
import IndexAside from "@/components/index/IndexAsideStatic";
import IndexMain from "@/components/index/IndexMain";
export default {
  components: {
    IndexHeader,
    IndexAside,
    IndexMain,
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  height: 100%;
  background-color: #545c64;
}

// .el-main {
//   margin-top:5px;
//   color: #333;
//   text-align: center;
//   padding: 0;
// }

.el-container {
  height: 100vh;
}
</style>

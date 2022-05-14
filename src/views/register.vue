<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
    style="text-align: center"
  >
    <el-form-item label="用户名" prop="gonghao">
      <el-input
        v-model="ruleForm.gonghao"
        type="text"
        autocomplete="off"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="mima">
      <el-input
        v-model="ruleForm.mima"
        type="text"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="xingming">
      <el-input
        v-model="ruleForm.xingming"
        type="text"
        autocomplete="off"
        placeholder="请输入姓名"
      ></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="lianxidianhua">
      <el-input
        v-model="ruleForm.lianxidianhua"
        type="text"
        autocomplete="off"
        placeholder="请输入电话"
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="youxiang">
      <el-input
        v-model="ruleForm.youxiang"
        type="text"
        autocomplete="off"
        placeholder="请输入邮箱"
      ></el-input>
    </el-form-item>
    <el-form-item label="身份证" prop="shenfenzheng">
      <el-input
        type="text"
        autocomplete="off"
        placeholder="请输入身份证"
        v-model="ruleForm.shenfenzheng"
      ></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">新增</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        gonghao: "",
        mima: "",
        xingming: "",
        lianxidianhua: "",
        youxiang: "",
        shenfenzheng: "",
      },
      tableName: "",
      rules: {
        gonghao: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        mima: [{ required: true, message: "请输入密码", trigger: "blur" }],
        xingming: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        lianxidianhua: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为 11 个字符", trigger: "blur" },
        ],
        youxiang: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        shenfenzheng: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          { min: 18, max: 18, message: "长度为 18 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    let table = this.$storage.get("loginTable");
    this.tableName = table;
  },
  methods: {
    // 获取uuid
    getUUID() {
      return new Date().getTime();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: `${this.tableName}/register`,
            method: "post",
            data: this.ruleForm,
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "注册成功",
                type: "success",
                duration: 1500,
                onClose: () => {},
              });
              this.$emit("closeDialog");
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

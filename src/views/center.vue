<template>
  <div>
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :model="ruleForm"
      label-width="80px"
      style="text-align:center"
    >
      <el-row>
        <!-- 用户名 -->
        <el-col :span="12">
          <el-form-item v-if="flag == 'yuangong'" label="用户名" prop="gonghao">
            <el-input
              v-model="ruleForm.gonghao"
              readonly
              placeholder="用户名"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 姓名 -->
        <el-col :span="12">
          <el-form-item v-if="flag == 'yuangong'" label="姓名" prop="xingming">
            <el-input
              v-model="ruleForm.xingming"
              placeholder="姓名"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 性别 -->
        <el-col :span="12">
          <el-form-item v-if="flag == 'yuangong'" label="性别" prop="xingbie">
            <el-select v-model="ruleForm.xingbie" placeholder="请选择性别">
              <el-option
                v-for="(item, index) in yuangongxingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 电话 -->
        <el-col :span="12">
          <el-form-item
            v-if="flag == 'yuangong'"
            label="电话"
            prop="lianxidianhua"
          >
            <el-input
              v-model="ruleForm.lianxidianhua"
              placeholder="联系电话"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 邮箱 -->
        <el-col :span="12">
          <el-form-item v-if="flag == 'yuangong'" label="邮箱" prop="youxiang">
            <el-input
              v-model="ruleForm.youxiang"
              placeholder="邮箱"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 身份证 -->
        <el-col :span="12">
          <el-form-item
            v-if="flag == 'yuangong'"
            label="身份证"
            prop="shenfenzheng"
          >
            <el-input
              v-model="ruleForm.shenfenzheng"
              placeholder="身份证"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 照片 -->
        <el-col :span="24">
          <el-form-item v-if="flag == 'yuangong'" label="照片" prop="zhaopian">
            <file-upload
              tip="点击上传照片"
              action="file/upload"
              :limit="3"
              :multiple="true"
              :fileUrls="ruleForm.zhaopian ? ruleForm.zhaopian : ''"
              @change="yuangongzhaopianUploadChange"
            ></file-upload>
          </el-form-item>
        </el-col>
        <!-- 用户名 -->
        <el-form-item v-if="flag == 'users'" label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item v-if="flag == 'users'" label="备忘记录">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </el-form-item>
        <!-- 修改 -->
        <el-button type="primary" @click="onUpdateHandler">修 改</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import {
  isNumber,
  isIntNumer,
  isEmail,
  isMobile,
  isPhone,
  isURL,
  checkIdCard,
} from "@/utils/validate";

export default {
  data() {
    return {
      textarea: "",
      ruleForm: {},
      flag: "",
      usersFlag: false,
      yuangongxingbieOptions: [],
    };
  },
  mounted() {
    var table = this.$storage.get("sessionTable");
    this.flag = table;
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get",
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.ruleForm = data.data;
      } else {
        this.$message.error(data.msg);
      }
    });
    this.yuangongxingbieOptions = "男,女".split(",");
  },
  methods: {
    yuangongzhaopianUploadChange(fileUrls) {
      this.ruleForm.zhaopian = fileUrls;
    },
    onUpdateHandler() {
      if (
        "yuangong" == this.flag &&
        this.ruleForm.lianxidianhua &&
        !isMobile(this.ruleForm.lianxidianhua)
      ) {
        this.$message.error(`联系电话应输入手机格式`);
        return;
      }
      if (
        "yuangong" == this.flag &&
        this.ruleForm.youxiang &&
        !isEmail(this.ruleForm.youxiang)
      ) {
        this.$message.error(`邮箱应输入邮箱格式`);
        return;
      }
      if (
        "yuangong" == this.flag &&
        this.ruleForm.shenfenzheng &&
        !checkIdCard(this.ruleForm.shenfenzheng)
      ) {
        this.$message.error(`身份证应输入身份证格式`);
        return;
      }
      this.$http({
        url: `${this.$storage.get("sessionTable")}/update`,
        method: "post",
        data: this.ruleForm,
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "修改信息成功",
            type: "success",
            duration: 1500,
            onClose: () => {},
          });
          this.$emit("closeDialog");
        } else {
          this.$message.error(data.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

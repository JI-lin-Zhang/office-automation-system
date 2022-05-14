<template>
    <!-- 父级 -->
    <div  class="container loginIn" :style="background">
        <!-- 皮肤控制按钮 -->
        <div class="changeSkin" @click="skinsShow">
            <img src="../assets/images/衣服.png" width="25px" height="25px">
        </div>
        <!-- 皮肤框架 -->
        <div class="skins" v-show="isShow" @click="changeBag">
            <img src="../assets/images/bg.png"  id="bg">
            <img src="../assets/images/bg1.png" id="bg1">
            <img src="../assets/images/bg2.png" id="bg2">
            <img src="../assets/images/bg3.png" id="bg3">
            <img src="../assets/images/bg4.png" id="bg4">
            <img src="../assets/images/bg5.png" id="bg5">
            <img src="../assets/images/bg6.png" id="bg6">
            <img src="../assets/images/bg7.png" id="bg7">
            <img src="../assets/images/bg8.png" id="bg8">
            <img src="../assets/images/bg9.png" id="bg9">
        </div>
        <el-form
            :model="ruleForm"
            :rules="rules"
            status-icon
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            label-position="left"
            style="
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                width: 470px;
                border: 6px solid white;
                height: auto;
                border-radius: 10%;
            "
        >
            <h1 class="title" style="color: white;height:60px;padding-top:20px;text-align:center;">登录</h1>
            <el-form-item label="用户名：" prop="username" class="row">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密  码：" prop="password" class="row">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="角  色：" prop="role" class="row">
                <el-select v-model="ruleForm.role" placeholder="请选择角色">
                    <el-option v-for="item in menus" :key="item.roleName" :label="item.roleName" :value="item.roleName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="row1" label-width="0">
                <el-button type="primary" @click="submitForm">进入</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import menu from "@/utils/menu";
export default {
    data () {
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validateUsername = (rule, value, callback) => {
            if (value === ''){
                callback(new Error('请输入用户名'));
            } else {
                if (this.ruleForm.username !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validateRole = (rule, value, callback) => {
            if (value === ''){
                callback(new Error('请选择角色'));
            } else {
                if (this.ruleForm.username !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        }
        return {
            // 控制skins的显示与隐藏
            isShow:false,
            // 控制背景图片
            bacSrc:"../assets/images/bg.png",
            // 顶部导航背景图片配置
            background: {
                // 背景图片地址
                backgroundImage: 'url(' + require('../assets/images/bg.png') + ')',
                // 背景图片位置
                backgroundPosition: 'center center'
            },
            // 收集的表单数据
            ruleForm: {
                username: '',
                password: '',
                role: ''
            },
            // 角色数据
            menus: [],
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                role: [
                    { validator: validateRole, trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        // 控制显示隐藏
        skinsShow(){
            this.isShow = !this.isShow
        },
        // 点击切换背景图片
        changeBag(e){
            console.log(e.target.id);
            if (e.target.id === 'bg') {
                this.background.backgroundImage = 'url(' + require('../assets/images/bg.png') + ')'
            }else if(e.target.id === 'bg1'){
                this.background.backgroundImage = 'url(' + require('../assets/images/bg1.png') + ')'
            }else if(e.target.id === 'bg2'){
                this.background.backgroundImage = 'url(' + require('../assets/images/bg2.png') + ')'
            }else if(e.target.id === 'bg3'){
                this.background.backgroundImage = 'url(' + require('../assets/images/bg3.png') + ')'
            }else if(e.target.id === 'bg4'){
                this.background.backgroundImage = 'url(' + require('../assets/images/bg4.png') + ')'
            }else if(e.target.id === 'bg5'){
                this.background.backgroundImage = 'url(' + require('../assets/images/bg5.png') + ')'
            }else if(e.target.id === 'bg6'){
                this.background.backgroundImage = 'url(' + require('../assets/images/bg6.png') + ')'
            }else if(e.target.id === 'bg7'){
                this.background.backgroundImage = 'url(' + require('../assets/images/bg7.png') + ')'
            }else if(e.target.id === 'bg8'){
                this.background.backgroundImage = 'url(' + require('../assets/images/bg8.png') + ')'
            }else if(e.target.id === 'bg9'){
                this.background.backgroundImage = 'url(' + require('../assets/images/bg9.png') + ')'
            }
        },
        // 提交
        submitForm() {
            if (!this.ruleForm.role) {
                this.$message.error("请选择角色");
                return;
            }
            let menus = this.menus;
            for (let i = 0; i < menus.length; i++) {
                if (menus[i].roleName == this.ruleForm.role) {
                this.tableName = menus[i].tableName;
                }
            }
            this.$http({
                url: `${this.tableName}/login?username=${this.ruleForm.username}&password=${this.ruleForm.password}`,
                method: "post",
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.$storage.set("Token", data.token);
                    this.$storage.set("role", this.ruleForm.role);
                    this.$storage.set("sessionTable", this.tableName);
                    this.$storage.set("adminName", this.ruleForm.username);
                    this.$router.replace({ path: "/index/" });
                } else {
                    this.$message.error(data.msg);
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    mounted(){
        let menus = menu.list();
        this.menus = menus;
    }
};
</script>
<style lang="scss" scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.container{
    display: flex;
    width: 100vm;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-size: cover;
}
.row{
    width: 300px;
    margin: 20px auto;
    /deep/ .el-form-item__content{
        width: 200px;
    }
    /deep/ .el-form-item__label{
    font-size: 20px;
    font-weight: bold;
    color: white;
    }
    /deep/ .el-input__inner{
        width: 100%;
    }
}
.row1{
    /deep/ .el-form-item__content{
        text-align: center;
    }
    /deep/ .el-button--medium{
        width: 80px;
        height: 40px;
        margin: 0 10px 20px 10px;
        font-weight: bold;
        font-size: 20px;
    }
}
.changeSkin{
    position: absolute;
    top: 15px;
    left: 15px;
    float: left;
}
.skins {
    position: absolute;
    top: 8%;
    left: 2%;
    width: 380px;
    border: white solid 2px;
    border-radius: 5%;
}

.changeSkin img{
    top: 15px;
    left: 15px;
}
.skins img{
    width:160px;
    height:85px;
    margin: 10px;
}
.code
{
    font-family:Arial;
    font-style:italic;
    color: #24298f;
    font-size:18px;
    border:0;
    padding:2px 3px;
    letter-spacing:3px;
    font-weight:bolder;
    float:right;
    cursor:pointer;
    width:90px;
    height:45px;
    line-height:45px;
    text-align:center;
    vertical-align:middle;
    background-color: #e3c7e2;
}
#verify{
    width: 45%;
    float: left;
}
</style>

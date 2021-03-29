<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.jpg" alt="">
            </div>
            <!-- 表单 -->
            <!-- ref添加引用 -->
            <el-form ref="login_form_ref" :model="login_form" label-width="0px" class="login_form" :rules="login_rules">  
                <!-- 用户名  -->
                <el-form-item prop="username">
                    <el-input v-model="login_form.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="login_form.password" placeholder="密码" type="password" prefix-icon="el-icon-lock" ></el-input>
                </el-form-item>
                <!-- 登录--重置 -->
                <el-form-item class="buts">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="reset_login_form">重置</el-button>
                </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //登录表单的数据绑定对象
        login_form:{
            username:'admin',
            password:'123456'
        },
        //输入验证规则
        login_rules:{
            username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },   //必填项，失焦后触发
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ]
        }    
        }
        
    },
    methods:{
        //重置
        reset_login_form(){
           this.$refs.login_form_ref.resetFields();
        },
        //登录验证
        login(){
            this.$refs.login_form_ref.validate( async (valid)=>{
                console.log("验证结果："+valid);
                if(!valid)return;   //验证不通过，返回
                const {data:res} = await this.$http.post('login',this.login_form);//只有data是服务器返回的数据，所以只取data，data=res。(结构data并重命名)
                if(res.meta.status!==200) return this.$message.error('登陆失败');
                this.$message.success('登陆成功');

                //除了登录之外的其他api接口，只在登录后才能访问
                //登录成功后 返回的token令牌，(因为是临时会话，token只在打开网站期间生效，所以)保存到s中
                window.sessionStorage.setItem('token',res.data.token);
                //编程式导航跳转到后台主页，路由地址是‘/home’
                this.$router.push('/home'); 
                //console.log()

                });
        }
    }
   
};
</script>

<style lang="less" scoped>  //scoped，目的是该样式只在本组件内生效，不然会发生样式冲突
    .login_container{
        background-color: #2b4b6b;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: relative;

        .avatar_box{
            height: 130px;
            width: 130px;
            border:1px solid #eee;
            border-radius: 50%;
            padding: 8px;
            box-shadow: 0 0 10px rgb(167, 160, 160);
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #fff;

            img{
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }
    }

    .login_form{
            position: absolute;
            bottom: 0;
            padding: 0 20px;
            width: 100%;
            box-sizing: border-box; //默认box—sizing是content-box，此时表单超出，要设置为border—box
        }
    
    .buts{
        display: flex;
        justify-content: space-between;
    }
</style>
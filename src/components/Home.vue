<template>
        <el-container class="contain_box">
            <!-- 头部 -->
            <el-header class="header">
                <div>
                    <img src="../assets/电商.png" alt="logo" width="50px">
                    <span>电商后台管理系统</span>
                </div>
                <el-button type="info" @click="logout">退出</el-button>
            </el-header>
            <el-container>
                <el-aside :width="isCollapse ? '64px':'200px'" class="aside">
                    <div class="toggle_button" @click="collapse_menu">|||</div>
                    <el-menu
                        default-active="2"
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409eff"
                        unique-opened
                        :collapse="isCollapse"
                        :collapse-transition='false'
                        router>
                        <!-- 一级菜单 -->
                        <el-submenu :index="'/'+item.path" v-for="item in menus_list" :key="item.id">
                            <template slot="title"> 
                                <i :class="icons_menu[item.id]"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>{{subitem.authName}}</span>
                                </template>
                            </el-menu-item>
                            
                        </el-submenu>

                    </el-menu>
                </el-aside>
                <el-main class="main">
                    <!-- 子组件Welcome占位符 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
</template>

<script>
export default {
    //加载页面之前获取菜单数据
    created(){
        this.get_menus();
    },
    data(){
        return{
            //左侧菜单数据
        menus_list:[],
        //菜单图标
        icons_menu:{
            '125':'el-icon-user-solid',
            '103':'el-icon-coin',
            '101':'el-icon-s-goods',
            '102':'el-icon-tickets',
            '145':'el-icon-s-marketing',
        },
        //菜单栏折叠
        isCollapse:false,
    }
        
        
    },
   methods:{
       logout(){
           window.sessionStorage.clear();
           this.$router.push('/login');
           this.$message.info("退出登录")
       },

       //获取所有菜单
       async get_menus(){
           //根据接口文档中 请求路径：menus，请求方法：get
           //返回的是promise，需要async-await 简化promise操作
           //解构赋值,即将其中的data属性结构出来，并赋给res
            const {data :res} = await this.$http.get("menus") 
            console.log(res)
            if(res.meta.status!=200) return this.$message.error(res.meta.msg)
            this.menus_list=res.data

//             this.$http.get({
//                 url:'menus',
//                 headers: {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
// }}) .then(
// 					response => {
//                         if(response.data.meta.status!=200) return this.$message.error(response.data.meta.msg)
//                         this.menus_list=response.data.data
//                         console.log(response)
//                 }).catch(
// 	                error => {
// 	                    console.log(error)
//                 })
       },
       //折叠菜单
       collapse_menu(){
           this.isCollapse=!this.isCollapse
       }
   }
}
</script>

<style lang="less" scoped>

    .contain_box{
        height: 100%;
    }

    .header{
        background-color: #373d41;
        display: flex;
        justify-content:space-between;
        align-items: center;

        > div{
            display: flex;
            align-items: center;
            color: #eaedf1;
            font-size: 20px;
            img{
                margin-right: 10px;
            }
        }
    }


    .aside{
        background-color: #333744;
        .el-menu{
            border-right: none;
        }
        .toggle_button{
            background-color: #4a5064;
            font-size: 10px;
            line-height: 24px;
            color: #fff;
            text-align: center;
            letter-spacing: 0.3em;
            cursor: pointer;
        }
    }

    .main{
        background-color: #eaedf1;
    }

</style>
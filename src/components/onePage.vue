<template>
    <el-container>
        <el-header>北京电信通企业信息平台</el-header>
        <el-container>
            <el-main>
                <el-container style=" border: 1px solid #eee">
                    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                        <p style="line-height:30px">
                            <b class="el-icon-setting" style="width:30px; height:30px; font-size:25px; text-algin:center; line-height:30px; margin-left:10px;"></b>
                            hello,用户
                        </p>
                        <el-menu :default-openeds="['1', '3']">
                            <el-submenu v-for="(item,index) in menu" :index="index+'1'" :key="index">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    {{item.name}}
                                </template>
                                <el-menu-item v-for="(ite,ind) in item.submenus" :index="index+1+'-'+ind+1" :key="ind">
                                    <router-link :to="{name:ite.type}">{{ite.name}}</router-link>
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-aside>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import { mapState, mapActions } from "vuex"

export default {
    name: "onePage",
    data() {
        return {}
    },
    computed: {
        ...mapState(['menu'])
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        ...mapActions(['fetchMenu'])
    },
    mounted() {
        this.fetchMenu()

    }
}
</script>
<style>
html,body,#app,section,.el-container{
    width: 100%;
    height: 100%;
}
.el-header {
    background-color: royalblue;
    color: #fff;
    text-align: left;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 200px;
}

.el-main {
    padding: 0;
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 80px;
}

.has-gutter{
    text-align: center;
    line-height: 30px;
}
.el-aside>ul>li {
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#ccc));
}

.is-top {
    line-height: 80px;
}

.el-menu-item a {
    text-decoration: none;
    color: #000;
}
</style>

<template>
    <div class="box">
        <header>
            <img src="../../static/images/login_01.png" alt="">
        </header>
        <section>
            <div class="login">
                <ul>
                    <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="show(index)" :key="index">
                        {{item}}
                    </li>
                </ul>
                <div class="tabCont">
                    <div class="one" v-show="num-1">
                        <p>手机扫码 安全防盗</p>
                        <span>使用App扫描二维码登录</span>
                    </div>
                    <div class="two" v-show="num" ref="form">
                        <h4>登录账号</h4>
                        <input type="text" placeholder="请输入手机号或邮箱" ref="val">
                        <b ref='alt'></b>
                        <br>
                        <button v-on:click="checkVal()" :disabled="isPhoneShow">{{msg}}</button>
                        <button v-on:click="checkVal1()" :disabled="isEmailShow">{{msg1}}</button>
                        <h4>动态密码</h4>
                        <input type="text" placeholder="请输入动态密码">
                        <br>
                        <button class="btn" @click="changePath()">登录</button>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <p>
                <a href="#">集团邮件系统</a>
                <a href="#">集团OA系统</a>
                <a href="#">集团BSS系统</a>
                <a href="#">集团官网</a>
                <a href="#">北京电信通官网</a>
            </p>
            <p>北京电信通电信工程有限公司版权所有2011-2111技术支持IT共享中心</p>
        </footer>
    </div>
</template>
<script>
export default {
    name: "",
    data() {
        return {
            tabs: ["二维码登录", "账号登录"],
            num: 0,
            msg: "手机号获取动态码",
            msg1: "邮箱获取动态码",
            timer: null,
            isPhoneShow:false,
            isEmailShow:false,
        }
    },
    beforeRouteEnter: (to, from, next) => {
        // ...
        next()
    },
    methods: {
        show(index) {
            this.num = index
        },
        checkVal() {
            const val = this.$refs.val.value;
            const reg1 = /^1[3578]\d{9}$/;
            const reg2 = /^\w+@\w+\.\w+$/;
            if (!reg1.test(val) || val == "") {
                this.$refs.alt.innerHTML = "请重新输入手机号"
            } else {
                this.isPhoneShow = true
                let start = 5;
                this.timer = setInterval(() => {
                    start--;
                    console.log(start)
                    this.msg = start + "秒后重试";
                    if (start < 0) {
                        this.msg = "重新发送动态码"
                        clearInterval(this.timer)
                        this.isPhoneShow = false
                    }
                }, 1000)
            }
        },
        checkVal1() {
            const val = this.$refs.val.value;
            const reg1 = /^1[3578]\d{9}$/;
            const reg2 = /^\w+@\w+\.\w+$/;
            if (!reg2.test(val) || val == "") {
                this.$refs.alt.innerHTML = "请重新输入邮箱"
            } else {
                this.isEmailShow = true
                let start = 5;
                this.timer = setInterval(() => {
                    start--;
                    this.msg1 = start + "秒后重试";
                    if (start < 0) {
                        this.msg1 = "重新发送动态码"
                        clearInterval(this.timer)
                        this.isEmailShow = false
                    }
                }, 1000)
            }
        },
        changePath(){
            sessionStorage.setItem("isLogin",1)
            this.$router.push({
                name:"onePage"
            })
        }
    }
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body,
#app,
.box {
    width: 100%;
    height: 100%;
}

ul li,
ol li {
    list-style: none
}

header {
    width: 100%;
    height: 75px;
    font-size: 30px;
    font-weight: bold;
    line-height: 75px;
}

section {
    width: 100%;
    height: 440px;
    background-image: url(../../static/images/login_03.png);
    position: relative;
}

.login {
    width: 300px;
    height: 350px;
    border-radius: 10px;
    background: #fff;
    position: absolute;
    right: 7%;
    bottom: 10%
}

.active {
    background: #ccc;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.login li {
    width: 50%;
    float: left;
    text-align: center;
    line-height: 40px;
    font-weight: normal;
    font-size: 15px;
}

.login div {
    width: 90%;
    margin-left: 5%;
}

.login div b {
    font-weight: normal;
    font-size: 11px;
    color: red;
}

.login div p {
    line-height: 80px;
    font-size: 14px;
    color: #333;
    text-align: center
}

.login div span {
    display: inline-block;
    width: 85%;
    margin: 7%;
    background: skyblue;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
}

.login div h4 {
    margin-top: 15px;
    font-size: 14px;
    color: cornflowerblue;
    line-height: 30px;
    font-weight: normal;
}

.login div input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 30px;
}

.login div button {
    margin-top: 10px;
}

.btn {
    width: 100%;
    height: 30px;
    background: cornflowerblue;
    color: #fff;
    border-radius: 5px;
    border: 1px solid cornflowerblue;
    outline: 0
}

footer {
    width: 100%;
}

footer p {
    width: 100%;
    text-align: center;
    font-size: 13px;
}

footer p a {
    line-height: 50px;
    font-size: 13px;
    color: #000;
    text-decoration: none;
    border-right: 2px solid #333;
    padding: 0 10px;
}

footer p a:nth-child(5) {
    border-right: 0
}
</style>

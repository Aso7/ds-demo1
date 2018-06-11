<template>
    <div class="box">
        <div class="one" v-for="(item,index) in list" :key="index">
            <router-link :to="{name:item.childPath}">
                <h3>{{item.tit}}</h3>
                <p>{{item.alt}}</p>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "users",
    data() {
        return {
            list: [
                { childPath:"one", "tit": "发起更名流程工单", alt: '功能说明：发起流程工单，里面是用户管理' },
                { childPath:"two", "tit": "发起过户流程工单", alt: '功能说明：发起流程工单，里面是用户管理' },
                { childPath:"three", "tit": "工程维护单", alt: '功能说明：发起流程工单，里面是用户管理' },
                { childPath:"four", "tit": "其他类型单", alt: '功能说明：发起流程工单，里面是用户管理' }
            ]
        }
    }
}
</script>
<style>
.box {
    width: 100%;
    height: 100%;
}

.one {
    width: 30%;
    height: 200px;
    margin: 10px;
    border: 1px solid #ccc;
    background: #eee;
    float: left
}
.one a{
    text-decoration: none;
    color: #000;
}
.one h3 {
    text-align: center;
    line-height: 120px;
}

.one p {
    line-height: 30px;
    text-align: center;
    font-size: 12px!important
}
</style>

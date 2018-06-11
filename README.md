# ds-demo1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



项目总结
1. 利用vue脚手架，vuex状态管理模式，vue的生命周期以及vuex同异步更改获取数据
2.将所有的css文件和js文件和路由匹配
3.复用过多在js手动判断，进行公共函数封装
4.前端路由验证登录情况可以在路由里加上参数
5.文件的moke数据，json数据要放在static静态资源目录中，否则请求不到404，如果使用simple，则建立一个server的文件夹
6.做表格数据的编辑，删除，添加需要获取当前对应的信息，使用VUEX配合完成
7.mock数据的输出，http不同情况的响应拦截
8.路由逻辑思维，子路由的嵌套

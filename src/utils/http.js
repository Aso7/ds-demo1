import Vue from "vue"
import axios from "axios"

let instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    timeout: 3000
})

//请求拦截
instance.interceptors.request.use((config) => {
    console.log(config)
    if (process.env.NODE_ENV == 'production') {
        config.baseURL = "https://www.btte.net"
    } else {
        config.baseURL = "http://localhost:8080"
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

//响应拦截
instance.interceptors.response.use((response) => {
    console.log(response)
    if(response.status == 200){
        return response.data
    }else{
        return Promise.reject(response)
    }
    
}, (err) => {
    return Promise.reject(err)
})

//定义vue插件
let httpPlugin = {
    install(Vue) {
        Object.defineProperty(Vue.prototype, "$http", {
            value: instance
        })
    }
}

export {instance}
export default httpPlugin
// Object.defineProperties(Vue.prototype, "$http", {
//     value: instance
// })
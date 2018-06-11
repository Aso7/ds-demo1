import Vue from "vue"
import Vuex from "vuex"
import { instance as http } from "@/utils/http"
Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        menu: [],
        group: [],
        table:[]
    },
    mutations: {
        updateMenu(state, data) {
            state.menu = data.data
        },
        updateGroup(state, payload) {
            state.group = payload
        },
        updateTable(state,payload){
            state.table = payload
        },
        deleteItem(state,payload,cb){
            let tmp = [...state.table];
            let ind;
            tmp.forEach((item,index)=>{
                if(item.code == payload.code){
                    ind = index
                }
            })
            tmp.splice(ind,1)
            state.table = tmp
            payload.cb()
        }
    }, 
    actions: {
        fetchMenu({ commit }) {
            http.get("/static/server/menu.json")
                .then(res => {
                    //console.log(res)
                    setTimeout(() => { 
                        store.commit("updateMenu", res) 
                    }, 2000)
                    //this.menu = res.data
                })
        },
        fetchGroup({commit,state},cb) {
            if(state.group.length>0){
                cb()    
            }
            http.get("/static/server/group.json")
                .then(res => {
                    setTimeout(() => { 
                        store.commit("updateGroup", res.orgs)
                        cb() 
                    }, 2000)
                })
        },
        fetchTable({commit,state},payload){
            http.get("/static/server/user.json").then(res=>{
                setTimeout(()=>{
                    commit("updateTable",res.userList)
                    payload()
                },2000)               
            })
        },
        deleteItem({commit},payload){
            commit('deleteItem',payload)
        }
    },
    getters: {
        filterGroup(state){
            console.log(state)
            return(filter)=>{
                if(filter){
                    let res = state.group.filter((item)=>{
                        console.log(item)
                        return item.ORGNAME.indexOf(filter)>-1 || item.FORGNAME.indexOf(filter)>-1
                    })
                    console.log(res)
                    return res
                }else{
                    return state.group
                }
            }           
        }
    },
    modules: {}
})
console.log(store)
export default store
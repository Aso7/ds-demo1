import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/Home"
import onePage from "@/components/onePage"
import emply from "@/components/emply"
import users from "@/components/users/users"
import menus from "@/components/menus"
import one from "@/components/users/one"
import two from "@/components/users/two"
import three from "@/components/users/three"
import four from "@/components/users/four"

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: "/home",
      name: "Home",
      component: Home,
      beforeEnter(to, from, next) {
        next()
      }
    }, {
      path: "/onePage",
      name: "onePage",
      component: onePage,
      children: [
        {
          path: "emply",
          name: "emply",
          component: emply
        },
        {
          path: "users",
          name: "users",
          component: users
        },
        {
          path: "menus",
          name: "menus",
          component: menus
        },
        {
          path: "one",
          name: "one",
          component: one
        },
        {
          path: "two",
          name: "two",
          component: two
        },
        {
          path: "three",
          name: "three",
          component: three
        },
        {
          path: "four",
          name: "four",
          component: four
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  if (to.name === "Home") {
    next()
  } else {
    let isLogin = sessionStorage.getItem("isLogin")
    if (isLogin) {
      next()
    } else {
      next("/Home")
    }
  }
})
export default router


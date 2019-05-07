import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register'
import resetpw from '../views/resetpw'
import Nofind from '../views/404'
import Login from '../views/Login'
import Home from '../views/Home'
import stockin from '../views/stockin'
import stockout from '../views/stockout'
import InfoShow from '../views/InfoShow'
import goodslist from '../views/goodslist'
import InfoModify from '../views/InfoModify'
import Project from '../views/Project'
import Progress from '../views/Progress'
import auditing from '../views/auditing'
import payroll from '../views/payroll'
import Finance from  '../views/Finance'
import employee from '../views/employee'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '/404', component: Nofind },
    { path: '/', redirect: '/index' },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/register', name: 'register', component: Register },
        { path: '/resetpw', name: 'resetpw', component: resetpw },
        { path: '/home', name: 'home', component: Home },
        { path: '/infoshow', name: 'infoshow', component: InfoShow },
        { path: '/project', name: 'project', component: Project },
        { path: '/infomodify', name: 'infomodify', component: InfoModify },
        { path: '/goodslist', name: 'goodslist', component: goodslist },
        { path: '/stockin', name: 'stockin', component: stockin },
        { path: '/stockout', name: 'stockout', component: stockout },
        { path: '/auditing', name: 'auditing', component: auditing },
        { path: '/payroll', name: 'payroll', component: payroll },
        { path: '/Finance', name: 'Finance', component: Finance },
        { path: '/employee', name: 'employee', component: employee },
        { path: '/Progress', name: 'Progress', component: Progress },

      ]
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;
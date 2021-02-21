import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/index' // @ 是 src目录的别名,不受文件路径影响
import Layout from '@/views/layoute/index'
import Movielist from '@/views/movie/index'
import Publish from '@/views/publish/index'
import Comment from '@/views/moviecomment/index'
import Setting from '@/views/setting/index'
import Article from '@/views/article/index'
import Find from '@/views/findmovie/index'
import Filmdail from '@/views/filmdail/index'
import Articleview from '@/views/articleview/index'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
   // name:'layout',   //有默认子路由 就不必再给父路由起名字了, 有其他的路由时需要
    component:Layout,
    children:[
     

       {
         path:'movie',
         name:'movie',
         component:Movielist
       },
       {
        path:'publish',
        name:'publish',
        component:Publish
      }, //查看影评  路由
      {
        path:'publish/:id',
        name:'publishs',
        component:Publish
      }, // 修改影评路由

     
      {
        path:'moviecomment',
        name:'moviecomment',
        component:Comment
      },
      {
        path:'setting',
        name:'setting',
        component:Setting
      },
      {
        path:'setting/:id',
        name:'settings',
        component:Setting
           
      },
      {
        path:'article',
        name:'article',
        component:Article
      } ,
      {
        path:'findmovie',
        name:'findmovie',
        component:Find

      },
      {
        path:'filmdail/:id',
        name:'filmdail',
        component:Filmdail
      },
     
      {
        path:'articleview/:id',
        name:'articleview',
        component:Articleview
      },
     
    ] ,
   
  },
  {
    path:'/login',
    name:'login',
    component:Login
   },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,  
})
//const user = JSON.parse(window.localStorage.getItem('user'))
// 因为没有用户数据 , 这里我们模拟usr数据  之后需要删掉
//let user = {name:'ef',age:22}
//设置全局的导航守卫, 侦测如果用户不登录就无法访问其他页面
/* router.beforeEach((to,from,next)=>{
  if(to.path!=='/login'){  
      if(user){
        next()
      }
      else{
        next('/login')
      }
  }else{
    next()
  }


}); */

export default router

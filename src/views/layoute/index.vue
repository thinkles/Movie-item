<template>
    <el-container>
      <el-header class="elheaer">


      <div class="headlogo">
       
          <a class='logolink' href="/">
          
              <svg  class="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32"
                version="1.1">
                <g fill="#3f72af">
                  <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
                </g>
                <g transform="translate(8.000000, 7.000000)" fill="#00000" fill-rule="nonzero">
                  <polygon points="0 18 5 18 5 0 0 0"></polygon>
                  <path
                    d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z">
                  </path>
                  <path
                    d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z">
                  </path>
                  <path
                    d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z">
                  </path>
                </g>
              </svg>
           
          </a>
       </div>
   

<div class="search">
 <el-input placeholder="请输入内容" v-model="inputsearch"
     style="width:100%"
     @input="handleinput"
     >
  
  <!--   <el-select v-model="select" 
    slot="prepend" 
    name='selectname'
    style="width:80px">
      <el-option label="ALL" value="0"></el-option>
      <el-option label="电影" value="1"></el-option>
      <el-option label="影评" value="2"></el-option>
    </el-select> -->
  <el-button slot="prepend" icon="el-icon-search"></el-button>
  </el-input>
  <div :class="[suggestion, {isshow:show}]">
 <ul class="search_ul">
   <li v-for='(item,index) in searchlist' :key="index">
     <a style="display: flex;" :href="'/filmdail/'+item._id">
      <div class="searchimg">
        <img :src="baseurl+item.poster"
        >
        </div>
      <div class="searchitem">
        <span style="font-weight:700">{{item.filmname}}</span>
        <span>{{item.titleyear}}</span> 
        <span>{{getfilmtype(item.filmtype)}}</span>
        
      </div>
     </a>
     

   </li>
 </ul>
 </div>
</div>

<div class="headmenu">
  <el-menu
  default-active="$router.path"
  mode="horizontal"
  router
  background-color="#112d4e"
  text-color="#f9f7f7"
  active-text-color="#3f72af"
  style="border-bottom-width: 0px;"
  > 
  <el-menu-item index="/movie">首页</el-menu-item>
  <el-menu-item index="/moviecomment">影评中心</el-menu-item>
  
  <el-menu-item index="/findmovie">发现电影</el-menu-item>
  <el-menu-item index="/login" :class="{userd:userdrop}">登录</el-menu-item>
  <el-menu-item :class="{userd:!userdrop}" style="cursor:auto" >
    <el-dropdown style="cursor: pointer;">
           
            <div class="userimg">
             <img 
             v-if='squareUrl'
             :src='baseurl+squareUrl'
              style="display: block;width:100%;height:100%;border-radius:10px; object-fit:cover"
              
              >
            </div>
          <el-dropdown-menu slot="dropdown">
             <el-dropdown-item @click.native='onpersonal'>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native='onloginout'>退出账户</el-dropdown-item>
        
          </el-dropdown-menu>
        </el-dropdown> 

  </el-menu-item>
</el-menu> 
</div>
</el-header>
    <el-main class="backbag">
       <router-view @updateuser='update'></router-view>
      </el-main>
</el-container>
  

</template>

<script>
  //import appAside from '@/components/Aside'
  import {
    getUserProfile,
    getMovieProfile
  } from '@/api/user'  
/*   import globalBus from '@/utils/globalbus' */

  export default {
    name: 'Layout',
    data() {
      return {
        // user:{} ,  //用户信息  由后端提供
      //  isCollapse: false, //控制折叠   
        inputsearch:'',  //查询内容
       // select: '0',    //查询种类
        squareUrl:'', //头像地址
        userdrop:false,
        show:true,   //类名
        suggestion:'suggestion',
        searchlist:[],
        time:'',
        baseurl:'http://localhost'
      }
    },
    methods: {
   update(data){
    this.squareUrl = data
    //console.log(data)
   },

      handleinput(){
         
         const data = this.inputsearch  //箭头函数内没有this 这里吧变量再复制一下
        // const type  = this.select
        // console.log(param.length)
         if(this.time){    //又上一个任务 取消 防止重复查询
           clearTimeout(this.time);
         }
         if(data.length == 0){   //查询内容为0 不查询
         // console.log("11")
            this.show = true  //隐藏建议栏
            clearTimeout(this.time);
            
         }else{
        this.time = setTimeout(()=>{
         getMovieProfile(data).then(res=>{
           this.searchlist = res.data    //拿到数据返回给前端
           this.show = false   //出现建议
          console.log(this.searchlist)
              //console.log(res)
        }).catch(()=>{
          //console.log(e.response.data.msg);
          this.$message({
            type:'warning',
            message:'没有相关信息'
          })

        })
         },800);
         }    
      },

      loadUserProfile() {
       const isuser = JSON.parse(window.localStorage.getItem('user'))
       //console.log(isuser)
       if(isuser){
          getUserProfile().then(res=>{
         
          this.squareUrl = res.data.photo;
          this.userdrop = true;
        }).catch((e)=>{
            this.$router.push('/login')
            console.log("获取信息错误"+e.response)
        })
       }else{
         console.log('没有数据')
         return 
       }
        
      },
     
    
      onloginout() {

        //退出登录 导航到登录页面

        this.$confirm('是否退出账户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '注销成功!'
          });
          window.localStorage.removeItem('user')
          this.userdrop = false
          this.$router.push('/login')  //推到首页
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });

        });
      },
       onpersonal(){
         this.$router.push('/setting')
       },
       

    },
  computed:{
   getfilmtype (){
     return function(film){
       if(film.length !=0){

       return film.join('/')
       }else{
         return ''
       }   
       }
     
     }
   
  },
    created() { // 组件初始化时 发送请求
    
     
        this.loadUserProfile();

      /* globalBus.$on('update-user', (data) => { //监听 事件总线的事件
        console.log('fef')
        // this.user =data   不要这么做  对象之间是引用类型不是复制 会互相影响
        this.user.name = data.name //更改user 数据
        this.user.photo = data.photo
      }) */
    }
  }
</script>

<style >
.el-container {
 height: 100%; 
}

.headmenu{
  flex-basis: 400px;
  margin-left:40px;
 
}

 .el-main {
    background-color: #E9EEF3;
    color: #333;
    
    
  }
  .elheaer {
    background-color: #112d4e;
    color: #333;
    text-align: start;
    line-height: 60px;
    display: flex;
    flex-wrap:nowrap;
    justify-content:center ; 
    flex-direction:row;
    align-items:center;
    min-width: 1200px;
  }


.search{
  flex-basis: 800px;
}
.headlogo{
  flex-basis: 100px;
  height: 60px;
  text-align: center;
}
.userd {
 display: none;
  } 

  .ipc-logo{
  margin-top:15px;
  }
.userimg{
 width: 40px;
 height:40px;
}
.backbag{
  background: url('./bag.jpg');
}

 .suggestion{
    position: absolute;
    width: 800px;
    background-color: #ffffff;
    z-index:5;
    top:53px;
    border-radius: 10px;
  }
 .isshow{
    display: none;
  }

  .searchimg{
    width:50px;
    height:70px;
  }
 
  .searchimg img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .searchitem{
    padding:10px;
    font-size: 13px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;

  }
  .search_ul{
    list-style: none;
  }
  .search_ul a:link{
    text-decoration: none;
    color: #333;
  }
  .search_ul li{
    padding: 10px;
    border-bottom: 1px solid #112d4e;
   
    
  }
  .search_ul li:hover{
  background-color: #3333334d;
  }
  .search_ul span{
    height: 21px;
    line-height: 20px;
  }
</style>
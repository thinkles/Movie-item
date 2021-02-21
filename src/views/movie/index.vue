<template>
 <el-card>
 
<div class="block" style="margin-bottom:20px">

    <el-carousel height="500px" :interval='5000'  style="border-radius:15px">
      <el-carousel-item v-for="item in imgheader" :key="item.key">
        <a :href="'/filmdail/'+item.id">
         <img :src="item.src" style="object-fit:fill;height:100%;width:50%;">
        <img :src='item.src1' style="object-fit:fill;width:50%;height:100%"> 
        </a>
       
      </el-carousel-item>
    </el-carousel>
  </div>

 <el-card style="margin:40px auto;width:100%" v-for="(item,index) in content" :key='index'>
 <h3 class="customtitle">
    <span class="demonstration">{{item.name}}</span>
  </h3>
  <el-divider></el-divider>

  <el-row >
  <el-col :span="3" v-for="(elem,index) in item.allmovie" :key="elem.key" :offset="index > 0 ? 1 : 2">
   <a :href="'/filmdail/'+elem.id" class="movielink">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <img 
      :src="elem.src"
       class="image"
       height="220px">
      <div style="padding: 14px;">
        <span class="filmname">{{elem.name}}</span>
       <div class="bottom clearfix">
           <span :class="showstarclass(elem.rating)" class='starspan'></span>
           <span class='namespan' v-if='item.type==1 ? false : true'>{{elem.rating}}</span>
      </div>

      </div>
    </el-card>
    </a>
  </el-col>

</el-row>
   <div style="float:right; margin:10px auto"> 
  <el-pagination
    layout="prev, pager, next" 
    background
    :page-count="item.totalpage"
     :current-page.sync='item.currentpage'
     @current-change='handlepage(item.type)'>
  </el-pagination>
</div>
</el-card>

</el-card>
</template>

<script>
import {getallMovies, gethotMovies,getlikeMovies,getnewMovies} from '@/api/movie'

export default {
 name:'movie',
  data() {
      return {
       imgheader:[],

       content:[
         {name:'正在热映',totalpage:5,currentpage:1,type:0,allmovie:[]},
         {name:'即将上映',totalpage:5,currentpage:1,type:1,allmovie:[]},
         {name:'发现好电影',totalpage:5,currentpage:1,type:2,allmovie:[]}
       ],
     

      }
    },
 methods: {
        loadMoviefile(){

            //考虑数据没有足够多的时候, 前端不能写死数据,要根据后端传递过来的值决定
            getallMovies().then(res =>{
              console.log(res);
             const baseurl = 'http://localhost/'
             const movielist = res.data.hotmoviehead.records  
              movielist.forEach((item,index)=> {
                this.imgheader.push({
                  src:baseurl+item.big_poster[0],
                  src1:baseurl+item.big_poster[1],
                  id:item._id,
                  key:'item'+index})
              });    //导航栏给与海报
                
                //热映
            const hotmovielist = res.data.hotmovie.records;  //数组
            this.content[0].totalpage = Math.ceil(res.data.hotmovie.total/5)
            const hotmovie = this.content[0].allmovie;
            hotmovielist.forEach((item,index)=> {
               hotmovie.push({
                 src:baseurl+item.poster,
               rating:item.rating,
               id:item._id,
               key:'m'+index,
               name:item.filmname,
               });
            });
              //收藏
            const likemovielist = res.data.likemovies.records;  //数组
            const likemovie = this.content[2].allmovie;
            this.content[2].totalpage = Math.ceil(res.data.likemovies.total/5)
            likemovielist.forEach((item,index)=> {
               likemovie.push({src:baseurl+item.poster,id:item._id,rating:item.rating,key:'o'+index,name:item.filmname});
            });
             //上映
             const newmovielist = res.data.newmovie.records;  //数组
            const newmovie = this.content[1].allmovie;
            this.content[1].totalpage = Math.ceil(res.data.newmovie.total/5)
            newmovielist.forEach((item,index)=> {
               newmovie.push({src:baseurl+item.poster,id:item._id,rating:item.rating,key:'o'+index,name:item.filmname});
            });

    
            }).catch(e=>{
              console.log(e)
            })
        },
  

  

handlepage(type){
   const baseurl = 'http://localhost/'
  if(type== 0){
   const page = this.content[0].currentpage  //当前页给后端 使其返回数据
  gethotMovies({page,size:5}).then(res=>{
    const hotmovielist = res.data.records;
    this.content[0].allmovie = []; // 清空数组
    hotmovielist.forEach((item,index)=> {
    this.content[0].allmovie.push({src:baseurl+item.poster,id:item._id,rating:item.rating,key:'o'+index,name:item.filmname});
  })
  })
}
else if(type == 1){
 const page = this.content[1].currentpage  //当前页给后端 使其返回数据
  getnewMovies({page,size:5}).then(res=>{
    const newmovielist = res.data.records;
    this.content[1].allmovie = []; // 清空数组
    newmovielist.forEach((item,index)=> {
    this.content[1].allmovie.push({src:baseurl+item.poster,id:item._id,rating:item.rating,key:'o'+index,name:item.filmname});
  })
  })

}else{
const page = this.content[2].currentpage  
  getlikeMovies({page,size:5}).then(res=>{
    const likemovielist = res.data.records;
    this.content[2].allmovie = []; // 清空数组
    likemovielist.forEach((item,index)=> {
    this.content[2].allmovie.push({src:baseurl+item.poster,id:item._id,rating:item.rating,key:'o'+index,name:item.filmname});
  })
  })


}
},
       
},
computed:{
  showstarclass(){
    return function(starvalue){
      return 'smallstar'+' smallstar'+Math.round(starvalue)

    }
}
},
created(){
 this.loadMoviefile()

},

}
</script>

<style>
.block{
  padding: 20px;
}
.customtitle{
      font-weight: 400;
      line-height: 1;
      font-size: 24px;
          color: #6e6e6e;
          vertical-align: bottom;
}
.image{
  display: block;
  width: 100%;
}
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    height: 19px;
    
  }
   .starspan{
    display: inline-block;
     width: 76px;
     height:11px;
   }
  .namespan{
    color: #e39f45
   }

.smallstar{
   background: url('/index.png');
   background-repeat: no-repeat;
}
.smallstar10{
  background-position: 0 0px;
}
.smallstar9{
  background-position: 0 -11px;
}
.smallstar8{
  background-position: 0 -22px;
}
.smallstar7{
  background-position: 0 -33px;
}
.smallstar6{
  background-position: 0 -44px;
}
.smallstar5{
  background-position: 0 -55px;
}
.smallstar4{
  background-position: 0 -66px;
}
.smallstar3{
  background-position: 0 -77px;
}
.smallstar2{
  background-position: 0 -88px;
}
.smallstar1{
  background-position: 0 -99px;
}
.smallstar0{
  background-position: 0 -110px;
}
 .filmname{
   display: inline-block;
   height:20px;
   line-height: 20px;
   width: 100%;
   overflow: hidden;
  white-space :nowrap;
  text-overflow: ellipsis;
 }
 a.movielink{
   text-decoration: none;
 }

</style>
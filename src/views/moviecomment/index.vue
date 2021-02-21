<template>
  <div>
<el-card class="box-card">
  <div slot="header" class="clearfix">
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>影评中心</el-breadcrumb-item>
</el-breadcrumb>
  </div>


<div class="itemcomment">
 
 <el-card shadow="hover" v-for="(item,index) in article" :key='"l"+index'  style="margin-bottom:15px">
 <a :href="'/articleview/'+item._id" class="arti" style="color:black">
 <div>
<div class="commentleft">
<img  :src="getcontent(item.content).src" width="100%" height="100%" style="object-fit: cover;">
</div>
<div class="commentright" >
<p style="color:#339999;margin-bottom:8px;padding-top:5px">
  <span><span style="color:#38688c">Author: </span>{{item.author.author.username}}</span>
  <span style='margin-left:20px'>
    <span style="color:#38688c">Time: </span>
    {{item.time.split('T')[0]}}
    </span>
  <span style="float: right;">
    <span style="color:#38688c">Hot: </span>
   <i class="el-icon-paperclip">{{item.like}}</i>
  </span>
</p>
<p class="artitle">
  {{item.title}}
</p>
<div class="artcomment">
{{getcontent(item.content).content}}...
</div>
</div>

<div class="clearfix"></div>
</div>
</a> 
</el-card>

</div>
<div class="itemranking">
  <div class="itemheader">
  <span style="color:#339999">即将上映</span>
  <span style="color:#339999;float: right;">热度</span>
  </div>
   <ul>
    <li  v-for="(item,index) in rank" :key=index class="rankli">
  
    <el-link type="primary">{{index}}.{{item.filmname}}</el-link>
    <span style="float:right;margin-top:2px" class="el-icon-collection-tag"></span>
    <span style="float:right">{{item.movie_like}}</span>
   
   
    </li>
 </ul>
</div>
<div class="clearfix"></div>
   <el-pagination
      @current-change="handleCurrentChange(curPage)"
      :current-page.sync="curPage"
      background
      layout=" prev, pager, next"
      :page-count ="totalPage">
    </el-pagination>

</el-card>
  </div>
</template>

<script>
import {getArticleCenter,getArticleRank} from '@/api/articles'
export default {
    name:'moviecomment',
  data(){
      return {
     
        article:[],  
        totalPage:1, //总数据条模拟数据
        curPage:1,
        rank:[]
      } 
  },
    methods:{
         loadArticle(page =1){
           getArticleCenter(page).then(res=>{
            // console.log(res)
             this.totalPage = res.data.pages
             this.article = res.data.records;
           })
         },
        
       loadRank(){
         getArticleRank().then(res=>{
          // console.log(res)
           this.rank = res.data
         })
       },
     
        handleCurrentChange(page){
          this.loadArticle(page)  //获得指定页码数据
        },
    

    },
    created(){
      this.loadArticle()
      this.loadRank()
    },
    computed:{
       getcontent() { // 对字符串标签进行处理, 返回规定长度的数据
        return function (str) {
          let parse = new DOMParser()
          let Dom =  parse.parseFromString(str, 'text/html')
          let element = Dom.querySelectorAll('p')
          let src='/ba.jpg'
          let content = '';
         if(Dom.querySelector('img') != null){
              src = Dom.querySelector('img').src
         }
          element.forEach(item => {
               content += item.textContent;
          });
         if(content.length>80){
           content = content.slice(0,78);
         return {content,src};
         }else{
          
          return {content,src}
         }
         
            
    
        }
      }
    }
}
</script>

<style lang="scss" >
.itemcomment{
  border-radius: 10px;
  width:60%;
  padding:20px;
  float:left;
}
.itemranking{
  margin-left:30px;
  float: left;
  width: 330px;
  li{
    list-style-type:none;
    text-align: left;
    border-bottom: 2px dashed #ddd;
    padding: 15px;
    position: relative;
  }
 
}
.itemheader{
  margin-bottom:20px;
  padding:0 15px
}
.itemcommentimg{
  display: block;
}
.commentleft{
  float: left;
  width: 180px;
  height: 120px;

}
.commentright{
  width: 66%;
  float: left;
  height:100px; 
 /*  text-overflow: ellipsis; */
 /*  overflow:hidden; */
  margin: 0px 20px;
  padding-bottom: 20px;
}
.artcomment{
       overflow:hidden;
       text-overflow:ellipsis;
       word-break: break-all;
       height: 60px;
}
.artitle{
  font-size: 18px;
  color:#377ea1;
  margin-bottom:5px;
   text-overflow:ellipsis;
   overflow: hidden;
 white-space:nowrap;
}
.clearfix{
  clear: both;

}
.arti:visited{
  color:antiquewhite
}

</style>
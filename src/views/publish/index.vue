<template>
  <el-card class="box-card">
  <div slot="header">
 <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>影评撰写</el-breadcrumb-item>
</el-breadcrumb>
<div class='moviedetail' v-if='movie.actor'>
  <a :href="'/filmdail/'+movie._id" > 
    <span class="cover-movie" >
      <img :src="'http://localhost'+movie.poster">
      </span>
    <span class="item-movie">
      <p class="card-title">{{movie.filmname}}</p>
      <p class="summary-movie">导演:{{getdirector(movie.director)}}</p>
      <p class="actor">演员:{{getdirector(movie.actor)}}</p>
      <p class="type">类型:{{getdirector(movie.filmtype)}}</p> 
    </span>
 </a>
  </div>
  </div>




    <el-form ref="publishform" :model="article" :rules="formRules">
    <el-form-item prop="rating">
    <div class="commentrate">
    <span>给个评价吧:</span>
     <el-rate
  v-model="article.rating"
  show-text
  style="display: inline-block;">
</el-rate>
  </div>
      </el-form-item>
     <el-form-item  prop="title" >
   <el-input 
    v-model="article.title" 
    type="text" 
    maxlength="30" 
    show-word-limit 
     placeholder="请输入标题"
     style="height:70px"
    class="myinput"
     >

   </el-input>
    </el-form-item>
   <el-form-item  prop="content"> 
  
   <el-tiptap 
   v-model="article.content" 
   :extensions="extensions" 
    placeholder="请在这里输入影评信息"
   lang="zh"
   height="500px"

   ></el-tiptap>
  </el-form-item> 

   <el-form-item>
    <el-button type="primary" round @click="onPublish()"
     style="float:right;width:200px"
     :loading='Loadsubmitart'>提交</el-button>
  </el-form-item>
    </el-form>
</el-card>

</template>

<script>

import { ElementTiptap,
   Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  TodoItem,
  Link,
  Preview,
  FontSize,
  } from 'element-tiptap'

import {loadArticlesMovie,GetArticle,addArticle,UpdateArticle} from '@/api/articles'

import {uploadImage} from '@/api/image' 

export default {
   name:'publish',
   
   components: {
    'el-tiptap': ElementTiptap,

  },
   data(){
    return {
    

    extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({
             // 默认把图片存储为 base64 使请求头很大, 我们需要自定义该方式 
         uploadRequest(file){
            const fd = new FormData()
            fd.append('image',file)
            return uploadImage(fd).then((res) =>{
               return "http://localhost"+res.data.image
         })
        }}
        ), 
        
        new TodoItem(),
        new Link(),
        new Preview(),
        new FontSize()


      ],

      article:{
          title:'',
          content:'',
          rating:0,
      },

    
     formRules:{
           title:[
              { required: true, message: '请输入标题', trigger: 'blur' },
              {min:5,max:30,message:'长度在5-30',trigger:'blur'}
           ],
           content:[{validator(rule, value, callback){   //自定义验证表单内容
                   const parser =new DOMParser()
                  const doc = parser.parseFromString(value,'text/html');   
                  //字符串转换成html标签判断是否为空
                    let i = 0
                    doc.querySelectorAll('p').forEach(item=>{
                     if(item.textContent !=''){
                         i++
                     }});
                     if(i==0){
                       callback(new Error('请输入内容'));
                     }else{
                        callback()
                     }
                      
          
             }},
            { required: true, message: '请输入内容', trigger: 'blur' }],
            rating:[{validator(rule, value, callback){
               if(value == 0){
                  callback(new Error('不要忘记评分'))
               }else{
                 callback()
               }
              
            }},]
          
     },
     movie:{},
      Loadsubmitart:false,
     
       }
   },


   methods:{
    loadfilminfo(){
      const id =this.$route.query.id
     // console.log(id)
     if(id){
        loadArticlesMovie(id).then(res=>{
         this.movie = res.data;}).catch(()=>{
        console.log('获取影片信息失败')
      })
     }
     return
      
    },  //获得影片信息


onPublish(){   // 发布影评
   this.$refs['publishform'].validate(valid =>{
     if(!valid){return }  // 验证失败
      else{
          if(this.$route.query.id){   //发布影评
            this.Loadsubmitart = true
           // articleid =this.$router.query.id  //这里没有提供地址栏的id, 如果有id就需要修改代码
          const id = this.$route.query.id  //电影id
          addArticle(this.article,id).then((res)=>{
           const artid= res.data.id
          this.$message({
              message:'发布成功',
              type:"success"
             })
            this.Loadsubmitart =false
            this.$router.push(`/articleview/${artid}`) 
            this.movie={}  //清空
             }).catch(()=>{

               this.Loadsubmitart =false
               this.$message.error('提交失败,重新提交')
               console.log('提交失败')})

          

          }else{
          const id = this.$route.params.id //修改文章参数,首先加载文章
            if(id)
            {
              
                this.Loadsubmitart = true   //按钮的加载状态
                const data={
                  id:id,
                  article:this.article
                }
              UpdateArticle(data).then(()=>{
                  //console.log(res)
                this.$message({message:"修改成功",type:"success"})
                this.Loadsubmitart =false
                 this.$router.push(`/articleview/${id}`)  // 修改成功跳转到内容管理界
               }).catch(()=>{
                this.Loadsubmitart =false
                 this.$message.error('修改影评失败')
               })                                 
             }
             return
                } 
       } 
   })      
   
   },
   // 修改中的 第一步 获取影评
    loadArticles(){
      if(this.$route.params.id){
       GetArticle(this.$route.params.id).then(res=>{
       //  console.log(res)
         this.article.title = res.data.title
         this.article.rating = res.data.article_rate
         this.article.content = res.data.content
         this.movie = res.data.filmid
        
     }).catch(()=>{
       this.$message.error('获取文章失败,重新加载')
     })
      }else{
        console.log('不是修改文章')
      }  
    },
   

   },
computed:{
  getdirector(){
        return function(item) {
            return item.join('/');
      }
  }
   
},
  created(){
   this.loadfilminfo();
   this.loadArticles();
 
  },
}
</script>
<style >
.moviedetail{
margin: 30px 20px;
background-color: #e8eae6;
height:100px;
}
 .moviedetail a{
   text-decoration: none;
   color:#ccc;
   height: 100%;
 }

.cover-movie {
  display: inline-block;
	position: relative;
	margin-right: 10px;
	font-size: 0;
  width:80px;
	height: 100%;
  vertical-align:middle;
  height: 100%;
}
.cover-movie img{
  display: inline-block;
  width: 100%;
  height: 100%;

}
.card-title{

	padding: 10px 40px 0 0;
	margin-bottom: 5px;
	color: #37a;
	font-size: 14px;
	line-height: 1.4;

}
.item-movie{
  color:#999b84;
  display: inline-block;
  width: 80%;
  height:100px;
  vertical-align:middle;
  height: 100%;
  font-size: 14px;

}
.commentrate{
  margin-left:10px
}
.commentrate span{
  margin-right:15px
}

.myinput .el-input__inner{
  height:100%;
  font-size:25px;
  font-weight: 700;
}

</style>

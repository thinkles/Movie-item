<template>
    <el-card>
        <el-row :gutter='60'>
            <el-col :span="5">
                <div class='placehold'></div>
            </el-col>
            <el-col :span="11"  v-if='article.author'>
                <div class="articleview" >
                    <h1 style="font-size: 26px;padding-bottom: 10px;">
                        {{article.title}}
                    </h1>
                    <div class="review-item">
                        <header style="margin-bottom:30px">
                            <a class="avator" :href="'/setting/'+article.author._id">
                                <img  width="24" height="24" :src="'http://localhost'+article.author.photo" style="object-fit:cover">
                            </a>

                            <a class="name" :href="'/setting/'+article.author._id">{{article.author.author.username}}</a>

                            <span class="allstar" style="margin-top:1px">
                                <el-rate v-model="article.article_rate" disabled>
                                </el-rate>
                            </span>

                            <span class="main-meta">{{getTime}}</span>
                            <el-button size='mini'
                             type='danger' 
                            style="float:right"
                             v-if='showartlike'
                             @click='LikeArticle()'>{{artlikeText}}</el-button>
                        </header>

                        <main class="articlecomment">
                            <div class="review-content" v-html='article.content'>

                            </div>

                            <div class="copyright">
                                © 本文版权归作者&nbsp;
                                <a href="#">mumudancing</a>
                                &nbsp;所有，任何形式转载请联系作者。
                            </div>
                            <div class="like_panel">
                                <el-button 
                                type="primary" 
                               
                                icon="el-icon-top"
                                 style='margin-right:60px'
                                 @click.once='likearticle(0)'>{{article.like}}
                                </el-button>
                                <el-button type="primary"   @click.once='likearticle(1)'>
                                    {{article.not_like}}
                                    <i class="el-icon-bottom"></i>
                                </el-button>
                            </div>

                        </main>
                        <el-divider></el-divider>


                        <div class="comment-list">
                            <!-- <commentlist></commentlist> -->
                     <div v-for='(item,index) in comment' :key="'o'+index">
                        <div class="comment-item" >
                           
                            <div class="author-avatar ">
                               <a> 
                                   <img :src="'http://localhost'+item.author.photo" style="object-fit='cover"></a>
                            </div>
                            <div class="comment-main">
                                <div class="comment-head">
                                <a>{{item.author.author.name}}</a>
                                <time style="padding-left:8px">{{item.time.split('T')[0]}}</time>
                                </div>
                                <div class="comment-con">
                                    <span>{{item.content}}</span>
                                </div>
                                <div class="comment-action">
                                    <a href="#" style="font-size:13px" 
                                    class="action_a" @click='replay(index)' v-if='!(show == index)'
                                    >
                                    回应
                                    </a>
                                </div>
                                <div class="replay" v-if='show == index' style="margin-bottom:10px">
                             
                                <input class='replay_input' v-model='replaytext'  style="width:70%;">
                                  
                                <el-button plain style='margin-left:5px' @click='replayAnswer(item._id)'>提交</el-button>
                                <el-button plain style='margin-left:5px' @click='show = -1'>取消</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="replay-list" v-for="(elem,index) in item.replay_id" :key="'q'+index">
                                <div class="replay-item">
                                     <div class="author-avatar-samll">
                                 <a> 
                                   <img :src="'http://localhost'+elem.author.photo" style="object-fit='cover">
                                </a>
                            </div>
                            <div class="comment-main">
                                <div class="comment-head">
                                <a>{{elem.author.author.name}}</a>
                                <time style="padding-left:8px">{{elem.time.split('T')[0]}}</time>
                                </div>
                                <div class="comment-con">
                                    <span>{{elem.content}}</span>
                                </div>
                            </div>
                                </div>
                        </div>
                     </div>
                            <div>

                            </div>

                       
 

                        </div>
                        <el-pagination 
                        background 
                        layout="prev, pager, next" 
                        :page-count="page_count" 
                        :current-page.sync='cur_page'
                        @current-change='changepage(cur_page)'
                        style="margin:60px 0">
                        </el-pagination>
 
                        

                        
                            <div class="comment-editor">
                                <div class="comment-author-avatar" v-if='Userreplay.photo'>
                                    <a :href="'/setting/'+Userreplay._id">
                                        <img :src="'http://localhost/'+Userreplay.photo" 
                                        width="40px" height="40px"
                                        style="object-fit:cover">
                                    </a>
                                </div>
                                <div class='comment-user-replay'>
                                    <el-input type="textarea" placeholder="请输入内容" v-model="usercomment" maxlength="150"
                                        show-word-limit rows='5' resize='none'>
                                    </el-input>
                                </div>
                            </div>
                            <div style="text-align:end;margin-top:20px">
                                <el-button plain type='warning' :loading='waitbut_replay' @click='UserComment()'>回应</el-button>
                            
                            </div>
                        </div>
                    </div>
                

            </el-col>
            <el-col :span="6" v-if='article.filmid'>

                <div class="sidebar-info-wrapper">


                    <div class="subject-title">
                        <a :href="'/filmdail/'+article.filmid._id" >&gt;&nbsp;{{article.filmid.filmname}}</a>
                    </div>

                    <div class="subject-img">
                        <a :href="'/filmdail/'+article.filmid._id">
                            <img :title="article.filmid.filmname"
                                :src="'http://localhost'+article.filmid.poster"
                                width='100px' height="140px">
                        </a>
                    </div>

                    <div class="subject-info movie-info">
                        <ul class="info-list">
                            <li class="info-item" v-for='(item,name,index) in movie' :key='index'>
                                <span class="info-item-key">{{item}}: </span>
                                <span class="info-item-val">{{getmovieinfo(article.filmid[name])}}</span>
                            </li>

                        </ul>
                    </div>


                </div>

            </el-col>
        </el-row>
    </el-card>
</template>

<script>
   // import commentlist from './comment.vue'
    import{getArticles,likeArticle,submitUserreplay,loadUserreplay,submitComment,SetLikeArticle} from '@/api/articles'
    import{getUserProfile} from '@/api/user'
    export default {
        name: 'articleview',
        components: {
            /* commentlist, */
        },
        data() {
            return {
                star: 3,
                usercomment: '',
                article:{},
                movie:{director:'导演',filmtype:'类型',filmtime:'上映时间'},
                show:-1,
                Userreplay:{},  //最下方的评论区
                waitbut_replay:false,
                comment:[] ,//评论内容,分页处理
                page_count:2,
                cur_page:1,
                replaytext:' ',
                artliketype:-1, //收藏状态表示
                artlikeText:'收藏',
                showartlike : true
                            }
        },
        methods: {
     loadArticle(){
         const id = this.$route.params.id
        getArticles(id).then(res=>{
          //  console.log(res)
            this.article =res.data;
           

        }).catch(()=>{
            console.log('获取失败')
        })
     },

     likearticle(type){
       if(type == 0){  //like
        this.article.like++;
        likeArticle(this.article._id,type)
       }else if(type ==1){  //notlike
        this.article.not_like++;
        likeArticle(this.article._id,type)
       }
     },
     replay(index){  
      this.show = index;
        setTimeout(()=>{
       document.querySelector('.replay_input').focus();   
      },300) 

       },

    
     loadreplayuser(){
        getUserProfile().then(res=>{
            this.Userreplay = res.data;
            
        }).catch(()=>{console.log('查询失败')})
     },
     
     LoadUserComment(page=1){
         const id = this.$route.params.id;
       // console.log(id)
       loadUserreplay(page,id).then(res=>{
           this.page_count = res.data.pages
           this.comment = []
           this.comment = res.data.records
       })
     },

     UserComment(){  //最底下的用户评论功能

         if(this.usercomment.trim().length <5){
              this.$message.error('内容太短了...,需要大于5');
              return
         }
         this.waitbut_replay =true
         const data = {
             author:this.Userreplay._id,
             comment:this.usercomment,
             article_id:this.article._id
         }
    
         submitUserreplay(data).then(()=>{
             this.$message({type:'success',message:'评论成功'})
             this.usercomment = '';
             this.waitbut_replay = false
            
         }).catch(()=>{
             this.$message.error('提交失败');
             this.waitbut_replay = false
             
         })
     },

     changepage(page){  //改变页数 加载数据
         this.LoadUserComment(page)
     },

     replayAnswer(masterid){
       if(this.replaytext.trim()==''){
           this.$message.error('内部不能为空');
           return;
       }

      const data ={
          author:this.Userreplay._id,
          masterid,
          content:this.replaytext
      };
         submitComment(data).then(()=>{
         this.replaytext = '';
         this.show = -1;
         this.LoadUserComment(this.cur_page);
          }).catch(()=>{
              console.log('评论失败')
          })
     },

     LikeArticle(){           //点击按钮 收藏 或者取消收藏
       const data ={
             art_id:this.$route.params.id,
             type:this.artliketype
         }
         
       
             if(this.artliketype == 1){   //表示已收藏  点击取消收藏
               SetLikeArticle(data).then(()=>{
                this.artlikeText = '收藏'
                this.artliketype = 2    //切换到未收藏
                this.$message({type:'success',message:'取消收藏成功'})
               }).catch(()=>{
                 this.$message.error("取消失败")})
             
             }else if(this.artliketype == 2){  //没有收藏
               SetLikeArticle(data).then(()=>{
                this.artlikeText = '已收藏',
                this.artliketype = 1
                this.$message({type:'success',message:'收藏成功'})
               }).catch(()=>{
                  this.$message.error("收藏失败")
                })
                
         }},
       
    
     loadLikeArticle(){
         const data ={
             art_id:this.$route.params.id,
             type:this.artliketype
         }
         
           SetLikeArticle(data).then(res=>{
               console.log(res.data.like)
               if(res.data.like == 'me'){
                   this.artliketype = -1
                   this.showartlike = false
                 
               }else if(res.data.like == 'yes'){//存在该文章
                  this.artlikeText = '已收藏'
                  this.artliketype = 1        // 1 表示收藏   2表示 没有收藏 -1表示是自己的文章
                  
              }else if(res.data.like == 'no'){
                   this.artlikeText = '收藏'
                  this.artliketype = 2
                 
               } 
           }).catch(()=>{
               this.$message.error('加载失败,刷新一下')
           })
           },
     },

        

 created(){
  this.loadArticle();
  this.loadreplayuser();
  this.LoadUserComment();
  this.loadLikeArticle();
 },

 computed:{
    getTime(){
         return this.article.time.split('T')[0]
     },
     getmovieinfo(){
         return function(data){
             if(Array.isArray(data)){
               return data.join('/')
             }
             else{
                 return data
             }
            
         }
     }
 }
     
 
 

    }
</script>

<style>
    /*   .el-row {
        margin-bottom: 20px;

    }

    .el-col {
        border-radius: 10px;
    } */
    .placehold {
        width: 200px;
        height: 100px;
    }

    .review-item a {
        text-decoration: none;
        color: #999;
    }
.review-content img{
    width:100%;
    max-height: 380px;
    object-fit: cover;
}
    .copyright {
        /* clear: both; */
        margin: 20px 0;
        color: #999;
        word-break: break-word;
        font-size: 13px;
    }

    .like_panel {
        margin-top: 40px;
        padding-bottom: 20px;
        text-align: center;
    }


    .articleview {

        height: 100%;

    }

    .articleview h1 {
        font-weight: bold;
        color: #494949;
        line-height: 1.1;
        word-wrap: break-word;
    }

    .articlecomment {
        width: 100%;
        word-wrap: break-word;
        overflow: hidden;
        padding: 20px 0 0;
    }

    .subject-title {
        font-size: 15px;
        color: #37a;
    }

    .subject-title a:link {
        color: #37a;
        text-decoration: none;
    }

    .subject-title a:hover {
        color: #FFFFFF;
        text-decoration: none;
        background: #37a;
    }

    .sidebar-info-wrapper .subject-img {
        margin: 20px 0;
        max-width: 100px;
        max-height: 200px;
    }

    ul.info-list {
        list-style: none;
    }

    .subject-img img {
        max-height: 200px;
        max-width: 100px;
    }

    .info-item-key {
        color: #999;
        font-size: 13px;
    }

    .info-item-val {
        color: #111;
        font-size: 13px;
    }

   a img {
        border-width: 0;
        vertical-align: middle;
    } 

    .sidebar-info-wrapper {
        position: fixed;
        top: 100px;
    }



  

.comment-item{
    display: flex;
    font-size: 12px;
}

.author-avatar {
        width: 48px;
        height: 48px;
        margin-right: 20px;
    }
.author-avatar img{
    display: block;
    width: 100%;
    height: 100%;
   object-fit: cover;
}

.comment-main{
    flex:1;
    word-break: break-word;
    margin-bottom:10px;
}
.comment-head{
   background: #F3F5F7;
   margin-bottom: 5px;
   color:#999; 
   font-size:13px;
   height: 20px;
   
}
.comment-con{
    font-size:14px;
  padding: 5px 0;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
}
.comment-action{
    height: 21px;
    text-align:end;
}
.action_a{
  display: none;
  margin-right:8px;
  font-size:13px;
}
.action_a:hover{
    background-color: #d6e5e5;
}

.comment-main:hover .action_a{
    display: inline-block;
    height: 20px;

}

.replay_input{	
	height: 39px;
	border-radius: 7px;
	border: 1px solid #dcdfe6;
	padding-left: 10px;
}
.replay_input:focus {
	outline: none;
	border-color: #409eff;
}

.replay-list 
{
padding-left: 68px;
    }
.author-avatar-samll img{
 height: 24px;
width: 24px;
margin-right: 10px;
object-fit: cover;
}
.replay-item 
  {
    display: flex;
  }

.comment-editor{
    display: flex;
}
.comment-user-replay{
    margin-left:20px;
    flex:1
}
</style>
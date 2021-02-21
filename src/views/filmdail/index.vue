<template>
  <el-card>
    <el-row :gutter="20" type='flex'>
      <el-col :span="6" :offset="4">

        <div class="postercomtain">
          <el-card :body-style="{ padding: '0px',height:'100%'}" style="height:100%">
            <div class="db_coverpicbox">
              <el-image style="width:100%; height: 100%" :src='"http://localhost"+movie.poster' fit="cover"
                v-if='movie.poster'>
              </el-image>
            </div>
          </el-card>
        </div>

      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light ">
          <el-card style="margin-left:2px" v-if='movie.filmname'>
            <h1>
              <span>{{movie.filmname}}</span>
              <span class="year">({{movie.titleyear}})</span>
            </h1>
            <div class="info">
              <p>
                <span class="pl">导演:</span>
                <span class="plcontent">{{getfilmtype(movie.director)}}</span>
              </p>
              <p>
                <span class="pl">演员:</span>
                <span class="plcontent">{{getfilmtype(movie.actor)}}</span>
              </p>
              <p>
                <span class="pl">类型:</span>
                <span class="plcontent">{{getfilmtype(movie.filmtype)}}</span>
              </p>
              <p>
                <span class="pl">制片国家/地区:</span>
                <span class="plcontent">{{movie.country}}</span>
              </p>
              <p>
                <span class="pl">语言:</span>
                <span class="plcontent">{{movie.language}}</span>
              </p>
              <p>
                <span class="pl">上映时间:</span>
                <span class="plcontent">{{movie.filmtime}}</span>
              </p>
              <p>
                <span class="pl">上映时长:</span>
                <span class="plcontent">{{movie.duration}}</span>
              </p>

              <div class="rate">
                <span>我的评价:</span>
                <el-rate v-model="starvalue" show-text style="display:inline-block;padding:10px">
                </el-rate>
                <div style="">
                  <el-button type="primary"  size='mini' @click='watchedMovie()'>看过</el-button>
                  <el-button type="warning"  size='mini' @click='ratingHandle()'>评分</el-button>
                  <el-button type="danger"  size='mini'  @click='likemovie()'>{{like}}</el-button>
                </div>
              </div>

              <p class='story'>剧情:</p>
              <p class="storycontent">{{movie.story}}</p>
            </div>


            <div class="grade_tool">
              <div class="gradebox"><b>{{parseInt(movie.rating)}}<sup>.{{getnumber}}</sup></b>
                <p>总分：10</p>
              </div>
              <div class="rating">
                <span>{{movie.movie_like}}人喜欢</span>
                <span style="margin-left:20px">{{movie.rating_num}}人评分</span>
                <p :class="showstarclass(movie.rating)"></p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>


    <el-row>
      <el-col :span='18' :offset="4">
        <el-card>
          <div class='likefilm_contain'>
            <h2 class='likefilm'>喜欢该电影的人还喜欢...</h2>
            <el-row>
              <el-col :span="4" v-for="(item,index) in likemovies" :key="item.key"
                :offset="index ==0||index%4==0 ? 1 : 2">
                <a :href="'/filmdail/'+item.id" style='text-decoration: none'>
                  <el-card :body-style="{ padding: '10px',height:'250px' }" shadow="hover" style="margin-bottom:20px">

                    <img :src="'http://localhost/'+item.src" v-if='item.src' class="image" height="80%" width="100%">
                    <p class="moviename_p">
                      <span class="moviename_title">{{item.name}}</span>
                      <span class="moviename_score">{{item.rating}}</span>
                    </p>
                  </el-card>
                </a>


              </el-col>
            </el-row>
          </div>
          <el-divider></el-divider>
          <div class="filmcomment">
            <h2 class="likefilm filecomment">"{{movie.filmname}}"的评论...
              <span style="float:right">
                <el-button type="warning" @click='dialogCommentVisible = true' plain size="mini">我要写评论</el-button>
              </span>
            </h2>
            <el-dialog title="电影短评" :visible.sync="dialogCommentVisible" append-to-body>
              <span style='display: inline-block;margin-right:10px;margin-bottom:20px'>给个评价吧:</span>
              <el-rate v-model="commentstarvalue" show-text style='display:inline-block;width:80%'>
              </el-rate>

              <el-input type="textarea" placeholder="输入短评内容" v-model="commenttextarea" maxlength="250" show-word-limit
                :rows='5'>
              </el-input>
              <div style="margin-top:20px;text-align:end">
                <el-button type="primary" @click='submitcomment' :loading='loadcomment'>提交</el-button>
                <el-button type="info" @click="commentstarvalue=0;commenttextarea='';dialogCommentVisible=false">取消</el-button>
              </div>
            </el-dialog>

            <div v-if='moviecomment'>
              <div class="item-comment" v-for='(item,index) in moviecomment' :key='item.key'>

                <h3>
                  <span class="comment-vote">
                    <span class="votes vote-count">{{item.like_num}}</span>
                    <span class="votes0" @click.once='LikeButton(item.id,index)'>有用</span>
                  </span>
                  <span class="comment-info">
                    <a class="comment-info-a" :href="'/setting/'+item.author_id">
                      <span>{{item.name}}</span>
                    </a>
                    <span> 看过 {{movie.filmname}} </span>
                    <span style="display:inline-block">
                      <span class="allstar" v-for='(sta,index) in 5' :key='index'>
                        <img :src="(index>item.rating-1) ?'star.png':'star-o.png'" width='13px'>
                      </span>
                    </span>
                    <span class="comment-time ">
                      {{item.time}}
                    </span>
                  </span>
                </h3>
                <p class="comment-content">
                  <span class="short">{{item.content}}</span>
                </p>
              </div>
              <el-pagination background layout="prev, pager, next" 
              :page-count="commenttotalpage"
                :current-page.sync='current_page' @current-change='commenthandlepage(current_page)'
                style="text-align:end">
              </el-pagination>
            </div>
          </div>


          <div class="article_contain">
            <h2 class="likefilm filecomment">"{{movie.filmname}}" 影评...
              <span style="float:right">
                <a :href="'/publish?id='+$route.params.id">
                  <el-button type="warning" plain size="mini">写影评</el-button>
                </a>
              </span>

            </h2>

            <div v-for='(item,index) in article' :key="item.key">
              <div class="review-item">
                <header class="main-hd">
                  <a class="avator" :href="'/setting/'+item.author._id">
                    <img width="26" height="26" :src="'http://localhost/'+item.author.photo" style="object-fit:cover">
                  </a>

                  <a class="name" :href="'/setting/'+item.author._id">{{item.author.author.username}}</a>
                  <span class="allstar"></span>
                  <span class="time">{{item.time.split('T')[0]}}</span>

                </header>
                <div class="main-bd">

                  <h2 style="margin-bottom: 10px;">
                    <a :href="'/articleview/'+item._id">
                      {{item.title}}
                    </a></h2>

                    <div class="short-content">
                      {{getcontent(item.content)}}&nbsp;.....(
                      <a :href="'/articleview/'+item._id" title="展开" class="unfold">查看</a>)
                    </div>
                  
                  <div class="action">
                    <a
                    @click.once='setlikearticle(0,index)'
                    class="action-btn up" 
                    style='cursor: pointer;' 
                   > 
                      <img src="/filmdail/up.png"> 
                    <span>
                      {{item.like}}
                    </span>
                  </a> 
                    <a @click.once='setlikearticle(1,index)'
                     class="action-btn down" style='cursor: pointer;'
                      >
                      <img src="/filmdail/down.png">
                      <span>
                        {{item.not_like}}
                      </span>
                    </a>

                  </div>
                </div>
              </div>
            </div>


            <el-pagination background layout="prev, pager, next" :page-count="art_totalpage"
              :current-page.sync='art_current_page' @current-change='articlehandle(art_current_page)'
              style="text-align:end">
            </el-pagination>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </el-card>


</template>

<script>
  import {
    getMovieDetail,
    getuserMovieRating,
    setuserLikeMovie,
    setuserWatchMovie
  } from '@/api/user'
  import {
    getrecommendMovies,
    submitMoviecomment,
    getcommentMovie,
    setLikeComment,
    setRating,
  } from '@/api/movie'
  import {
    LoadfilmArticle,
    likeArticle
  } from '@/api/articles'
  export default {
    name: 'filmdail',
    data() {
      return {
        starvalue: 0, //评分的值
        dialogCommentVisible: false,
        commentstarvalue: 0,
        commenttextarea: '',
        loadcomment: false, //评论按钮等待
        movie: {}, //电影详情页

        likemovies: [{
          src: "",
          name: '',
          rating: ''
        }], //推荐的电影
        moviecomment: [],

        commenttotalpage: 5,
        current_page: 1,
        article: [],
        art_totalpage: 5,
        art_current_page: 1,
        like:'喜欢', //收藏 取消 按钮内容
       
        likeflag:-1, // 收藏 取消的标志 -1加载状态的默认选项   1 已经收藏  2 没有收藏
      }

    },

    methods: {

      loadMovie() {
        const id = this.$route.params.id
        getMovieDetail(id).then(res => {
          // console.log(res)
          this.movie = res.data
          this.loadLikeMovie(this.movie.filmtype)

        }).catch(() => {
          console.log('收不到信息')
        })
      },
     
      loadLikeMovie(data) {
        //传递类型参数 从movie中得到
        const type = data.join('/')
        getrecommendMovies(type).then(res => {
          const filmlist = res.data
          this.likemovies = [] //清空数组
          filmlist.forEach((item, index) => {
            this.likemovies.push({
              name: item.filmname,
              rating: item.rating,
              src: item.poster,
              key: 'i' + index,
              id: item._id
            })
          });
        }).catch(() => {
          console.log('获得推荐信息失败')
        })
      },

      submitcomment() {

        if (this.commenttextarea.trim() == '' || this.commenttextarea == 0) { //如果内容不正确,不在提交
          this.$message.error('检查内容是否正确')
          this.loadcomment = false
          this.dialogCommentVisible = false;
          return
        }
        this.loadcomment = true //按钮等待

        const comment = {
          content: this.commenttextarea,
          rating: this.commentstarvalue,
          movie_id: this.$route.params.id
        }
        submitMoviecomment(comment).then(() => {
          //console.log(res);
          this.loadcomment = false;
          this.$message({
            message: '评论成功',
            type: 'success'
          });
          this.dialogCommentVisible = false;
          this.commentstarvalue = 0;
          this.commenttextarea = '';
          this.loadMovieComment(this.current_page);
        }).catch(() => {
          this.commentstarvalue = 0;
          this.commenttextarea = '';
          this.dialogCommentVisible = false;
          this.loadcomment = false
          this.$message.error('评论失败,重新评论')
        })


      },


      loadMovieComment(page = 1) { //type 1代表是点击分页时进行刷新, 0:还是第一次加载时进行刷新

        const id = this.$route.params.id
        getcommentMovie(id, page).then(res => {

          this.moviecomment = [];
          this.commenttotalpage = res.data.pages
          res.data.records.forEach((item, index) => {
            const time = item.time.split('T')[0] //数据处理
            this.moviecomment.push({
              time: time,
              name: item.author.author.username,
              content: item.content,
              like_num: item.content_like,
              rating: item.comment_rating,
              key: index + Math.random(),
              author_id: item.author._id,
              id: item._id
            });

          });

        }).catch(() => {
          console.log('初始化评论失败')
        })
      },


      commenthandlepage(page) {

        this.loadMovieComment(page);
      },

      LikeButton(id, index) { //短评评论

        this.moviecomment[index].like_num++;
        setLikeComment(id).then(() => {
          // this.loadMovieComment(this.current_page);
        }).catch(() => {
          this.$message.error('失败，请重试')
        })
      },

      loadArticle(page = 1) {
        const id = this.$route.params.id;

        LoadfilmArticle(id, page).then(res => {
         // console.log(res)
          this.article = [];
          this.article = res.data.records;
          this.article.forEach(item=>{
            item.key = 'in'+Math.random();
          })
          this.art_totalpage = res.data.pages;
        }).catch(() => {
          console.log('获取失败');
        })
      },

      articlehandle(page) {
      
        this.loadArticle(page)
      },

      setlikearticle(type, index) {

       
        if (type == 0) { //like
          this.article[index].like++;
          likeArticle(this.article[index]._id, type)
        } else if (type == 1) { //notlike
          this.article[index].not_like++;
          likeArticle(this.article[index]._id, type)
        }
      },

      ratingHandle(){
        const data ={
          movieid:this.$route.params.id,
          rating:this.starvalue*2,
        }
        setRating(data).then(()=>{
          this.$message({type:'success',message:'评分成功'})
        }).catch(()=>{this.$message.error('失败,请重新评分')})
        
        
      },

      loaduserrating() {
        getuserMovieRating(this.$route.params.id).then(res => {
          this.starvalue = res.data.rating/2
          //console.log(res.data.rating)
        })
      },
      likemovie(){
        if(this.likeflag == 1){   //电影已经收藏  点击取消  1收藏  2 未收藏
          
          setuserLikeMovie(this.$route.params.id,this.likeflag).then(()=>{
             this.$message({type:'success',message:'取消收藏成功'})
             this.like='喜欢'
             this.likeflag = 2
           // console.log(res)
          }).catch(()=>{this.$message.error('收藏失败')})


        }else if( this.likeflag == 2){                //没有收藏   点击收藏
          setuserLikeMovie(this.$route.params.id,this.likeflag).then(()=>{
             this.$message({type:'warning',message:'收藏成功'})
             this.like='取消喜欢'
             this.likeflag = 1
            //console.log(res)
          }).catch(()=>{this.$message.error('取消失败')})
        }
      },

      loadisLikeMovie(){
        setuserLikeMovie(this.$route.params.id,this.likeflag).then(res=>{  
        //  console.log(res.data)
          if(res.data.like == 'yes'){  //已经收藏
            this.like = '取消喜欢'
            this.likeflag = 1  
          }else if(res.data.like == 'no'){ // 没有收藏
            this.like='喜欢'
            this.likeflag = 2 
          }
        }).catch(()=>{
           this.$message.error('获得状态失败,请刷新')
            this.likeflag = -1  //  无法使用状态
        })
      },
      watchedMovie(){
        setuserWatchMovie(this.$route.params.id).then(res=>{
           console.log(res);
            this.$message({type:'success',message:'成功添加'})
        }).catch(()=>{
          this.$message.error('添加失败')
        })
      }


    },
    computed: {
      getfilmtype() {
        return function (film) {
          if (film.length !== 0) {
            return film.join('/')
          } else {
            return ''
          }
        }
      },
      showstarclass() {
        return function (star) {
          return 'bigstar' + ' bigstar' + Math.round(star);
        }
      },
      getnumber() {
        let str = this.movie.rating.toString()
       
        if(str.indexOf('.') != -1){
           const num = str.split('.')
           return num[1]
        }
           
            return 0
        },  //因为数据库 存储4.0 默认会变成4 所以前端拿到数据进行处理
        
       
      getcontent() { // 对字符串标签进行处理, 返回规定长度的数据
        return function (str) {
          let parse = new DOMParser()
          let element = parse.parseFromString(str, 'text/html').querySelectorAll('p')
          let content = '';

          element.forEach(item => {
            content += item.textContent;
          })
          
            if(content.length > 80) {
              content = content.slice(0,78);
                return content
            }else{
                 return content
            }
        
        }
      }
    },

    created: function () {
      this.loadMovie()
      this.loadMovieComment()
      this.loadArticle()
      this.loaduserrating()
      this.loadisLikeMovie()
    }

  }
</script>

<style>
  h1 {
    font-weight: bold;
    font-size: 26px;
  }

  h1 .year {
    color: #888;

  }

  .db_coverpicbox {
    background: #f9f9fa;
    border: 1px solid #d5d5d5;
    border-radius: 10px;
    box-shadow: 0 0 10px #999;
    padding: 10px;
    width: 94%;
    height: 96%;

  }

  .info {
    max-width: 480px;
    margin-top: 10px
  }

  .pl {
    font-size: 15px;
    line-height: 150%;
    color: #666666;
    padding: 10px
  }

  .plcontent {
    font-size: 15px;
    line-height: 150%;
    color: #111;
  }

  .story {
    margin-top: 10px;
    margin-left: 10px;
  }

  .storycontent {
    color: #666666;
    height: 60px;
    padding: 5px;
    overflow: hidden;
    font-size: 16px;
    text-overflow: ellipsis;
  }

  .gradebox {
    background: #f8f1f1;
    width: 80px;
    height: 80px;
    position: absolute;
    left: 10px;
    top: 6px;
    text-align: center;
    font-size: 12px;
  }

  .grade_tool {
    padding-left: 95px;
    width: 168px;
    position: relative;
    min-height: 95px;

  }

  .gradebox b {
    padding: 0;
    width: 45px;
    height: 45px;
    margin: 5px auto 3px;
    text-align: left;
    font-size: 40px;
    line-height: 1.2em;
    position: relative;

  }

  .postercomtain {
    height: 100%;
  }

  .gradebox b sub {
    font-size: 24px;
    line-height: 24px;
    position: absolute;
    top: 6px;
    right: 0;
    vertical-align: top;
  }


  .rating {
    padding: 12px;
  }

  .rating span {
    color: #4f0803;
    font-size: 14px;
  }

  .bigstar {
    background: url('/rating.png');
    width: 150px;
    height: 30px;
    background-position: 0 -30px;
    margin-top: 10px
  }

  .bigstar10 {
    background-position: 0 0px;
  }

  .bigstar9 {
    background-position: 0 -30px;
  }

  .bigstar8 {
    background-position: 0 -60px;
  }

  .bigstar7 {
    background-position: 0 -90px;
  }

  .bigstar6 {
    background-position: 0 -120px;

  }

  .bigstar5 {
    background-position: 0 -150px;
  }

  .bigstar4 {
    background-position: 0 -180px;

  }

  .bigstar3 {
    background-position: 0 -210px;
  }

  .bigstar2 {
    background-position: 0 -240px;
  }

  .bigstar1 {
    background-position: 0 -270px;
  }

  .bigstar0 {
    background-position: 0 -300px;
  }

  .ratingbutoon {
    float: right;
    width: 200px;
  }

  h2.likefilm {
    font-size: 20px;
  }

  .likefilm {
    color: #007722;
    font-size: 16px;
    margin-bottom: 20px;

  }

  .likefilm a {
    text-decoration: none;
  }

  .moviename_p {
    padding: 10px;

  }

  .moviename_title {
    display: inline-block;
    font-size: 16px;
    width: 80%;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .moviename_score {
    display: inline-block;
    color: darksalmon;
    height: 25px;
    line-height: 25px;
    margin-left: 5px;
    font-size: 16px;
  }

  .comment-vote {
    float: right;
    color: #494949;
    font-size: 13px;
    font-weight: 100;
  }

  .filecomment {
    margin-top: 50px;
  }

  .comment-info {
    font-size: 13px;
    color: #494949;
  }

  .comment-time {
    color: #aaa;
  }

  .comment-content {
    padding: 5px 0px;
    height: 20px
  }

  .votes0:hover {
    color: #fff;
    background: #007722;
    cursor: pointer;
  }

  .comment-info-a {
    color: #37a;
    cursor: pointer;
    text-decoration: none;
  }

  .comment-info-a:hover {
    color: #fff;
    background: #37a;
  }

  .item-comment {
    padding: 10px 0;
    border-bottom: 1px dashed #444a4d;
  }



  .review-item {
    padding: 15px 0;
  }

  .main-hd {

    margin-bottom: 10px;
    height: 24px;
    font-size: 0;
    color: #999;
    overflow: hidden;
    line-height: 1.4;
    margin-left: 17px;

  }

  .unfold:hover {
    color: #fff;
  }

  .main-hd a {
    vertical-align: middle;
  }

  .main-hd .time {
    vertical-align: middle;
  }

  .main-bd h2 a {
    color: #37a
  }

  .main-bd a:hover {
    color: #FFFFFF;
    text-decoration: none;
    background-color: #37a;
  }

  a:visited {
    color: #666699;
    text-decoration: none;
  }

  /*  a img{
   border: 0;
   border-width: 0;
   vertical-align: middle;
    max-width: 100%;
 } */
  .name {
    font-size: 14px;
    margin-left: 10px;

  }

  .name:hover {
    color: #fff;
    background: #37a;
  }

  .time {
    font-weight: 300;
    color: #999;
    font-size: 14px;
    margin-left: 10px;
  }



  .action {
    font-size: 13px;
    margin-top: 18px;
  }

  .action-btn {
    color: #3377aa;
    padding: 4px 6px;
    margin-right: 4px;
    border-radius: 2px;
    background-color: #f0f7f9;
    display: inline-block;
    line-height: 1;
    text-decoration: none;
  }

  .action-btn img {
    width: 12px;
    max-width: 100%;
  }

  .rate {

    margin-left: 10px;
  }
</style>
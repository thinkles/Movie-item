<template>
  <el-card>

    <div class="top">
      <el-card>
        <div slot="header">
          <span class="spanheader">发现好电影</span>
        </div>
        <div class="article">
          <div class="tags">
            <!--     <ul  class="category">
              <li v-for='(item,index) in Tabs'  :key='index'
                @click='active(index)' 
              :class="{Tabshover:index==Tabsindex.tab }" >
                <span>{{item}}</span>
              </li>
            </ul>   -->
            <ul class="category">
              <li v-for='(item,index) in Tabs0' :key='index' @click='active0(index)'
                :class="{Tabshover:index==Tabsindex.tab0}">
                <span>{{item}}</span>
              </li>
            </ul>

            <ul class="category">
              <li v-for='(item,index) in Tabs1' :key='index' @click='active1(index)'
                :class="{Tabshover:index==Tabsindex.tab1}">
                <span>{{item}}</span>
              </li>
            </ul>

            <ul class="category">
              <li v-for='(item,index) in Tabs2' :key='index' @click='active2(index)'
                :class="{Tabshover:index==Tabsindex.tab2}">
                <span>{{item}}</span>
              </li>
            </ul>


            <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:40px">
              <el-tab-pane label="近期热门" name="first">
                <el-row v-if='movie'>
                  <el-col :span="5" v-for="(item, index) in movie" :key="index" :offset="1" style="margin-top:30px">
                    <el-card :body-style="{ padding: '0px',height:'260px'}" shadow="hover">
                      <a :href="'/filmdail/'+item._id">
                        <img :src="'http://localhost'+item.poster" class="image" height="200px" width="100%">
                      </a>
                      <div class="moviename">
                        <span class="title" :title="item.filmname">{{item.filmname}}</span>
                        <span class="score">{{item.rating == 0 ? '即将上映' : item.rating}}</span>
                      </div>
                    </el-card>



                  </el-col>
                </el-row>

                <el-divider></el-divider>
                <el-pagination
                 background
                  layout="prev, pager, next" 
                  :page-count="movieTotalpage"
                  :current-page.sync='current_page' 
                  @current-change='handlePage(current_page)'>
                </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="评分最多" name="second">
                <el-row v-if='movie'>
                  <el-col :span="5" v-for="(item, index) in movie" :key="index" :offset="1" style="margin-top:30px">
                    <el-card :body-style="{ padding: '0px',height:'260px'}" shadow="hover">
                      <a :href="'/filmdail/'+item._id">
                        <img :src="'http://localhost'+item.poster" class="image" height="200px" width="100%">
                      </a>
                      <div class="moviename">
                        <span class="title" :title="item.filmname">{{item.filmname}}</span>
                        <span class="score">{{item.rating == 0 ? '即将上映' : item.rating}}</span>
                      </div>
                    </el-card>



                  </el-col>
                </el-row>
                <el-pagination background layout="prev, pager, next" :page-count="movieTotalpage"
                  :current-page.sync='current_page' @current-change='handlePage(current_page)'>
                </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="最新上映" name="third">
                <el-row v-if='movie'>
                  <el-col :span="5" v-for="(item, index) in movie" :key="index" :offset="1" style="margin-top:30px">
                    <el-card :body-style="{ padding: '0px',height:'260px'}" shadow="hover">
                      <a :href="'/filmdail/'+item._id">
                        <img :src="'http://localhost'+item.poster" class="image" height="200px" width="100%">
                      </a>
                      <div class="moviename">
                        <span class="title" :title="item.filmname">{{item.filmname}}</span>
                        <span class="score">{{item.rating == 0 ? '即将上映' : item.rating}}</span>
                      </div>
                    </el-card>

                  </el-col>
                </el-row>
                <el-pagination background layout="prev, pager, next" :page-count="movieTotalpage"
                  :current-page.sync='current_page' @current-change='handlePage(current_page)'>
                </el-pagination>
              </el-tab-pane>
            </el-tabs>

          </div>
        </div>

      </el-card>
    </div>
    <div class="right">
      <el-card>
        <div slot="header" class="clearfix">
          <span title='更新一个月之间上映的影片'>月排行榜</span>
          <span style="float:right">评分</span>
        </div>
        <div v-for="(o,index) in rank" :key="'o'+index" class="text item" style="padding:10px;color:">
          <el-link :underline="false" >{{index+1}}{{'.'+o.filmname}}</el-link>
          <span style="float:right;color:#b7853b">{{o.rating}}</span>
        </div>

      </el-card>
    </div>
    <div style="clear:both"></div>


  </el-card>

</template>

<script>
  import {
    FindMovie,
    Ranking
  } from '@/api/movie'
  export default {
    name: 'find',
    data() {
      return {
        /*  Tabs:['全部形式','电影','电视剧','综艺','动漫','纪录片','短片'], */
        Tabs0: ['全部类型', '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '犯罪', '音乐', '歌舞', '历史', '战争', '西部', '武侠', '灾难', '传记', '奇幻',
          '音乐', '恐怖', '悬疑'
        ],
        Tabs1: ['全部地区', '中国大陆', '欧美', '美国', '中国香港', '中国台湾', '日本', '韩国', '俄罗斯', '瑞典', '意大利', '印度', '加拿大'],
        Tabs2: ['全部年代', '2020', '2019', '2000年代', '90年代', '80年代', '更早'],
        /*  Tabsins:0, */
        Tabsindex: {
          tab0: 0,
          tab1: 0,
          tab2: 0
        },
        activeName: 'first',
        Tabvalue: {
          tab0: '',
          tab1: '',
          tab2: ''
        },
        movie: [],
        type: 1, //传给后端区别 tab 的值
        movieTotalpage: 1,
        current_page: 1,
        rank:[], //排行榜

      }
    },
    methods: {

      handlePage(page) {
        this.loadMovie(page)
      },
      computedtype() {
        if (this.activeName == 'second') {
          this.type = 3;
        } else if (this.activeName == 'third') {
          this.type = 2;
        } else if (this.activeName == 'first') {
          this.type = 1;
        }
      },


      handleClick() {
        this.current_page = 1;
        this.loadMovie()
      },


      active0(index) {
        this.Tabsindex.tab0 = index
        this.Tabvalue.tab0 = this.Tabs0[index]
        if (index == 0) {
          this.Tabvalue.tab0 = ''
        }
        this.loadMovie(this.current_page)
      },
      active1(index) {
        this.Tabsindex.tab1 = index
        this.Tabvalue.tab1 = this.Tabs1[index]
        if (index == 0) {
          this.Tabvalue.tab1 = ''
        }
        this.loadMovie(this.current_page)
      },
      active2(index) {
        this.Tabsindex.tab2 = index
        this.Tabvalue.tab2 = this.Tabs2[index]
        if (index == 0) {
          this.Tabvalue.tab2 = ''
        }
        this.loadMovie(this.current_page)
      },



      loadMovie(page = 1) {
        const data = this.Tabvalue
        this.computedtype()
        FindMovie(data, this.type, page).then(res => {
          console.log(res.data)
          this.movie = res.data.records
          this.movieTotalpage = res.data.pages

        })
      },
    loadRanking(){
      Ranking().then(res=>{
        this.rank = res.data
      })
    }

    },

    created() {
      this.loadMovie();
      this.loadRanking();
    },
  }
</script>

<style>
  .top {
    float: left;
    width: 60%;
    margin: 0 60px;
    margin-bottom: 20px;

  }

  .right {

    min-width: 300px;
    margin-right: 50px;
    /*  max-width:300px */
    float: right;

  }

  .category {
    padding-left: 0;
    margin-bottom: 17px;
  }

  .category li {
    display: inline-block;
    color: #333;
    margin-right: 4px;
    padding-top: 3px;
  }

  .article {
    float: left;
    width: 700px;
    padding-right: 40px;
  }

  .category span {
    cursor: pointer;
    font-size: 14px;
    padding: 2px 10px;
    line-height: 20px;
    border-radius: 2px;
    display: inline-block;

  }

  .category span:hover {
    color: #258dcd;
  }

  .Tabshover {
    background: #258dcd;
    color: #fff !important;
  }

  .Tabshover span:hover {
    color: #fff
  }

  .moviename {
    padding: 10px;

  }

  .title {

    display: inline-block;
    height: 20px;
    line-height: 20px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }


  .score {
    font-size: 14px;
    color: #ffac2d;

  }

  .el-row {
    margin-bottom: 20px;

  }

  .spanheader {
    font-size: 26px;
    height: 36px;
    margin-bottom: 25px;
    line-height: 36px;
    font-weight: 700;
  }
</style>
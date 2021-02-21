<template>
  <div class="container">
   

  <el-card class="box-card">   <!-- Card组件 -->
  <div slot="header" class="clearfix">
   <el-breadcrumb separator="/"> <!-- 面包屑 -->
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
  </el-breadcrumb>
  </div>

  <div class="text item">
    <el-form ref="textform"  label-width="80px">

  <el-form-item label="状态">
  <el-radio-group v-model="status">
      <!-- el radio 组件默认使用 label值作为 选中resource的值  -->
      <el-radio :label="null">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
      <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
      <!-- 必须绑定label 否则绑定的值不是 number 而是字符串 -->
    </el-radio-group> 
  </el-form-item>
  <el-form-item label="频道">
    <!-- 被选中时channelID 被 value 赋值 -->
     <!-- 传递 null 布尔值 必须绑定属性, 单纯属性只能绑定字符串 -->
    <el-select v-model="channelvalue" placeholder="请选择活动区域">
      <el-option label="全部" :value="null"></el-option> 
      <el-option v-for="(channel,index) in channels" 
      :label="channel.name" 
      :value="channel.id"
       :key="index">
       </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="日期">
       <el-date-picker
      v-model="rangeDate"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format='yyyy-MM-dd'
      value-format='yyyy-MM-dd'
      >
    </el-date-picker>
  </el-form-item>

 <el-form-item>
    <el-button :disabled="loading" type="primary" @click="loadArticle(1)">查询</el-button>
  
  </el-form-item>

</el-form>
  </div>
</el-card>

  
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>根据筛选结果查询到{{totalCount}}条结果:</span>
  </div>
  <div  class="text item">   
     <!-- 数据列表 -->
    <el-table  
     v-loading="loading"
      :data="articles"
      style="width: 100%"
      stripe
      border>
      <!-- el-table-column  设置列   prop设定数据 
      m默认表格只能处理文本, 想要处理其他形式使用 自定义列模板-->
      <el-table-column
        label="封面"
        width="180">
<!-- 本地图片在打包时就必须存在 -->
      <template slot-scope="scope">
       <!--  <img src='./pic.jpg' width='50px' height="50px"> 
        图片不加载的原因 因为 运行时拼接地址 找不到图片
       -->
        <el-image :src ="scope.row.image" 
        style="width:50px ;height:50px" 
        fit="cover"
        lazy
        ></el-image>
       </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        
        label="状态">
        <!-- 在自定义列模板中使用 该列的数据  使用scope -->
        <template slot-scope="scope">
          <el-tag :type='articleStatus[scope.row.status].type'>{{articleStatus[scope.row.status].text}}</el-tag>
         <!--  <el-tag v-if="scope.row.status === 1"  type='info'>待审核</el-tag>
          <el-tag v-if="scope.row.status === 2" type='success'>审核通过</el-tag>
          <el-tag v-if="scope.row.status === 3" type='success'>审核失败</el-tag>
          <el-tag v-if="scope.row.status === 4" type='success' >已删除</el-tag> -->
        </template>
      </el-table-column>
       <el-table-column
        prop="publish"
        label="发布时间">
      </el-table-column>
       <el-table-column
        prop="use"
        label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="$router.push('/publish?id='+scope.row.id)"></el-button>
         <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteArticle(scope.row.id)"></el-button>
      </template>

      </el-table-column>
    </el-table>


<!-- 分页器    -->
<el-pagination  style="text-align: center; margin-top:20px"
:disabled="loading" 
  :page-size="pageSize"
  background
  layout="prev, pager, next"
  :total="totalCount" 
  :current-page.sync="page"  
  @current-change='onCurrentPage'>    
    <!-- total不要写死 要通过后端返回的数据来进行定义  current-page获得当前的页数 -->
<!-- 动画laoding 时, disabled禁用分页器  查询按钮也是-->
</el-pagination>
  </div>
</el-card>
</div>
</template>

<script>
import {getArticles ,DeleteArticle} from '@/api/articles'
export default {
  name:'art',
  data(){
      return {

        articles:[
          { id:24234,
            status:1,
            publish: '2016-05-02',
            title: '人工智能',
            use: '',
            image:'/pic.jpg',
          }, {
            id:2423401,
            status:2,
            publish: '2016-05-02',
            title: 'java教程',
            use: '',
            image:'/pic2.jpg',
          },    
        ] , //后端取得的文章内容  这里模拟一下数据

        articleStatus:[
          {status:0 , text:"草稿" ,type:'info'},
          {status:1 , text:'待审核',type:'warning'},
          {status:2, text:'审核通过',type:'success'},
          {status:3 , text:'审核失败',type:'danger'},
          {status:4 , text:"已删除",type:''}
        ],
         totalCount:100,
         pageSize:10, //每页显示的数据
         status:'',
         channels:[
           {name:'c++', id:0},
           {name:'java', id:1},
         ],     //需要后台数据 这里进行模拟
         channelvalue:'',
         rangeDate:[], //日期范围
         loading: false,   // 表格 loading动画
         page:1,
      }

      },
  methods:{
  
     loadArticle(page=1){
   //this.loading = true // 每次都进行loading  请求完成后关闭
    
     getArticles({
       page,
       per_page:this.pageSize,  //通过向后端传参数 取得页数 和每页的数量
       status:this.status,  //查询指定状态的数据
       channel_id : this.channelvalue ,  //传递查询频道id值
       begintime: this.rangeDate? this.rangeDate[0] :null,  // 放置this.rangeDate为null 导致错误
       endtime : this.rangeDate? this.rangeDate[1] :null,      //请求日期范围内的数据
     }).then(res =>{
            this.article = res.data.results // 后端取得的文章数据赋值给vue实例存储数据
            this.totalCount = res.data.total/this.pageSize || 100  //后端返回的总信息数 这里因为没有数据需要使用 || 模拟一个
            
            this.loading =false  // 请求成功关闭loading动画
      });  // 后端取得文章内容
     },

     onCurrentPage(page){  //把每次点击的页数传递进去
       this.loadArticle(page)
     },

     loadChannels(){
     /*   getArticlesChannels().then(res =>{
       //  this.channels = res.data.channels //后端数据传过来 这里需要注释 否则会覆盖模拟数据
      console.log(res) 
      })*/
     },
      onDeleteArticle(articleID){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
 //根据文章id值进行删除
        DeleteArticle(articleID.toString()).then(()=>{

            this.loadArticle(this.page)  // 删除数据之后更新当前页数
        })   
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     }, 


    onEditArticle(){
     this.$router.push('/publish')
    }
  } ,
  
  created(){
    this.loadArticle()
    this.loadChannels() 
    
  }
}
</script>

<style lang="scss">
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
   .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
     margin-bottom: 30px;
  }
  .el-pagination
  {
    margin-top: 10px;
  }
</style>
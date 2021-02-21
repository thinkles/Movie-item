<template>
 <!-- default-active : $router.path 刷新之后会再次打开上一次的页面 -->
    <el-menu
      default-active="$router.path"
      class="el-menu-vertical-demo aside-menu"
      background-color="#1b435d"
      text-color="#d5eeff"
      active-text-color="#78bbe6"
       router
      :collapse="isCollapse"
   
       >
    
      
        <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-s-promotion"></i>
        <span slot="title" >内容管理</span>
      </el-menu-item>
      <el-menu-item index="/publish" >
        <i class="el-icon-picture-outline"></i>
        <span slot="title">文章发布</span>
      </el-menu-item>
      <el-menu-item index="/images">
        <i class="el-icon-s-grid"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-s-comment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
       <el-menu-item index="/fans">
        <i class="el-icon-share"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
       <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>


</template>

<script>
  export default {
    name:"AppAside",
    props:['is-collapse'],
  data(){
    return {
      
    }
  },


    methods: {
     
    }
  }
</script>



<style lang='scss'>
.aside-menu{
        height: 100%;
}

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
  
  }

</style>
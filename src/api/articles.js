/* 文章相关接口  取得相关文章*/

import request from '@/utils/request'


export const loadArticlesMovie = (id)=>{ //影评页 电影信息
    return request({
        method:'GET',
        url:`article/film/${id}`, 
    })
} 

  /* 发布影评 */
  export const addArticle =(data,id) =>{
    return request({
        method:'post',
        url:`article/write/${id} `,
        data,    
    })
} 


export const getArticles = (id)=>{  // 影评查看页
    return request({
        method:'GET',
        url:'article/view',
        params:{
            id
        }
    })
}


export const likeArticle = (id,type)=>{  // 影评查看页
    return request({
        method:'GET',
        url:'article/like',
        params:{
            type,
            id
        }
    })
}


export const LoadfilmArticle = (id,page)=>{  // 加载影评
    return request({
        method:'GET',
        url:'article/moviearticle',
        params:{
            page,
            id
        }
    })
}

//请求影评下的 版主评论
export const loadUserreplay = (page,id) =>{
    return request({
        method:'get',
        url:'article/replay',
        params:{
            page,
            id,
        }
    })
}



//提交影评下的 评论
export const submitUserreplay = data =>{
    return request({
        method:'post',
        url:'article/comment',
        data, 
    })
}

export const submitComment = data =>{
    return request({
        method:'post',
        url:'article/answer',
        data, 
    })
}

export const getArticleCenter= page =>{    // 影评中心
  
    return request({  
        method:'get',
        url:'article/center',
        params:{
              page,
        }
      
      })
  }


  export const getArticleRank=() =>{    // 影评中心 排行榜 即将上映电影的热度
  
    return request({  
        method:'get',
        url:'article/rank',
      })
  }


export const GetArticle = data =>{  //修改文章之前先获取文章
    return request({
        method:'get',
        url:`article/getarticle`,  
        params:{
            data,
        }
    })
} 



/* axios 会默认把后端传过来的字符串 转化为 json  为了方便使用,
  js能表示的整数范围有限 , 但是有些超大的整数会超出范围, 转化json时会把超大的整数转换错误
  使用第三方包 json-bigint 来解决
  在Axios 内部使用json-big 来解析
  */



/* 修改文章 */
export const UpdateArticle =(data) =>{
    return request({
        method:'post',
        url:`/article/updatearticle`,   // 通过传递id 
        data,   //请求体
    })
} 


export const SetLikeArticle = data =>{
    return request({
        method:'post',
        url:`/article/likearticle`, 
        data,
        
    })
} 

//删除发布的影评
export const DeleteArticle = (data) =>{
    return request({
        method:'get',
        url:`/article/remove`, 
        params:{
            data,
        }
        
    })
} 


/* 更新文章评论状态 */

export const UpdateArticleComment = (articlesid,allowComment) =>{
    return request({
        method:'PUT',
        url:'/mp/comment',   // 通过传递id 值获得特定文章数据
        articlesid,
        params:{
            articlesid,
        },
        data:{
          allow_comment:allowComment,    //参数只能驼峰命名 所以不能用简写语法
        }
    })
} 
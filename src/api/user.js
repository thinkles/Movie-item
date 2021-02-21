/* 
把请求封装在模块中 , 易于管理  使用过程中可能会经常更改
用户请求封装
*/
import request from '@/utils/request.js'

export const userlogin = data=>{
  
    return request({  //调用 接口传递数据
        method:'POST',
        url:'admin/login' ,  //请求地址
        data,
      })
}

export const useradd = data=>{
  return request({  //调用 接口传递数据
    method:'POST',
    url:'admin/useradd' ,  //请求地址
    data,
  })
}

//从后端获取用户资料
/* headers:{     // 在request.js 统一设置了请求头
      //设置请求头   : 基本http请求认证
    Authorization:'...'+user.token  // 提供令牌 (用户名 密码 一般都经过加密形成令牌)
    } */

export const getUserProfile = ()=>{
  
  return request({
    method:'get',
    url:'/admin/allinfo' ,
    
  })
}

/* export const getUserName = (id)=>{
  
  return request({
    method:'get',
    url:'/admin/username' ,
    params:{
      id,
    }
  })
} */

export const getMovieProfile = (data)=>{
  
  return request({
    method:'get',
    url:`/home/search/${data}`,
    
  })
}

export const getMovieDetail = (param)=>{
  
  return request({
    methods:'get',
    url:`/movie/film/${param}`,
    
  })
}

export const getuserMovieRating = (data)=>{
  
  return request({
    method:'get',
    url:`/movie/personalstar`,
    params:{
      data,
    }
    
  })
}

export const setuserLikeMovie = (movieid,type)=>{  //收藏电影 取消电影
  
  return request({
    method:'get',
    url:`/admin/likemovie`,
    params:{
      movieid,
      type
    }
    
  })
}

export const setuserWatchMovie = (movieid)=>{  //收藏电影 取消电影
  
  return request({
    method:'get',
    url:`/admin/watchmovie`,
    params:{
      movieid,
    }
    
  })
}

// axios 请求拦截器


/* 修改用户 头像信息  */

export const UpdateUserPhoto = (data)=>{
 
  return request({
    method:'put',
    url:'/admin/user' ,
    headers: {
      'Content-Type': 'multipart/form-data'
    }, 
    data,
    })
}
export const UpdateUserName = (data)=>{  //更新用户昵称
 
  return request({
    method:'put',
    url:'/admin/userinfo', 
    data,
    })
}

/* 修改用户密码 */
export const UpdateUserBaseProfile = (data)=>{
 
  return request({
    method:'put',
    url:'/admin/userinfopass' ,
    data
    })
}





/* 获取用户的粉丝 */

export const getUserfans = ()=>{
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method:'get',
    url:'/' ,//请求地址
  
  })
}

/*  */

export const getUserlikeMovie = (id,page)=>{
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method:'get',
    url:'/admin/userlikeM' ,//请求地址
    params:{
      id,page
    }
  
  })
}

export const getUserwatchMovie = (id)=>{
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method:'get',
    url:'/admin/userwatchM' ,//请求地址
    params:{
      id
    }
  
  })
}
export const getUserlikeArt = (id,page)=>{
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method:'get',
    url:'/admin/userlikeA' ,//请求地址
    params:{
      id,page
    }
  
  })
}
export const getUserpublishArt = (id,page)=>{
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method:'get',
    url:'/admin/userpublishA' ,//请求地址
    params:{
      id,page
    }
  
  })
}


 //判断用户 
export const judgmentUser = (data)=>{
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method:'post',
    url:'/admin/judge' ,//请求地址
    data,
  
  })
}
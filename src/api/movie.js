import request from '@/utils/request.js'



export const getallMovies = ()=>{  
  
    return request({    //初始化 获取首页所有信息
        method:'get',
        url:'home/movieallinfo' ,  
      })
}

export const gethotMovies = data=>{    //传递分页数据
  
    return request({  
        method:'post',
        url:'home/hotmovie' , 
        data,
      })
}

export const getlikeMovies = data=>{    //传递分页数据
  
    return request({  
        method:'post',
        url:'home/likemovie' , 
        data,
      })
}

export const getnewMovies = data=>{    //传递分页数据
  
    return request({  
        method:'post',
        url:'home/newmovie' , 
        data,
      })
}

export const getrecommendMovies = data=>{    //获得推荐的电影
  
  return request({  
      method:'get',
      url:'movie/recommend' , 
      params:{
        type:data
      }
    })
}

//  评论区
export const submitMoviecomment = data=>{    //提交电影短评 
  
  return request({  
      method:'post',
      url:'movie/comment' , 
      data,
    })
}

export const getcommentMovie = (data,page)=>{    //提交电影短评 
  
  return request({  
      method:'get',
      url:'movie/getcomment', 
      params:{
        id:data,
        page,
      
      }
    })
}


export const setLikeComment=(id)=>{    //提交电影短评 
  
  return request({  
      method:'get',
      url:'movie/likecomment', 
      params:{
        id,
      }
    })
}


export const FindMovie= (data,select,page) =>{    //发现电影
  
  return request({  
      method:'get',
      url:'movie/find',
      params:{
          data,
          select,
          page
      }   
    })
}

export const Ranking= () =>{    //发现电影
  
  return request({  
      method:'get',
      url:'movie/ranking',
    })
}

export const setRating= data =>{    //电影评分
  
  return request({  
      method:'post',
      url:'movie/rating',
      data
    })
}

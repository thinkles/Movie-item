import request from '@/utils/request'

//富文本上传 图片
export const uploadImage = data=>{
    return request({
        method:"POST",
        url:'/article/image',
        /* 一般需要设置 请求头 , 上传文件的话不需要设置,直接给一个formdate对象就可以 */
        data

    })
}

/* 素材管理   获取图片 */

export const GetImage = params=>{
    return request({
        method:"GET",
        url:'/',
        /* 一般需要设置 请求头 , 上传文件的话不需要设置,直接给一个formdate对象就可以 */
        params

    })
}

/* 收藏素材列表  通过id获得图片, 通过collect更改图片是否被收藏 */

export const GetCollectImage = (imageid,collect)=>{
    return request({
        method:"put",
        url:`/${imageid}`,
        /* 一般需要设置 请求头 , 上传文件的话不需要设置,直接给一个formdate对象就可以 */
       data:{
           collect
       }

    })
}

/* 删除素材 */
export const deleteImage = (imageid)=>{
    return request({
        method:"delete",
        url:`/${imageid}`,
        /* 一般需要设置 请求头 , 上传文件的话不需要设置,直接给一个formdate对象就可以 */

    })
}
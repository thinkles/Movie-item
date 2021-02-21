import axios from 'axios'
//import JSONbig from 'json-bigint'

import router from '@/router'
import{Message} from 'element-ui'
/* const str = '{"id":12332442353245236}'
console.log(JSONbig.parse(str).id.toString()) 
 需要使用 toString()获得参数
*/

const request = axios.create({ //当页面请求多个地址, 我们通过create 创建出来的不同实例来使用
    // 如果不进行封装,使用axios.default.baseUrl 只能设置一个地址
    baseURL: 'http://localhost:80/', //请求基础路径
  /*   transformResponse: [function (data) {
        try {
            return JSONbig.parse(data)
            // 后端返回数据不是json 格式字符串 会报错 所以用try catch 捕获异常 处理异常的发生
            //转换成功 返回jsonbig 处理的数据
        } catch (err) {
            // 转换失败 直接把数据返回
            return data
        }
    }] */
})

// 请求拦截器
 request.interceptors.request.use(
    function (config) { //config 请求的配置文件
        const user = JSON.parse(window.localStorage.getItem('user'))
        
        // 如果有登录用户信息, 通过 headers选项设置请求头

        if (user) {
            config.headers.Authorization = `Bearer ${user.token}` //通过拦截器统一的设置token,不在单独使用
        }
        return config //config 是当前请求相关的配置信息对象  没有 return 请求发不出去 
    },
    function (error) {
        return Promise.reject(error)
    }
) 

/* 响应拦截器 */
request.interceptors.response.use(function(response){
    //所有响应码 2xx的响应都会进入这里
    return response
},function(error){ 
  
    const data = error.response.data 
    const {status} = error.response
   
  if(error.response && status === 401){
    
     window.localStorage.removeItem('user')
     router.push('/login')
     Message.error('重新登录')

  } else if(status > 500)
    {
        Message('服务端异常')
    }else if(status === 400)
    {
      
      if(data.msg === '验证错误')
      {  
          Message.error(data.error)
      }
      else if(data.name==='登录失败'){
        Message.error(data.msg)
      }else if(data.msg === 'notfound'){
          return
      }else{
        Message({
            type:'warning',
            message:'后端返回错误'
        })
      } 
    
    }else if(status === 403){
        Message({
            type:'warning',
            message:'没有操作权限'
        })
    }
    
    
    return Promise.reject(error)
})
export default request
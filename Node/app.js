/* 入口文件 */

const express = require('express');
const app = express();
const home = require("./route/home");
const admin = require("./route/admin");
const path = require('path');
const bodyParser = require('body-parser');
//const session = require('express-session');
//const dateformat = require('dateformat') //对日期进行处理
const expressJWT = require('express-jwt');

//导入配置文件
const setting = require('./setting');
const movie = require('./route/movie')
const article =require('./route/article')
//导入 token 校验文件
//const verify = require('./verify');

//let router = express.Router()
require("./model/connect");  //链接数据库
/* require("./model/comment"); 
require("./model/article");
require('./model/movie'); */
//require("./model/ranking")



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/* 开放静态资源文件 */
app.use(express.static(path.join(__dirname,'public')))
//app.use(session({secret: 'secret key'}));  //配置session

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    next();
})

/* app.get('/home/test', async (req, res,next) => {
    try{
    let data = await verify.getToken(req.headers['authorization']);
    // 有些请求是需要登录状态的 所以验证token
    // 验证 data.state >>> true Or false
    if(data.state){ return  next();}}catch(err){
        return next(err)
    }
});
  自定义中间件 验证

*/


 // 使用expressJWT 验证token是否过期
app.use(expressJWT({
    secret: setting.token.signKey ,// 签名的密钥 或 PublicKey
    algorithms:['HS256']
  }).unless({ // 设置并规定哪些路由不用验证 token
    path: ['/admin/login','/admin/useradd']            // 指定路径不经过 Token 解析
  }));

  //放在中间, 首先验证token 错误直接进行错误中间件的验证
  app.use('/home',home);
  app.use('/admin',admin);
  app.use('/movie',movie);
  app.use('/article',article);

app.use((err, req, res, next) => {
 
  if(err.name == 'verify-wrong'){
    return res.status(400).json({
      msg: '验证错误',
      error:err.message
    })
  }
  else if(err.name=='info-wrong'){
    return res.status(400).json({
      msg: '验证错误',
      error:err.message
    })
  }
  else if (err.name === 'UnauthorizedError') {
     return res.status(401).json({
      status: err.status,
      msg: 'token失效或者为空',
      error: err.message
    }) 

  }
});   //统一的处理token失效的结果 ,如果没有失效进行下面

/* app.use('/admin',require("./middleware/loginGuard"));
 */


app.listen(80,()=>{
    console.log("成功访问")
})
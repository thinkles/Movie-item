const{User} = require('../../model/user');
const bcrypt =require('bcrypt');
//const jwt= require('jsonwebtoken');
 
const verify = require('../../verify');  //导入验证token
const setting = require('../../setting');


 const login = async (req,res)=>{
   // console.log(req.body) 
    const{email, password} = req.body; //获取返回的数据 

    //说明一下,在注册时进行了格式验证,所以登录时只需要验证是否为空
    if(email.trim().length === 0 || password.trim().length === 0){
       return res.status(400).send({name:'登录失败',msg:'邮箱或者密码错误'});
    }  //服务端验证

    let user = await User.findOne({email}); //查询用户名
   
    if(user){  //查询到进行比对密码
      let isValid = await bcrypt.compare(password,user.password);  // 明文密码和加密密码进行比对
     
      if(isValid){ //比对成功,生成 token,返回数据
        // 返回 _id值
       

          verify.setToken(req.body.email,req.body.password).then(async(token)=>{


              return res.json({
                                email:req.body.email,
                                status: 0,
                                msg: 'success',
                                token,
                                signTime: setting.token.signTime,
                              });
  
                                                                                });
          // 能在登录后共享用户信息最好了
        
                                                                              }
     else{
        res.status(400).send({name:'登录失败',msg:'邮箱或者密码错误'}); 
          }

   }else{
       // 没有查询到
       res.status(400).send({name:'登录失败',msg:'不存在该用户'}); 
   }

} 


module.exports =login;


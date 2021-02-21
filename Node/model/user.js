const mongoose = require('mongoose');
// 创建用户集合
const joi = require('joi');
const bcrypt= require('bcrypt');
 function randomString(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    } 
    
const UserSchema = new mongoose.Schema({
        username:{
            type:String,
            minlength:2,
            maxlength:20,
            default:randomString(10)
        },
        email:{
            type:String,
            unique:true,   //保证邮箱地址不重复
            required:true
        },
        password:{
            type:String,
            required:true
        },
      
})

const User =mongoose.model('User',UserSchema);

/*   async function createUser (){
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash('123456',salt);
  User.create({
    username:'yangsir',
    email:'yangsir@163.com',
    password:pass,
  });
  
}
createUser();  //记得取消 
 */
 
// 注册时用户的信息验证  --服务器端验证
 const validateUser = user =>{
    
    const schema=joi.object({
        /* username:joi.string().min(2).max(20).required().error(new Error('用户名不符合规则')), */
        email: joi.string().email().required().error(new Error("邮箱不符合")),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error("密码不符合")),
       /*  role:joi.string().valid('normal','admin').required().error(new Error("角色值非法")),
        state:joi.number().valid(0,1).required().error(new Error("状态值非法")), */
    });
    
   return schema.validateAsync(user);  //异步验证  返回promis 在外面捕捉错误
}

module.exports ={
    User,
    validateUser
}


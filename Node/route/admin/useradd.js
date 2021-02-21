
const {User,validateUser} = require('../../model/user');
const bcrypt =require('bcrypt');
const {Userinfo} =require('../../model/userinfo');
 
module.exports = async (req,res,next) =>{
   

  try{
     await validateUser(req.body);

  }
  catch(e){
     //重定向会用户添加页面
   //return  res.redirect(`/admin/useradd?message=${e.message}`); // 把message传递给前端
   return next({name:'verify-wrong',message:e.message});

  }

   //查询数据是否存在
let user = await User.findOne({email: req.body.email});

if(user){
 //用户存在
 return next({name:'info-wrong',message:'地址已被注册'});
}else{ 
    //生成随机字符串
    const salt = await bcrypt.genSalt(10);
  
    const password = await bcrypt.hash(req.body.password, salt); //进行加密
   
    req.body.password = password; //替换密码

    //用户信息添加进数据库
    await User.create(req.body);
    const Userid = await User.findOne({email:req.body.email});
    //console.log(Userid[0]._id);
    await Userinfo.create({author:Userid._id});  //注册用户时创建用户的userinfo信息数据
   
}
    return res.json({status:200,message:'注册成功请登录'});

}
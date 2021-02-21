const {Userinfo} = require('../../model/userinfo');
const mongoose = require('mongoose');
const {User} = require('../../model/user');
const bcrypt =require('bcrypt');

//所有操作都是针对 登录用户的

// 父路由请求使用用户照片
const info = async(req,res)=>{
 //console.log(req.user);  //token令牌签发时包含用户信息
const acount = await User.findOne({email:req.user.name}); //acountinfo 返回的不是一个string 而是特殊的对象
const acountinfo = await Userinfo.findOne({author:mongoose.Types.ObjectId(acount._id).toString()}); 
 if(acountinfo){
    res.json({msg:'ok',photo:acountinfo.photo});
 }
 else{
    res.status(400).send({name:'获取失败',msg:'不存在该用户'}); 
 }
 

}

// 个人中心 获得自己的所有信息
// 这里没必要转换对象,直接进行关联查询 返回该对象就行
const allinfo = async(req,res)=>{
   try {
      const acount =await User.findOne({email:req.user.name});
      const id = acount._id.toString();
      const accoutinfo = await Userinfo.findOne({author:id});
      const user = accoutinfo.toObject();
      user.username = acount.username;
      user.email = acount.email;
      user.id = id;              // 返回了 所有的 userinfo user数据库的所有内容 
                                   //id是user的id
      res.send(user);

   } catch (error){
     
      res.status(403).send({name:'获取失败',msg:'不存在该用户'}); 
   }
}


// 更新 用户的昵称
const updateinfo = async(req,res)=>{
   //console.log(req.body.name)
   try {
      const acount = await User.findOne({email:req.user.name});
      acount.set({username:req.body.name}).save();
      res.send({name:req.body.name});
   } catch (error) {
       res.status(403).send({msg:'修改昵称失败'})
   }
  
}
const updateinfopass = async(req,res)=>{
   try {
      console.log(req.body.password)
      const acount = await User.findOne({email:req.user.name});  //查询登录的用户信息

      const salt = await bcrypt.genSalt(10);
  
      const password = await bcrypt.hash(req.body.password, salt); //进行加密
     
      acount.set({password:password}).save();
      res.send({msg:'ok'});

   } catch (error) {
       res.status(403).send({msg:'修改密码失败'})
   }

}

module.exports ={
   info,
   updateinfo,
   updateinfopass,
   allinfo
}; 

const {Userinfo} = require('../../model/userinfo');

module.exports =  async(req,res)=>{
 const userid = req.body.id     // 拿到前端的params的值,比对发送请求的和该id值是不是一个用户

  const user = await Userinfo.findOne({_id:userid}).populate('author')
  
   if(user.author.email == req.user.name){
    res.send({type:1})    // 是本人 发送标识符
   }else{

      res.send({type:0})
   } 
}
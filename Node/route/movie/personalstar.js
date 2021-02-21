const Rank = require('../../model/rating');
const {Userinfo} = require('../../model/userinfo');
const {User} = require('../../model/user');

module.exports = async (req,res)=>{
   const movieid = req.query.data
  
  try{
    const acount = await User.findOne({email:req.user.name});  //获得登陆者的id
    const acountinfo = await Userinfo.findOne({author:acount._id}); //获得userinfo 对象
    const star = await Rank.findOne({$and:[{movie_id:movieid},{author:acountinfo._id}]})
    res.send(star)
  }catch(e){
      res.status(400).send({msg:'获取评分失败'})
    console,log(e)
  }
 
  

}
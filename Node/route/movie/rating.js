const Article = require('../../model/article');
const {Userinfo} = require('../../model/userinfo');
const {User} = require('../../model/user');
const Rank = require('../../model/rating')
const Movie = require('../../model/movie')

module.exports = async (req,res)=>{
  try {

   const movieid = req.body.movieid;
   const rating = req.body.rating;
   const acount = await User.findOne({email:req.user.name});  //获得登陆者的id
   const acountinfo = await Userinfo.findOne({author:acount._id}); //获得userinfo 对象
  // 首先查看用户是否评价过该电影
  
  const item = await Rank.findOne({$and:[{author:acountinfo._id},{movie_id:movieid}]})
  //console.log(item)
  //console.log(rating)
  if(item){  //存在则修改评分
       await item.updateOne({$set:{rating:rating}})
       res.send({msg:'评分成功'})
  }else{  //不存在提交评分            这里超过两个用户评分就进行更新电影信息, 但其实需要10个以上
    await Rank.create({
        author:acountinfo._id,
        rating:rating,
        movie_id:movieid
    });
    res.send({msg:'评分成功'})
}

    const num = await Rank.find({movie_id:movieid}).countDocuments()
    if(num >=1){
      let starvalue=0;
      const item = await Rank.find({movie_id:movieid})
      item.forEach(elem=>{
        starvalue +=elem.rating
      });
      starvalue = (Math.round(starvalue/num*10)/10).toFixed(1) 
     // console.log(starvalue)
      await Movie.findOneAndUpdate({_id:movieid},{$set:{rating:starvalue}})
    }
  

  } catch (error) {
    
  console.log(e);
  res.status(400).send({msg:'评分失败'})

  }

  
}
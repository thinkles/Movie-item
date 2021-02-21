const Movie = require('../../model/movie');
const dateformat = require('dateformat');

module.exports = async (req,res)=>{
    try {
        
const date = dateformat(Date.now(),"yyyy-mm-dd"); //现在的时间
const item = await Movie.find({filmtime:{$gt:date}}).sort('-movie_like').limit(9); 
        //即将上映的电影 收藏的人数排序      影评中心的排行榜
        res.send(item);
        //console.log(item)
    } catch (error) {
         res.status(400).send({msg:'排行榜失败'})
    }
  
 
}
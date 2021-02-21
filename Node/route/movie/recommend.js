const Movie = require('../../model/movie');
const dateformat = require('dateformat');


module.exports = async (req,res)=>{
    try {
        const type = req.query.type;  //先转换为字符串 再传唤为对象得到数组
        const typelist = type.split('/');
     
        const date = dateformat(Date.now(),"yyyy-mm-dd");
    
        const item = await Movie.find({$and:[{filmtype:{$in:typelist}},{filmtime:{$lt:date}}]}).sort('-titleyear').limit(8);
      
        res.send(item);
    } catch (error) {
        res.status(403).send({msg:'电影页面推荐查询错误'})
    }
  
     
}


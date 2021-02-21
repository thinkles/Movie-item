const Movie = require('../../model/movie');
const dateformat = require('dateformat');

module.exports = async (req,res)=>{
    try {
        const time  = Date.now();
        const beforedate = new Date(time-24*30*3600*1000)
        const date0 = dateformat(beforedate,"yyyy-mm-dd");//前一个月的时间
        const date1 = dateformat(time,"yyyy-mm-dd");  //现在时间
        const item = await Movie.find({filmtime:{$gte:date0,$lte:date1}}).sort('-rating').limit(10); 
        //得到一个月之间上映的评分最高的前 10 名
        res.send(item);
        //console.log(item)
    } catch (error) {
         res.status(400).send({msg:'排行榜失败'})
    }
  
 
}
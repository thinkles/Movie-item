const pagination = require('mongoose-sex-page');
const Movie = require('../../model/movie');
const dateformat = require('dateformat');

const movieallinfo = async (req,res)=>{
// page 当前页 display  客户端显示页面数量  
try {
// 写死数据 第一页  5个
let hotmoviehead = await pagination(Movie).find({$and:[{big_poster:{$gt:[]}},{hot:true}]}).page(1).size(3).exec();
 
 let hotmovie = await pagination(Movie).find({hot:true}).page(1).size(5).exec();
  
 let likemovies = await pagination(Movie).find({$and:[{titleyear:{$gte:'2019'}},{rating:{$gt:7}}]}).page(1).size(5).exec();

//对时间进行处理   返回即将上映的
const date = dateformat(Date.now(),"yyyy-mm-dd");
let newmovie = await pagination(Movie).find({filmtime:{$gt:date}}).page(1).size(5).exec(); 
 
const movies={
    hotmoviehead,
    hotmovie,
    likemovies,
    newmovie,
};
    res.send(movies);

} catch (error) {
     res.status(400).send({msg:'首页查询错误'})
}

}

module.exports= movieallinfo

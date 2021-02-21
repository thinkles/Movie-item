const pagination = require('mongoose-sex-page');
const Movie = require('../../model/movie');

// 好评电影
const likemovie = async (req,res)=>{
    const page = req.body.page;
    const size = req.body.size;
   // page 当前页 display  客户端显示页面数量  
   try {

    let likemovies = await pagination(Movie).find({$and:[{titleyear:{$gte:'2020'}},{rating:{$gt:7}}]}).page(page).size(size).exec();
    res.send(likemovies);
   
   } catch (error) {
        res.status(400).send({msg:'首页好评电影查询错误'})
   }
   
   }
   
   module.exports = likemovie
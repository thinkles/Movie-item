const pagination = require('mongoose-sex-page');
const Movie = require('../../model/movie');
const dateformat = require('dateformat');

// 好评电影
const newmovie = async (req,res)=>{
    const page = req.body.page;
    const size = req.body.size;
   // page 当前页 display  客户端显示页面数量  
   try {

    const date = dateformat(Date.now(),"yyyy-mm-dd");
     let newmovie = await pagination(Movie).find({filmtime:{$gt:date}}).page(page).size(size).exec(); 
    res.send(newmovie);
   
   } catch (error) {
        res.status(400).send({msg:'首页查询错误'})
   }
   
   }
   
   module.exports = newmovie
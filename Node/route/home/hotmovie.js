const pagination = require('mongoose-sex-page');
const Movie = require('../../model/movie');

// 好评电影
const hotmovie = async (req,res)=>{
    const page = req.body.page;
    const size = req.body.size;
   // page 当前页 display  客户端显示页面数量  
   try {

    let hotmovie = await pagination(Movie).find({hot:true}).page(page).size(size).exec();
    res.send(hotmovie);
   
   } catch (error) {
        res.status(400).send({msg:'首页热门电影查询错误'})
   }
   
   }
   
   module.exports = hotmovie
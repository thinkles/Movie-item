const Article = require('../../model/article')
const pagination = require('mongoose-sex-page');
const dateformat = require('dateformat');
const Movie = require('../../model/movie');

module.exports = async (req,res)=>{
//影评中心

   const page = req.query.page;
  
   try {
   const item =await pagination(Article).find({}).sort('-time').populate('filmid').populate({ path:'author',populate:{path:'author'}}).sort('-like')
   .page(page).size(5).exec();
  // console.log(item)
   res.send(item);
   } catch (error) {
      res.status(400).send({msg:'数据查询失败'})
   }
   

}

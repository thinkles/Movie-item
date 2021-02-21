const Article = require('../../model/article')
const pagination = require('mongoose-sex-page');

module.exports = async (req,res)=>{

   try {
      const id = req.query.id;
   const page = req.query.page;
   const item = await pagination(Article).find({filmid:id})
   .populate({ path:'author',populate:{path:'author'}}).sort('-like').page(page).size(4).exec();
  
  // console.log(item)
   res.send(item);
   } catch (error) {
      res.status(400).send({msg:'数据查询失败'})
   }
   

}
// 电影评论
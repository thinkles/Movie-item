const Article = require('../../model/article')

module.exports = async (req,res)=>{
    try {
       // console.log(req.query.data)
        const art_id  = req.body.id;  //文章id
        const article = req.body.article; 
        const {title,content,rating} = article;
       // console.log(title+':'+content+":"+rating);
        const item  = await Article.findOneAndUpdate({_id:art_id},{$set:{title:title,content:content,article_rate:rating}})
       // res.send(item);
       res.send({msg:'修改成功'})
       // console.log(item)
     } catch (error) {
         res.status(403).send({msg:'修改影评失败'})
     }
    
  }
   
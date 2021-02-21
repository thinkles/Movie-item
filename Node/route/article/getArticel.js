const Article = require('../../model/article')

module.exports = async (req,res)=>{
    try {
       // console.log(req.query.data)
        const art_id  = req.query.data;  //文章id 
        const item  = await Article.findOne({_id:art_id}).populate('filmid')
        res.send(item);

     } catch (error) {
         res.status(403).send({msg:'提交影评'})
     }
    
  }
   
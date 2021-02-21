const Comment = require('../../model/comment');
const pagination = require('mongoose-sex-page');

module.exports = async (req,res)=>{
    try {
        const id = req.query.id;
        const page = req.query.page;
        
      
          const item = await pagination(Comment).find({content_movie_id:id}).populate({path:'author',populate:{path:'author'}}).sort({content_like:-1,time:-1}).page(page).size(4).exec();
       
       
       
       res.send(item);
    } catch (error) {
         
        res.status(400).send({msg:'电影评论失效'})
    }

 

}

const Comment = require('../../model/comment');

module.exports = async (req,res)=>{
    try {  
        const replay = req.body;
       
         await Comment.create({
             author:replay.author, //id值
             content:replay.comment,
             content_article_id:replay.article_id,
         }); 
        
         res.send({msg:'提交成功'});
        
    } catch (error) {
        console.log('操作失败')
         res.status(400).send({msg:'创建评论失败'})
    }


}
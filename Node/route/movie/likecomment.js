const Comment = require('../../model/comment');

module.exports = async (req,res)=>{
    try {
        const id = req.query.id;
        const item = await Comment.findByIdAndUpdate(id,{$inc:{content_like:1}})
    
       res.send({msg:'work,done'})
    } catch (error) {
         
        res.status(400).send({msg:'点赞失败'})
    }

 

}
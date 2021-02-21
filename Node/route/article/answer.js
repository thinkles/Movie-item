const Comment = require('../../model/comment');

//加载影评下的评论   多级评论因为数据库已经定型,所以暂时无法解决

module.exports = async (req,res)=>{
    try {  
       
        const master_id = req.body.masterid; //获得版主的id
       
            const item = await Comment.create({
                content:req.body.content,
                author:req.body.author, //userinfo 的id值
            });
            
            const item_id = item._id
           
            await Comment.findOne({_id:master_id}).updateOne({$push:{replay_id:item_id}})
            res.send({msg:'评论成功'});
        
    } catch (error) {
         console.log('评论失败')
         res.status(400).send({msg:'评论失败'})
    }


}
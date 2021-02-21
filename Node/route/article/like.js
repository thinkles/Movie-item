const Article = require('../../model/article')

module.exports = async (req,res)=>{

    try {
        const artid = req.query.id;
    const type = req.query.type;
    if(type == 0){  //like
       await Article.findOneAndUpdate({_id:artid},{$inc:{like:1}});
       res.send({msg:'点赞成功'})
    }else if(type ==1){
        await Article.findOneAndUpdate({_id:artid},{$inc:{not_like:1}});
        res.send({msg:'点赞成功'})
    }

        
    }catch (error) {
        
        console.log(error);
        res.status(400).send({msg:'查询数据库失败'})
    }
   



}
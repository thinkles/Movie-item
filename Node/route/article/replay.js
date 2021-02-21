const Comment = require('../../model/comment');
const pagination = require('mongoose-sex-page');

//加载影评下的评论

module.exports = async (req,res)=>{
    try {  
        const id = req.query.id;
        const page = req.query.page;
       // console.log(id);
        const item = await pagination(Comment).find({content_article_id:id}).populate({path:'replay_id',populate:{path:'author',populate:{path:'author'}}}).populate({path:'author',populate:{path:'author'}}).sort('time').page(page).size(4).exec();
        
       // console.log(item)
        res.send(item);
        
    } catch (error) {
        console.log('操作失败')
         res.status(400).send({msg:'创建评论失败'})
    }


}
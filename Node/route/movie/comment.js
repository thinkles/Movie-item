
const Comment = require('../../model/comment');
const {User} = require('../../model/user')
const {Userinfo} = require('../../model/userinfo')

module.exports = async (req,res)=>{
    try {  
        const acount = await User.findOne({email:req.user.name});
        const acountinfo = await Userinfo.findOne({author:acount._id}); 
        const comment = req.body;
       // console.log(comment)
         await Comment.create({
             author:acountinfo._id,
             content:comment.content,
             comment_rating:comment.rating,
             content_movie_id:comment.movie_id,
         });
        
         res.send({msg:'提交成功'});
        
    } catch (error) {
        console.log('操作失败')
         res.status(400).send({msg:'创建评论失败'})
    }


}
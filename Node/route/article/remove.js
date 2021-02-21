const Article = require('../../model/article')
const {Userinfo} = require('../../model/userinfo')
const {User} = require('../../model/user')
module.exports = async (req,res)=>{


     try {
        const id = req.query.id  //文章ID 
        const acount= await User.findOne({email:req.user.name});
      
        await Userinfo.findOneAndUpdate({author:acount._id},{$pull:{publisharticle:id}})/* .then(res=>{
            console.log(res)
        }) */
        await Article.findByIdAndDelete(id)/* .then(res=>{
            console.log(res);
        }) */
        res.send({msg:'删除成功'})
        // await Userinfo.
     } catch (error) {
         
        res.status(400).send({msg:'删除失败'})
     }
  
}
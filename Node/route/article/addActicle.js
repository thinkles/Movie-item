const Article = require('../../model/article')
const {User} =require('../../model/user')
const {Userinfo} = require('../../model/userinfo')
module.exports = async (req,res)=>{
    try {
        const articlecontent  = req.body;
        const filmid = req.params.id;
        const acount= await User.findOne({email:req.user.name});
        const userid = acount._id
        const UserProfile = await Userinfo.findOne({author:userid});//查找到包含用户所有信息的数据
      
       const item = await Article.create({
        author:UserProfile._id,
        filmid:filmid,
        content:articlecontent.content,
        title:articlecontent.title,
        article_rate:articlecontent.rating

    })

      //影评创建好之后,应该往个人中心添加
      const update = await UserProfile.updateOne({$push:{publisharticle:item._id}});
      // console.log(update);
    res.send({id:item._id});

     } catch (error) {
         res.status(403).send({msg:'提交影评'})
     }
    
  }
   
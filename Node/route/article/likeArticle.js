const {Userinfo} = require('../../model/userinfo');
const {User} = require('../../model/user');

module.exports = async (req,res)=>{
  //影评收藏
    try {
    const articleid = req.body.art_id;
    const type = req.body.type;
    const acount = await User.findOne({email:req.user.name});  //获得登陆者的id
    const acountinfo = await Userinfo.findOne({author:acount._id}); //获得userinfo 对象
   
   // console.log(type)
    if(type == 2){  //  1在前端表示已收藏   传递1 说明需要取消操作
        const item = await acountinfo.updateOne({$push:{watchedarticle:articleid}})
       // console.log(item)
        res.send({msg:'收藏影评成功'}) 
    
    }else if(type == 1){   
        await acountinfo.updateOne({$pull:{watchedarticle:articleid}})
        res.send({msg:'取消影评失败'})
    }else if(type == -1){   // 第一次请求, 返回收藏状态, 还有文章如果是自己的就不在显示
       // console.log(acountinfo)
    const publish = await Userinfo.findOne({$and:[{author:acount._id},{publisharticle:articleid}]})
    const item = await Userinfo.findOne({$and:[{author:acount._id},{watchedarticle:articleid}]})
    if(publish){  //是自己的文章
        res.send({like:'me'})

    }else{  //不是自己的文章
        if(item){ 
            res.send({like:'yes'})     //存在 发送yes
         }else{
             res.send({like:'no'})
         }
    }  

       
    }
   
    } catch (error) {
        
        res.status(400).send({msg:'收藏电影失败'})
    }
    

    

}
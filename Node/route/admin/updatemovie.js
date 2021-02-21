const {Userinfo} = require('../../model/userinfo');
const {User} = require('../../model/user');

module.exports = async (req,res)=>{

    try {
    const movieid = req.query.movieid;
    const type = req.query.type;
    const acount = await User.findOne({email:req.user.name});  //获得登陆者的id
    const acountinfo = await Userinfo.findOne({author:acount._id}); //获得userinfo 对象
   // console.log(type)
    if(type == 2){  //    1在前端表示已收藏   传递1 说明需要取消操作
        await acountinfo.updateOne({$push:{likedmovie:movieid}})
        res.send({msg:'收藏电影成功'}) 
    
    }else if(type == 1){   
        await acountinfo.updateOne({$pull:{likedmovie:movieid}})
        res.send({msg:'收藏电影失败'})
    }else if(type == -1){   // 表示第一次加载 电影的是否收藏的状态
       // console.log(acountinfo)
        const item = await Userinfo.findOne({$and:[{author:acount._id},{likedmovie:movieid}]})
        
        if(item){  //存在该电影 发送yes
           res.send({like:'yes'})
        }else{
            res.send({like:'no'})
        }
    }
   
    } catch (error) {
        
        res.status(400).send({msg:'收藏电影失败'})
    }
    

    

}
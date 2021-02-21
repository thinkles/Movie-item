const {User} = require('../../model/user')

module.exports = async (req,res)=>{  //查询昵称 没有使用

     try {
        const id = req.query.id;
       // console.log(id);
        const user = await User.findOne({_id:id});
        res.send({name:user.username});
    
     } catch (error) {
         
        res.status(400).send({msg:'查询昵称错误'});
     }
   
    
}
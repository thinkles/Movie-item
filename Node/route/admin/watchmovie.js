const {Userinfo} = require('../../model/userinfo');
const {User} = require('../../model/user');

module.exports = async (req,res)=>{

    try {
    const movieid = req.query.movieid;
    const acount = await User.findOne({email:req.user.name});  //获得登陆者的id
    await Userinfo.findOneAndUpdate({author:acount._id},{$addToSet:{watchedmovie:movieid}}); //获得userinfo 对象
    res.send({msg:'成功添加电影'})

}catch(e){
    console.log(e)
    res.status(400).send({msg:'添加看过电影失败'})
}
}
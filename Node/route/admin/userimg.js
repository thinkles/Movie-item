const formidable = require('formidable');
const path = require('path');
const {Userinfo} = require('../../model/userinfo');
const {User} = require('../../model/user');

//上传头像并修改
module.exports = async (req,res)=>{
    //1.创建表单解析对象
    const useremail = req.user.name; //获得请求用户邮箱号
  
    const userid = (await User.findOne({email:useremail}))._id.toString(); //获得_id值

    const user = await Userinfo.findOne({author:userid});


    const form = new formidable.IncomingForm();
    form.uploadDir= path.join(__dirname,'../','../','public','admin');
    form.keepExtensions = true;  //保留上传文件你的后缀
  
  form.parse(req, function(error, fields, files) {
    // files 上传的文件  fields 表单的普通数据
    console.log(files.cover.path.split('public')[1]);
    const photo = files.cover.path.split('public')[1];
    user.set({photo:photo}).save();
    res.send({photo:photo});
});  

}
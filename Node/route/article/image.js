const formidable = require('formidable');
const path = require('path');

//影评界面 富文本上传图片,返回地址

module.exports = async (req,res)=>{
    
    const form = new formidable.IncomingForm();

    form.uploadDir= path.join(__dirname,'../','../','public','article');
    form.keepExtensions = true;  //保留上传文件你的后缀
  
  form.parse(req, function(error, fields, files) {
    // files 上传的文件  fields 表单的普通数据
    const photo = files.image.path.split('public')[1];
    
    res.send({image:photo}); //返回照片地址
});  

}
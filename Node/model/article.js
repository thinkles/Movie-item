const mongoose = require('mongoose');


const Filmchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Userinfo'
    },
    time:{
        type:Date,
        default:new Date,
    },
    content:{
        type:String,
        required:true,
    },
    like:{
        type:Number,
        default:0,
        required:true,
    },
    not_like:{
        type:Number,
        default:0,
        required:true,
    },
    filmid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Movie'
    },
    title:{
        type:String,
        required:true,
    },
    article_rate:{
        type:Number,
        min:0,
        max:5,
        required:true
    }
    

})
const Article =  mongoose.model('Article',Filmchema);

/*   Article.create({
    author:'5fef01fdebcba14fc45c111e',
    content:'<h1>哪吒传奇的</h1><p>这里是我的内容</p><p>这是的恶法</p>',
    title:'哪吒传奇的的额萨芬阿瑟阿瑟',
    like:234,
    not_like:12,
    film:'5ff29373f9be743814e88660'

}).then(result=>{
    console.log(result)
})   */
  

module.exports=Article;
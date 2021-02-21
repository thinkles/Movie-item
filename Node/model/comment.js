const mongoose = require('mongoose');


const Commentschema = new mongoose.Schema({
  author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Userinfo',
      required:true,
  },
  content:{
      type:String,
      required:true,
  },
  time:{
      type:Date,
      default:new Date,
  },
  content_like:{
    type:Number,
    default:0
  },
  comment_rating:{
   type:Number,
   min:0,
   max:5,
   default:0,
  },
  content_movie_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Movie',
     
  },
  content_article_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Article',
  },
  replay_id:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment', 
  }] //评论回复

})

const Comment =  mongoose.model('Comment',Commentschema);
/* 
Comment.create({
    author:'5ff1a39e4951aa20c469b306',
    content:'丰富恶法是撒恶发涩费阿肆阿瑟阿肆阿肆阿肆',
    replay_id:'5ff2967d71c54f008cd4d191',
    like:324
}).then(result=>{
  console.log(result)
}) */
  

module.exports=Comment;
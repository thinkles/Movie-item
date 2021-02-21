const mongoose = require('mongoose');


const Rankschema = new mongoose.Schema({
  author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Userinfo',
      required:true,
  },
  time:{
      type:Date,
      default:new Date,
  },
  rating:{
   type:Number,
   min:0,
   max:10,
   default:0,
  },
  movie_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Movie',  
      required:true,
  },
  
})

const Rank =  mongoose.model('Rank',Rankschema);
/* 
Rank.create({
    author:'5fef01fdebcba14fc45c111f',
    rating:8,
    movie_id:'5ff2a7de753a28157c6ae028',
}).then(result=>{
  console.log(result)
})  */
  

module.exports=Rank;
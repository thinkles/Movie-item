const mongoose = require('mongoose');

const userinfoSchema = new mongoose.Schema({
    photo:{
        type:String,
        default:'/admin/default.jpg',
    },
    watchedmovie:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Movie'}],
    likedmovie:[
       { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'Movie'} 
    ],
    watchedarticle:[
       { type: mongoose.Schema.Types.ObjectId,
        ref:'Article'}
    ],
    publisharticle:[
        { type: mongoose.Schema.Types.ObjectId,
          ref:'Article'
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true,
        require:true,
    }
});

const Userinfo = mongoose.model('Userinfo',userinfoSchema);


module.exports={Userinfo};

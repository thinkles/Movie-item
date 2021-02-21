const mongoose = require('mongoose');


const Movieschema = new mongoose.Schema({
    filmname:{
        required:true,
        type:String,
    },
    director:[{
        type:String,
        required:true,
    }],
    actor:[{
        type:String,
        required:true,
    }],
    filmtype:[{
        type:String,
        enum:['剧情','喜剧','动作','爱情','科幻','动画','悬疑','惊悚','恐怖','犯罪','同性','音乐','歌舞','传记','历史','战争','西部','奇幻','冒险','灾难','武侠','情色'],
          
           
    }],
    titleyear:{
        type:String,
        required:true,
    },
    filmtime:
        {
            type:String,
            required:true,
        },
    country:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    duration:{ //时长
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:10,
    },
    poster:{
        type:String,
        required:true,
    },
    rating_num:{  //评分人数
        type:Number,
        required:true
    },
    story:{  //剧情
        type:String,
        required:true
    },
    movie_like:{   //收藏数
        type:Number,
        required:true
    },
    hot:{
        type:Boolean,
        default:false
    },
    big_poster:[{
      type:String,
    }]  

})

const Movie = mongoose.model('Movie',Movieschema);
 /*   Movie.create({
    filmname:'行骗天下JP：公主篇',
    director:['田中亮'],
    actor:[' 长泽雅美','东出昌大' ,'小日向文世 ','白滨亚岚 ','关水渚','古川雄大','北大路欣也' ,'三浦春马','竹内结子','广末凉子' ,'江口洋介'],
    filmtype:['剧情','喜剧'],
    titleyear:'2020',
    filmtime:'2020-07-23(日本)',
    country:'日本',
    language:'日语',
    duration:'124',
    rating:7.4,
    poster:'/movie/p2610002857.webp',
    hot:true,
    story:'此次故事舞台设定在新加坡，长泽雅美、东出昌大、小日向文世组成的诈欺三人组的目标是闻名世界的大富豪胡雷盟留下的10兆日元遗产。 ',
    movie_like:4545,
    rating_num:234,
    big_poster:['/big_poster/_image11.m12.jpg','/big_poster/_image234.jpg']

}).then(result=>console.log(result))
.catch(error =>{ 
  
    const err = error.errors;
    for(let attr in err) {
        console.log(err[attr]['message']);
       
    } 
})   */
 

module.exports = Movie;
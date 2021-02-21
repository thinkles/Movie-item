const Movie = require('../../model/movie');
const pagination = require('mongoose-sex-page');


module.exports = async (req,res)=>{
const type = JSON.parse(req.query.data);
const page = req.query.page

const find0 = type.tab0;
const find1 = type.tab1; 
const select = req.query.select; //选择类型

let item;
let time0,time1='';
switch(type.tab2){
    case '2020':time0='2020',time1='2020';
    break;
    case '2019':time0='2019',time1='2019';
    break;
    case '2000年代':time0='2000',time1='2018';
    break;
    case '90年代': time0='1990',time1='1999';
    break;
    case '80年代': time0='1980',time1='1989';
    break;
    case '更早': time0='1900',time1='1979';
    break;
    case '':time0='1900',time1='2021';
} 
// console.log(find0+"+"+select)

try {
   if(select == 1){ //近期热门
      item = await pagination(Movie).find({$and:[{filmtype:{$regex:find0}},{country:{$regex:find1}},{titleyear:{$gte:time0,$lte:time1}}]}).sort('-movie_like').page(page).size(12).exec();/* .find({titleyear:{$gte:time0,$lte:time1}})
  
      .find({country:{$regex:find1}}).sort('-movie_like').page(page).size(12).exec(); */
   }else if(select == 3){  //评分最多
      item = await pagination(Movie).find({$and:[{filmtype:{$regex:find0}},{country:{$regex:find1}},{titleyear:{$gte:time0,$lte:time1}}]})
     .sort('-rating').page(page).size(12).exec();
   }else if(select == 2){ //最新上映
      item = await pagination(Movie).find({$and:[{filmtype:{$regex:find0}},{country:{$regex:find1}},{titleyear:{$gte:time0,$lte:time1}}]})
     .sort('-filmtime').page(page).size(12).exec();
  
   }
  
   //console.log(item) 
   res.send(item)
} catch (error) {
      res.status(400).send({msg:'发现电影失败'})
}
 

} 
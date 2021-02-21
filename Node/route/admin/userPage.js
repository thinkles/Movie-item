const {Userinfo} = require('../../model/userinfo');

const userlikemovie= async (req,res)=>{
  const userid = req.query.id;
  const page = req.query.page;     //第几页
 // console.log(req.query)
   let start,end;
   start = (page-1)*4;
   end = start+4;
   const item = await Userinfo.findOne({_id:userid}).populate({path:'likedmovie',select:['poster','_id','filmname']})
   
   let likemovieArr = item.likedmovie.reverse();  //喜欢电影数据的数组，反转数组，以获得新添加的数据
   let count = likemovieArr.length    //总信息数
   let pages = Math.ceil(count / 4)   // 总页数
   let likeresult = likemovieArr.slice(start,end)  //分页处理
   let data={likeresult,pages:pages}
   res.send(data)
}

const userwatchmovie = async(req,res)=>{
  const userid = req.query.id;
  const item = await Userinfo.findOne({_id:userid}).populate('watchedmovie')
  let watchArr = item.watchedmovie.reverse();
  let watchresult = watchArr.slice(0,4);  //只返回最新的4条数据   
  let data={watchresult,}
  res.send(data)
}


const userlikearticle= async (req,res)=>{
  const userid = req.query.id;
  const page = req.query.page;     //第几页
  
   let start,end;
   start = (page-1)*4;
   end = start+4;
   const item = await Userinfo.findOne({_id:userid}).populate({path:'watchedarticle',populate:{path:'author',populate:{
     path:'author'
   }}})
   
   let watchedarticleArr = item.watchedarticle.reverse();  
  
   let count = watchedarticleArr.length    //总信息数
   let pages = Math.ceil(count / 4)   // 总页数
   let watchart_result = watchedarticleArr.slice(start,end)  //分页处理

   let data={watchart_result,pages:pages} //分页处理
  // console.log(watchart_result)
   res.send(data)

}


const userpublisharticle= async (req,res)=>{
  const userid = req.query.id;    //用户id
  const page = req.query.page;     //第几页
  
   let start,end;
   start = (page-1)*4;
   end = start+4;
   const item = await Userinfo.findOne({_id:userid}).populate({path:'publisharticle',populate:{path:'filmid'},options:{sort:{'time':-1}}})
   
   let publisharticleArr = item.publisharticle;    //按其创建时间排序
   let count = publisharticleArr.length    //总信息数
   let pages = Math.ceil(count / 4)   // 总页数
   let publishart_result = publisharticleArr.slice(start,end)  //分页处理
   let data={publishart_result,pages:pages} //分页处理
   res.send(data)

}

module.exports={
  userlikemovie,
  userwatchmovie,
  userlikearticle,
  userpublisharticle,

}
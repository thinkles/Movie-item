const Movie = require('../../model/movie');


module.exports = async (req,res)=>{
    const id =req.params.id
    //console.log(typeof id)
  //console.log(req.params.id)
  try{
    const movieinfo = await Movie.findOne({_id:id});
    if(movieinfo){
      res.send(movieinfo)
    }else{
        res.status(400).send({msg:'没有收录该电影'})
    }
    //console.log(movieinfo)
  }catch(e){
    console,log(e)
  }
 
  

}
const Movie = require('../../model/movie')

    //改变需求, 这里只搜索电影
module.exports = async (req,res)=>{

    try {
        
        const filmname = req.params.name;

        // const type = req.params.type
       //  const comquery = ''  //后期加上  
        // if(type == 1){  //只查询电影
          const query = await Movie.find({filmname:{$regex:filmname}});
          if(query.length != 0){
              res.send(query)
         }else{
             res.status(400).send({msg:'notfound'})
              }
      
      
        /*  }else if(type == 0){ //查询所有
              const query = await Movie.find({filmname:{$regex:filmname}});
      
              if(query.length == 0 && comquery.length ==0 ){
              res.status(400).send({msg:'notfound'})
              }else if(query.length != 0){
              res.send(query)
              }else{
              res.send(comquery)
                      }
         }
         else{  //只查询影评
               if(comquery.length !=0){
                   res.send(comquery)  
              }else{
                  res.status(400).send({msg:'notfound'})
              }
              } */


    } catch (error) {
        

        console.log(error)
        res.status(400).send('搜索失败')
    }
  
   
}
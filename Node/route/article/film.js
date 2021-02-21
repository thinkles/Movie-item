const Movie =require('../../model/movie')

module.exports = async (req,res)=>{
    try {
        const id = req.params.id;

        //const item = await Article.create()
        const item = await Movie.findOne({_id:id})
         res.send(item)
    } catch (error) {
        res.status(400).send({msg:'获取信息失败'})
    }
 
}

//传递影评页的电影信息
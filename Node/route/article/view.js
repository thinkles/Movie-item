const { populate } = require('../../model/article');
const Article = require('../../model/article')

module.exports = async (req,res)=>{

  const id = req.query.id;
  const user = await Article.findOne({_id:id}).populate({
      path:'author',
      populate:{path:'author'}, 
    
  }).populate('filmid');
   res.send(user);
   //console.log(user)
}
const mongoose = require('mongoose');
const pagination = require('mongoose-sex-page')


const Movie = require('./movie')
// page 当前页 display  客户端显示页面数量  
let movies = pagination(Movie).find().page(1).size(2).display(3).exec();

console.log(movies)
//返回对象
module.exports={
    movies
}
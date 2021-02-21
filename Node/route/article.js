const express = require('express');
const article =express.Router()

article.get('/moviearticle',require('./article/moviearticle'))

article.get('/film/:id',require('./article/film'))

article.post('/write/:id',require('./article/addActicle'))

article.post('/image',require('./article/image'))
article.post('/comment',require('./article/comment'))

article.get('/replay',require('./article/replay'))

article.get('/view',require('./article/view'))
article.get('/like',require('./article/like'))

article.post('/answer',require('./article/answer'))

article.get('/center',require('./article/center'))
article.get('/rank',require('./article/ranking'))

article.post('/likearticle',require('./article/likeArticle'))
article.post('/updatearticle',require('./article/updateArticle'))

article.get('/getarticle',require('./article/getArticel'))

article.get('/remove',require('./article/remove'))
module.exports = article
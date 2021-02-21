const express = require('express');
const movie =express.Router();

movie.get('/film/:id',require('./movie/detail'));

movie.post('/rating',require('./movie/rating'));

movie.get('/recommend',require('./movie/recommend'));
movie.get('/getcomment',require('./movie/getcomment'));
movie.post('/comment',require('./movie/comment'));

movie.get('/likecomment',require('./movie/likecomment'));
movie.get('/find',require('./movie/find'))

movie.get('/ranking',require('./movie/ranking'))

movie.get('/personalstar',require('./movie/personalstar'))

module.exports = movie;
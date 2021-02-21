const express = require('express');
const home =express.Router();

home.get('/search/:name',require('./home/search'));
home.get('/movieallinfo',require('./home/movieallinfo'))
home.post('/likemovie',require('./home/likemovie'))
home.post('/newmovie',require('./home/newmovie'))
home.post('/hotmovie',require('./home/hotmovie'))
module.exports = home;
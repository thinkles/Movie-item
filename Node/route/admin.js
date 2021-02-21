const express = require('express');
const admin =express.Router();
const{info,updateinfo,updateinfopass,allinfo} = require('./admin/info')
const{userlikemovie,userwatchmovie, userlikearticle,userpublisharticle} = require('./admin/userPage')

/* admin 的二级路由 */

admin.post('/login',require('./admin/login')); 
admin.post('/useradd',require('./admin/useradd'));

admin.get('/info',info);  //获得到导航栏头像
admin.get('/allinfo',allinfo);   //获得用户全部信息
admin.put('/user',require('./admin/userimg')) // 上传图片更新头像
admin.put('/userinfo',updateinfo)   //更新用户的昵称
admin.put('/userinfopass',updateinfopass)  // 更新用户密码

admin.get('/likemovie',require('./admin/updatemovie'))  // 收藏电影 取消收藏

admin.get('/watchmovie',require('./admin/watchmovie'))  // 收藏电影 取消收藏

admin.get('/userlikeM',userlikemovie);  // 个人中心页的展示
admin.get('/userwatchM',userwatchmovie);  // 个人中心页的展示
admin.get('/userlikeA',userlikearticle);  // 个人中心页的展示
admin.get('/userpublishA',userpublisharticle);  // 个人中心页的展示


admin.post('/judge',require('./admin/judge'));  // 个人中心页的展示

/* admin.get('/username',require('./admin/username')); //给定id值获取 所有用户的昵称 */
/* admin.get('/user',require('./admin/userPage'));

admin.get('/useradd',require('../route/admin/useradd'));


 */
module.exports = admin;
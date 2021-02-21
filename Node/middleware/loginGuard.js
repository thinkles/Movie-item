const loginGuard = (req,res,next)=>{
    //判断用户访问的是不是登陆页面, 有没有登陆

    if(req.url != '/login'&& !req.session.username){
        res.redirect('/admin/login');
    }else{
      next();
    }
}//登录拦截

module.exports = loginGuard;
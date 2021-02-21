const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/api",{useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify:false})
        .then(()=>console.log("数据库链接成功"))
        .catch((err)=>console.log(err))

mongoose.set('useCreateIndex', true);
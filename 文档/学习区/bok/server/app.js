var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var connectMongo = require('connect-mongo')(session);

/*连接数据库*/
mongoose.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch(() => {
        console.log('数据库连接失败');
    });
//APP实例
var app = express();

//中间件设置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//允许跨域
app.use((req,res,next)=>{
    res.header({
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Origin':req.headers.origin || '*',
        'Access-Control-Allow-Headers':'Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type':'application/json;charset=utf-8'
    });
    if(req.method === 'OPTIONS'){
        res.sendStatus(200);
    }else {
        next();
    }
});

//设置session
app.use(session({
    secret:'qwer'//秘钥,
    ,cookie:{maxAge:30*60*1000}//给前端设置cookie有效期时长
    ,rolling:true//每次用户和后端交互
    ,resave:false //是否每次重新存储session
    ,saveUninitialized: false //初始化
    ,store: new connectMongo({
        url:'mongodb://localhost:27017/blog'
    })
}));

//设置路由
app.use('/', require('./routes/index'));

module.exports = app;

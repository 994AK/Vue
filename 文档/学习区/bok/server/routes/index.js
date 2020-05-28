var express = require('express');
var router = express.Router();


//文章相关的接口
router.use('/article',require('./article/index'));

//注册相关的接口
router.use('/register',require('./register/index'));
module.exports = router;

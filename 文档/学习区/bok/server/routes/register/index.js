const express = require('express');
//svgCaptcha 验证码包
const svgCaptcha = require('svg-captcha');

let router = express.Router();

//注册的API
router.post('/', (req, res) => {
    /*
    * @user 用户名
    * @pwd 密码
    * @checkPwd 再次确认密码
    * @svgCode 验证码
    */
    let {user, pwd, checkPwd, svgCode} = req.body;
    //验证数据有效性
    if (!user || !pwd || !checkPwd || !svgCode) {
        //注册少了某一个
        res.send({
            code:1,
            msg :'数据无效,请检查后再注册'
        });
        return;
    }

    //验证用户与密码
    if(!/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/ || !/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(pwd)){
        res.send({
            code:2,
            msg:'用户名或密码不符合规则',
        });
        return;
    }

    //后端再次验证验证码
    if (svgCode.toLocaleLowerCase() !== req.session.registerVCode.toLocaleLowerCase()) {
        res.send({
            code : 2,
            msg : '验证码错误'
        });
        return;
    }

    //检测用户名是否重复


});

/*验证码请求接口*/
router.post("/vcode", (req, res) => {
    let captcha = svgCaptcha.create();

    //将正确的答案放到 session
    req.session.registerVCode = captcha.text;
    console.log(captcha.text);
    res.send({
        code: 0,
        data: captcha.data
    })
});

//验证码失去焦点的请求
router.post('/checkVcode', (req, res) => {

    let {svgCode} = req.body;

    if (!svgCode || (svgCode.toLocaleLowerCase() !== req.session.registerVCode.toLocaleLowerCase())) {
        res.send({
            code: 1,
            msg: '验证失败'
        })
    } else {
        res.send({
            code: 0,
            msg: '验证成功'
        })
    }


});


module.exports = router;
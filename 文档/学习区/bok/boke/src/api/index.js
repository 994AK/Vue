import axios from 'axios';

//配置默认参数
axios.defaults.baseURL = 'http://localhost:3000';//默认访问地址
axios.defaults.withCredentials = true;//跨域允许携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';//设置POST请求


export default {
    //获取文章信息
    getArticleInfo() {
        return axios.post('/article/getInfo')
    },
    //获取热门文章
    getArticleHot(limit=8) {
        return axios.post('/article/getHot',{limit});
    },
    //获取文章列表
    getArticleShow: (function () {
        let skip = 0;
        let limit = 5;
        //插口

        return function (index=0,ifFresh=false) {
            if(ifFresh){
                skip=0;
                limit =5;
            }

            let tag = ['','HTML','JavaScript','Node','Vue&React','Other'][index];

            let data = {skip,limit,tag};
            //每次请求五次
            skip += limit;
            return axios.post('/article/getShow', data)
        }
    })(),
    //获取验证码图片
    getRegisterVCode(){
        return axios.post("/register/vcode")
    },
    //验证码的提交验证
    getRegisterCheckVcode(svgCode){
        return axios.post('/register/checkVcode',{svgCode})
    },
    //注册提交
    postRegister(){

    }

}

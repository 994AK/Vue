const exoress = require('express');
var article = require('../../db/article');
var articleInfo = require('../../db/articleInfo');

let router = exoress.Router();
/*获取文章info*/
router.post('/getInfo', (req, res) => {
    articleInfo.findOne({}, {_d: 0, __v: 0})
        .then(data => {
            res.send({
                code: 0,
                msg: '请求成功',
                data
            })
        })
        .catch(() => {
            res.send({
                code: 4,
                msg: '服务器错误',
                data: null
            })
        })
});

/*热门8文章*/
router.post('/getHot',(req,res)=>{
    let {limit} = req.body;
    article.find({},{_id:0,__v:0},{sort:{pv:-1},skip:0,limit})
        .then(data=>{
            res.send({
                code:0,
                data
            })
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:'服务器错误',
                data:null
            })
        })
})

/*文章列表的显示*/
router.post('/getShow',(req,res)=>{
    /*
    * tag 数据
    * */
    let {skip,limit,tag} = req.body;

    //判断是否有数据
    let options = tag ? { tag } : {};


    article.find(options,{__v:0},{skip,limit,sort:{pv:-1}})
        .then(data=>{
           res.send({
               code:0,
               data
           })
        })
        .catch(err=>{
            res.send({
                code:4,
                msg:'服务器错误',
                err
            })
        })
})


module.exports = router;
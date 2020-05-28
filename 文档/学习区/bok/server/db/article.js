//文章表
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let article = mongoose.model('article',new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    title:{
      type: String,
      required: true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    tag:{
      type:String,
      required:true
    },
    surface:{
        type:String,
        default:'/img/defaullt.jpg'
    },
    pv:{
        type:String,
        default:0
    },
    comment:
        [{
            type:Schema.Types.ObjectId,
            ref:'comment'
        }]
}));
// /*假数据*/
// for (let i = 0; i<100;i++){
//     article.create(
//         {
//             type:['原创','转载'][(Math.random()*2)|0],
//             title:`第${i+1}篇文章`,
//             content:(''+i+i+i+i+i+i+i+'哈哈哈哈文章的内容').repeat(10),
//             tag:['HTML','JavaScript','Node','Vue&React','Other'][(Math.random()*5)|0]
//         }
//     );
// }


module.exports = article;
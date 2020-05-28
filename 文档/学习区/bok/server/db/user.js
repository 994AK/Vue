
const mongoose = require('mongoose');


module.exports = mongoose.model('user',new mongoose.Schema({
    //用户名
    user : {type : String,required:true},
    //密码
    pwd : {type: String,required:true},

    //注册时间
    regDate:{type:Number,default:Date.now().getTime()},

    //头像
    photo : {type :String,default:'/img/defaultPhoto.png'},
    //是否权限禁用
    disable: {type:Boolean,default: false},
    //是否1管理员
    admin:{type:Boolean,default:false},
}));

module.exports = user;
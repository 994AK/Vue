const mongoose = require('mongoose');

let articleInfo = mongoose.model('user',new mongoose.Schema({
    tags:[String],
    num:Number
}));

articleInfo.create({
    tags:['HTML5&CSS3','JavaScript','Node','Vue&React','other'],
    num:100,
});

module.exports = articleInfo;
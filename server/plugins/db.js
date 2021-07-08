module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://root:123abc@127.0.0.1:27017/yun-yu-zhen?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  require('require-all')(__dirname + '/../models')
}
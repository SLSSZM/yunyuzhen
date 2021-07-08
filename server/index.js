const express = require('express')

const app = express()
// 配置跨域
app.use(require('cors')())
app.use(express.json())

// 配置数据库
require('./plugins/db')(app)
// 路由
require('./routes/web')(app)

app.listen(4000, () => {
  console.log('http://localhost:4000')
})

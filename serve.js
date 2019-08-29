const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors') // 解决跨域的中间件

const ejs = require('ejs')
//  node 模块的日志模块
var logger = require('morgan');

const fs = require('fs')
const db = require('./db/serve.js') // 数据库连接

// const routers = require('./routers/router')
const routers = require('./routers')

var app = express()


// 日志
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(logger('dev')) //打印到控制台
app.use(logger('combined', {stream : accessLogStream}));      //打印到log日志
// 这样便可以将请求信息打印在根目录下的access.log文件中（注意文件路径别填错，并不会自动创建该文件）

app.use(function (err, req, res, next) {
    // console.error(err.stack)
    console.log(err)
    if(res.code === 200) {
        res.send({code: 200, result: res.body})
        next()
    }
    res.status(500).send('Something broke!')
})

// 注册html模板引擎
// app.engine('.html',ejs.__express);
app.engine('html', ejs.renderFile);

// 将模板引擎换成html
app.set('view engine', 'html')

app.set('views' , './views')
// body 解析
app.use(bodyParser.json())
// 跨域解决
app.use(cors())

// 访问静态资源 
app.use('/public', express.static(path.join(__dirname, 'views')))//加载静态文件

// 注册路由 -- 将所有路由同意注册
// routers(app, routerPath)
// routers(app)
app.use('/api', routers)

// 默认所有页面渲染到这里
app.use((req, res) => {
    res.render('index.html', {
        title: '首页'
    })
})

app.listen(3812, function(){
    console.log('3812 serve is running')
})
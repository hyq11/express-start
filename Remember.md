# mongoose

```js
// Model

create() 插入数据
find() 查询数据
findById() 查询数据
findByIdAndDelete()找到并删除
findByIdAndUpdate (id, obj, option, callback ) 找到并更新对应的值

```

-Create
        模型对象.create(文档对象，回调函数)
        模型对象.create(文档对象)
-Read
        模型对象.find(查询条件[,投影])不管有没有数据都返回一个数组
        模型对象.findOne(查询条件[,投影])找到返回一个对象，没找到返回一个null
-Update
        模型对象.upDateOne(查询条件，更新的内容[, 配置对象])
        模型对象.upDateMany(查询条件，更新的内容[, 配置对象])
-Delete
        模型对象.deleteOne(查询条件)
        模型对象.deleteMany(查询条件)

## 模板使用

注册html模板引擎 (这个是必须用的)
app.engine('.html',ejs.__express)   (法1)
app.engine('html', ejs.renderFile); (法2)

将模板引擎换成html (发现这个不用也没事)
app.set('view engine', 'html')   // 这个可以不屑

设置模板文件夹 (这个第一个参数必须是views， 项目中创建的文件夹最好使用views)
app.set('views' , './views')

## 处理没有捕获的异常，导致 node 退出

app.use(function (req, res, next) {  
  var reqDomain = domain.create();  
  reqDomain.on('error', function (err) {
     res.status(err.status || 500);
     res.render('error');
  });
  reqDomain.run(next);
});

作者：我是你的超级英雄
链接：https://juejin.im/post/5d18e05a6fb9a07ede0b5998
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 日志
morgan中间件

__控制台输出__
     在进行nodejs的express进行开发的时候，一般使用了生成器的话,生成器默认会使用morgan中间件来记录请求信息。但是在使用app.use(logger('dev'));的时候，只会将请求信息打印到控制台，虽然这样方便调试，但是在实际的生产中，日志通常都会记录在日志文件中。具体如下：

```js
const logger = require('morgan');
app.use(logger('dev'));
```

## __日志记录__

## __单一文件记录：__

```js
var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var app = express();
// create a write stream (in append mode)  //access.log这个文件要自己建
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
// setup the logger 
app.use(logger('combined', {stream: accessLogStream}));
```

## __日期文件记录__

```js
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var logger = require('morgan');
var app = express();
var logDirectory = __dirname + '/logs';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
  filename: `${logDirectory}/access.-%DATE%.log`,
  frequency: 'daily',
  verbose: false,
  date_format:'YYYY-MM-DD'
});
// setup the logger
app.use(logger('combined', {stream: accessLogStream}));
```

## __log4js记录操作日志__

```js
const log4js = require('log4js');
 
let options = {
    "appenders": {
        "console":{
          "type":"console"
        },
        "info": {
          "type": "dateFile",
          "filename": 'logFilename',
          "pattern": "-yyyy-MM-dd.log",
          "alwaysIncludePattern": true,//如果为true，则每个文件都会按pattern命名，否则最新的文件不会按照pattern命名
        },
        "errors": {
          "type": "dateFile",
          "filename": 'errorFilename',
          "pattern": "-yyyy-MM-dd.log",
          "alwaysIncludePattern": true,//如果为true，则每个文件都会按pattern命名，否则最新的文件不会按照pattern命名
           "maxLogSize": 10485760,
          "numBackups": 3
        }
      },
      "categories": {
        "default":{ "appenders": ["info","errors","console"], "level": "info" },
        "info": { "appenders": [ "info"], "level": "info" },
        "errors": { "appenders": [ "errors" ], "level": "info" },//level:trace,debug,info,warn,error,fatal
        "console":{ "appenders": [ "console" ], "level": log4js.levels.ALL }
      }
};
log4js.configure(options);
 
 
let errorsLog = log4js.getLogger('errors');
let infoLog = log4js.getLogger('info');
let consoleLog = log4js.getLogger('console');
 
let Log = {
  trace: function () {
      infoLog.trace.apply(infoLog, arguments);
  },
  debug: function () {
      infoLog.debug.apply(infoLog, arguments)
  },
  info: function () {
      infoLog.info.apply(infoLog, arguments)
  },
  log: function log() {
      infoLog.info.apply(infoLog, arguments)
  },
  warn: function () {
      infoLog.warn.apply(infoLog, arguments)
  },
  error: function error() {
      infoLog.error.apply(infoLog, arguments)
      errorLog.error.apply(errorLog, arguments)
  },
  fatal: function () {
      infoLog.fatal.apply(infoLog, arguments)
      errorLog.fatal.apply(errorLog, arguments)
  }
}
if(!! CONFIG.get('env.debug')) {
  Log.log = function () {
      infoLog.info.apply(infoLog, arguments)
      consoleLog.info.apply(consoleLog, arguments)
  }
  Log.error = function () {
      infoLog.error.apply(infoLog, arguments)
      errorLog.error.apply(errorLog, arguments)
      consoleLog.info.apply(consoleLog, arguments)
  }
}
```

var express = require('express');
var app = express();

app.use(express.static('images'));

app.get('/', function(req, res) {
    res.send('Hello World');
})

var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)


    console.log(__dirname);
    console.log(express.static('images'));
})



// 一定注意目录结构
/**
 * js文件同文件夹一层，则  express.static("文件夹名称")
 * 访问 从文件夹名称的下一级目录开始
 * 需要注意：  __dirname对应的位置，访问时，这个是根目录
 * 
 */

// static images baidu.jpg
// app.use(express.static('images'));
// http://127.0.0.1:8081/baidu.jpg

// static images baidu baidu.jpg
// app.use(express.static('images'));
// http://127.0.0.1:8081/baidu/baidu.jpg
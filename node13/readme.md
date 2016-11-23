路由
要为路由提供请求的URL和其他需要的GET及POST参数，随后路由需要根据这些数据来执行相应的代码。
因此，需要查看HTTP请求，从中提取出请求的URL以及GET/POST参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为的HTTP服务器的功能。
需要的所有数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。但是为了解析这些数据，需要额外的Node.JS模块，它们分别是url和querystring模块。
                   url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring(string)["foo"]    |
                                            |
                         querystring(string)["hello"]
当然也可以用querystring模块来解析POST请求体中的参数，稍后会有演示。
现在来给onRequest()函数加上一些逻辑，用来找出浏览器请求的URL路径：
var http = require("http");
var url = require("url");

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
好了，的应用现在可以通过请求的URL路径来区别不同请求了--这使得以使用路由（还未完成）来将请求以URL路径为基准映射到处理程序上。
在所要构建的应用中，这意味着来自/start和/upload的请求可以使用不同的代码来处理。稍后将看到这些内容是如何整合到一起的。
现在可以来编写路由了，建立一个名为 router.js 的文件，添加以下内容：
function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;
如所见，这段代码什么也没干，不过对于现在来说这是应该的。在添加更多的逻辑以前，先来看看如何把路由和服务器整合起来。
的服务器应当知道路由的存在并加以有效利用。当然可以通过硬编码的方式将这一依赖项绑定到服务器上，但是其它语言的编程经验告诉这会是一件非常痛苦的事，因此将使用依赖注入的方式较松散地添加路由模块。
首先，来扩展一下服务器的start()函数，以便将路由函数作为参数传递过去，server.js 文件代码如下
var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
同时，会相应扩展index.js，使得路由函数可以被注入到服务器中：
var server = require("./server");
var router = require("./router");

server.start(router.route);
在这里，传递的函数依旧什么也没做。
如果现在启动应用（node index.js，始终记得这个命令行），随后请求一个URL，
将会看到应用输出相应的信息，这表明的HTTP服务器已经在使用路由模块了，并会将请求的路径传递给路由：
$ node index.js
Server has started.
以上输出已经去掉了比较烦人的/favicon.ico请求相关的部分。
// 1
var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
}).listen(5555);


// 2
var http = require("http");

function onRequest(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
}

http.createServer(onRequest).listen(5555);
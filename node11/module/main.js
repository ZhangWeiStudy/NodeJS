// 1
var hello = require('./hello');
hello.world();

// 2
//main.js 
var Hello = require('./hello');
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();
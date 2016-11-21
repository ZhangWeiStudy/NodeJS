// create  a buffer  10Byte
var buf = new Buffer(10);

// buffer Array
var bufArr = new Buffer([10, 20, 30, 40, 50]);

// buffer eg
var bufEg = new Buffer("www.baidu.com", "utf-8");

// write to buffer

/* buf.write(string[, offset[, length]][, encoding])
   string - 写入缓冲区的字符串。
   offset - 缓冲区开始写入的索引值，默认为 0 。
   length - 写入的字节数，默认为 buffer.length
   encoding - 使用的编码。默认为 'utf8' 。
   
   return 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
*/

buf = new Buffer(256);
len = buf.write("www.baidu.com");
console.log("写入字节数 : " + len);


// read buffer data
/**
 * buf.toString([encoding[, start[, end]]])
 * 
 * encoding - 使用的编码。默认为 'utf8' 。
 * start - 指定开始读取的索引位置，默认为 0。
 * end - 结束位置，默认为缓冲区的末尾。
 * 
 * return 解码缓冲区数据并使用指定的编码返回字符串。
 * 
 */

buf = new Buffer(26);
for (var i = 0; i < 26; i++) {
    buf[i] = i + 97;
}

console.log(buf.toString('ascii')); // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('ascii', 0, 5)); // 输出: abcde
console.log(buf.toString('utf8', 0, 5)); // 使用 'utf8' 编码, 并输出: abcde
console.log(buf.toString(undefined, 0, 5)); // 输出: abcde



// Covert buffer to Json
/**
 * 
 * buf.toJSON()
 * 
 * return JSON对象
 */
var buf = new Buffer('www.baidu.com');
var json = buf.toJSON(buf);
console.log(json);



// Combine buffer
/**
 * 
 * Buffer.concat(list[, totalLength])
 * 
 * list - 用于合并的 Buffer 对象数组列表。
 * totalLength - 指定合并后Buffer对象的总长度。
 * 
 * return 一个多个成员合并的新 Buffer 对象。
 * 
 */

var buffer1 = new Buffer('nodejs ');
var buffer2 = new Buffer('www.baidu.com');
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer1:    " + buffer1);
console.log(buffer1);
console.log("buffer3 内容: " + buffer3.toString());



// compare buffer area data
/**
 * buf.compare(otherBuffer);
 * 
 * otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
 * 
 * return 一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
 * 
 */
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if (result < 0) {
    console.log(buffer1 + " 在 " + buffer2 + "之前");
} else if (result == 0) {
    console.log(buffer1 + " 与 " + buffer2 + "相同");
} else {
    console.log(buffer1 + " 在 " + buffer2 + "之后");
}




// copy buffer
/**
 * buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
 * 
 * targetBuffer - 要拷贝的 Buffer 对象。
 * targetStart - 数字, 可选, 默认: 0
 * sourceStart - 数字, 可选, 默认: 0
 * sourceEnd - 数字, 可选, 默认: buffer.length
 * 
 */

var buffer1 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());







// slice buffer
/**
 * buf.slice([start[, end]])
 * 
 * start - 数字, 可选, 默认: 0
 * end - 数字, 可选, 默认: buffer.length
 * 
 * return 一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
 * 
 */

var buffer1 = new Buffer('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0, 2);
console.log("buffer2 content: " + buffer2.toString());



// buf.length
var buffer = new Buffer('www.baidu.com');
//  缓冲区长度
console.log("buffer length: " + buffer.length);
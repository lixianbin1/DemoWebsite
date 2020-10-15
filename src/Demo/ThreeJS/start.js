var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require("path")
var c = require('child_process');

// 创建服务器
http.createServer( function (request, response) { 
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   var extname = path.extname(pathname);
   // 输出请求的文件名
   // console.log("Request for " + pathname + " received.");
   
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
        let type = memu(extname);
        if (err) {
           response.writeHead(404, {'Content-Type': type});
        }else{             
           response.writeHead(200, {
              'Content-Length': data.length,
              'Content-Type': type
           });    
           
           // 响应文件内容
           response.write(data);        
        }
        //  发送响应数据
        response.end();
   });   
}).listen(9000);
c.exec('start http://localhost:9000/index.html');

function memu(exname){
    switch(exname){
        case ".html":
            return "text/html";
            break;
        case ".css":
            return "text/css";
            break;
        case ".jpg":
            return "image/jpg";
            break;
        case ".png":
            return "image/png";
            break;
        case ".js":
            return "text/javascript";
            break;
        case ".json":
            return "text/json";
            break;
        case ".jpeg":
            return "image/jpeg";
            break;
        case ".gif":
            return "image/gif";
            break;
        case ".svg":
            return "image/svg+xml";
            break;
        case ".rtf":
            return "application/rtf";
            break;
        case ".woff":case ".woff2":
            return "application/x-font-woff";
            break;
        case ".webm":
            return "video/webm";
            break;
        default:
            return "text/plain";
    }
}

// 控制台会输出以下信息
console.log(' \n \
请勿关闭本窗口,打开浏览器访问下列地址  \n\
');
console.log(' http://localhost:8080/index.html')
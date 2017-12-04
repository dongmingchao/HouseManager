var http=require('http');
var fs=require('fs');
http.createServer((req,resp) => {
    var route=require('./Server/myRoute');
	var ans=route(req,resp);
	if(ans) {
	    resp.writeHead(200);
	    if(ans!=1) resp.end(ans);
	}else {
	    resp.writeHead(404);
	    resp.end(fs.readFileSync("404error.html"));
    }
}).listen(9000);
console.log('Server Running at localhost:9000');

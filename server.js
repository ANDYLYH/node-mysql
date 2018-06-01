var express = require('express');
var router = require('./router/router');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//设置跨域
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	if (req.method == 'OPTIONS') {
        res.send(200); /*让options请求快速返回*/
    }else {
        next();
    }
});

app.use(router);

var server = app.listen(8000, function() {
	console.log("应用实例，访问地址为 http://"+server.address().address+":"+server.address().port)
})

var express = require('express');
var controller = require('./controller/controller');

//var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var app = express();

//app.use(cookieParser());

app.get('/search',controller.search);//查
app.get('/add', controller.add);//增
app.get('/del', controller.del);//删
app.get('/get', controller.get);//查 by id
app.get('/update', controller.update);//修改  更新

var server = app.listen(8000, function() {
//	var host = server.address().address
//	var port = server.address().port
	console.log("应用实例，访问地址为 http://0.0.0.0:8000")
})

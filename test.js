var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/uselist';
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var successMsg = {
	status:{
		code:0,
		message:'ok'
	}
}
//  主页输出 "Hello World"
app.get('/', function(req, res) {
	console.log("主页 GET 请求");
	res.send('Hello GET');
})

//  POST 请求
app.post('/', function(req, res) {
	console.log("主页 POST 请求");
	res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function(req, res) {
	console.log("/del_user 响应 DELETE 请求");
	res.send('删除页面');
})

//添加
app.get('/new_add', function(req, res) {
	  res.header("Access-Control-Allow-Credentials", true)
	  res.header("Access-Control-Allow-Origin", "*")
	  res.header("Access-Control-Allow-Headers", "X-Requested-With")
	  res.header("Access-Control-Allow-Methods", "PUT,POST,GET")
	  res.header("X-Powered-By", ' 3.2.1')
	  res.header("Content-Type", "application/json;charset=utf-8")
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.error(err);
			return;
		}else{
			var _obj = {
				title: req.query.title, 
			    description: req.query.description,
			    by: req.query.by,
			    url: req.query.url,
			    tags: [],
			    likes: 1001
			}
			mongoInsert(db,'collectionName',_obj,function(result){
				res.send(successMsg);
				db.close();
			});
		}
	});
});
//添加-对象
app.get('/new_addobj', function(req, res) {
	  res.header("Access-Control-Allow-Credentials", true)
	  res.header("Access-Control-Allow-Origin", "*")
	  res.header("Access-Control-Allow-Headers", "X-Requested-With")
	  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
	  res.header("X-Powered-By", ' 3.2.1')
	  res.header("Content-Type", "application/json;charset=utf-8")
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.error(err);
			return;
		}else{
			var _obj ={}; 
			for(var i = 0; i < req.query.list.length;i++){
				_obj = req.query.list[i];
				
				mongoInsert(db,'stoneList',_obj,function(result){
					res.send(successMsg); 
					db.close();
				});
			}
			
		}
	});
});
//查
app.get('/user_search', function(req, res) {
	res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.error(err);
			return;
		}else{	
//			console.log(req.cookies)
//			res.cookie('page', req.body, { domain: 'localhost', path: '/user_search' });
//			var pageobj = {
//				pageCurrent: Number(req.body.pageCurrent),
//				pageSize:Number(req.body.pageSize)
//			}
//			if(!req.body.variety){
//				var errorObj = {
//					status:{
//						code:10,
//						message:'石材名称不能为空'
//					}
//				}
//				res.send(errorObj);
//				db.close();
//				return false;
//			}
//			var $j = new RegExp(req.body.variety)
			console.log(req.query)
			var pageobj = {
				pageCurrent: Number(req.query.pageCurrent),
				pageSize:Number(req.query.pageSize)
			}
			if(!req.query.variety){
				var errorObj = {
					status:{
						code:10,
						message:'石材名称不能为空'
					}
				}
				res.send(errorObj);
				db.close();
				return false;
			}
			var $j = new RegExp(req.query.variety)
			var _obj = {
				variety:$j
			}
			//查询
			mongofind(db,'stoneList',_obj,pageobj,function(result,pageTotal){
				var returnObj = {
					data:{
						list:result
					},
					page:{
						totalPage:Math.floor(pageTotal/pageobj.pageSize+(pageTotal%pageobj.pageSize>0?1:0)),
						pageCurrent:pageobj.pageCurrent,
						pageSize:pageobj.pageSize,
						totalRow:pageTotal
					},
					status:{
						code:0,
						message:'ok'
					}
				}
				res.send(returnObj);
				db.close();
			});
		}
	});
});
//详情  -- 查询
app.get('/user_Details', function(req, res) {
	res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.error(err);
			return;
		}else{
			var detailsId = {
				idString:req.query.id
			}
			mongofindDetails(db,'stoneList',detailsId,function(result){
				var detailsObj = {
					data:{
						details:result
					},
					status:{
						code:0,
						message:'ok'
					}
				}
				res.send(detailsObj);
				db.close();
			});
		}
	});
})
//删
app.get('/user_del', function(req, res) {
	  res.header("Access-Control-Allow-Credentials", true)
	  res.header("Access-Control-Allow-Origin", "*")
	  res.header("Access-Control-Allow-Headers", "X-Requested-With")
	  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
	  res.header("X-Powered-By", ' 3.2.1')
	  res.header("Content-Type", "application/json;charset=utf-8")
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.error(err);
			return;
		}else{
			var _obj ={
				title:req.query.title
			}
			mongodel(db,'stoneList',_obj,function(result){
				res.send(successMsg);
				db.close();
			});
		}
	});
});
//增----在数据库数据表 
function mongoInsert(db, collection_name, data,cb) {
	//连接上数据库具体某一个表
    var collection = db.collection(collection_name);
    //对数据库进行添加数据  ---写
    collection.insert(data, function(err, res) {
        if(err) {
            console.log(err);
        }
        else {
            cb(res); 
        }
    });
}
//查---在数据库数据表
function mongofind(db, collection_name,data,page,cb) {
    var collection = db.collection(collection_name);
    var resultObj;
    var totlePage = 0;
    collection.find(data).count(function(err,count){  
        totlePage = count;
    })  
    //对数据库进行查找数据  ---读   分页 limit--限制显示数量，一页显示的条数   skip--取值的位置
    collection.find(data).limit(page.pageSize).skip(page.pageSize*(page.pageCurrent-1)).toArray(function(err, res) {
	    if(err){
	        console.error(err);
	    }else{
	        cb(res,totlePage);
	    }
	  });
}
function mongofindDetails(db, collection_name, data,cb) {
    var collection = db.collection(collection_name);
    collection.find(data).toArray(function(err, res) {
	    if(err){
	        console.error(err);
	    }else{
	        cb(res);
	    }
	  });
}
//删---在数据库数据表
function mongodel(db, collection_name, data,cb) {
    var collection = db.collection(collection_name);
  	collection.deleteOne(data, function(err, result) {
	    if(err){
	        console.error(err);
	    }else{
	        cb(result);
	    }
	});
}
//正则转换
function changeRegExp(key){
	return  new RegExp(key);
}

var server = app.listen(8081, function() {

	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
var DaoBase = require('../util/DBUtil');//引入dbutil
var commonHead = require('../config/requestHead.js');
//查
exports.search = function(req,res){
	commonHead.use(res);
	var _pageCurrent = Number(req.query.pageCurrent);
	var _pageSize = Number(req.query.pageSize);
	//查    分页查询
	var sql ='select * from stone_tab where name  like "%'+req.query.name+'%" limit '+(_pageCurrent - 1)*_pageSize+', '+_pageSize+'';
	DaoBase.executeQuery(sql,[],function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		//返回数据
		var _obj = {
			data:{
				list:result,
			},
			page:{
				pageCurrent:_pageCurrent,
				pageSize:_pageSize
			}
		}	
		res.send(_obj);
	});
}
//增
exports.add = function(req,res){
	commonHead.use(res);
	//查    分页查询
	var sql ='insert into stone_tab (name,english,math) values ("'+req.query.name+'",'+ Number(req.query.english)+','+Number(req.query.math)+')';
	DaoBase.executeUpdate(sql,[],function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		//返回数据
		var _obj = {
			ssuccess:{
				code:0,
				message:'ok'
			}
		}	
		res.send(_obj);
	});
}
//删
exports.del = function(req,res){
	commonHead.use(res);
	//查    分页查询
	var sql ='delete from stone_tab where id="'+req.query.id+'"';
	DaoBase.executeUpdate(sql,[],function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		//返回数据
		var _obj = {
			ssuccess:{
				code:0,
				message:'ok'
			}
		}	
		res.send(_obj);
	});
}
//获取 通过id
exports.get = function(req,res){
	commonHead.use(res);
	//查    分页查询
	var sql ='select * from stone_tab where id="'+req.query.id+'"';
	DaoBase.executeUpdate(sql,[],function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		//返回数据
		var _obj = {
			data:{
				info:result[0]
			}
		}	
		res.send(_obj);
	});
}
//更新
exports.update = function(req,res){
	commonHead.use(res);
	//查    分页查询
	var sql ='update stone_tab set name="'+req.query.name+'", math='+req.query.math+' ,english='+req.query.english+' where id='+req.query.id;
	DaoBase.executeUpdate(sql,[],function(err,result){
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		//返回数据
		var _obj = {
			data:{
				info:result[0]
			}
		}	
		res.send(_obj);
	});
}
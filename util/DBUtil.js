var config=require('../config/config.js');//引入配置文件
var mysql=require('mysql');//引入mysql驱动
var pool=mysql.createPool(config);//创建数据库连接池
//dql函数（用于查询的函数）
exports.executeQuery=function(sql, data, callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,data,function(qerr, vals, fields){
                conn.release();
                callback(qerr,vals,fields);
            });
        }
    });
};
//dml函数（用于增加、修改、删除的函数）
exports.executeUpdate = function(sql, data, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, data, function(qerr, result) {
                conn.release();
                callback(qerr, result);
            });
        }
    });
};
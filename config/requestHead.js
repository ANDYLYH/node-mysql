exports.use = function(res){
	res.header("Access-Control-Allow-Credentials", true)
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "X-Requested-With")
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8")
}

var express = require('express');
var controller = require('../controller/controller');

var router = express.Router();

router.get('/search',controller.search);//查
router.get('/add', controller.add);//增
router.get('/del', controller.del);//删
router.get('/get', controller.get);//查  by id
router.get('/update', controller.update);//修改  更新

module.exports = router;
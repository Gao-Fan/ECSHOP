var express = require('express');
var router = express.Router();
var GoodsModel = require("../model/GoodsModel");

//商品在数据库中删除
router.post('/shop_remove', function(req, res) {
	var goods_name = req.body.goods_name;
	var goods_sn = req.body.goods_sn;
	var result={
		status : 1,
		message : "已在数据库中删除"
	};
	GoodsModel.find({goods_name:goods_name,goods_sn:goods_sn},function(err,docs){
		var condition = {goods_sn:goods_sn}
		if( !err && docs.length > 0 ){
			GoodsModel.remove(condition,function(err){
				if(!err){
					res.send(result);
					return;
				}
				result.status = -709;
				result.message = "删除失败";
				res.send(result);
			});
		}
	})
  // res.send('商品操作页面');
});

module.exports = router;

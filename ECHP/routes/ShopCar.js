var express = require('express');
var router = express.Router();
var CartModel = require("../model/CartModel");

/* 删除购物车商品 */ 
router.post('/removeshop',function(req,res,next){
	var result = {
		status : 1,
		message : "购物车商品删除成功"
	}
	var product_id = req.body.product_id;
	console.log(product_id)
	if( !product_id ){
		result.status = -704, //没有可以删除的了
		result.message = '没有可以删除的了'
		res.send(result)
		return
	}
	CartModel.remove({product_id:product_id},function(err){
		if(!err){
			CartModel.find({},function(err,docs){
				if(!err && docs.length>0){
					res.send(docs)
				}else if(!err && docs.length == 0){
					result.status = -704, //没有可以删除的了
					result.message = '没有可以删除的了'
					res.send(result)
					return
				}
			})
		}else{
			result.status = -304
			result.message = '删除失败'
			res.send(result)
		}
	})
})
/* 查看项购物车商品 */
router.get('/findshop',function(req,res,next){
	var result = {
		status : 1,
		message : "购物车商品查询成功"
	}
	CartModel.find({},function(err,docs){
		//console.log(docs)
		if( err || docs.length <= 0 ){
			result.status = -040;
			result.message = '购物车商品查询失败';
			//console.log('购物车商品查询失败')
			res.send(result);
			return;
		}
		res.send(docs)
	})
})

/* 项购物车添加商品 */
router.post('/', function(req, res, next) {
  // console.log(req.body)
  var brand = req.body.brand;
  var images = req.body.images;
  var name = req.body.name;
  var origin_sale_price = req.body.origin_sale_price;
  var product_id = req.body.product_id;
  var sale_price = req.body.sale_price;
  var specification_name = req.body.specification_name;
  var spu = req.body.spu;
  var result = {
		status : 1,
		message : "添加成功"
	}
	CartModel.find({product_id:product_id},function(err,docs){
		// console.log(docs)
		if(!err && docs.length > 0 ){
			result.status = -111;
			result.message = "购物车中已经有这件商品"
			//console.log("购物车中已经有这件商品");
			res.send(result);
			return;
		}
		
		//购物车添加功能(mongoDB 的调用需要使用mongoose)
		var cm = new CartModel();
		cm.brand = brand;
		cm.images = images;
		cm.name = name;
		cm.origin_sale_price = origin_sale_price;
		cm.product_id = product_id;
		cm.sale_price = sale_price;
		cm.specification_name = specification_name;
		cm.spu = spu;
		cm.save(function(err){
			if(err){
				//console.log("添加购物车失败",err);
				result.status = -110;
				result.message = "添加购物车失败";
				res.send(result);
			}else{
				//console.log("添加购物车成功");
				res.send(result);
			}
		});		
	})
});

module.exports = router;
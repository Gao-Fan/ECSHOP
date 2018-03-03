var express = require('express');
var router = express.Router();
var GoodsModel = require("../model/GoodsModel");

//商品列表页面
router.get("/goods_list",function(req,res){
	if( req.session && req.session.username != null ){
		console.log( req.query.count)
		var pageNo = parseInt(req.query.pageNo) || 1;
	    var count = parseInt(req.query.count) || 3;

	    var PageMessage = {
	    	num : 0,
	    	pageNum : 0
	    }

	    GoodsModel.find({},function(err,docs){
			if(!err){
				PageMessage.num = docs.length;
				PageMessage.pageNum = Math.ceil( PageMessage.num / count );
			}		
		});

	    var query = GoodsModel.find({}).skip((pageNo-1)*count).limit(count).sort({date:-1});
	    query.exec(function(err,results){
			res.render('goods_list', {list:results,PageMessage:PageMessage,pageNo:pageNo,count:count});
	  	});
	}else{
		res.redirect("/");
	}
})

//商品在数据库中删除
router.get('/shop_remove', function(req,res){
	var gid = req.query.gid;
	console.log(gid);
	var result = {
		status : 1,
		message : "已在数据库中删除"
	};
	GoodsModel.findByIdAndRemove({_id:req.query.gid},function(err){	
		if(err){
			result.status = -104;
			result.message = "删除失败"
		}
		res.send(result);
	});
});


//查找功能
router.post("/api/goods_list",function(req,res){
	if( req.session && req.session.username != null ){
		var keyword = req.body.keyword;
		GoodsModel.find({goods_name:{$regex:keyword}},function(err,docs){
			res.render("goods_list" , {list:docs} )
		})
	}else{
		res.redirect("/");
	}
})
module.exports = router;

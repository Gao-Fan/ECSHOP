var express = require('express');
var router = express.Router();
var GoodsModel = require("../model/GoodsModel");

//商品列表页面
router.get("/goods_list",function(req,res){
	if( req.session && req.session.username != null ){	
		var pageNo = parseInt(req.query.pageNo || 1);  //第几页
	    var count = parseInt(req.query.count || 4);    //一页多少个
	    var keyword = req.query.keyword || '';
	    console.log(keyword)
	    var PageMessage = {
	    	num : 0 ,      //一共多少条数据
	    	pageNum : 0    //一共多少页
	    };
	    GoodsModel.find({goods_name:{$regex:keyword}},function(err,docs){
			if( !err ){
				PageMessage.num = docs.length;
				PageMessage.pageNum = Math.ceil( PageMessage.num / count );
				if( pageNo>PageMessage.pageNum ){
					pageNo = PageMessage.pageNum
				}else if(pageNo<=1){
					pageNo = 1;
				}
	    		var query = GoodsModel.find({goods_name:{$regex:keyword}}).skip((pageNo-1)*count).limit(count).sort({date:-1});
	   			query.exec(function(err,results){
	   				console.log(count)
	   				res.render('goods_list', {list:results,PageMessage:PageMessage,pageNo:pageNo,count:count,keyword:keyword});
	  			});
			}		
		});		
	}else{
		res.redirect( "/" );
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
			result.status = -104 ;
			result.message = "删除失败" ;
		}
		res.send(result);
	});
});


// //查找功能
// router.post("/api/goods_list",function(req,res){
// 	if( req.session && req.session.username != null ){
// 		var keyword = req.body.keyword;
// 		GoodsModel.find({goods_name:{$regex:keyword}},function(err,docs){
// 			res.render("goods_list" , {list:docs} )
// 		})
// 	}else{
// 		res.redirect("/");
// 	}
// })
module.exports = router;

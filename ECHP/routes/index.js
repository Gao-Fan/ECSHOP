var express = require('express');
var router = express.Router();
var md5 = require("md5");
var multiparty = require("multiparty")
var UserModel = require("../model/UserModel");

/* GET home page. */
//登录页面
router.get('/', function(req, res, next) {
  res.render('login', {});
});
//注册画面
router.get('/regist', function(req, res, next) {
  res.render('regist', {});
});
//系统页面
router.get('/admin', function(req, res, next) {
  res.render('admin', {});
});
//商品添加页面
router.get('/goods_add', function(req, res, next) {
  res.render('goods_add', {});
});
//商品列表页面
router.get("/goods_list",function(req,res,next){
	res.render("goods_list" , {} )
})

//商品添加-操作
router.post("/api/add_goods",function(req,res){
	var form = new multiparty.Form({
		uploadDir : "./public/shopImgs"
	})
	form = parse(req,function(err,body,fils){
		//转换后的对象都是数组
		var goods_name = body.goods_name[0];
		var price = body.price[0];
		console.log(files);
		res.send("文件上传成功");
	})	
})
//登录页面-参数操作
router.post("/api/login",function(req,res){
	var username = req.body.username;
	var psw = md5(req.body.psw);

	var result = {
		status : 1,
		message : "登录成功"
	}

	UserModel.find({username:username,psw:psw},function(err,docs){
		if(!err && docs.length > 0 ){
			console.log("登录成功");
			res.send(result);
		}else{
			result.status = -109;
			result.message = "登录失败,请检查您的用户名和密码"
			console.log("登录失败,请检查您的用户名和密码");
			res.send(result);
		}
	})
})

//注册画面-参数操作
router.post("/api/regist",function(req,res){
	//express  post参数接受
	//所有的post参数都被包装到req.body中
	var username = req.body.username;
	var psw = md5(req.body.psw);
	//查看用户名是否被占用
	//docs:查询结果
	
	var result = {
		status : 1,
		message : "注册成功"
	}

	UserModel.find({username:username},function(err,docs){
		if(!err && docs.length > 0 ){
			result.status = -111;
			status.message = "用户已经被使用"
			console.log("用户已经被使用");
			res.send(status);
			return;
		}
		//保存功能 (mongoDB 的调用需要使用mongoose)
		var um = new UserModel();
		um.username = username;
		um.psw = psw;
		um.save(function(err){
			if(err){
				console.log("注册失败",err);
				result.status = -110;
				result.message = "注册失败";
				res.send(result);
			}else{
				console.log("注册成功");
				res.send(result);
			}
		});
	})	
})
module.exports = router;

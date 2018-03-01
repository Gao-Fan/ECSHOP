var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
	goods_name   :  String,
	goods_sn     :  String,
	cat_id       :  String,
	shop_price   :  String,
	goods_img    :  String,
	create_data  :  {type:Date,default:Date.now}
})
var GoodsModel = mongoose.model("goods",Goods);
module.exports = GoodsModel;
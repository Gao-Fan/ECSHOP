var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Cart = new Schema({
	brand         :  String,
	images        :  String,
	name          :  String,
	origin_sale_price  :  String,
	product_id    :  String,
	sale_price    :  String,
	specification_name:String,
	spu           :  String,
	create_data   :  {type:Date,Default:Date.now}
});
var CartModel = mongoose.model("cart",Cart);
module.exports = CartModel;
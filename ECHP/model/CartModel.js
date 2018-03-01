var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Cart = new Schema({
	goods_name   :  String,
	count        :  String,
	create_data  :  {type:Date,Default:Date.now}
});
var CartModel = mongoose.model("cart",Cart);
module.exports = CartModel;
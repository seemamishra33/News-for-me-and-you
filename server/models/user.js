var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	_article: [{type: Schema.Types.ObjectId, ref:'Article'}],
	_comment: [{type: Schema.Types.ObjectId, ref:'Comment'}],
	name:{type:String}, 
	phone_number:{type:Number}
	},{timestamps:true})

var User = mongoose.model('User', UserSchema);


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new mongoose.Schema({
	_post: [{type: Schema.Types.ObjectId, ref:'Post'}],
	_user: [{type: Schema.Types.ObjectId, ref:'User'}],
	description: {type:String},
}, {timestamps:true})


	
var Comment = mongoose.model('Comment', CommentSchema);
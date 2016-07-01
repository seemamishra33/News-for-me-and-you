var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
	_user: {type: Schema.Types.ObjectId, ref:'User'},
	_article: {type: Schema.Types.ObjectId, ref:'Article'},
	_comment: [{type: Schema.Types.ObjectId, ref:'Comment'}],
	description: {type:String}
    }, {timestamps:true})
	
var Post = mongoose.model('Post', PostSchema);
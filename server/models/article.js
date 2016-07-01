var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = new mongoose.Schema({
	current_user:{type:String},
	tagged_user:{type:String},

	description: {headline:{type:String}, pub_date:{type:String},snippet:{type:String},abstract:{type:String},url:{type:String}},
	_post: [{type: Schema.Types.ObjectId, ref:'Post'}],
	done: false,
	created_at:{type: Date, default: Date.now}

    })
	
var Article = mongoose.model('Article', ArticleSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TopicSchema = new mongoose.Schema({
	_post: [{type: Schema.Types.ObjectId, ref:'Post'}],
	_user: [{type: Schema.Types.ObjectId, ref:'User'}],
    name:{type:String},
	description: {type:String},
	category: {type:String}
    }, {timestamps:true})
	
var Topic = mongoose.model('Topic', TopicSchema);
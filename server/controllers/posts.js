  var mongoose = require('mongoose');
  var Article = mongoose.model('Article');
  var Post = mongoose.model('Post');

  module.exports = (function(app) {
  	return{
  		// index: function(req, res){
    //     console.log(req.params.id)
  		// 	Post.find({_topics:req.params.id}).populate('_topics').populate('_users').exec(function(err, posts){

	  	// 		if(err){
	  	// 			console.log(err);
	  	// 		} else {
    //         // console.log("posts in or  are", posts)
	  	// 			res.json(posts);
	  	// 		}
  		// 	});
  		// },
      // addPost: function(req, res) {
      //       var post = new Post({ description: req.body.description, _user: req.body._user, _article: req.body._article});
      //       post.save(function(err){
      //         if(err){
      //           console.log(err)
      //         } else{
      //           var x = post._id;
      //               Article.update({_id:req.body._article}, {$push: {_post:x}}, function(err, articles){
      //                                     if(err){
      //                                         console.log(err);
      //                                         console.log('\nError updating the post with article');
      //                                       } else {
      //                                         console.log('\nSuccess updating the post with article', articles);

      //                                         res.redirect('/get_one_article')
      //                                       }
      //         })
      //         }
      //      });
      //     },

      
    }
  })();
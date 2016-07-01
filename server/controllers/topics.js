  var mongoose = require('mongoose');
  var Topic = mongoose.model('Topic');
  var Post = mongoose.model('Post');


  module.exports = (function(app) {
  	return{
  		index: function(req, res){
  			Topic.find({}).populate('_user').exec(function(err, topics){
	  			if(err){
	  				console.log(err);
	  			} else {
            // console.log("topics are", topics[0]._users[0].name)
	  				res.json(topics);
	  			}
  			});
  		},
      get_one_topic: function(req, res){
        // console.log("topic id must be:", req.params.id)
        console.log("All req", req.body.id);
        Topic.find({_id:req.body.id})
            .populate('_user')
            //topic user
            .populate({path: '_post',
                        populate: {path: '_user'}})
            //post user
            .exec(function(err, topic){
          if(err){
            console.log(err);
          } else {
            // console.log("topics are", topic)
            res.json(topic);
          }
        });
      },

      addPost: function(req, res){
        // console.log("topic id must be:", req.params.id)
        // console.log("All req", req.body.id);
        var post = new Post({description: req.body.description, _user: req.body._user, _topic: req.body._topic});
        post.save(function(err){
                  if(err){
                    console.log(err)
                  } else{
                    // Post.find({}).populate('_user').exec(function(err, topics){
                    console.log('Data saved successfully');
                    //   res.json(topics);
                   var y = post._id
                   console.log("this hsould be y", y, req.body._topic)
        

                            Topic.findOne({_id:req.body._topic}).exec(function(err, topics){
                              if(err){
                                console.log(err);
                              } else {
                                // console.log("topics are", topics[0]._users[0].name)
                                console.log("after the querty", topics);
                              }
                            })
                            console.log(req.body._topic,'req.body._topic')
                            Topic.update({_id:req.body._topic}, {$push: {_post: y}} , function(err, topic){
                              //ALSO INCLUDE FUNCTION!!!!
      
                                            if(err){
                                              console.log(err);
                                              console.log('\nError updating the topic');
                                            } else {
                                              console.log('\nSuccess updating the topic', topic);
                                              Post.find({_topic:req.body._topic}, function(err, posts){
                                                    if(err){
                                                      console.log(err);
                                                    } else {
                                                        res.json(posts)
                                                    }
                                              })
                                            }
                        })
                    // })
                       
                  }
            });
      },

      post: function(req, res) {

            var topic = new Topic({name: req.body.name, description: req.body.description, category: req.body.category, _user: req.body._user});
            topic.save(function(err){
              if(err){
                console.log(err)
              } else{
                Topic.find({}).populate('_user').exec(function(err, topics){
                // console.log('Data saved successfully');
                  res.json(topics);
                })
                   
              }
        });
      },

      
    }
  })();
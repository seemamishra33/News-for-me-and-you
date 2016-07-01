  var mongoose = require('mongoose');
  var Article = mongoose.model('Article');
  var User = mongoose.model('User');
  var Post = mongoose.model('Post');
  var client = require('twilio')('AC09b80b881d60aa874313f1dc1a4e54ae',
  'ed9dba1580891bdf4d73af926c4a5fbc');


  module.exports = (function(app) {
  	return{
  		index: function(req, res){
          User.find({}).populate('_article').exec(function(err, users){
            if(err){
              console.log(err)
            } else {
              res.json(users)
              // console.log("users from backend", users)
            }
            
          })
  		
  		},


      get_all_articles_per_user: function(req, res){
        User.findOne({_id:req.body.id}, function(err, user){
          if(user==null){
            console.log(err)
            res.redirect('/')
          } else {
            // console.log("combined, user", user.name)
            Article.find({current_user:user.name}, function(err, articles){
              // console.log("combined, articles", articles)
              var y = articles;
              Article.find({tagged_user:user.name}, function(err, articles1){
                if(articles1.length!=0){
                  y.push(articles1[0]);
                } else {
                  res.json(y);
                }
              })
            })
          }
        })
      },


      get_one_article: function(req, res){
        // console.log("topic id must be:", req.params.id)
        console.log("All req", req.body.id);
        Article.find({_id:req.body.id})
            .populate({path: '_post', 
                          populate:{path: '_user'}})
            //topic user
            // .populate({path: '_post',
            //             populate: {path: '_user'}})
            //post user
            .exec(function(err, article){
          if(err){
            console.log(err);
          } else {
            // console.log("topics are", topic)
            res.json(article);
            // console.log("from backend article", article)
          }
        });
      },

      addArticle: function(req, res){
        console.log("Article from front end:", req.body)
        // console.log("All req", req.body.id);
        var article = new Article({description: req.body.description, current_user: req.body.current_user, tagged_user: req.body.tagged_user});
        article.save(function(err){
                  if(err){
                    console.log(err)
                  } else{
                    var x = article._id;
                    User.update({name:article.current_user}, {$push: {_article:x}}, function(err, users){
                                          if(err){
                                              console.log(err);
                                              console.log('\nError updating the user with article');
                                            } else {
                                              console.log('\nSuccess updating the user with article', users);
                                            }

                    })
                    User.update({name:article.tagged_user}, {$push: {_article:x}}, function(err, users){
                      if(err){
                          console.log(err);
                          console.log('\nError updating the user with article');
                        } else {
                          console.log('\nSuccess updating the user with article', users);
                         // module.exports.sendMsg(req,res)
                        }

                  })
                }
              })


      },

    update: function (req, res){
    User.findOne({_id:req.body.id2}, function(err, user){
      console.log("R U EVEN GIVING USER BACK???", user)
      if(err){
        console.log(err)
      } else{


     Article.findOne({_id:req.body.id1}, function(err, article){
        console.log("lets see the article", article.current_user, user.name)
        if(article.length!=0){
                  if (article.current_user==user.name ){
          
                            if (article.done){
                                   Article.update({_id:req.body.id1}, {$set:{done:false}}, function(err, article){
                                        
                                          if(err){
                                            console.log(err);
                                            console.log('\nError updating the article');
                                          } else {
                                            console.log('\nSuccess updating the article');
                                            // res.redirect('/articles');
                                          }
                                      })
                            }
                            else{
                                   Article.update({_id:req.body.id1}, {$set:{done:true}}, function(err, article){
                            
                                                  if(err){
                                                    console.log(err);
                                                    console.log('\nError updating the article');
                                                  } else {
                                                    console.log('\nSuccess updating the article');
                                                    // res.redirect('/lists');
                                                  }
                                              })
                                }
        
                      } else {
                      console.log("Article doesnt exist", err)
                      res.json(user)
                      } 
        } else{
        console.log("Article doesnt exist", err)
        res.json(user)
        } 
     })
   }

    })

    },
    
    getPosts:function(req, res){
      Post.find({_article:req.body.id}).populate('_user').exec(function(err, posts){
        if (err){
          console.log(err, "while sending posts")
        } else {

          res.json(posts)
        }
      })
    },

    addPost: function(req, res) {
            var post = new Post({ description: req.body.description, _user: req.body._user, _article: req.body._article});
            post.save(function(err){
              if(err){
                console.log(err)
              } else{
                var x = post._id;
                    Article.update({_id:req.body._article}, {$push: {_post:x}}, function(err, articles){
                                          if(err){
                                              console.log(err);
                                              console.log('\nError updating the post with article');
                                            } else {
                                              // console.log('\nSuccess updating the post with article', articles);
                                              Post.find({_article:req.body._article}).populate('_user').exec(function(err, posts){
                                                // console.log("R THESE POSTS TRUE", posts)

                                                res.json(posts)
                                              })
                                            }
        })
        }
     });
    },
    sendMsg: function(req, res){
        User.findOne({name:req.body.tagged_user}, function(err, user){
            if(err){
                console.log(err)
            } else {
                var x = user.phone_number
                console.log("finally phone no", x)
    }
    console.log("req from module export is", req.body)
     // var text = req.body.headline;
    //  console.log("From sendmsg", req);
     client.sendMessage({
       to: '+1'+x,   // tageed user phone number
       from: '+16502296283',
       body: "Hey you have news:" + " " + req.body.description.headline,  //body message of common message that I have added news for you
     })
 })
   },

      
    }
  })();
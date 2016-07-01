  var mongoose = require('mongoose');
  var User = mongoose.model('User');

  module.exports = (function(app) {
  	return{

  		show: function(req, res){
  			User.find({}, function(err, users){
	  			if(err){
	  				console.log(err);
	  			} else {
            // console.log("bizzare things:", users)
	  				res.json(users);
	  			}
  			});
  		},
      get_current_user: function(req, res){
        User.find({_id:req.body.id}, function(err, user){
          if(err){
            console.log(err);
          } else {
            // console.log("bizzare things:", users)
            res.json(user);
          }
        });
      },

      get_clicked_user: function(req, res){
        User.find({_id:req.body.id}, function(err, user){
          if(err){
            console.log(err);
          } else {
            // console.log("bizzare things:", users)
            res.json(user);
          }
        });
      },

      post: function(req, res) {
        console.log('I am in users ctrls', req.body)
        User.findOne({name:req.body.name}, function(err, user){
            if (user){
              console.log("user already exist")
              res.json(user);
            }
            else{
              var user = new User({name: req.body.name});
              console.log("user id should be", {id:user._id})
              user.save(function(err){
                if(err){
                  console.log(err)
                } else{
                  console.log('Data saved successfully', user);
                    res.json(user);
                    }
          })
        }
          });    
    },

      
    }
  })();
  var posts = require('./../controllers/posts.js');
  // var topics = require('./../controllers/topics.js');
  var users = require('./../controllers/users.js');
  var articles = require('./../controllers/articles.js');
  
  module.exports = function(app) {
    
  	app.get('/users', function(req, res){
  		users.show(req, res);
    });

  	app.post('/addUser', function(req, res){  
  		users.post(req, res);
  	});
    
    app.get('/articles', function(req, res){
      articles.index(req, res);

    });

    app.post('/addArticle', function(req, res){ 
      articles.addArticle(req, res);
    });

    app.post('/get_all_articles_per_user', function(req, res){ 
      articles.get_all_articles_per_user(req, res);
    });
    
    app.post('/get_one_article', function(req, res){
      articles.get_one_article(req, res);
    });

    app.post('/get_current_user', function(req, res){
      users.get_current_user(req, res);
    });

    app.post('/updateArticle', function(req, res){
      // console.log("Am i  in updates?")
      articles.update(req, res);
    });

    app.post('/addPost', function(req, res){ 
      articles.addPost(req, res);
    });

    app.post('/getPosts', function(req, res){ 
      articles.getPosts(req, res);
    });

    app.post('/get_clicked_user', function(req, res){ 
      users.get_clicked_user(req, res);
    });

  	// app.post('/deleteCustomer', function(req, res){
  	// 	console.log("body is", req.body.name);
  	// 	customers.delete(req, res);
  	// });

   //  app.get('/orders', function(req, res){
   //    orders.index(req, res);
   //  });
   //  app.post('/addOrder', function(req, res){
   //    orders.post(req, res);
   //  });
   //  app.post('/deleteOrder', function(req, res){
   //    console.log("body is", req.body.name);
   //    orders.delete(req, res);
    // });
 }

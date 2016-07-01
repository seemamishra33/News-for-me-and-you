		msg_dashboard_app.factory('APIFactory', function($http) {
			var factory = {};
			var articles = [];
			//Restful syntax: index = get all that object
			factory.index = function(callback) {
				$http.get('/articles').success(function(output){
					console.log("We r in article factory", output)
					articles = output;
					callback(articles);
				});
			}

			factory.get_current_user = function(id, callback){
				$http.post('/get_current_user', {id:id}).success(function(output){
						// console.log("current_user in userFactory is", output)
						callback(output)	
						});	
			}

			factory.create = function(info) {
				console.log("info for adding article ?????? is", info)
				$http.post('/addArticle', info).success(function(){
					// articles = output;
					// console.log('Topic added', articles);
					// callback(articles);
					});
				
			}

			factory.get_clicked_user = function(id, callback){
				$http.post('/get_clicked_user', {id:id}).success(function(output){
					callback(output);
				});
			}

			factory.get_one_article = function(id, callback) {
				$http.post('/get_one_article', {id:id}).success(function(output){
				console.log("checking post user name?", output)
					article = output;
					callback(article);
				});
			}


			factory.get_all_articles_per_user = function(id, callback){
				$http.post('/get_all_articles_per_user', {id:id}).success(function(output){

					callback(output);
				})

			}

			factory.update = function(id){
					console.log("done updating", id);
				$http.post('/updateArticle', id).success(function(){	

						});	

			}


				return factory;
		});
 
		msg_dashboard_app.factory('PostFactory', function($http) {
			var factory = {};
			var posts = [];

			factory.index = function(id, callback) {
				$http.get('/posts'+id).success(function(output){
					posts = output;
					callback(posts);
				});
			}

			factory.create = function(info, callback) {
				$http.post('/addPost', info).success(function(output){	
					callback(output)
					console.log('Post added', output);
					});
			}

			factory.add = function(info) {
				$http.post('/addComment', info).success(function(){	
					console.log('Comment added');
					});
				
			}

			factory.getPosts = function(id, callback){
				$http.post('/getPosts', {id:id}).success(function(output){
				console.log("checking posts?", output)
					callback(output);
				});
			}
			

				return factory;
		});
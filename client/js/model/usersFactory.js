	
	
		msg_dashboard_app.factory('UserFactory', function($http) {
			var factory = {};
			var users = [];

			factory.index = function(callback) {

				$http.get('/users').success(function(output){

					users = output;
					
					callback(users);
				});

			}


			factory.get_current_user = function(id, callback){
				$http.post('/get_current_user', {id:id}).success(function(output){
						// console.log("current_user in userFactory is", output)
						callback(output)	
						});	
			}

			factory.create = function(info, callback) {
				$http.post('/addUser', info).success(function(output){	
					// console.log("Output should be", output)
						current_user = output;						
						callback(current_user);
					});	
			}

				return factory;
		});
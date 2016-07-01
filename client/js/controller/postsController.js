
		msg_dashboard_app.controller('postsController', function($scope, APIFactory, UserFactory, PostFactory,  $routeParams){
		  	// console.log('We are using posts controller', $routeParams.id);

		  		// TopicFactory.get_one_topic($routeParams.id, function(current_topic){
		  		// 	$scope.topic= current_topic;
		  		// 	// console.log("topic is:", $scope.topic )
		  		// });

				UserFactory.get_current_user($routeParams.id2, function(data){
				  		console.log('CUREENT USER SHOULD BE', data);

				  		$scope.current_user = data;
				  	});



			  	PostFactory.index($routeParams.id, function( data){
			  
			  		$scope.posts = data;
			  		console.log("posts for one topic",$scope.posts)
			  	});
				
				$scope.addPost = function(){

		  		  	console.log("from post controller CHECKING current user ID2", $routeParams.id2)
					console.log("from post controller CHECKING article ID1", $routeParams.id1)
			  		// console.log("R we in posts controller");
			  		// console.log("topic_id:",$routeParams.id);
			  		$scope.new_post._user = $routeParams.id2;
			  		$scope.new_post._article = $routeParams.id1;
			  		PostFactory.create($scope.new_post, function(data){
			  			$scope.posts= data;
			  		});
			  			$scope.new_post={};
		  		}
		  		

		  		PostFactory.getPosts($routeParams.id1, function(data){
		  			$scope.posts = data;
		  		})

		 })
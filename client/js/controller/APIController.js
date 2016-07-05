
msg_dashboard_app.controller('APIController', function($scope, $http, $location, $routeParams, UserFactory, APIFactory, $sce){

		      $scope.myVar = false;
		      $scope.toggle1 = function() {
		        $scope.myVar = !$scope.myVar;
		    };




		    $scope.myVar1 = false;
		    $scope.toggle = function() {
		        $scope.myVar1 = !$scope.myVar1;
		    };


		UserFactory.get_current_user($routeParams.id, function(data){
		  		console.log('CUREENT USER SHOULD BE', data);

		  		$scope.current_user = data;
		});

		APIFactory.get_current_user($routeParams.id2, function(data){
		  		console.log('CUREENT USER SHOULD BE', data);

		  		$scope.current_current_user = data;
		  	});


		APIFactory.get_all_articles_per_user($routeParams.id1, function(data){
			$scope.articles=data

		});


		APIFactory.get_clicked_user($routeParams.id1, function(data){
			$scope.clicked_user= data
		});
 	
		$scope.enterQuery = function(){

		  		// console.log("first console from api_cntrlr", $scope.api_search.query);
		  		var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+$scope.api_search.query+"&api-key=d1fa62bac7e044709d5db4adeaad08d8"

		  		$http.get(url).then(function(data){
		  			$scope.docs = data.data.response.docs
		  			// console.log(data.data.response.docs)

		  		})
		  		$scope.api_search = {}


		 }

		$scope.enterQuery2 = function(){

		  		console.log("first console from api_cntrlr", $scope.api_search2.query);
		  		var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+$scope.api_search2.query+"&begin_date="+$scope.api_search2.time+"1212&sort=oldest&api-key=d1fa62bac7e044709d5db4adeaad08d8"

		  		$http.get(url).then(function(data){
		  			$scope.docs = data.data.response.docs
		  			// console.log(data.data.response.docs)

		  		})
		  		$scope.api_search= {};



		 }
		
		UserFactory.index(function(data){
		  		$scope.users = data;
		  	});

		$scope.enterArticle = function(doc){

		 	var article = {};
		 	for (index in $scope.docs){
		 		$scope.docs.splice($scope.docs.indexOf(doc), 1);
		 	}
		    angular.forEach($scope.docs, function (currentdoc) {
	       		 currentdoc.showfull = currentdoc === doc && !currentdoc.showfull;
	  		  		});


		 	article.description = {
		 		headline : doc.headline.main,
		 		snippet :doc.snippet, 
		 		abstract: doc.abstract,
		 		pub_date: doc.pub_date,
		 		url : doc.web_url
		 	}
		 	article.current_user = $scope.current_user[0].name
		 	article.tagged_user= doc.tagged_user
		 	console.log("article should be", article.description)
		 	APIFactory.create(article) 

		 }
		
		$scope.go_to_dashboard = function(){
		 	$location.url('/dashboard/'+$scope.current_user[0]._id)
		 }

	  	APIFactory.index(function(data){
	  			console.log('looking for article.length', data);
	  		$scope.users = data;
	  		$scope.current_user_id = $routeParams.id2
				// console.log("url should look like", data[0]._article[0].description.url)

	  	});

	 //  	console.log("CHECKING ID2", $routeParams.id2)
		// console.log("CHECKING article ID1", $routeParams.id1)

	  	APIFactory.get_one_article($routeParams.id1, function(data){
	  			// console.log('We are using articles controller for get one article FOR POST', data);
	  		$scope.article = data;


	  	});
  		



	  	$scope.changeStatus = function(id1, id2){
		  		id={id1:id1, id2:id2}
		  		console.log('going for update', id)
		  		APIFactory.update(id, function(){
		  			console.log('going for update', id)
		  		});
		  	}	





})

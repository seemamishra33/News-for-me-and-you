
    msg_dashboard_app.config(function ($routeProvider) {
      
      $routeProvider

            .when('/',{
                templateUrl: './../partials/view1.html',
            })
            .when('/search/:id',{
                templateUrl: './../partials/search.html',
            })
            .when('/dashboard/:id',{
                templateUrl: './../partials/dashboard.html',

            })
            .when('/article/:id1/:id2',{
                templateUrl: './../partials/topic.html',
            })
            .when('/user/:id1/:id2',{
                templateUrl: './../partials/user.html',
            })
            .otherwise({
              redirectTo: '/'
            });
    });
var angularApp = angular.module('angularApp',['ui.bootstrap','ui.router', 'ngCookies']).run(function($rootScope){
      $rootScope.userAgent = navigator.userAgent;
      
      // Needed for the loading screen
      $rootScope.$on('$locationChangeStart', function(){
        $rootScope.loading = true;
      });

      $rootScope.$on('$locationChangeSuccess', function(){
        $rootScope.loading = false;
      });

      // Fake text i used here and there.
      $rootScope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

});

angularApp.config(function($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/main.html",
      controller: 'MainCtrl',
    })
    .state('about', {
      url: "/about",
      templateUrl: "views/about.html",
      controller: 'AboutCtrl',
    })
    // For any unmatched url, redirect to /state1
     $urlRouterProvider.otherwise("/");

});

angularApp.factory('appSession', function($http){
    return {
        type: function(type) {
            return $http.post('/services', { 
                type : 'type'
            });
        }
    }
});

//Main Controller for body, handles loading and unloading along with preloader gif
angularApp.controller('MainController', function($rootScope, $scope){

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  
  // Needed for the loading screen
  $rootScope.$on('$locationChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$locationChangeSuccess', function(){
    $rootScope.loading = false;
  });

  // Fake text i used here and there.
  $rootScope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

});


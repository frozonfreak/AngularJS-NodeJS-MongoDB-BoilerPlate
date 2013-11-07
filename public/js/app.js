var smApp = angular.module('smApp',['ui.bootstrap','ui.router']);

smApp.config(function($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: "appController",
    })
    .state('404', {
      url: "/404",
      templateUrl: "404.html",
      controller: 'app404Controller',
    })
    // For any unmatched url, redirect to /state1
     $urlRouterProvider.otherwise("/");

});
//Handle all HTTP calls to server
smApp.factory('appSession', function($http){
    return {
        sessionName: function(type) {
            return $http.post('/services', { 
                type : 'typeID'
            });
        }
    }
});

//Handle shared data between controllers
smApp.service('sharedValues', function () {
    //Store selected session details
    var sessionVal;
    

    return {
            //Get and Set Session Values
            getSession: function () {
                return sessionVal;
            },
            setSession: function(value) {
                sessionVal = value;
            }
        };
});

//controller
smApp.controller('appController', function($scope, appSession,sharedValues){
	$scope.alerts = [];
	$scope.searchText;
	$scope.URLText = "hello";
  $scope.displayError = function(data, status){
      console.log("Error");
  };
  $scope.displaySuccess = function(data, status){
      console.log(data);
  };
  $scope.sendToServer = function(){
    appSession.sessionName($scope.URLText).success($scope.displaySuccess).error($scope.displayError);
  };
  	//Initializer
	init();
	function init(){
	};
	
});

//404 Controller
smApp.controller('app404Controller', function($scope){

});

//Active Menu Check
angular.module('smApp').run(function($http, $rootScope, $location) {

//Active menu
 $rootScope.isActive = function (viewLocation) {
        console.log($location.path());
        return viewLocation === $location.path();
 };

});
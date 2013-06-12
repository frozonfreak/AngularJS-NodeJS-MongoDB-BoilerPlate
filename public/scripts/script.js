
var appName = angular.module('appName',['ui.bootstrap','ui.keypress']);

//Routing
appName.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'homeController',
                templateUrl: 'partials/home.html'
            })
        .otherwise({ redirectTo: '/' });
});

//Handle all HTTP calls to server
appName.factory('appSession', function($http){
    return {
        sessionName: function() {
            return $http.post('/services', { 
                type : 'typeID'
            });
        }
    }
});



//Handle shared data between controllers
appName.service('sharedValues', function () {
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

appName.controller('homeController',function($scope,$location,$timeout,appSession, sharedValues){
    $scope.varName;
    
   
    //Initializer
    init();
    function init(){
       
    };
   

});

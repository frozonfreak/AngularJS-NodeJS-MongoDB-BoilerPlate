'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, appSession) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.displayError = function(data, status){
        console.log("Error");
    };
    //Success function executed after succesfull POST request to server
    $scope.displaySuccess = function(data, status){
        console.log(data);
    };
    $scope.invokeAction = function(){
      appSession.type().success($scope.displaySuccess).error($scope.displayError);
    };
    
  });

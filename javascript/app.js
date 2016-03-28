(function (){
	var app = angular.module('yutrippin', ['uiGmapgoogle-maps']);
	app.controller('TrippinController', function($scope){
    $scope.query = '';
    $scope.search = function(query) {
      $scope.query = query;
    }
	});



})();
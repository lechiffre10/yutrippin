(function (){
	var app = angular.module('yutrippin', ['uiGmapgoogle-maps']);
  app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'geometry'
      });
  })

  app.controller('TrippinController', function($scope, uiGmapGoogleMapApi){
    $scope.query = '';
    $scope.search = function(query) {
      $scope.query = query;
    }
  });




})();
(function (){
	var app = angular.module('yutrippin', ['uiGmapgoogle-maps', 'ngRoute']);
  app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
           key: '',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'geometry'
      });
  })

  app.controller('TrippinController', function($scope, $http, uiGmapGoogleMapApi){
    $scope.auth = window.location.hash.split('=')[1];
    $scope.query = '';
    $scope.search = function(query) {
      $scope.query = query;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': query}, function(results){
        $scope.lat = results[0].geometry.location.lat();
        $scope.lon = results[0].geometry.location.lng();
        alert($scope.lat);
        alert($scope.lon);
        alert($scope.auth);
      })
    }

    $scope.instagram = function() {
      var url = 'https://api.instagram.com/oauth/authorize/?client_id=&redirect_uri=http://127.0.0.1:8080/&response_type=token';
      window.location.replace(url);
    }
  })
})();
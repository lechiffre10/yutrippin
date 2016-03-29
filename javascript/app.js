(function (){
	var app = angular.module('yutrippin', ['uiGmapgoogle-maps']);
  app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
           key: 'AIzaSyAPgT3-JSaNBQ8cwyogdN1NeMRTmseoLDM',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'geometry'
      });
  })

  app.controller('TrippinController', function($scope, uiGmapGoogleMapApi){
    $scope.query = '';
    $scope.search = function(query) {
      $scope.query = query;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': query}, function(results){
        $scope.lat = results[0].geometry.location.lat();
        $scope.lon = results[0].geometry.location.lng();
        alert($scope.lat);
        alert($scope.lon);
      })
    }
  })
})();
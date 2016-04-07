(function (){
	var app = angular.module('yutrippin', ['uiGmapgoogle-maps', 'ngRoute', 'angularSoundManager']);
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
    $scope.instaPics = [];
    $scope.search = function(query) {
      $scope.query = query;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': query}, function(results){
        $scope.lat = results[0].geometry.location.lat();
        $scope.lon = results[0].geometry.location.lng();
      })
      $scope.soundcloud();
      $scope.fetchPhotos();
    }
    $scope.instagram = function() {
      var url = 'https://api.instagram.com/oauth/authorize/?client_id=&redirect_uri=http://127.0.0.1:8080/&response_type=token';
      window.location.replace(url);
    }
    $scope.fetchPhotos = function(){
      $http.jsonp('https://api.instagram.com/v1/tags/chi/media/recent?access_token='+ $scope.auth + '&callback=JSON_CALLBACK').then(function(response){
        $scope.instaPics = response.data.data.filter(function(type){
          return type.type == "image";
        })
        $scope.instaPics = $scope.instaPics.map(function(image){
         return image.images.standard_resolution.url;
       })
      })
    }
    $scope.soundcloud = function (){
      $http.get('http://api.soundcloud.com/tracks?client_id=&tag_list=' + $scope.query +'&q=' + $scope.query).then(function(response){
            $scope.sounds = response.data.map(function(song){
            return {
            id: song.id,
            title: song.title,
            artist: song.user.username,
            url: song.stream_url + '?client_id='
            }
        });
      })
    }
    $scope.playTrack = function(index){
      soundManager.pauseAll();
      window.sm2BarPlayers[0].actions.play(index);
    }
  })
})();
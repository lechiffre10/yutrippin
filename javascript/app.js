(function (){
	var app = angular.module('yutrippin', ['ngRoute', 'angularSoundManager', 'infinite-scroll']);


  app.controller('TrippinController', function($scope, $http){
    $scope.query = '';

    $scope.search = function(query) {
      $scope.currentPlaying = {};
      $scope.mixTitle = query;
      $scope.soundcloud();
      $scope.fetchPhotos();
      $scope.query = '';
    }

    $scope.fetchPhotos = function(){
      $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photos.search&text=-virtual -mesh vscocam '+ $scope.query +' -SL&format=json&jsoncallback=JSON_CALLBACK&api_key=&sort=interestingness-desc').then(function(response){
        $scope.flickrPics = response.data.photos.photo;
        $scope.flickrPics = $scope.flickrPics.map(function(image){
         return 'https://farm'+ image.farm +'.staticflickr.com/'+ image.server + '/' + image.id + '_' + image.secret +'.jpg';
       })
        $scope.page = 1;
      //   $scope.slicedPics = [];

      //   while($scope.flickrPics.length) {
      //     $scope.slicedPics.push($scope.flickrPics.splice(0,6));
      //   }
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

    $scope.loadMore = function() {
      if($scope.flickrPics){
        $scope.page += 1;
        $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photos.search&text=-virtual -mesh vscocam '+ $scope.mixTitle +' -SL&format=json&jsoncallback=JSON_CALLBACK&api_key=&sort=interestingness-desc&page=' + $scope.page).then(function(response){
          var newPics = response.data.photos.photo;
          newPics = newPics.map(function(image){
           return 'https://farm'+ image.farm +'.staticflickr.com/'+ image.server + '/' + image.id + '_' + image.secret +'.jpg';
         })
          $scope.flickrPics = $scope.flickrPics.concat(newPics);
        })
      }
    }
  })
})();
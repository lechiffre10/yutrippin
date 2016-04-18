(function (){
	var app = angular.module('yutrippin', ['ngRoute', 'angularSoundManager','firebase']);


  app.controller('TrippinController', function($scope, $http,$firebaseArray){
    var hipHopRef = new Firebase('https://amber-inferno-3199.firebaseio.com/hiphop');
    var popRef = new Firebase('https://amber-inferno-3199.firebaseio.com/Pop');
    var electronicRef = new Firebase('https://amber-inferno-3199.firebaseio.com/electronic');
    var chilloutRef = new Firebase('https://amber-inferno-3199.firebaseio.com/Chillout');

    $scope.query = '';
    $scope.mood = '';
    $scope.changed = true;
    $scope.sounds = $firebaseArray(hipHopRef);


    $scope.search = function(query) {
      $scope.fetchPhotos();
      $scope.query = '';
      $scope.playing = true;
    }

    $scope.fetchPhotos = function(){
      $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photos.search&text=-virtual -mesh vscocam '+ $scope.query +' -SL&format=json&jsoncallback=JSON_CALLBACK&api_key=&sort=interestingness-desc').then(function(response){
        $scope.flickrPics = response.data.photos.photo;
        $scope.flickrPics = $scope.flickrPics.map(function(image){
         return 'https://farm'+ image.farm +'.staticflickr.com/'+ image.server + '/' + image.id + '_' + image.secret +'.jpg';
       })
      })
    }

    $scope.update = function(){
      $scope.changed = true;
       if($scope.mood === '' || $scope.mood === 'hiphop'){
        $scope.sounds = $firebaseArray(hipHopRef);
      } else if($scope.mood === 'pop'){
        $scope.sounds = $firebaseArray(popRef);
      } else if($scope.mood === 'electronic'){
        $scope.sounds = $firebaseArray(electronicRef);
      } else{
        $scope.sounds = $firebaseArray(chilloutRef);
      }
    }
  });

  app.directive('modalGallery', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/blueimp-gallery.html'
    }
  })

  app.directive('soundmanagerContainer', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/soundmanager.html'
    }
  })
})();
(function (){
	var app = angular.module('yutrippin', ['ngRoute', 'angularSoundManager','firebase', 'wu.masonry', 'infinite-scroll']);


  app.controller('TrippinController', function($scope, $http, $firebaseArray, $q, $timeout){
    var hipHopRef = new Firebase('https://amber-inferno-3199.firebaseio.com/hiphop');
    var popRef = new Firebase('https://amber-inferno-3199.firebaseio.com/Pop');
    var electronicRef = new Firebase('https://amber-inferno-3199.firebaseio.com/electronic');
    var chilloutRef = new Firebase('https://amber-inferno-3199.firebaseio.com/Chillout');

    $scope.query = '';
    $scope.mood = '';
    $scope.changed = true;
    $scope.sounds = $firebaseArray(hipHopRef);


    $scope.search = function(query) {
      $scope.searchFunctions(query).then(function(){
        new AnimOnScroll( document.getElementById( 'grid' ), {
          minDuration : 0.4,
          maxDuration : 0.7,
          viewportFactor : 0.2
       } )
      })
    }

    $scope.searchFunctions = function(query) {
      var deferred = $q.defer();

      $scope.mixTitle = query;
      return $scope.fetchPhotos().then(function(success) {
        $scope.query = '';
        $scope.playing = true;

        $timeout(function(){
          deferred.resolve();
         },10);
        return deferred.promise;
        })
    }

    $scope.fetchPhotos = function(){
      var deferred = $q.defer();

      $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photos.search&text=-virtual -mesh vscocam '+ $scope.query +' -SL&format=json&jsoncallback=JSON_CALLBACK&api_key=&sort=interestingness-desc').then(function(response){
        $scope.flickrPics = response.data.photos.photo;
        $scope.flickrPics = $scope.flickrPics.map(function(image){
         return 'https://farm'+ image.farm +'.staticflickr.com/'+ image.server + '/' + image.id + '_' + image.secret +'.jpg';
       })
        $scope.page = 1;
        $timeout(function() {
          deferred.resolve();
        }, 10)
      })
      return deferred.promise;
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

    $scope.loadMore = function() {
      if($scope.flickrPics){
        if($scope.isBusy === true) return; // request in progress, return
        $scope.isBusy = true;
        $scope.page += 1;
        $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.photos.search&text=-virtual -mesh vscocam '+ $scope.mixTitle +' -SL&format=json&jsoncallback=JSON_CALLBACK&api_key=&sort=interestingness-desc&page=' + $scope.page).then(function(response){
          var newPics = response.data.photos.photo;
          newPics = newPics.map(function(image){
           return 'https://farm'+ image.farm +'.staticflickr.com/'+ image.server + '/' + image.id + '_' + image.secret +'.jpg';
         })
          $scope.isBusy = false;
          $scope.flickrPics = $scope.flickrPics.concat(newPics);
          $timeout(function() {
              new AnimOnScroll( document.getElementById( 'grid' ), {
            minDuration : 0.4,
            maxDuration : 0.7,
            viewportFactor : 0.2
            } )
          }, 10)

        })
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


$(document).ready(function() {
  $('body').on('click', '.sm2-menu', function() {
    $('.sm2-playlist-drawer').toggleClass('open-drawer');
  })

  $('.demo').splitFlap({
    image: 'image/yutrippin.png',
    speed: 10
  });

  setTimeout(function() {
    $('.destination').splitFlap({
      image: 'image/yutrippin.png',
      speed: 10,
      text: 'Destination'
      })
  }, 5000)

  setTimeout(function() {
    $('.fly').splitFlap({
      image: 'image/yutrippin.png',
      speed: 10,
      text: 'Fly',
      textInit: 'Pick'
    })

    $('.away').splitFlap({
      image: 'image/yutrippin.png',
      speed: 10,
      text: 'Away',
      textInit: 'Your'
    })

    $('.destination').splitFlap({
      image: 'image/yutrippin.png',
      speed: 10,
      text: '           ',
      textInit: 'Destination'
    })
  }, 10000)

});
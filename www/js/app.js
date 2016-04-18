// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngAnimate'])

.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    $state.go('home');
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
  $ionicConfigProvider.views.transition('none');

  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'html/home.html',
    controller: 'HomeController'
  })
  .state('second', {
    url: '/second',
    templateUrl: 'html/second.html',
    controller: 'SecondController'
  })
  .state('second.alpha', {
    url: '/alpha'
  })
  .state('second.beta', {
    url: '/beta'
  });

  $urlRouterProvider.otherwise('home');
})

.factory('sequencer', function() {
    service = {};
    service.transitionEvents = function() {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        }
        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }
    return service
})

.controller('HomeController',function($scope,$state) {
  console.log('home',$scope,$state);
})

.controller('SecondController',function($scope,$state) {
  console.log('second',$scope,$state);
})

.directive('viewElement',function($state) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.viewEl = element[0];
      // if (angular.element(element).attr('nav-state') == 'undefined') {
      angular.element(element).attr('nav-state',$state.current.name);
      //
      console.log("viewElement",element);
    }
  }
})

.directive('viewTransition',function($state,$timeout) {
  return {
    restrict: 'A',
    link: function(scope,element,attrs) {
      //
      $timeout(function() {
        angular.element(element).attr('view-transition','');
      },0);
      /*
      scope.viewEl.addEventListener(sequencer.transitionEvents(), function(e) {
        if (e.target == scope.viewEl) {
          // angular.element(element).attr('nav-view','active');
        }
      });
*/
      // }
    }
  }
})

.directive('customSref',function($state, $timeout, sequencer) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // console.log("customSref",scope,attrs);
      // $state.go(attrs)
      angular.element(element).on('click',function(e) {
        angular.element(scope.viewEl).attr('view-transition','fade');
        $timeout(function() {
          console.log("timeout");
          $state.go(attrs.customSref);
        },250);
        scope.viewEl.addEventListener(sequencer.transitionEvents(), function(e) {
          if (e.target == scope.viewEl) {
            // $state.go(attrs.customSref);
            console.log("listener");
          }
        });
      });
    }
  }
});

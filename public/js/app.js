angular.module('candle', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('landing', {
        url: '/',
          views: {
            "main@": {
              controller: 'landingCtrl',
              templateUrl: './views/landing/landing.html'
          }
        }
  })
  .state('login', {
        url: '/login',
          views: {
            "main@": {
              controller: 'loginCtrl',
              templateUrl: './views/login/login.html'
          }
        }
  })
  .state('signUp', {
        url: '/signUp',
          views: {
            "main@": {
              controller: 'signUpCtrl',
              templateUrl: './views/signUp/signUp.html'
          }
        }
  })

  // use the HTML5 History API
        $locationProvider.html5Mode(true);
});

angular.module('candle', ['ui.router', 'satellizer', 'xeditable'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider){
  $urlRouterProvider.otherwise('/')

  var skipIfLoggedIn = ['$q', '$location', '$auth', function($q, $location, $auth) {
  var deferred = $q.defer();
  if ($auth.isAuthenticated()) {
    $location.path('/dashboard')
  } else {
    deferred.resolve();
  }
  return deferred.promise;
}];

  var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }];

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
  .state('cart', {
        url: '/cart',
          views: {
            "main@": {
              controller: 'cartCtrl',
              templateUrl: './views/cart/cart.html'
          }
        }
  })
  .state('shop', {
        url: '/shop',
          views: {
            "main@": {
              controller: 'shopCtrl',
              templateUrl: './views/shop/shop.html'
          }
        }
  })
  .state('checkout', {
        url: '/checkout',
          views: {
            "main@": {
              controller: 'checkoutCtrl',
              templateUrl: './views/checkout/checkout.html'
          }
        }
  })

  $authProvider.loginUrl = '/auth/login';
  $authProvider.signupUrl = '/auth/signup';

});

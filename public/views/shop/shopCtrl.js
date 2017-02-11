angular.module('candle').controller('shopCtrl', function($scope, $state, mainService, $auth, $rootScope){

  $scope.accountName = false;
  $scope.logoutBtn = false;
  $scope.loginBtn = true;
  $scope.signUpBtn = true;
  $rootScope.quantityBanner;
  $rootScope.addedBannerSingle = false;
  $rootScope.addedBannerMultiple = false;
  $rootScope.candleName;

  $scope.showLoginBox = function(){
    $scope.signUpDirective = false;
    $scope.loginDirective = true;
  }

  $scope.showSignUpBox = function(){
    $scope.loginDirective = false;
    $scope.signUpDirective = true;
  }

  if ($auth.isAuthenticated()){
    mainService.userData()
    .then(function(response){
      $scope.name = response[0].first_name
    })
    $scope.accountName = true;
    $scope.logoutBtn = true;
    $scope.loginBtn = false;
    $scope.signUpBtn = false;

    $scope.logout = function(){
      $auth.logout()
          .then(function() {
            console.log('You have been logged out');
            $state.go('landing');
      });
    }
  }

  mainService.getProducts()
  .then(function(response){
    $scope.candles = response
  })


})

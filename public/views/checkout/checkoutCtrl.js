angular.module('candle').controller("checkoutCtrl", function(mainService, $scope, $auth, $state){

  $scope.accountName = false;
  $scope.logoutBtn = false;
  $scope.loginBtn = true;
  $scope.signUpBtn = true;
  $scope.checkoutAuth = true;
  $scope.cart = false;

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
      console.log(response[0])
      $scope.name = response[0].first_name
    })
    $scope.accountName = true;
    $scope.logoutBtn = true;
    $scope.loginBtn = false;
    $scope.signUpBtn = false;
    $scope.checkoutAuth = false;
    $scope.cart = true;

    $scope.logout = function(){
      $auth.logout()
          .then(function() {
            console.log('You have been logged out');
            $state.go('landing');
      });
    }
  }





})

angular.module('candle').controller('landingCtrl', function($scope, mainService, $auth, $state){

  $scope.accountName = false;
  $scope.logoutBtn = false;
  $scope.loginBtn = true;
  $scope.signUpBtn = true;
  $scope.loginDirective = false;
  $scope.signUpDirective = false;

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

  $scope.logout = function(){
    $auth.logout()
        .then(function() {
          console.log('You have been logged out');
          $scope.accountName = false;
          $scope.logoutBtn = false;
          $scope.loginBtn = true;
          $scope.signUpBtn = true;
    });
  }
}

})

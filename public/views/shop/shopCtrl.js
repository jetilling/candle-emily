angular.module('candle').controller('shopCtrl', function($scope, $state, mainService, $auth){

  $scope.quantitySmall = 1
  $scope.quantityMedium = 1
  $scope.quantityLarge = 1
  $scope.accountName = false;
  $scope.logoutBtn = false;
  $scope.loginBtn = true;
  $scope.signUpBtn = true;

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
            $state.go('landing');
      });
    }
  }

  mainService.getProducts()
  .then(function(response){
    console.log(response);
  })

  $scope.changeQuantitySmall = function(type){
    if (type === "add"){
      $scope.quantitySmall+= 1;
    }
    else if (type === "sub" && $scope.quantitySmall > 1){
      $scope.quantitySmall-= 1;
    }
  }

  $scope.changeQuantityMedium = function(type){
    if (type === "add"){
      $scope.quantityMedium+= 1;
    }
    else if (type === "sub" && $scope.quantityMedium > 1){
      $scope.quantityMedium-= 1;
    }
  }

  $scope.changeQuantityLarge = function(type){
    if (type === "add"){
      $scope.quantityLarge+= 1;
    }
    else if (type === "sub" && $scope.quantityLarge > 1){
      $scope.quantityLarge-= 1;
    }
  }

})

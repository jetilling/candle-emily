angular.module('candle').controller("checkoutCtrl", function(mainService, $scope, $auth, $state){

  $scope.accountName = false;
  $scope.logoutBtn = false;
  $scope.loginBtn = true;
  $scope.signUpBtn = true;
  $scope.checkoutAuth = true;
  $scope.cart = false;
  $scope.checkoutCart = false;

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
      userId = response[0].id
      $scope.name = response[0].first_name
      token = document.cookie.split(';')[1].split('=')[1]

      mainService.addUserIdToCart(userId, token)
      .then(function(response){
        if(response){
          mainService.getUsersProducts(userId)
          .then(function(response){
            $scope.products = response.items;
            $scope.totalPrice = response.totalPrice;
          })
        }
      })

    })
    $scope.accountName = true;
    $scope.logoutBtn = true;
    $scope.loginBtn = false;
    $scope.signUpBtn = false;
    $scope.checkoutAuth = false;
    $scope.cart = true;
    $scope.checkoutCart = true;

  }

  $scope.logout = function(){
    $auth.logout()
        .then(function() {
          console.log('You have been logged out');
          $state.go('landing');
    });
  }




})

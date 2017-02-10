angular.module('candle').controller("checkoutCtrl", function(mainService, $scope, $auth, $state){

  $scope.accountName = false;
  $scope.logoutBtn = false;
  $scope.loginBtn = true;
  $scope.signUpBtn = true;
  $scope.checkoutAuth = true;
  $scope.cart = false;
  $scope.checkoutCart = false;
  $scope.selected = false;

  $scope.hide = function(){
    $scope.selected = false;
  }

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
      $scope.firstName = response[0].first_name;
      $scope.lastName = response[0].last_name;
      $scope.email = response[0].email;
      $scope.telephone = response[0].phone;
      $scope.address = response[0].address;
      $scope.city = response[0].city;
      $scope.state = response[0].state;
      $scope.zipcode = response[0].zipcode;
      $scope.country = response[0].country;
      token = document.cookie.split(';')[1].split('=')[1]

      mainService.addUserIdToCart(userId, token)
      .then(function(response){
        if(response){
          mainService.getUsersProducts(userId)
          .then(function(response){
            $scope.products = response.items;
            console.log(response.items)
            $scope.subtotal = response.subtotal;
            $scope.totalPrice = response.totalPrice;
            $scope.totalShipping = response.totalShipping;
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

  // Stripe Response Handler
  $scope.stripeCallback = function (code, result) {
      if (result.error) {
          window.alert('it failed! error: ' + result.error.message);
      } else {
          window.alert('success! token: ' + result.id);
      }
  };



})

angular.module('candle').controller('cartCtrl', function($scope, $state, mainService, $auth){

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

  console.log(document.cookie);
  var token = document.cookie.split("WECtoken=")[1]

  mainService.getSavedProducts(token)
  .then(function(response){
    console.log(response)
    $scope.products = response.items;
    $scope.totalPrice = response.totalPrice;
  })

  $scope.updateTotalPrice = function(productsId, quantity){
    mainService.updateProduct(productsId, quantity, token)
    .then(function(response){
      if(response) {
        mainService.getSavedProducts(token)
        .then(function(response){
          $scope.products = response.items;
          $scope.totalPrice = response.totalPrice;
        })
      }
    })
  }

  $scope.removeProductFromCart = function(id){
    var test = confirm("Are you sure?");
    if(test === true){
      mainService.removeProductFromCart(id, token)
      .then(function(response){
        if(response) {
            mainService.getSavedProducts(token)
            .then(function(response){
                $scope.products = response.items;
                $scope.totalPrice = response.totalPrice
            })
        }
      })
    }
  }

})

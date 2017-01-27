angular.module('candle').directive('loginDirective', function(){
  return {
    restrict: 'AE',
    templateUrl: './partials/loginDirective/loginDirective.html',
    controller: function($scope, mainService, $auth, $state){

      $scope.loginCloseModal = function(){
        $scope.loginDirective = false;
      }

      $scope.switchToSignUp = function(){
        $scope.loginDirective = false;
        $scope.signUpDirective = true;
      }

      $scope.logIn = function(email, password) {
        console.log('hey from login ctrl');
        $auth.login({
          email: email,
          password: password,
        }).then(function (response) {
          console.log("loginCtrl:", response);
          if(response.status === 200){
            $auth.setToken(response);
            $scope.loginDirective = false;
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
              $scope.checkoutCart = true;

            }
          }
        }).catch(function (response) {
          console.log("loginCtrl Error:", response);
        });
      };

    }
  }
})

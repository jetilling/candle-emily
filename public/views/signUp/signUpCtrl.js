angular.module('candle').controller('signUpCtrl', function($scope, $state, $auth){

  $scope.mismatchedPasswords = false;
    $scope.existingEmail = false;

    $scope.create = function(firstName, lastName, password, confirmPassword, email){
      if (password === confirmPassword){
        $auth.signup({
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email
        }).then(function (response) {
          console.log("signUpCtrl:", response);
          $auth.setToken(response);
          $state.go('profile');
        }).catch(function (response) {
          console.log("signUpCtrl Error:", response);
          $scope.existingEmail = true
        });
      }
      else $scope.mismatchedPasswords = true
    }

})

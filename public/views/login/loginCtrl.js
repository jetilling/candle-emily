angular.module('candle').controller('loginCtrl', function($scope, $state, $auth){

  //login function - response.data.token accesses token.
  $scope.logIn = function(email, password) {
    console.log('hey from login ctrl');
    $auth.login({
      email: email,
      password: password,
    }).then(function (response) {
      console.log("loginCtrl:", response);
      if(response.status === 200){
        $auth.setToken(response);
        $state.go('landing');
      }
    }).catch(function (response) {
      console.log("loginCtrl Error:", response);
    });
  };

})

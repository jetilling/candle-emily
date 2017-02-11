angular.module('candle').directive("cartDirective", function(){
  return {
    restrict: 'AE',
    templateUrl: './partials/cartDirective/cartDirective.html',
    controller: function($scope, mainService){

      var token = document.cookie.split("WECtoken=")[1]

      mainService.getSavedProducts(token)
      .then(function(response){
        $scope.products = response.items;
        $scope.totalPrice = response.totalPrice;
      })

    }
  }
})

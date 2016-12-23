angular.module('candle').directive('shopDirective', function(){
  return {
    restrict: 'AE',
    templateUrl: './partials/shopDirective/shopDirective.html',
    controller: function($scope, mainService, $state, $rootScope){

      $scope.quantity = 1;

      $scope.changeQuantity = function(type){
        if (type === "add"){
          $scope.quantity += 1;
        }
        else if (type === "sub" && $scope.quantity > 1){
          $scope.quantity -= 1;
        }
      }

      $scope.addToCart = function(id, quantity, name){
        console.log(id, quantity, name);
        $rootScope.candleName = name;
        $rootScope.quantityBanner = quantity;
        mainService.addToCart(id, quantity)
        .then(function(respone){
          console.log(response)
        })
        if(quantity > 1){
          $rootScope.addedBannerMultiple = true;
        }
        else {
          $rootScope.addedBannerSingle = true;
        }
      }

    }
  }
})

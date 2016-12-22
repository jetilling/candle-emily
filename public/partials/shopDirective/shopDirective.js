angular.module('candle').directive('shopDirective', function(){
  return {
    restrict: 'AE',
    templateUrl: './partials/shopDirective/shopDirective.html',
    controller: function($scope, mainService, $state){

      $scope.quantity = 1;

      $scope.changeQuantity = function(type){
        if (type === "add"){
          $scope.quantity += 1;
        }
        else if (type === "sub" && $scope.quantity > 1){
          $scope.quantity -= 1;
        }
      }

      $scope.addToCart = function(id, quantity){
        console.log(id, quantity)
      }
    }
  }
})

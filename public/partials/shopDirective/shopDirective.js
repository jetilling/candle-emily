angular.module('candle').directive('shopDirective', function(){
  return {
    restrict: 'AE',
    templateUrl: './partials/shopDirective/shopDirective.html',
    controller: function($scope, mainService, $state, $rootScope, $timeout){

      $scope.quantity = 1;

      $scope.changeQuantity = function(type){
        if (type === "add"){
          $scope.quantity += 1;
        }
        else if (type === "sub" && $scope.quantity > 1){
          $scope.quantity -= 1;
        }
      }

      $scope.addToCart = function(id, quantity, name, price){
        if(document.cookie.split(';')[1] === undefined) {
          var token = Math.random().toString(20).substr(2);
          document.cookie = "token = " + token;
        }
        else token = document.cookie.split(';')[1].split('=')[1]
        $rootScope.candleName = name;
        $rootScope.quantityBanner = quantity;
        var totalPrice = price * quantity;
        mainService.addToCart(id, quantity, token, totalPrice)
        .then(function(response){
          if(response === 200){
              if(quantity > 1){
                $rootScope.addedBannerSingle = false;
                $rootScope.addedBannerMultiple = true;

              }
              else {
                  $rootScope.addedBannerSingle = true;
              }
          }
        })
      }

    }
  }
})

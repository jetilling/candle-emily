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

      console.log(document.cookie.split("WECtoken=")[1]);
      console.log(document.cookie.indexOf("WECtoken"));
      $scope.addToCart = function(id, quantity, name, price){
        if(document.cookie.indexOf("WECtoken") === -1) {
          var token = Math.random().toString(20).substr(2);
          document.cookie = "WECtoken = " + token;
        }
        else token = document.cookie.split("WECtoken=")[1]
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

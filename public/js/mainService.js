angular.module('candle').service('mainService', function($http){

  var userInfo = function(userId){
    return $http({
      method: 'GET',
      url: '/api/userData/' + userId,
    }).then(function(response){
      return response.data
    })
  }

  this.userData = function(){
    return $http({
      method: 'GET',
      url: '/api/me'
    }).then(function(response){
      var userId = response.data
      return userInfo(userId)
    })
  }

  this.getProducts = function(){
    return $http({
      method: 'GET',
      url: '/api/getProducts'
    }).then(function(response){
      return response.data;
    })
  }

  this.addToCart = function(id, quantity, token, price){
    return $http({
      method: 'POST',
      url: '/api/addToCart',
      data: {id: id, quantity: quantity, token: token, price: price}
    }).then(function(response){
      return response.status;
    })
  }

  this.getSavedProducts = function(token){
    return $http({
      method: 'GET',
      url: '/api/getSavedProducts/' + token
    }).then(function(response){
      var result = {
        items: [],
        itemPrice: [],
        itemQuantity: [],
        totalPrice: 0
      }
      console.log(result.items)
      response.data.forEach(function(item){
          result.totalPrice += item.price * item.quantity;
          if(!result.items.includes(item.products_id)){
            result.items.push(item.products_id);
          }
      })
      console.log(result);
    })
  }

})

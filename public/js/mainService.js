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
        totalPrice: 0
      }
      response.data.forEach(function(item){
          result.totalPrice += item.price * item.quantity;
          result.items.push(item);
      })

      var num = 1
      for(var i = 0; i < result.items.length; i++){
        for(var j = num; j <result.items.length; j++){
          if(result.items[j].products_id === result.items[i].products_id){
            result.items[i].quantity += result.items[j].quantity;
            result.items.splice(j, 1);
            j--;
          }
        }
        num++;
      }
      return result;
    })
  }

})

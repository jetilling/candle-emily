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
            console.log(response)
      var result = {
        items: [],
        totalPrice: 0
      }
      response.data.forEach(function(item){
          result.totalPrice += item.price * item.quantity;
          result.items.push(item);
      })
      return result;
    })
  }

  this.updateProduct = function(productsId, quantity, token){
    return $http({
      method: 'PUT',
      url: '/api/updateProduct',
      data: {productsId: productsId, quantity: quantity, token: token}
    }).then(function(response){
      return response.data
    })
  }

  this.removeProductFromCart = function(id, token){
    return $http({
      method: 'DELETE',
      url: '/api/removeProductFromCart/' + id,
      data: {token: token},
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    }).then(function(response){
      return response.data
    })
  }

  this.addUserIdToCart = function(userId, token){
    return $http({
      method: 'PUT',
      url: '/api/addUserIdToCart',
      data: {userId: userId, token: token}
    }).then(function(response){
      return response.data
    })
  }

  this.getUsersProducts = function(userId){
    return $http({
      method: 'GET',
      url: '/api/getUsersProducts/' + userId
    }).then(function(response){
      var result = {
        items: [],
        subtotal: 0,
        totalShipping: 0,
        totalPrice: 0
      }
      response.data.forEach(function(item){
          result.subtotal += item.price * item.quantity;
          result.items.unshift(item);
      })
      for(var i = 0; i < result.items.length; i++){
        if(result.items[i].products_id === 3){
          result.items[i].shipping = 9 + ((result.items[i].quantity - 1) * 4);
          result.totalShipping += result.items[i].shipping;
        }
        else if(result.items[i].products_id === 2){
          if(result.items[i-1] === undefined || result.items[i-1].shipping === undefined){
            result.items[i].shipping = 8 + ((result.items[i].quantity - 1) * 3);
            result.totalShipping += result.items[i].shipping;
          }
          else {
            result.items[i].shipping = result.items[i].quantity * 3;
            result.totalShipping += result.items[i].shipping;
          }
        }
        else if(result.items[i].products_id === 1){
          if(result.items[i-(result.items.length - 1)] === undefined ||
             result.items[i-(result.items.length - 1)].shipping === undefined ||
             result.items[i-1] === undefined ||
             result.items[i-1].shipping === undefined){
            result.items[i].shipping = 7 + ((result.items[i].quantity - 1) * 2);
            result.totalShipping += result.items[i].shipping;
          }
          else {
            result.items[i].shipping = result.items[i].quantity * 2
            result.totalShipping += result.items[i].shipping;
          }
        }
      }
      result.totalPrice = result.subtotal + result.totalShipping
      return result;
    })
  }

})

var app = require('../index'),
    db = app.get('db'),
    config = require('../config.json');

module.exports = {
  getSavedProducts: function(req, res){
    db.get_Saved_Products([req.params.token], function(err, cart){
      if(err) console.log(err);
      else res.status(200).send(cart);
    })
  },

  updateProduct: function(req, res){
    db.update_Product([req.body.productsId, req.body.quantity, req.body.token], function(err, cart){
      if(err) console.log(err);
      else res.status(200).send(true);
    })
  },

  removeProductFromCart: function(req, res){
    db.remove_product_from_cart([req.params.id, req.body.token], function(err, cart){
      if(err) console.log(err);
      else res.status(200).send(true);
    })
  },

  addUserIdToCart: function(req, res){
    db.add_User_To_Cart([req.body.userId, req.body.token], function(err, cart){
      if(err) console.log(err);
      else res.status(200).send(true);
    })
  },

  getUsersProducts: function(req, res){
    db.get_Users_Products([req.params.usersId], function(err, cart){
      if(err) console.log(err);
      else res.status(200).send(cart);
    })
  }
}

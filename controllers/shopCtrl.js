var app = require('../index'),
    db = app.get('db'),
    config = require('../config.json');

module.exports = {
  getProducts: function(req, res){
    db.getProducts(function(err, products){
      if(err) console.log(err);
      else res.status(200).send(products)
    })
  },
  addToCart: function(req, res){
    db.cart.findOne({user_token: req.body.token}, function(err, cart){
      console.log(req.body.token);
      console.log(req.body.id);
      console.log(cart.products_id)
      if(!cart || cart.products_id !== req.body.id){
        db.add_To_Cart([req.body.id, req.body.quantity, req.body.token, req.body.price], function(err, cart){
          if(err) console.log(err);
          else res.status(200).send(cart);
        })
      }
      else if(cart.user_token){
        var quantity = cart.quantity + req.body.quantity;
        db.update_Product([req.body.id, quantity, req.body.token], function(err, cart){
          if(err) console.log(err);
          else res.status(200).send(cart)
        })
      }
    })
  }
}

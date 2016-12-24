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
    db.add_To_Cart([req.body.id, req.body.quantity, req.body.token, req.body.price], function(err, cart){
      if(err) console.log(err);
      else res.status(200).send(cart);
    })
  }
}

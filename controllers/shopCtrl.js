var app = require('../index'),
    db = app.get('db'),
    config = require('../config.json');

module.exports = {
  getProducts: function(req, res){
    db.getProducts(function(err, products){
      if(err) console.log(err);
      else res.status(200).send(products)
    })
  }
}

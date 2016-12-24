var app = require('../index'),
    db = app.get('db'),
    config = require('../config.json');

module.exports = {
  getSavedProducts: function(req, res){
    db.get_Saved_Products([req.params.token], function(err, cart){
      if(err) console.log(err);
      else res.status(200).send(cart);
    })
  }
}
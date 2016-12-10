var app = require('../index'),
    db = app.get('db'),
    config = require('../config.json');

module.exports = {
  userData: function(req, res){
    db.get_user_data([req.params.id], function(err, users){
      if(err) console.log('profileCtrl.userData err: ', err);
      else res.status(200).send(users);
    })
  }
}

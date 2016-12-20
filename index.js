var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    massive = require('massive');
    config = require('./config.json'),
    string = config.connectionString;

var db = massive.connectSync({connectionString: string})

var corsOptions = {
  origin: 'http://localhost:4682'
}

var app = module.exports = express();
app.set('db', db);

//----Server Controllers----//
var authCtrl = require('./controllers/authCtrl.js'),
    profileCtrl = require('./controllers/profileCtrl.js'),
    shopCtrl = require('./controllers/shopCtrl.js');


app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

//----Login Required Middleware----//
function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];
  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

//----Endpoints----//
//----authCtrl----//
app.get('/api/me', ensureAuthenticated, authCtrl.getMe);
app.post('/auth/login', authCtrl.login);
app.post('/auth/signup', authCtrl.signUp);
//----ProfileCtrl----//
app.get('/api/userData/:id', ensureAuthenticated, profileCtrl.userData);
//----ShopCtrl----//
app.get('/api/getProducts', shopCtrl.getProducts);

var port = config.port
app.listen(port, function(){
  console.log('Got \'er smellin\' good on ', port)
})

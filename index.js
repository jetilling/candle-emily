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


app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

var port = config.port
app.listen(port, function(){
  console.log('Got \'er smellin\' good on ', port)
})

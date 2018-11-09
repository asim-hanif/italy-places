
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var http = require('http');

require('./models/db');
require('./authentication/authentication');

var routes = require('./routes/routing');
var port = 3000
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use('/api', routes);
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
//server.on('error', onError);
server.on('listening', onListening);

function onListening() {
  var addr = server.address();
  console.log('Listening on port ' + addr.port);
}





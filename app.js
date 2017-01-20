/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var index = express.Router()
var bodyParser = require('body-parser')

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');



// create a new express server
var app = express();

app.set('views', __dirname + 'views');
app.set('view engine', 'pug');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

index.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

app.use('/', index);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

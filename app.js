
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , scan = require('./routes/scan')
  , results = require('./routes/results')
  , http = require('http')
  , path = require('path');

var app = express();

// globals require to make those variables available
var globals = require('./routes/globals');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
// customize the formidable bodyparser with some options
app.use(express.bodyParser({uploadDir: __dirname + '/uploads/tmp', keepExtensions: true}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', routes.login);
app.post('/doLogin', routes.doLogin);
app.get('/home', routes.home);
app.get('/scan', scan.get);
app.post('/scan', scan.post);
app.get('/results', results.get);

app.get('/error', routes.error);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/**
 * Module dependencies.
 */

/**
Test User info:
First Name: John
Last Name:  Smith
email:      johnsmith@cigna.com
phone:      1112223333
            2038095311 (for ref)
password:   cigna1
**/

var express = require('express')
  // require mongoose db script
  , db = require('./models/db')
  , routes = require('./routes')
  , login = require('./routes/login')
  , user = require('./routes/user')
  , scan = require('./routes/scan')
  , results = require('./routes/results')
  , register = require('./routes/register')
  , profile = require('./routes/profile')
  , database = require('./routes/database')
  , http = require('http')
  , path = require('path')



var app = express();


// globals require to make spellchecker variable global
var globals = require('./globals');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
// customize the formidable bodyparser with some options
app.use(express.bodyParser({uploadDir: __dirname + '/uploads/tmp', keepExtensions: true}));
// for authentication; specify before routes and cookieparser before session
app.use(express.cookieParser());
app.use(express.session({secret: 'group7', cookie: {maxAge: 600000}}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/users', user.list);
app.get('/login', login.get);
app.post('/login', login.post);

app.get('/home', routes.home);
app.get('/home/edit', routes.homeEditGet);
app.post('/home/edit', routes.homeEditPost)

app.get('/scan', scan.get);
app.post('/scan', scan.post);
app.post('/scan/profiles', scan.put);

app.get('/results', results.get);

app.get('/register', register.get);
app.post('/register', register.post);

app.get('/success', routes.success);

app.get('/profile/create', profile.createget);
app.post('/profile/create', profile.createpost);

app.get('/profile/:profid', profile.profileget);
app.get('/profile/:profid?success', profile.profileget);
app.post('/profile/:profid', profile.profilepost);

// return all current users
app.get('/database', database.get);
// delete all current users
app.get('/database/clear', database.clear);





app.get('/error', routes.error);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  globals.initializeDict();

});

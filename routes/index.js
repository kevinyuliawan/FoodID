
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.redirect('/login');
}

exports.login = function(req, res){
  res.render('login', { title: 'Login', pageid: 'loginpage' });
};

exports.doLogin = function(req, res){
  res.redirect('/home');
}

exports.home = function(req, res){
  var theProfiles = [
    {name: 'Haley'},
    {name: 'Kyle'},
    {name: 'Phil'},
    {name: 'Kevin'}
  ];

  res.render('home', {
    title: 'Home', 
    pageid: 'homepage',
    pageurl: '/home',
    profilelist: theProfiles
   });
}

exports.error = function(req, res){
  res.render('error', {title: 'Error', pageid: 'errorpage'});
}

/*
 * GET home page.
 */

exports.index = function(req, res){
  if (req.session.username){res.redirect('/home')}
  else {res.redirect('/login');};
}

exports.home = function(req, res){
  if(req.session.uid){

  res.render('home', {
    title: 'Home', 
    pageid: 'homepage',
    pageurl: '/home',
    username: req.session.username,
    profilelist: req.session.profiles,
    cache: 'never'
   });
  }
  else(res.redirect('/login'));
};

exports.homeedit = function(req, res){
  res.render('home', {
    title: 'Home',
    pageid: 'homeeditpage',
    pageurl: '/home/edit',
    username: req.session.username,
    profilelist: req.session.profiles,
    cache: 'never',
    editmode: true
  });
};

exports.error = function(req, res){
  res.render('error', {title: 'Error', pageid: 'errorpage'});
};

exports.success = function(req, res){
  res.render('success', {
    title: 'Success',
    pageid: 'successpage',
    redirect: 'home',
    navbar: false
  });
};


var User = require('../models/user');

exports.get = function(req, res){
  res.render('login', { title: 'Login', pageid: 'loginpage' });
};

exports.post = function(req, res){
  // get the values from the form
  var submitted = req.body.email;
  var submittedPass = req.body.password;
  var submittedType = 'email'; // default value

  // check if there's an @ sign in the submitted email box; if not, then it is a phone number
  if (submitted.indexOf('@') == -1){submittedType = 'phone'};

  // callback for when user is found, need to verify their password
  function found(user){
    if (user.password == submittedPass)
      {res.redirect('/home')}
    else
      renderIncorrectLogin();
  }

  function renderIncorrectLogin(){
    res.render('login', {title: 'Login', pageid: 'loginpage', error: true});
  }

  // build the mongo query using the submitted type and what's submitted
  var query = {};
  query[submittedType] = submitted;

  User.model.findOne(query, function(err, user){
    if (err){res.redirect('/error'); console.log('The error: ' + err)}
    else if (user != null){console.log('Successful find: ' + user); found(user)}
    else {console.log('No user found'); renderIncorrectLogin()};
  });

};
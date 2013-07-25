var user = require('../models/user');

exports.get = function(req, res){
  res.render('register', {
    title: 'Register',
    pageid: 'registerpage'
  });
};

exports.post = function(req, res){
  user.adduser(
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.phone,
    req.body.password,
    // send res and req for future redirection and session initiation
    req,
    res
  )

};
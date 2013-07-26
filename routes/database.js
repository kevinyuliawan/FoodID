var User = require('../models/user')

exports.get = function(req, res){
  //find all users and send them
  User.model.find({}, function(err, users){
    res.send(users);
  });
};
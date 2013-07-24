var user = require('../models/user');

exports.get = function(req, res){
  user.adduser(req.param('name'));
};
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getinfo = function(name, callback){
  User.findOne({name: name}, 'name', function(err, person){
    if (err) {console.log('The error:\n' + err )}
    else{
      console.log('person success: ');
      console.log(person);
    }; 
  });
};

exports.adduser = function(name){
  var newUser = new User({name: name});
  newUser.save(function(err, user){
    if(err);
    console.log('saved user: ');
    console.log(user);
  })
};

exports.adduser = function(firstname, lastname, email, phone, password, res){
  var name = firstname + " " + lastname;
  var newUser = new User({
    firstname: firstname,
    lastname: lastname,
    name: name,
    email: email,
    phone: phone,
    password: password
  });

  function redirect(){
    res.redirect('/success');
  };

  newUser.save(function(err, user){
    if(err); //TODO Handle error
    console.log('saved new user: ');
    console.log(user);
    redirect();
  });

};

exports.model = User;
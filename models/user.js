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

exports.adduser = function(firstname, lastname, email, phone, password, req, res){
  var name = firstname + " " + lastname;
  var newUser = new User({
    firstname: firstname,
    lastname: lastname,
    name: name,
    email: email,
    phone: phone,
    password: password
  });

  function redirect(user){
    // set session defaults
    req.session.username = user.firstname;
    req.session.email = user.email;
    req.session.phone = user.phone;
    req.session.profiles = user.profiles;
    req.session.uid = user._id;
    // redirect to success
    res.redirect('/success');
  };

  newUser.save(function(err, user){
    if(err); //TODO Handle error
    console.log('saved new user: ');
    console.log(user);
    redirect(user);
  });

};

  exports.findUserById = function(userid, callback){
    User.model.findOne({_id: userid}, function(err, user){
      callback(err, user);
    });
  };

  exports.addProfile = function(userid, profName, profMe, profDef, profPos, profAllergies, profMedications, callback){
    User.findByIdAndUpdate(
      userid, 
      { $push: {profiles:
        {
          name: profName,
          me: profMe,
          def: profDef,
          pos: profPos,
          allergies: profAllergies,
          medications: profMedications
        }
      }},
      function(err, user){
        callback(err, user);
      }
      );
  };

  exports.getProfile = function(userid, profid, callback){
    User.findById(userid, function(err, user){
      var foundProfile = user.profiles.id(profid);
      console.log('Found profile: ' + foundProfile);
      callback(foundProfile);
    })
  };

  exports.updateProfile = function(userid, profid, config, callback){
    User.findById(userid, function(err, user){
      var foundProfile = user.profiles.id(profid);
      foundProfile.name = config.name;
      foundProfile.def = config.def;
      foundProfile.allergies = config.allergies;
      foundProfile.medications = config.medications;
      user.save(function(err){
        callback(user, foundProfile);
      })
    });
  }

exports.model = User;
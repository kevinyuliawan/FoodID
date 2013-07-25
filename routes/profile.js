var UserModel = require('../models/user');

exports.createget = function(req, res){
  res.render('profilecreate', {
    title: 'Create Profile',
    pageid: 'profilecreatepage'
    }
  );
};

function createJSONfromCSV(csv){
  // create a JSON object out of an array of just strings
  var orig = csv;
  var outJSON = [];
  for (var i=0;i<orig.length;i++){
    outJSON[i] = { "name": orig[i]};
  };
  return outJSON;
}

exports.createpost = function(req, res){
  // create an allergies JSON object, which is an array of {name: String} objects
  var origAllergies = req.body.allergies.toString().replace(/\s/g, '').split(',');
  var jsonAllergies = createJSONfromCSV(origAllergies);

  var origMedications = req.body.medications.toString().replace(/\s/g, '').split(',');
  var jsonMedications = createJSONfromCSV(origMedications);

  console.log('jsonAllergies: ' + jsonAllergies);
  console.log('jsonMedications: ' + jsonMedications);
  var checkboxValue = false;
  if (typeof(req.body.default) != 'undefined')
    {checkboxValue = true;}
  console.log('checkbox value: ' + checkboxValue);

  /*
      Profile schema as of 7/25/13:
      name: String,
      me: Boolean,
      def: Boolean,
      position: Number,
      allergies: [{name: String}],
      medications: [{name: String}]
  */

  UserModel.addProfile(
      //need ID of the user owner first to look up
      req.session.uid, 
      // params for the profile to be added
      req.body.name,
      false,
      checkboxValue,
      req.session.profiles.length,
      jsonAllergies, 
      jsonMedications,
      function(err, user){
        // update the session's profiles
        console.log('Added profile: ' + user.profiles[user.profiles.length-1]);
        req.session.profiles = user.profiles;
        // console.log('The user profiles: ' + user.profiles);
        res.redirect('/home');
      }
    );
  };

exports.profileget = function(req, res){
  UserModel.getProfile(req.session.uid, req.params.profid, function(profile){
    // convert the profile's allergies and medications JSON to string format
    var allergyString = "";
    var medicationString = "";
    console.log('Begin loops');
    for(a=0;a<profile.allergies.length;a++){
      if (a==0){allergyString = profile.allergies[0].name}
      else {allergyString = allergyString + ", " + profile.allergies[a].name};
    };
    for(b=0;b<profile.medications.length;b++){
      if(b==0){medicationString = profile.medications[0].name}
      else {medicationString = medicationString + ", " + profile.medications[b].name};
    };

    console.log('Allergy string: ' + allergyString);
    console.log('Medication string: ' + medicationString);

    console.log('Query success: ' + req.query.success);

    res.render('profileshow', {
      title: profile.name,
      pageid: 'showprofilepage',
      profile: profile,
      allergies: allergyString,
      medications: medicationString,
      updatesuccess: req.query.success
    });
  });
};

exports.profilepost = function(req, res){
  var profName = req.body.name;
  var checkboxValue = false;
  if (typeof(req.body.default) != 'undefined')
    {checkboxValue = true;}
  console.log('checkbox value: ' + checkboxValue);
  var profAllergies = createJSONfromCSV(req.body.allergies.toString().replace(/\s/g, '').split(','));
  var profMedications = createJSONfromCSV(req.body.medications.toString().replace(/\s/g, '').split(','));
  var config = {name: profName, def: checkboxValue, allergies: profAllergies, medications: profMedications};
  UserModel.updateProfile(req.session.uid, req.params.profid, config, function(user, profile){
    // Update the session
    req.session.profiles = user.profiles;
    console.log('redirecting: ');
    res.redirect('/profile/' + req.params.profid + '?success=true');
    });
  };

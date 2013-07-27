var User = require('../models/user')

exports.get = function(req, res){
  //find all users and send them
  User.model.find({}, function(err, users){
    res.send(users);
  });
};

exports.clear = function(req, res){
  //delete all users, redirect to home page
  //ask if you want to clear first, and if query says so, then clear
  if(req.query.clear == 'true'){
    User.model.remove({}, function(err, users){
    //clear the session
    req.session.destroy();
    res.send('<html><body><p>All users have been deleted. <p>Go to: <ul> <li><a href="/database">the database page.</a></li> <li><a href="/home">the home page.</a></li></body></html>');
    });
  }
  else{
    /* the HTML to send:
    <html>
      <body>
        <p>Are you sure you want to clear the user database?</p>
        <ul>
          <li><a href="/database/clear?clear=true">Yes</a></li>
          <li><a href="/database">No</a></li>
        </ul>
      </body>
      </html>
    */
    var theHTML = '<html><body><p>Are you sure you want to clear the user database?</p><ul><li><a href="/database/clear?clear=true">Yes</a></li><li><a href="/database">No</a></li></ul></body></html>';
    res.send(theHTML);
  };
  
};
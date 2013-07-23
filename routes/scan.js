var globals = require('./globals');

var nodecr = require('nodecr');
var fs = require('fs');


exports.get = function(req, res){
  res.render('scan', {
    title: 'Scan',
    pageid: 'scanpage'
  }); 
}

exports.post = function(req, res){
  var image = req.files.scan;
  var pathToImage = image._writeStream.path;

  nodecr.process(pathToImage, function(err, text){
    if (err){
      console.log('The error: ' + err);
      res.redirect('/error');
    }
    else{
      // set text equal to the text split by ':' in order to filter out 'ingredients:'
      text = text.split(':');
      // set global outtext to nodecr's result text, split by comma or period
      globals.outtext = text[1].toString().split(/\.|\,|\-/);
      // delete the temporary image file
      fs.unlink(pathToImage);
      // emit a 'done' event on the controller for whichever listeners are listening to it
      globals.controller.emit('done', text);
      res.redirect('/results');
    };
  });
};
var globals = require('./globals');

var nodecr = require('nodecr');
var fs = require('fs');


exports.post = function(req, res){
  var image = req.files.scan;
  var pathToImage = image._writeStream.path;

  nodecr.process(pathToImage, function(err, text){
    if (err){console.log('The error: ' + err)};
    // set global outtext to nodecr's result text, split by comma or period
    globals.outtext = text.toString().split(/\.|\,|\-/);

    // delete the temporary image file
    fs.unlink(pathToImage);

    // emit a 'done' event on the controller for whichever listeners are listening to it
    globals.controller.emit('done', text);
    res.redirect('/results');
  });
};
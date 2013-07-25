var globals = require('./globals');
var nodecr = require('nodecr');
// resize module to make nodecr more accurate
var resize = require('./resize');
var fs = require('fs');


exports.get = function(req, res){
  res.render('scan', {
    title: 'Scan',
    pageid: 'scanpage'
  }); 
}

exports.post = function(req, res){
  // get image and its path
  var image = req.files.scan;
  var pathToImage = image._writeStream.path;
  console.log('the original imagepath: ' + pathToImage);
  // should resize the image dyamically based on how big it is
  // set it to a baseline width of 30,000 px
  var newSize = '30000';

  resize.resize(pathToImage, newSize, ocr);

  function ocr(newpath){
   nodecr.process(newpath, function(err, text){
      if (err){
        console.log('The error: ' + err);
        res.redirect('/error');
      }
      else{
        console.log('the new imagepath: ' + newpath);
        // set text equal to the text split by ':' in order to filter out 'ingredients:'
        text = text.split(':');
        // set global outtext to nodecr's result text, split by comma or period
        globals.outtext = text[1].toString().split(/\.|\,|\-/);
        // delete the temporary image file
        fs.unlink(newpath);
        // emit a 'done' event on the controller for whichever listeners are listening to it
        globals.controller.emit('done', text);
        res.redirect('/results');
      };
    });
  };
};
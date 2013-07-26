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
  // set it to a baseline width of 3000; sometimes the image
  // can be worse depending on how big it already is and
  // its resolution
  var newSize = '1000';
  
  /* pre-imagemagick output */
  nodecr.process(pathToImage, function(err, text){
	  text = text.toString().toLowerCase();
	  fs.appendFile('outputpre.txt',text, function(err){
		  if(err) {console.log('Theres a pre error: ' + err);res.redirect('/error');}
		  else console.log('Pre-log built successfully.');
      }); 
  });

  // resize the image using imagemagick and callback with nodecr
  resize.resize(pathToImage, newSize, ocr);

  function ocr(newpath){
    nodecr.process(newpath, function(err, text){
      if (err){console.log('The error: ' + err);res.redirect('/error');}
      else {
        // make the text a string and lowercase for CSS formatting later
	      text = text.toString().toLowerCase();
        console.log('the new imagepath: ' + newpath);
        // write the output text to a log file
	      fs.appendFile('outputpost.txt',text, function(err){
		      if(err) {console.log('outputpost appendFile error: ' + err);res.redirect('/error');}
		      else console.log('Post-log built successfully.');
	        });
        // set text equal to the text split by ':' in order to filter out 'ingredients:'
        text = text.split(':');
        // set the current session outtext to nodecr's result text, split by comma or period
        // TODO only skip the first colon for ingredients, but add any other instances of colons
        req.session.outtext = text[1].split(/\.|\,|\-/);
        // delete the temporary image files
        fs.unlink(newpath);
	      fs.unlink(pathToImage);
        // emit a 'done' event on the controller for whichever listeners are listening to it
          // globals.controller.emit('done', text);
        res.redirect('/results');
      };
    });
  }; // end function ocr;
} // end /exports.post;
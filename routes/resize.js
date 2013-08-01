var file = require('fs');
//var magick_resize = require( "imagemagick" ).resize;
var spawn = require('child_process').spawn;
var convert;

var resize = function (imagepath, newsize, callback ) {
  // Resizes an image to width `width' & saves it to newpath
  var split_imagepath = imagepath.split('/');
  var filename = split_imagepath.length - 1;
  var newpath = "";

  for (var i = 0; i < split_imagepath.length; i++) {
    if (i == filename) {
      newpath += "resized-images/" + split_imagepath[i];
    } else {
      newpath += split_imagepath[i] + '/'
    }
  }

  console.log('Resizing with imagemagick at: ' + newpath);

  convert = spawn("convert", [imagepath, "-resize", newsize, newpath]);

  convert.stdout.on("data", function (data) {
    console.log("resize.convert: stdout: " + data);
  });
  convert.stderr.on("data", function (data) {
    console.log("resize.convert: stderr: " + data);
  });
  convert.on("close", function (code) {
    console.log("resize.convert: exit [" + code + ']');
    textclean = spawn("textcleaner", ['-g', '-e', 'normalize', '-f', '15', '-o', '10', '-u', '-s', '2', '-T', '-p', '20', newpath, newpath ]);

    textclean.on("close", function(code){
    console.log("textclean.convert: exit [" + code + "]");
    // call the OCR callback with the newly generated file
    callback(newpath);
    });

    textclean.stderr.on("data", function(data){
      console.log("resize.texclean: stderr: " + data);
    });

    textclean.stdout.on("data", function(data){
      console.log("resize.convert: stdout: " + data);
    });

    });   

  
}

exports.resize = resize;

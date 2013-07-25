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
	callback(newpath);
    });

    
}

exports.resize = resize;

var nodecr = require('nodecr');
// resize module to make nodecr more accurate
var resize = require('./resize');
var fs = require('fs');
var User = require('../models/user');
var spellcheck = require('../globals').spellcheck;


exports.get = function(req, res){
  var profileList = [];
  //console.log('getting');
  res.render('scan', {
    title: 'Scan',
    pageid: 'scanpage',
    profiles: profileList,
    nofile: req.query.nofile,
    rescan: req.query.rescan
  }); 
};

// actually a post to /scan/profiles, couldn't get PUT to work...
exports.put = function(req, res){
  // create array to send to user model, initialized as empty
  var profileList = [];
  // create a string of all the allergies from all the profiles, to set the hidden value to
  var listString = "";
  if(req.body.profiles != '') profileList = req.body.profiles.split(',');

  if(profileList.length != 0 ){
    User.getProfiles(req.session.uid, profileList, function(user, profileArray){
      var list = [];
      for(var p=0; p<profileArray.length;p++){
        var currentProfile = profileArray[p];
        for(var n=0;n<currentProfile.allergies.length;n++){ // add allergies
          if(n==0 && p==0) {listString += currentProfile.allergies[n].name;}
          else {listString += "," + currentProfile.allergies[n].name;};
          console.log('current string: ' + listString);
        }
        for(var o=0;o<currentProfile.medications.length;o++){ // add medications
          listString += "," + currentProfile.medications[o].name.toString().toLowerCase();
        }
      };
      console.log('list: ' + listString);
      res.render('scan', {
        title: 'Scan',
        pageid: 'scanpage',
        profiles: profileArray,
        list: listString,
        pageurl:'/scan'
      });
    });
  }
  else{
    res.redirect('/scan');
  }
};


// used to remove the duplicates from an array
function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};
 
  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

// used to check if a value is in an array
Array.prototype.contains = function(val){
  if(this.indexOf(val) >= 0){return true;  }
  else{return false;};
};

exports.post = function(req, res){
  var allergies = [];
  // get the allergies, and split them by ', ' (comma space) to arrays
  // the additional allergies are going to have a space before since they're user inputted, but the body ones are generated in this script and they're only separated by a single comma
  var bodyAllergies = req.body.allergies.toString().toLowerCase().split(',');
  var addAllergies = req.body.addallergies.toString().toLowerCase().split(', ')
  // allergies array created by concatenating the two allergies and additional ones
  checkAllergies = bodyAllergies.concat(addAllergies);
  checkAllergies = eliminateDuplicates(checkAllergies);
  // add additional things to scan for depending on allergies e.g. milk -> lactose, wheat -> gluten
  if (checkAllergies.contains('lactose')){ checkAllergies.push('milk'); checkAllergies.push('dairy')};
  if (checkAllergies.contains('gluten')){ checkAllergies.push('wheat'); checkAllergies.push('oats'); checkAllergies.push('oat')};
  if (checkAllergies.contains('tylenol')){ checkAllergies.push('vitamin d') };
  if (checkAllergies.contains('nuts')){ checkAllergies.push('nut')};
  console.log('Final allergies array: ' + checkAllergies);
  // set it to the session so that results can use it
  req.session.allergies = allergies;
  //TODO add additional allergies based on matches e.g. milk adds lactose, etc.
  
  // get image and its path from the req form
  var image = req.files.scan;
  // if the image is smaller than 100 bytes, then no file was uploaded
  if(image._writeStream.bytesWritten <= 100) { res.redirect('/scan?nofile=true'); }
  else{
    var pathToImage = image._writeStream.path;
    console.log('the original imagepath: ' + pathToImage);
    /*
    should resize the image dyamically based on how big it is
    set it to a baseline width of 3000; sometimes the image
    can be worse depending on how big it already is and
    its resolution 
    */
    var newSize = 'x640';
    
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
  }; // end if else statement

  function ocr(newpath){
    nodecr.process(newpath, function(err, text){
      if (err){console.log('The error: ' + err);res.redirect('/error');}
      else {
        // - array of allergies objects with name: and match: , and an int count to pass to the page with the number of matches
        var finalList = [];
        var matchCount = 0;
        console.log('the final arraylist: '); console.log(checkAllergies);
        // - make the text a string and lowercase for CSS formatting later
        // console.log('text before: ' + text);
	      text = text.toString().toLowerCase();
        text = text.replace(/(\r\n|\n|\r)/gm,' ') //remove new lines and replace with spaces
        text = text.replace(/[\])}[{(]/g,''); //remove parens and square brackets
        // console.log('text after: ' + text);
        // console.log('the new imagepath: ' + newpath);
        // - write the output text to a log file
	      fs.appendFile('outputpost.txt',text, function(err){
		      if(err) {console.log('outputpost appendFile error: ' + err);res.redirect('/error');}
		      else console.log('Post-log built successfully.');
	        });
        // set text equal to the text split by ':' in order to filter out 'ingredients:'
        text = text.split('ents:');
        // if there's no text[1], then it couldn't find the colon. ask to scan again.
        if(!text[1]) { console.log("couldn't find the colon"); res.redirect('/scan?rescan=true')}
        
        else {
          /*
          var looptext = '';
          for (var z=0;z<text.length;z++){
            looptext += text[z];
          }
          text = looptext;
          */ // no need to loop through now since we split by 'ents'
          text = text[1].split(/\.|\,|\:|\sand\s/); // split by period, comma, colon, 'and'

          // spellcheck the OCR text before checking them against the user allergies
          /*
          for (var s=0;s<text.length;s++){
            console.log('Original: ' + text[s]);
            text[s] = spellcheck(text[s]);
            console.log('Result: ' + text[s]);
            console.log('\n----------\n');
          }
          */

          // TEST: console.log('the text: ' + text);
          // TEST: console.log('the check: ' + checkAllergies);
          // TEST: console.log(checkAllergies.contains('peanuts'));



          // insert allergies objects, with name: and match: true if current one is in the checkAllergies array
          eachtext: //each object in text
            console.log('in eachtext loop')
            console.log(text);
            for(var t=0;t<text.length;t++){
              text[t] = text[t].replace(/[^a-zA-Z0-9\s]/g, ''); // cleans the text up; removes anything that's not a letter or number or space or hyphen(?) \- for hyphen escaped
              if(text[t] != ''){ // only consider the text if it's nonempty
                text[t] = text[t].trim();
                var subwords = text[t].split(' '); //'partially hydrogenated corn syrup' -> ['partially', 'hydrogenated', 'corn', 'syrup']
                subwords.push(text[t]); // add the whole subword as well, e.g. 'vitamin', 'd', 'vitamin d'

            eachsubword:
                for(var s=0;s<subwords.length;s++){ //for each of 'partially', 'hydrogenated', etc.

            eachallergy: //check if the any of the allergies are in the current subword e.g. allergy: 'soy', subword: 'soybean'
                  for(var q=0;q<checkAllergies.length;q++){
                    if( subwords[s].indexOf(checkAllergies[q]) >= 0 ){ // break out of current and subword loop, go to next text[t]
                      finalList.push({name:text[t],match:true}); 
                      matchCount++; 
                      console.log('found: ' + checkAllergies[q] + ' in: ' + subwords[s]); 
                      break eachsubword; } 
                  }// end eachallergy

                if (s==subwords.length-1) { finalList.push({name: text[t], match:false}); /* console.log('no match #' + s) */ }; // if at end of loop and we haven't broken yet, then no match

                }// end eachsubword

              }
            }// end eachtext;



          // set the current session outtext to nodecr's result text, split by comma or period
          // TODO -done- only skip the first colon for ingredients, but add any other instances of colons
          req.session.outtext = finalList;
          req.session.matchcount = matchCount;
          // delete the temporary image files
            fs.unlink(newpath);
  	        fs.unlink(pathToImage);
          // emit a 'done' event on the controller for whichever listeners are listening to it
            // globals.controller.emit('done', text);
          res.redirect('/results');
        }; // end if else statement
      };
    });
  }; // end function ocr;
} // end /exports.post;
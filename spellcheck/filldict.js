// filldict.js - a function to fill up a dictionary from a file

var spellchecker = require( "spell" );

var file = require( "fs" );

var stringify = require( "./define" ).stringify;

var fill = function( dict, filepath )
{
  /*
   * filepath refers to the path of a file, preferably in plaintext format, to
   * read the dictionary data from. This file can be formatted in any way,
   * since spell is designed to read in words from sentences & passages.
   * This function returns a filled dictionary.
   */

  var dictionary = dict;

  console.log( "Filling dictionary from [" + filepath + "]..." );

  dictionary.load( file.readFileSync( filepath, "utf8" ) );

  console.log('Done filling dictionary!');

  return dictionary;
}

var save = function( dict, filepath )
{
  console.log( "Saving dictionary to [" + filepath + "]..." );
  file.writeFileSync( filepath, dict.export().toString() );
}

exports.fill = fill;
exports.save = save;

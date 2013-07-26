// filldict.js - a function to fill up a dictionary from a file

var dict = require( "spell" );

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

  return dictionary;
}

//var correct_dictionary = function( dict, suggestions )
//{
//  console.log( "  Possible values:" );
//  for( var i = 0; i < suggestions.length; i++ )
//  {
//    console.log( "   " + suggestions[i]["word"] );
//  }
//
//  console.log( "\n   Correct value?" );
//
//  process.stdout.write( "   [\"\b" );
//
//  process.stdin.resume();
//  process.stdin.setEncoding( "utf8" );
//
//  var dictionary = dict;
//
//  process.stdin.on( "data", function( chunk )
//  {
//    var wrd = chunk.toString(); wrd = wrd.substring( 0, wrd.length - 1 );
//    dictionary.add_word( wrd );
//
//    return dictionary;
//  });
//}

exports.fill = fill;
//exports.correct = correct_dictionary;

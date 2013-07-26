var spellcheck = require( "spell" );

var filldict = require( "./filldict" );

var define = require( "./define" ).define;
var stringify = require( "./define" ).stringify;

var correct = function( dict, word )
{
  var dictionary = dict;
  //dictionary = filldict.correct( dictionary, define( dictionary, word ) );
  console.log( define( dictionary, word ) );

  return dictionary;
}

exports.correct = correct;
//exports.correct_dictionary = filldict.correct;

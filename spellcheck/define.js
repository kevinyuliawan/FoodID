// A "define" function to be used for outputting suggestions

var spellcheck = require( "spell" );

var define = function( dict, srch )
{
  /*
   * `dict' refers to a dictionary from spell. `srch' refers to a word to
   *  search for.
   */

  if( srch == undefined )
    return undefined;

  /* Divide the word up by spaces in the event that it is a composite of
   * multiple words
   */
  var subwords = srch.split( /( |\n)/ );
  
  // If it is in fact only one word long, we don't have a problem.
  if( subwords.length == 1 )
    return dict.lucky( srch );

  // Otherwise, for every subword, add the best result.
  var returns = "";

  for( var i = 0; i < subwords.length; i++ )
  {
    returns += dict.lucky( subwords[i] );

    // All but the last subword are separated by a space, as they were.
    if( i < (subwords.length - 1) )
      returns += ' ';
    }

  return returns;
}

// Stringify is used to create a string out of a suggestion.
var stringify = function( suggestion )
{
  return suggestion["word"];
}

exports.define = define;
exports.stringify = stringify;

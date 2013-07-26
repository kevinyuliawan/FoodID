// A "define" function to be used for outputting suggestions

var spellcheck = require( "spell" );

var define = function( dict, srch )
{
  /*
   * `dict' refers to a dictionary from spell. `srch' refers to a word to
   *  search for.
   */

  return dict.suggest( srch );
}

// Stringify is used to create a string out of a suggestion.
var stringify = function( suggestion )
{
  return suggestion["word"];
}

exports.define = define;
exports.stringify = stringify;

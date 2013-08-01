  // custom spellchecking variables to initialize it when the app starts
var spell = require('spell')
  , spellcheck = require('./spellcheck/define').define
  , filldict = require('./spellcheck/filldict').fill
  , dictfile = ("./spellcheck/dict/ingred-big.txt");


  // global variables to be used
  var dictionary;


  exports.initializeDict = function(){
    dictionary = filldict( spell(), dictfile );
  }

  exports.spellcheck = function(string){
    var result = spellcheck(dictionary, string)
    return result;
  }

  exports.addtoDictionary = function(string){
    dictionary.add_word(string);
  }

  // dictionary needs to be global so that it's ready to go once initialized

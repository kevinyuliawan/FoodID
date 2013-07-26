// A temporary measure to take in string values in order to correct data

var sys = require( "sys" );

var stdin = process.openStdin();

stdin.addListener( "data", function( d )
{
  // note: d is an object, and when converted to a string it will
  // end with a linefeed. so we (rather crudely) account for that
  // with toString() and then substring()
  return d.toString().substring( 0, d.length - 1 );
});

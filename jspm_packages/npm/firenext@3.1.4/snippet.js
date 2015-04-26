/* */ 
var Firenext = require("./index");
var ref = new Firenext('https://jogabo-test.firebaseio.com');
ref.child('foo').on('child_removed', function() {
  console.log('child was removed...');
});

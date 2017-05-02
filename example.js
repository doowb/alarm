'use strict';

var alarm = require('./');
var now = new Date();
var date = new Date(+now + 2000);
alarm(date, function() {
  console.log('Hello, world!');
});
console.log('alarm set for 2 seconds from now');

var count = 0;
var cancel = alarm.recurring(1000, function() {
  console.log((count++) + ' BEEP BEEP BEEP!');
  if (count >= 5) {
    cancel();
  }
});

console.log('recurring alarm set for 1 second intervals (will cancel after 5 seconds)');

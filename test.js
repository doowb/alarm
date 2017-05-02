'use strict';

require('mocha');
var assert = require('assert');
var alarm = require('./');

describe('alarm', function() {
  it('should export a function', function() {
    assert.equal(typeof alarm, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      alarm();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected second argument to be a function');
      cb();
    }
  });

  it('should execute the function after 1 second', function(cb) {
    var now = new Date();
    var date = new Date(+now + 1000);
    alarm(date, function() {
      assert.equal((new Date()).toString(), date.toString());
      cb();
    });
  });

  it('should cancel the alarm', function(cb) {
    var now = new Date();
    var date = new Date(+now + 1000);
    var cancel = alarm(date, function() {
      cb(new Error('expected the alarm to be cancelled'));
    });
    cancel();
    cb();
  });

  it('should execute the function every second, 5 times', function(cb) {
    this.timeout(6000);
    var count = 0;
    var cancel = alarm.recurring(1000, function() {
      count++;
      if (count >= 5) {
        assert.equal(count, 5);
        cancel();
        return cb();
      }
      assert(count < 5, 'expected alarm to execute 5 times');
    });
  });
});

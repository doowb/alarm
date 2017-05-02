'use strict';

require('mocha');
var assert = require('assert');
var alarm = require('./');

describe('alarm', function() {
  it('should export a function', function() {
    assert.equal(typeof alarm, 'function');
  });

  it('should export an object', function() {
    assert(alarm);
    assert.equal(typeof alarm, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      alarm();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });

});
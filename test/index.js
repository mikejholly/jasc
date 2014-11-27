'use strict';

var assert = require('assert');
var jasc   = require('../index');

describe('seq', function() {

  it('should run functions in seqence', function(done) {

    var s = jasc.seq();
    var c = 0;

    s(function(fn) {
      c = 1; fn();
    });

    s(function(fn) {
      assert.equal(c, 1);
      c = 5; fn();
    });

    s(function(err) {
      assert.equal(err, null);
      assert.equal(c, 5);
      done();
    }, true);

  });

  it('should handle errs', function(done) {

    var s = jasc.seq();
    var c = 0;

    s(function(fn) {
      c = 1;
      fn(new Error('ERROR!'));
    });

    s(function(fn) {
      assert.equal(c, 1);
      c = 5; fn();
    });

    s(function(err) {
      assert(err);
      assert.equal(err.message, 'ERROR!');
      assert.equal(c, 1);
      done();
    }, true);

  });

});

describe('map', function() {

});

describe('each', function() {

});

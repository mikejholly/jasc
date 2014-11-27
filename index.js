'use strict';

function argArray(args) {
  return [].slice.call(args, 0);
}

function seq() {
  var fns  = [];
  var last = null;

  var wrap = function() {
    var args = argArray(arguments);
    var err = args.shift();
    if (err) return last(err);
    var fn = fns.shift();
    if (fn) {
      args.push(wrap);
    } else {
      fn = last;
      args.shift(null);
    }
    fn.apply(fn, args);
  };

  return function(fn, run) {
    fns.push(fn);
    if (run) {
      last = fns.pop();
      wrap();
    }
  };
}

function par() {

}

function map() {
  var args = [].slice.call(arguments, 0);
  var list = args.shift();
  var last = args.pop();
  var fn = args.shift();
  var results = [];
  var c = 0;

  list.forEach(function(item) {
    fn(item, function(err, result) {
      if (err) return last(err);
      results.push(result);
      if (c++ == args.length - 1) {
        last(null, results);
      }
    });
  });
}

exports.seq  = seq;
exports.map  = map;
exports.each = map;

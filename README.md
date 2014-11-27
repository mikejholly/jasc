# Just a Small Concurrency Library

JASC is a tiny and simple library for Node.js concurrency. It's inspired by async but intended to be ultra slim and pretty to use.

## API

* `jasc.seq`
* `jasc.each`
* `jasc.map`

## `jasc.seq`

Invoke `jasc.seq` to create a new chained list of functions. Pass `true` on the last invokation to run the sequence.

```js
var s = jasc.seq();

s(doSomething);

s(function(arg, arg, fn) {
  processResults(arg, arg, fn);
});

s(console.log, true); // The last function requires a true flag
```

## `jasc.map`

Loops over an array and runs `fn` for each element.

```js
jasc.map(['foo', 'bar'], function(fn) {

}, function(err, result) {

});
```

## `jasc.each`

Similar to map but does not return results. Useful to set variables in outer scope.

```js
jasc.each(['foo', 'bar'], function(fn) {

}, function(err) {

});
```

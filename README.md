"containSubsetInOrder" object properties matcher for [Chai](http://chaijs.com/) assertion library

Installation
===========

`npm install --save-dev chai-subset-in-order`

Usage
=====

common.js
```js
var chai = require('chai');
var chaiSubset = require('chai-subset-in-order');
chai.use(chaiSubset);
```

in your spec.js
```js
var obj = {
	a: 'b',
	c: 'd',
	e: {
		foo: 'bar',
		baz: {
			qux: 'quux'
		}
	}
};
	
expect(obj).to.containSubsetInOrder({
	a: 'b',
	e: {
		baz: {
			qux: 'quux'
		}
	}
});
//or with 'not'
expect(obj).to.not.containSubsetInOrder({
	g: 'whatever'
});
```

Also works good with arrays and `should` interface
```js
var list = [{a: 'a', b: 'b'}, {v: 'f', d: {z: 'g'}}];

list.should.containSubsetInOrder([{a:'a'}]); //Assertion error is not thrown
list.should.containSubsetInOrder([{a:'a',  b: 'b'}]); //Assertion error is not thrown

list.should.containSubsetInOrder([{a:'a', b: 'bd'}]);
/*throws
AssertionError: expected
[
    {
        "a": "a",
        "b": "b"
    },
    {
        "v": "f",
        "d": {
            "z": "g"
        }
    }
]
to contain subset 
[ { a: 'a', b: 'bd' } ]
*/
```

and with `assert` interface
```js
assert.containSubsetInOrder({a: 1, b: 2}, {a: 1});
```

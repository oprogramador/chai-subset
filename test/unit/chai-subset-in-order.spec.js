describe('plain object', function() {
	var testedObject = {
		a: 'b',
		c: 'd'
	};

	it('should pass for smaller object', function() {
		expect(testedObject).to.containSubsetInOrder({
			a: 'b'
		});
	});

	it('should pass for same object', function() {
		expect(testedObject).to.containSubsetInOrder({
			a: 'b',
			c: 'd'
		});
	});

	it('should pass for similar, but not the same object', function() {
		expect(testedObject).to.not.containSubsetInOrder({
			a: 'notB',
			c: 'd'
		});
	});
});

describe('complex object', function() {
	var testedObject = {
		a: 'b',
		c: 'd',
		e: {
			foo: 'bar',
			baz: {
				qux: 'quux'
			}
		}
	};

	it('should pass for smaller object', function() {
		expect(testedObject).to.containSubsetInOrder({
			a: 'b',
			e: {
				foo: 'bar'
			}
		});
	});

	it('should pass for smaller object', function() {
		expect(testedObject).to.containSubsetInOrder({
			e: {
				foo: 'bar',
				baz: {
					qux: 'quux'
				}
			}
		});
	});

	it('should pass for same object', function() {
		expect(testedObject).to.containSubsetInOrder({
			a: 'b',
			c: 'd',
			e: {
				foo: 'bar',
				baz: {
					qux: 'quux'
				}
			}
		});
	});

	it('should pass for similar, but not the same object', function() {
		expect(testedObject).to.not.containSubsetInOrder({
			e: {
				foo: 'bar',
				baz: {
					qux: 'notAQuux'
				}
			}
		});
	});
});

describe('circular objects', function() {
	var object = {};

	before(function() {
		object.arr = [
			object, object
		];
		object.arr.push(object.arr);
		object.obj = object;
	});

	it('should contain subdocument', function() {
		expect(object).to.containSubsetInOrder({
			arr: [
				{arr: []},
				{arr: []},
				[
					{arr: []},
					{arr: []}
				]
			]
		});
	});

	it('should not contain similar object', function() {
		expect(object).to.not.containSubsetInOrder({
			arr: [
				{arr: ['just random field']},
				{arr: []},
				[
					{arr: []},
					{arr: []}
				]
			]
		});
	});
});

describe('comparison of non objects', function () {
	it('should fail if actual subset is null', function () {
		expect(null).to.not.containSubsetInOrder({a: 1});
	});

	it('should fail if expected subset is not a object', function () {
		expect({a: 1}).to.not.containSubsetInOrder(null);
	});

	it('should not fail for same non-object (string) variables', function () {
		expect('string').to.containSubsetInOrder('string');
	});
});

describe('assert style of test', function () {
	it('should find subset', function () {
		var assert = require('chai').assert;
		assert.containSubsetInOrder({a: 1, b: 2}, {a: 1});
	});
});

describe('comparison of dates', function() {
	it('should pass for the same date', function() {
		expect(new Date('2015-11-30')).to.containSubsetInOrder(new Date('2015-11-30'));
	});

	it('should pass for the same date if nested', function() {
		expect({a: new Date('2015-11-30')}).to.containSubsetInOrder({a: new Date('2015-11-30')});
	});

	it('should fail for a different date', function() {
		expect(new Date('2015-11-30')).to.not.containSubsetInOrder(new Date('2012-02-22'));
	});

	it('should fail for a different date if nested', function() {
		expect({a: new Date('2015-11-30')}).to.not.containSubsetInOrder({a: new Date('2012-02-22')});
	});

	it('should fail for invalid expected date', function() {
		expect(new Date('2015-11-30')).to.not.containSubsetInOrder(new Date('not valid date'));
	});

	it('should fail for invalid actual date', function() {
		expect(new Date('not valid actual date')).to.not.containSubsetInOrder(new Date('not valid expected date'));
	});
});
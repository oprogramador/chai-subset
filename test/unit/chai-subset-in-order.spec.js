describe('chai-subset-in-order', function() {
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

  describe('basic order', function() {
    var testedObject = [
      {
        foo: 3,
        bar: 90,
      },
      {
        baz: 90,
      },
    ];

    it('should pass for correct order', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          foo: 3,
        },
        {
          baz: 90,
        },
      ]);
    });

    it('should not pass for incorrect order', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          baz: 90,
        },
        {
          foo: 3,
        },
      ]);
    });
  });

  describe('one object from array', function() {
    var testedObject = [
      {
        foo: 3,
        bar: 90,
      },
      {
        baz: 200,
      },
    ];

    it('should pass for partial first object with the first property', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          foo: 3,
        }
      ]);
    });

    it('should pass for partial first object with the second property', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          bar: 90,
        }
      ]);
    });

    it('should pass for the full first object', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          foo: 3,
          bar: 90,
        }
      ]);
    });

    it('should pass for the full second object', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          baz: 200,
        }
      ]);
    });

    it('should not pass for the second object with changed value', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          baz: 201,
        }
      ]);
    });

    it('should not pass for the second object with changed key', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          baz1: 200,
        }
      ]);
    });

    it('should not pass for full first object containing additional key', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          foo: 3,
          bar: 90,
          baz: 90,
        },
      ]);
    });

    it('should not pass for partial first object containing additional key', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          foo: 3,
          baz: 90,
        },
      ]);
    });

    it('should not pass for the second object containing additional key', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          baz: 200,
          foo: 200,
        }
      ]);
    });
  });

  describe('many objects from array', function() {
    var testedObject = [
      {
        foo: 3,
        bar: 90,
      },
      {
        foo: 9999,
        bar1: 131313,
      },
      {
        baz: 200,
      },
      {
        baz2: 200,
      },
    ];

    it('should pass when the expected array is the same like the given one', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          foo: 3,
          bar: 90,
        },
        {
          foo: 9999,
          bar1: 131313,
        },
        {
          baz: 200,
        },
        {
          baz2: 200,
        },
      ]);
    });

    it('should pass when the expected array contains the first element from the given array', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          foo: 3,
          bar: 90,
        },
        {
          foo: 9999,
          bar1: 131313,
        },
      ]);
    });

    it('should pass when the expected array contains the last element from the given array', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          baz: 200,
        },
        {
          baz2: 200,
        },
      ]);
    });

    it('should not pass when the expected array contains elements from the given array in incorrect order including the first element', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          foo: 9999,
          bar1: 131313,
        },
        {
          foo: 3,
          bar: 90,
        },
      ]);
    });

    it('should not pass when the expected array contains elements from the given array in incorrect order including the last element', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          baz2: 200,
        },
        {
          baz: 200,
        },
      ]);
    });

    it('should not pass when the expected array contains an additional element', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          foo: 3,
          bar: 90,
        },
        {
          foo: 9999,
          bar1: 131313,
        },
        {
          'non-existent': 9999,
        },
      ]);
    });

    it('should not pass when an element of the expected array contains an additional key', function() {
      expect(testedObject).to.not.containSubsetInOrder([
        {
          foo: 3,
          bar: 90,
        },
        {
          foo: 9999,
          bar1: 131313,
          'non-existent': 0,
        },
      ]);
    });

    it('should pass when the expected array contains not all keys', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          foo: 3,
        },
        {
          foo: 9999,
        },
      ]);
    });

    it('should pass when the expected array contains the same element multiple times', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
          foo: 3,
        },
        {
          foo: 3,
        },
      ]);
    });

    it('should pass when the expected array contains only empty objects', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
        },
        {
        },
      ]);
    });

    it('should pass when the expected array contains only empty objects in amount greater then size of the given array', function() {
      expect(testedObject).to.containSubsetInOrder([
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
      ]);
    });
  });
});
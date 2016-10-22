(function() {
  const matchArray = require('./matchArray');
  (function(chaiSubset) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
      return module.exports = chaiSubset;
    } else if (typeof define === 'function' && define.amd) {
      return define(function() {
        return chaiSubset;
      });
    } else {
      return chai.use(chaiSubset);
    }
  })(function(chai, utils) {
    var Assertion = chai.Assertion;
    var assertionPrototype = Assertion.prototype;

    Assertion.addMethod('containSubsetInOrder', function (expected) {
      var actual = utils.flag(this, 'object');
      var showDiff = chai.config.showDiff;

      assertionPrototype.assert.call(this,
        compare(expected, actual),
        'expected #{act} to contain subset #{exp}',
        'expected #{act} to not contain subset #{exp}',
        expected,
        actual,
        showDiff
      );
    });

    chai.assert.containSubsetInOrder = function(val, exp, msg) {
      new chai.Assertion(val, msg).to.be.containSubsetInOrder(exp);
    };

    function compare(expected, actual) {
      if (typeof(actual) !== typeof(expected)) {
        return false;
      }
      if (typeof(expected) !== 'object' || expected === null) {
        return expected === actual;
      }
      if (!!expected && !actual) {
        return false;
      }

      if (Array.isArray(expected)) {
        if (typeof(actual.length) !== 'number') {
          return false;
        }
        return matchArray(expected, actual, compare);
      }

      if(expected instanceof Date && actual instanceof Date) {
        return expected.getTime() === actual.getTime();
      }

      return Object.keys(expected).every(function (key) {
        var eo = expected[key];
        var ao = actual[key];
        if (typeof(eo) === 'object' && eo !== null && ao !== null) {
          return compare(eo, ao);
        }
        return ao === eo;
      });
    }
  });

}).call(this);

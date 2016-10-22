function matchArray(expected, actual, compare) {
  var result = expected.reduce(function(accumulator, expectedElement) {
    if (accumulator === false) {
      return false;
    }
    var position = actual.findIndex(function(actualElement) {
      return compare(expectedElement, actualElement);
    });
    if (position < 0) {
      return false;
    }
    if (position < accumulator) {
      return false;
    }
    return position;
  }, 0);

  return result !== false;
}

module.exports = matchArray;

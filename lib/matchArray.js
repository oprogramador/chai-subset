function matchArray(expected, actual) {
  var result = expected.reduce(function(accumulator, expectedElement) {
    if (accumulator === false) {
      return false;
    }
    var position = actual.indexOf(expectedElement);
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

var matchArray = require('../../lib/matchArray');

describe('matchArray', function() {
  it('returns true for the same arrays', function() {
    var givenData = [1, 3, 5];
    var expectedData = [1, 3, 5];
    expect(matchArray(expectedData, givenData)).to.be.true;
  });

  it('returns true when given array includes expected one in correct order', function() {
    var givenData = [1, 3, 8, 4, 11];
    var expectedData = [3, 8];
    expect(matchArray(expectedData, givenData)).to.be.true;
  });

  it('returns true when expected array is empty', function() {
    var givenData = [1, 3, 8, 4, 11];
    var expectedData = [];
    expect(matchArray(expectedData, givenData)).to.be.true;
  });

  it('returns true when both array are empty', function() {
    var givenData = [];
    var expectedData = [];
    expect(matchArray(expectedData, givenData)).to.be.true;
  });

  it('returns false when given array includes expected one in incorrect order', function() {
    var givenData = [1, 3, 8, 4, 11];
    var expectedData = [8, 3];
    expect(matchArray(expectedData, givenData)).to.be.false;
  });

  it('returns false when given array is empty but expected one is not empty', function() {
    var givenData = [];
    var expectedData = [1, 2];
    expect(matchArray(expectedData, givenData)).to.be.false;
  });

  it('returns false when in expected array there are elements not present in given data', function() {
    var givenData = [5, 6, 1];
    var expectedData = [1, 3];
    expect(matchArray(expectedData, givenData)).to.be.false;
  });

  it('returns true when expected array contains only the first element from the given array', function() {
    var givenData = [5, 6, 1];
    var expectedData = [5];
    expect(matchArray(expectedData, givenData)).to.be.true;
  });

  it('returns true when expected array contains only the last element from the given array', function() {
    var givenData = [5, 6, 1];
    var expectedData = [1];
    expect(matchArray(expectedData, givenData)).to.be.true;
  });

  it('returns false when expected array contains the first element from the given array and a not present element', function() {
    var givenData = [5, 6, 1];
    var expectedData = [5, 300];
    expect(matchArray(expectedData, givenData)).to.be.false;
  });

  it('returns false when expected array contains the last element from the given array and a not present element', function() {
    var givenData = [5, 6, 1];
    var expectedData = [1, 400];
    expect(matchArray(expectedData, givenData)).to.be.false;
  });

  it('returns false when expected array contains a not present element and the first element from the given array', function() {
    var givenData = [5, 6, 1];
    var expectedData = [300, 5];
    expect(matchArray(expectedData, givenData)).to.be.false;
  });

  it('returns false when expected array contains a not present element and the last element from the given array', function() {
    var givenData = [5, 6, 1];
    var expectedData = [400, 1];
    expect(matchArray(expectedData, givenData)).to.be.false;
  });

  it('returns true when expected array contains only an object from the given array', function() {
    var object = {};
    var givenData = [5, object, 1];
    var expectedData = [object];
    expect(matchArray(expectedData, givenData)).to.be.true;
  });

  it('returns false when expected array contains only an object not present in the given array', function() {
    var givenData = [5, {}, 1];
    var expectedData = [{}];
    expect(matchArray(expectedData, givenData)).to.be.false;
  });
});

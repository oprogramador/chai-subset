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

  it('returns false when given array includes expected one in incorrect order', function() {
    var givenData = [1, 3, 8, 4, 11];
    var expectedData = [8, 3];
    expect(matchArray(expectedData, givenData)).to.be.false;
  });
});


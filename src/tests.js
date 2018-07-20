const assert = require('assert');
const vm = require('vm');
const fs = require('fs');

var code = fs.readFileSync('./js/util.js');
vm.runInThisContext(code);

const rangeTest = (name, set, expectedLength, expectedStart, expectedEnd) => {
  describe(name, function() {
    it('Start', function() {
      assert.equal(set[0][0], expectedStart[0]);
      assert.equal(set[0][1], expectedStart[1]);
    });
    it('Last', function() {
      assert.equal(set[expectedLength - 1][0], expectedEnd[0]);
      assert.equal(set[expectedLength - 1][1], expectedEnd[1]);
    });
  });
};

describe('Test Range from (3,3)', function() {
  const range = Utilities.getRanges(3, 3);
  rangeTest(
    'DiagonalBottomLeftToTopRight',
    range.DiagonalBottomLeftToTopRight(),
    7,
    [0, 0],
    [6, 6]
  );
  rangeTest(
    'DiagonalTopLeftToBottomRight',
    range.DiagonalTopLeftToBottomRight(),
    7,
    [0, 6],
    [6, 0]
  );
  rangeTest(
    'VerticalBottomToTop',
    range.VerticalBottomToTop(),
    7,
    [3, 0],
    [3, 6]
  );
  rangeTest(
    'HorizontalLeftToRight',
    range.HorizontalLeftToRight(),
    7,
    [0, 3],
    [6, 3]
  );
});

describe('Test Range from (5,1)', function() {
  const range = Utilities.getRanges(5, 1);
  rangeTest(
    'DiagonalBottomLeftToTopRight',
    range.DiagonalBottomLeftToTopRight(),
    4,
    [4, 0],
    [7, 3]
  );
  rangeTest(
    'DiagonalTopLeftToBottomRight',
    range.DiagonalTopLeftToBottomRight(),
    5,
    [2, 4],
    [6, 0]
  );
  rangeTest(
    'VerticalBottomToTop',
    range.VerticalBottomToTop(),
    5,
    [5, 0],
    [5, 4]
  );
  rangeTest(
    'HorizontalLeftToRight',
    range.HorizontalLeftToRight(),
    6,
    [2, 1],
    [7, 1]
  );
});

describe('Test Range from (0,5)', function() {
  const range = Utilities.getRanges(0, 5);
  rangeTest(
    'DiagonalBottomLeftToTopRight',
    range.DiagonalBottomLeftToTopRight(),
    3,
    [0, 5],
    [2, 7]
  );
  rangeTest(
    'DiagonalTopLeftToBottomRight',
    range.DiagonalTopLeftToBottomRight(),
    4,
    [0, 5],
    [3, 2]
  );
  rangeTest(
    'VerticalBottomToTop',
    range.VerticalBottomToTop(),
    6,
    [0, 2],
    [0, 7]
  );
  rangeTest(
    'HorizontalLeftToRight',
    range.HorizontalLeftToRight(),
    4,
    [0, 5],
    [3, 5]
  );
});
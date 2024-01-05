import { equal } from 'node:assert';

import { getPossibleMatchSets, getRanges } from './utils';

const rangeTest = (
    name: string,
    set: any[][],
    expectedLength: number,
    expectedStart: any[],
    expectedEnd: any[]
) => {
    describe(name, function () {
        it('Start', function () {
            equal(set[0][0], expectedStart[0]);
            equal(set[0][1], expectedStart[1]);
        });
        it('Last', function () {
            equal(set[expectedLength - 1][0], expectedEnd[0]);
            equal(set[expectedLength - 1][1], expectedEnd[1]);
        });
    });
};

describe('Test Sets from (2,2)', function () {
    const sets = getPossibleMatchSets(2, 2);
    describe('sets', function () {
        it('Count', function () {
            equal(sets.length, 8);
        });
    });
});

describe('Test Sets from (0,0)', function () {
    const sets = getPossibleMatchSets(0, 0);
    describe('sets', function () {
        it('Count', function () {
            equal(sets.length, 3);
        });
    });
});

describe('Test Sets from (0,2)', function () {
    const sets = getPossibleMatchSets(0, 0);
    describe('sets', function () {
        it('Count', function () {
            equal(sets.length, 3);
        });
    });
});

describe('Test Ranges from (3,3)', function () {
    const range = getRanges(3, 3);
    rangeTest('DiagonalBottomLeftToTopRight', range.DiagonalBottomLeftToTopRight(), 7, [0, 0], [6, 6]);
    rangeTest('DiagonalTopLeftToBottomRight', range.DiagonalTopLeftToBottomRight(), 7, [0, 6], [6, 0]);
    rangeTest('VerticalBottomToTop', range.VerticalBottomToTop(), 7, [3, 0], [3, 6]);
    rangeTest('HorizontalLeftToRight', range.HorizontalLeftToRight(), 7, [0, 3], [6, 3]);
});

describe('Test Ranges from (5,1)', function () {
    const range = getRanges(5, 1);
    rangeTest('DiagonalBottomLeftToTopRight', range.DiagonalBottomLeftToTopRight(), 4, [4, 0], [7, 3]);
    rangeTest('DiagonalTopLeftToBottomRight', range.DiagonalTopLeftToBottomRight(), 5, [2, 4], [6, 0]);
    rangeTest('VerticalBottomToTop', range.VerticalBottomToTop(), 5, [5, 0], [5, 4]);
    rangeTest('HorizontalLeftToRight', range.HorizontalLeftToRight(), 6, [2, 1], [7, 1]);
});

describe('Test Ranges from (0,5)', function () {
    const range = getRanges(0, 5);
    rangeTest('DiagonalBottomLeftToTopRight', range.DiagonalBottomLeftToTopRight(), 3, [0, 5], [2, 7]);
    rangeTest('DiagonalTopLeftToBottomRight', range.DiagonalTopLeftToBottomRight(), 4, [0, 5], [3, 2]);
    rangeTest('VerticalBottomToTop', range.VerticalBottomToTop(), 6, [0, 2], [0, 7]);
    rangeTest('HorizontalLeftToRight', range.HorizontalLeftToRight(), 4, [0, 5], [3, 5]);
});

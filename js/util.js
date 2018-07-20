const Utilities = (() => {
  function getRanges(x, y) {
    return {
      VerticalBottomToTop: () => {
        const range = [];
        let testY = y + 0,
          maxRange = 3;
        // 3 up
        while (--testY > -1 && range.length < maxRange) {
          range.push([x, testY]);
        }
        range.reverse();
        range.push([x, y]);
        testY = y + 0;
        maxRange = range.length + 3;
        // 3 down
        while (++testY < 8 && range.length < maxRange) {
          range.push([x, testY]);
        }
        return range;
      },
      HorizontalLeftToRight: () => {
        const range = [];
        let testX = x + 0,
          maxRange = 3;
        // 3 left
        while (--testX > -1 && range.length < maxRange) {
          range.push([testX, y]);
        }
        range.reverse();
        range.push([x, y]);
        testX = x + 0;
        maxRange = range.length + 3;
        // 3 right
        while (++testX < 8 && range.length < maxRange) {
          range.push([testX, y]);
        }
        return range;
      },
      DiagonalBottomLeftToTopRight: () => {
        const range = [];
        let testX = x + 0,
          testY = y + 0,
          maxRange = 3;
        // 3 left
        while (--testX > -1 && --testY > -1 && range.length < maxRange) {
          range.push([testX, testY]);
        }
        range.reverse();
        range.push([x, y]);
        testX = x + 0;
        testY = y + 0;
        maxRange = range.length + 3;
        // 3 right
        while (++testX < 8 && ++testY < 8 && range.length < maxRange) {
          range.push([testX, testY]);
        }
        return range;
      },
      DiagonalTopLeftToBottomRight: () => {
        const range = [];
        let testX = x + 0,
          testY = y + 0,
          maxRange = 3;
        // 3 left
        while (--testX > -1 && ++testY < 8 && range.length < maxRange) {
          range.push([testX, testY]);
        }
        range.reverse();
        range.push([x, y]);
        testX = x + 0;
        testY = y + 0;
        maxRange = range.length + 3;
        // 3 right
        while (++testX < 8 && --testY > -1 && range.length < maxRange) {
          range.push([testX, testY]);
        }
        return range;
      }
    };
  }
  function wait(time, willReject = false) {
    return new Promise((resolve, reject) =>
      setTimeout(() => (willReject ? reject() : resolve()), time)
    );
  }
  return { getRanges, wait };
})();

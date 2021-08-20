export function getRandomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function showElements(...elements) {
    elements.forEach((el) => (el.style.display = "inherit"));
}

export function hideElements(...elements) {
    elements.forEach((el) => (el.style.display = "none"));
}

export function getRanges(x, y) {
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
        DiagonalBottomLeftToTopRight: (): [number, number][] => {
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
        },
    };
}

export function getPossibleMatchSets(x, y): [number, number][][] {
    const rangeTypes = getRanges(x, y);
    return [
        rangeTypes.DiagonalBottomLeftToTopRight(),
        rangeTypes.DiagonalTopLeftToBottomRight(),
        rangeTypes.HorizontalLeftToRight(),
        rangeTypes.VerticalBottomToTop(),
    ]
        .filter((points) => points.length >= 4)
        .reduce((sets, range) => {
            if (range.length > 4) {
                sets.push(range.slice(0, 4));
                sets.push(range.reverse().slice(0, 4).reverse());
            } else {
                sets.push(range);
            }
            return sets;
        }, []);
}

export function wait(time, willReject = false): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => (willReject ? reject() : resolve()), time));
}

export function listToArray(list: NodeList | HTMLCollectionOf<Element>) {
    return Array.prototype.slice.call(list) as HTMLElement[];
}

export function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

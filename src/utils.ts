export type PLAYER = 'player1' | 'player2';

export async function transition(
    element: HTMLElement,
    style: Partial<CSSStyleDeclaration>,
    durationMs: number,
    transitionTimingFunction: CSSStyleDeclaration['transitionTimingFunction']
) {
    return new Promise<void>((resolve) => {
        const transition = Object.keys(style)
            .map((key) => `${key} ${Math.round(durationMs)}ms ${transitionTimingFunction}`)
            .join(',');

        element.style.transition = transition;

        setTimeout(() => {
            Object.assign(element.style, style);
        }, 1);

        setTimeout(() => {
            element.style.transition = '';
            resolve();
        }, durationMs + 50);
    });
}

export const indexOfElement = (child: ChildNode | null) => {
    if (!child) return -1;
    return [...child.parentElement!.children].reduce((value, node, index) => {
        return node === child ? index : value;
    }, -1);
};

export const getElements = <T extends Element = HTMLElement>(selector: string) =>
    Array.from(document.querySelectorAll<T>(selector));

export const getElement = <T extends Element = HTMLElement>(selector: string) =>
    //
    getElements<T>(selector)[0];

export const createElement = <T>(templateId: string) => {
    const tempElement = document.createElement('temp');
    tempElement.innerHTML = getElement<HTMLDivElement>('template#' + templateId).innerHTML.trim();
    return tempElement.firstChild as T;
};

/**
 * The maximum is exclusive and the minimum is inclusive
 * @param min
 * @param max
 * @returns a random number between min and max
 */
export function getRandomMinMax(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function showElements(...elements: HTMLElement[]) {
    elements.forEach((el) => (el.style.display = 'inherit'));
}

export function hideElements(...elements: HTMLElement[]) {
    elements.forEach((el) => (el.style.display = 'none'));
}

export function getRanges(x: number, y: number) {
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
            const range: [number, number][] = [];
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

export function getPossibleMatchSets(x: number, y: number): [number, number][][] {
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
                sets.push(range.slice(0, 4) as any);
                sets.push(range.reverse().slice(0, 4).reverse() as any);
            } else {
                sets.push(range as any);
            }
            return sets;
        }, [] as [number, number][][]);
}

export async function wait(time: number, willReject = false): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => (willReject ? reject() : resolve()), time));
}

export function listToArray(list: NodeList | HTMLCollectionOf<Element>) {
    return Array.prototype.slice.call(list) as HTMLElement[];
}

export function getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

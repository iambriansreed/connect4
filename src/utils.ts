import getAiMove from './ai';
import { RANGES, ROW_COUNT, WIN_MESSAGE } from './constants';

async function transition(
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

async function wait(ms: number, callback?: () => void) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            callback?.();
            resolve();
        }, ms);
    });
}

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

function hideElements(...elements: HTMLElement[]) {
    elements.forEach((el) => el.classList.remove('show'));
}

function getWinningSet(): null | Point[] {
    let winSet: Point[] = [];

    for (const range of RANGES) {
        winSet = [];

        const lastPlay = state.at(-1);

        for (const [i, [xDiff, yDiff]] of range.points.entries()) {
            const [xNext, yNext] = [lastPlay.x + xDiff, lastPlay.y + yDiff];
            const point = state.getPlay(xNext, yNext);

            if (point?.player === lastPlay.player) {
                winSet.push(point);
                if (winSet.length === 4) return winSet;
            } else {
                const remainingRangeLength = range.points.length - i - 1;
                winSet = [];

                if (remainingRangeLength < 4) {
                    continue;
                }
            }
        }
    }

    return null;
}

const checkForTie = () => {
    return state.playsLength === 64;
};

const checkerId = ({ x, y }: Point) => `c-${x}-${y}`;

const isGameFinished = async () => {
    const winningSet = getWinningSet();

    if (winningSet) {
        app.winMessage.innerText = WIN_MESSAGE[state.isPlayerAi ? 'robot' : 'human'];

        winningSet.forEach((point) => {
            document.querySelector<HTMLElement>('#' + checkerId(point))?.classList.add('blink');
        });

        await wait(2000);

        dataShow(app.gameOver);
        return true;
    }

    if (checkForTie()) {
        dataShow(app.gameTie);
        return true;
    }

    // toggle turn
    state.togglePlayer();

    state.dropping(false);

    if (state.isPlayerAi) {
        dropChecker(getAiMove());
    }

    return false;
};

export async function humanDropChecker(x: number) {
    if (state.isDropping || state.isPlayerAi) return;

    await dropChecker(x);
}

const dropChecker = async (x: number) => {
    if (state.isDropping) return;

    const yNext = state.availableY(x);

    if (typeof yNext !== 'number') throw new Error('Invalid move: ' + JSON.stringify(yNext));

    state.dropping(true);
    // we don't actually drop the checker at the top instead
    // we hide the "nextChecker" create a new checker and drop it in place

    const startTopPos = app.nextChecker.getBoundingClientRect().top;
    app.nextChecker.style.opacity = '0';

    state.addPlay(x, yNext, state.player);
    {
        // copy nextChecker and add to column
        const newChecker = app.nextChecker.cloneNode(true) as HTMLElement;
        app.column[x].appendChild(newChecker);
        newChecker.setAttribute('style', '');
        newChecker.id = checkerId({ x, y: yNext });

        const endTopPos = newChecker.offsetTop + newChecker.getBoundingClientRect().height;

        // position new checker where next next checker was
        newChecker.style.top = startTopPos + 'px';
        newChecker.style.position = 'fixed';

        // transitionDuration should be dependent on how far the checker travels
        const inverseY = Math.abs(yNext - ROW_COUNT) + 1;
        const transitionDuration = inverseY * 75;

        newChecker.style.transition =
            'all ' + transitionDuration + 'ms cubic-bezier(0.33333, 0, 0.66667, 0.33333)';
        newChecker.style.transform = 'translateY(' + endTopPos + 'px)';

        await wait(transitionDuration, () => {
            newChecker.setAttribute('style', 'position: relative;');
        });
    }

    app.nextChecker.classList.toggle('player1');
    app.nextChecker.classList.toggle('player2');
    app.nextChecker.style.opacity = '1';

    if (await isGameFinished()) {
        return;
    }
};

export const start = () => {
    if (state.isDropping) return;

    hideElements(app.gameStart);

    if (state.isPlayerAi) {
        dropChecker(getAiMove());
    }
};

export const restart = async () => {
    app.nextChecker.classList.replace('player2', 'player1');

    // animate state.isDropping checkers
    app.columns.style.top = '0px';
    const topDistance = Math.round(window.outerHeight + window.outerHeight / 2);
    transition(
        app.columns,
        {
            transform: 'translateY(' + topDistance + 'px)',
        },
        topDistance / 2.5,
        'cubic-bezier(0.33333, 0, 0.66667, 0.33333)'
    ).then(() => {
        // remove checker elements
        app.columns.style.transform = '';
        app.columns.style.transition = '';
        app.columns.style.top = '0px';
        [...app.columns.children].forEach((col) => (col.innerHTML = ''));
        hideElements(app.gameOver);
        hideElements(app.gameTie);
        state.reset();
    });
};

export function moveNextChecker(colNumber: number) {
    app.nextChecker.style.left = colNumber * app.size.clientWidth + 'px';
}

export function NonNullish<T>(value: T, _index: number, _array: T[]): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

export function dataShow(group: HTMLElement, ms: number = 500) {
    group.classList.add('show');

    const elementsUnordered = Array.from(group.querySelectorAll('[data-show]')).map((element, index) => ({
        element,
        index: parseInt(element.getAttribute('data-show') || '0', 10) || index,
    }));

    const items = elementsUnordered.sort((a, b) => a.index - b.index);

    items.shift()?.element.classList.add('show');

    const interval = setInterval(() => {
        if (!items.length) {
            clearInterval(interval);
            return;
        }
        items.shift()?.element.classList.add('show');
    }, ms);
}

const putChecker = (x: number) => {
    const yNext = state.availableY(x);
    if (typeof yNext !== 'number') throw new Error('Invalid move: ' + JSON.stringify(yNext));
    const newChecker = app.nextChecker.cloneNode(true) as HTMLElement;
    app.column[x].appendChild(newChecker);
    newChecker.setAttribute('style', 'position: relative');
    newChecker.id = checkerId({ x, y: yNext });
};

export const loadGame = async (plays: Play[]) => {
    plays.forEach(({ x }) => {
        putChecker(x);
        app.nextChecker.classList.toggle('player1');
        app.nextChecker.classList.toggle('player2');
    });

    if (state.isPlayerAi) {
        dropChecker(getAiMove());
    }
};

import getAiMove from './ai';
import { RANGES, RANGE_LENGTH, ROW_COUNT, WIN_MESSAGE } from './constants';

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

function showElements(...elements: HTMLElement[]) {
    elements.forEach((el) => (el.style.display = 'inherit'));
}

function hideElements(...elements: HTMLElement[]) {
    elements.forEach((el) => (el.style.display = 'none'));
}

function getWinningSet(state: State): null | Point[] {
    let winSet: Point[] = [];

    for (const range of RANGES) {
        winSet = [];

        const lastPlay = state.at(-1);

        for (let i = 0; i < RANGE_LENGTH; i++) {
            const [xDiff, yDiff] = range.points[i];

            const [xNext, yNext] = [lastPlay.x + xDiff, lastPlay.y + yDiff];

            const point = state.getPlay(xNext, yNext);

            if (point?.player === lastPlay.player) {
                winSet.push(point);
                if (winSet.length === 4) return winSet;
            } else {
                const remainingRangeLength = RANGE_LENGTH - i - 1;
                // -
                winSet = [];
                if (remainingRangeLength < 4) {
                    continue;
                }
            }
        }
    }

    return null;
}

const checkForWin = () => {
    const winningSet = getWinningSet(state);
    return !!winningSet;
};

const checkForTie = () => {
    return state.playsLength === 64;
};

const isGameFinished = () => {
    if (checkForWin()) {
        app.winMessage.innerText = WIN_MESSAGE[state.player as Player];
        showElements(app.gameOver);
        state.dropping(false);
        return true;
    }

    if (checkForTie()) {
        showElements(app.gameTie);
        state.dropping(false);
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

export const dropChecker = async (x: number) => {
    if (state.isDropping) return;

    const yNext = state.availableY(x);

    if (typeof yNext !== 'number') throw new Error('Invalid move: ' + JSON.stringify(yNext));

    state.dropping(true);
    // we don't actually drop the checker at the top instead
    // we hide the "nextChecker" create a new checker and drop it in place

    const startTopPos = app.nextChecker.getBoundingClientRect().top;
    app.nextChecker.style.opacity = '0';

    {
        // copy nextChecker and add to column
        const newChecker = app.nextChecker.cloneNode(true) as HTMLElement;
        app.column[x].appendChild(newChecker);
        newChecker.setAttribute('style', '');

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

    state.addPlay(x, yNext, state.player);

    if (isGameFinished()) {
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

    if (state.isDropping) return;

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
        state.reset();
        hideElements(app.gameOver);
        hideElements(app.gameTie);
    });
};

export function moveNextChecker(colNumber: number) {
    app.nextChecker.style.left = colNumber * app.size.clientWidth + 'px';
}

export function NonNullish<T>(value: T, _index: number, _array: T[]): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

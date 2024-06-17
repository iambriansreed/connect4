import getAiMove from './ai';
import { COLUMN_COUNT, RANGES, ROW_COUNT, WIN_MESSAGE } from './constants';

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
    return state.playsLength === ROW_COUNT * COLUMN_COUNT;
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

        !state.debug && dataShow(app.gameOver);
        return true;
    }

    if (checkForTie()) {
        !state.debug && dataShow(app.gameTie);
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

const createChecker = ({ player, ...point }: Play) => {
    const newChecker = app.nextChecker.cloneNode(true) as HTMLElement;
    app.column[point.x].appendChild(newChecker);
    newChecker.setAttribute('style', '');
    newChecker.classList.remove('player1', 'player2');
    newChecker.classList.add(player);
    newChecker.id = checkerId(point);

    if (state.debug) {
        newChecker.innerText = state.playsLength.toString();
    }

    return newChecker;
};

const dropChecker = async (x: number, skipAnimation = false) => {
    if (state.isDropping) return;

    const yNext = state.availableY(x);

    if (typeof yNext !== 'number') throw new Error('Invalid move: ' + JSON.stringify(yNext));

    state.dropping(true);
    // we don't actually drop the checker at the top instead
    // we hide the "nextChecker" create a new checker and drop it in place

    const startTopPos = app.nextChecker.getBoundingClientRect().top;
    app.nextChecker.style.opacity = '0';

    const nextPlay = { x, y: yNext, player: state.player };
    state.addPlay(nextPlay);
    {
        // copy nextChecker and add to column
        const newChecker = createChecker(nextPlay);

        const endTopPos = newChecker.offsetTop + newChecker.getBoundingClientRect().height;

        if (skipAnimation) {
            //
        } else {
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
    }

    app.nextChecker.classList.toggle('player1');
    app.nextChecker.classList.toggle('player2');
    app.nextChecker.style.opacity = '1';

    if (await isGameFinished()) {
        return;
    }
};

export const start = async (event: MouseEvent) => {
    if (state.isDropping) return;

    hideElements(app.gameStart);

    if ((event.target as HTMLButtonElement).dataset.start === 'ai') {
        state.setAiPlayers('player1', 'player2');
        state.setDebug();
    }

    if (globalThis.loadGame) {
        await loadGame(globalThis.loadGame);
    }

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

        if (state.isPlayerAi) {
            dropChecker(getAiMove());
        }
    });
};

export function moveNextChecker(colNumber: number) {
    app.nextChecker.style.left = colNumber * app.size.clientWidth + 'px';
}

export function NonNullish<T>(value: T, _index: number, _array: T[]): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

export function dataShow(group: HTMLElement, ms: number = 250) {
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

const putChecker = async (play: Play) => {
    const yNext = state.availableY(play.x);
    if (typeof yNext !== 'number') throw new Error('Invalid move: ' + JSON.stringify(yNext));
    createChecker(play);
    state.addPlay(play);
    await wait(300);
};

export const loadGame = async (plays: Play[]) => {
    for (const play of plays) {
        await putChecker(play);
    }

    if (state.isPlayerAi) {
        dropChecker(getAiMove());
    }
};

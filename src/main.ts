import {
    PLAYER,
    createElement,
    getElement,
    getElements,
    getPossibleMatchSets,
    getRandomMinMax,
    hideElements,
    indexOfElement,
    showElements,
    transition,
} from './utils';
import './style.scss';

const ROW_COUNT = 6;
const COLUMN_COUNT = 7;

const WinMessage: Record<PLAYER, string> = {
    player1: 'Red Wins!',
    player2: 'Yellow Wins!',
};

const config = {
    defaultState: {
        currentPlayer: 'player1' as PLAYER,
        aiPlayers: ['player2' as PLAYER],
        history: [] as { x: number; y: number; player: string }[],
        dropping: 0,
    },
    defaultColumns: '',
};

Object.freeze(config);

type State = typeof config.defaultState;

function main() {
    const state: State = { ...config.defaultState };

    // @ts-ignore = todo: remove
    globalThis.state = () => state;

    const checkerTemplate = createElement<HTMLDivElement>('checker');
    const createCheckerElement = (player: PLAYER) => {
        const nextChecker = checkerTemplate.cloneNode(true) as HTMLDivElement;
        nextChecker.classList.add(player);
        return nextChecker;
    };

    const start = () => {
        if (state.dropping) return;
        hideElements(app.gameStart);
    };

    const reset = async () => {
        if (state.dropping) return;

        // animate dropping checkers
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
        });

        updateState(config.defaultState);
        hideElements(app.gameOver);
        hideElements(app.gameTie);
    };

    const getTurn = (x: number, y: number) => {
        return state.history.find((p) => p.x === x && p.y === y);
    };

    const updateState = (update: Partial<State>) => {
        return Object.assign(state, update);
    };

    const checkForWin = (x: any, y: number) => {
        const sets = getPossibleMatchSets(x, y);
        return sets.some((set) => set.every((pos) => getTurn(...pos)?.player === state.currentPlayer));
    };

    const checkForTie = () => {
        return state.history.length === 64;
    };

    const moveNextChecker = (colNumber: number) => {
        app.nextChecker.style.left = colNumber * app.size.clientWidth + 'px';
    };

    const dropChecker = async (x: number) => {
        if (state.dropping) return;

        const y = getAvailableY(x);

        if (y < 0) return Promise.resolve();

        updateState({ dropping: state.dropping + 1 });

        const newChecker = createCheckerElement(state.currentPlayer);

        try {
            app.column[x].appendChild(newChecker);
        } catch (e) {
            console.log(x, state.currentPlayer);
            throw e;
        }

        const restPos = newChecker.offsetTop + newChecker.getBoundingClientRect().height;
        const startPos = app.nextChecker.offsetTop;

        // hide next checker
        app.nextChecker.style.opacity = '0';

        // position new checker where next next checker was
        newChecker.style.top = startPos + 'px';
        newChecker.style.position = 'fixed';

        // transitionDuration should be dependent on how far the checker travels
        const inverseY = Math.abs(y - ROW_COUNT) + 1;
        const transitionDuration = inverseY * 75;

        await transition(
            newChecker,
            {
                transform: 'translateY(' + (restPos - startPos) + 'px)',
            },
            transitionDuration,
            'cubic-bezier(0.33333, 0, 0.66667, 0.33333)'
        );

        newChecker.style.transform = '';
        newChecker.style.position = 'relative';
        newChecker.style.top = '';

        app.nextChecker.style.opacity = '1';

        updateState({
            history: [...state.history, { x, y, player: state.currentPlayer }],
        });

        if (checkForWin(x, y)) {
            app.winMessage.innerText = WinMessage[state.currentPlayer];
            showElements(app.gameOver);

            updateState({ dropping: state.dropping - 1 });
            return;
        }
        if (checkForTie()) {
            showElements(app.gameTie);
            updateState({ dropping: state.dropping - 1 });
            return;
        }

        // toggle turn
        const nextPlayer = state.currentPlayer === 'player1' ? 'player2' : 'player1';

        updateState({ dropping: state.dropping - 1, currentPlayer: nextPlayer });

        if (state.aiPlayers.includes(nextPlayer)) {
            await aiMove();
        }
    };

    const getAvailableY = (x: number) => {
        if (!app.column[x]) return -1;
        const count = app.column[x]?.children.length;
        return count < ROW_COUNT ? count : -1;
    };

    const aiMove = async () => {
        const lastPos = state.history[state.history.length - 1];

        const sortFilterSets = (matchSets: [number, number][][], player: string) =>
            matchSets
                .map((set) => ({
                    matches: set.filter((pos) => getTurn(...pos)?.player === player).length,
                    moves: set.filter((pos) => getAvailableY(pos[0]) === pos[1]),
                }))
                .filter((moveSets) => moveSets.moves.length > 0)
                .sort((a, b) => {
                    if (a.matches === b.matches) {
                        if (a.moves > b.moves) return -1;
                        if (a.moves < b.moves) return 1;
                        return 0;
                    }
                    if (a.matches > b.matches) return -1;
                    if (a.matches < b.matches) return 1;
                    return 0;
                });

        const possibleMatchSets = state.history.length ? getPossibleMatchSets(lastPos.x, lastPos.y) : [];

        let x = null;

        // const offensiveMovesSets = sortFilterSets(possibleMatchSets, state.currentPlayer);
        // TODO: check for easy 3 matches and

        // looks for any opponent matches and makes blocking move recommendations
        const defensiveMovesSets = sortFilterSets(possibleMatchSets, lastPos.player);

        if (defensiveMovesSets.length) {
            // defensive

            defensiveMovesSets.some((defensiveMovesSet) => {
                let defensiveMove = defensiveMovesSet.moves[0];

                // check if defensiveMove has a follow up win

                // check if next y exists if it doesn't don't worry about it
                if (defensiveMove[1] === COLUMN_COUNT) {
                    x = defensiveMove[0];
                    return true;
                }

                // check if the next y move has 3 in a row
                const predictiveMove = [defensiveMove[0], defensiveMove[1] + 1];
                const predictiveMatchSets = getPossibleMatchSets(predictiveMove[0], predictiveMove[1])
                    .map((set) => ({
                        matches: set.filter((pos) => getTurn(...pos)?.player === lastPos.player).length,
                    }))
                    .sort((a, b) => {
                        if (a.matches > b.matches) return -1;
                        if (a.matches < b.matches) return 1;
                        return 0;
                    });

                if (predictiveMatchSets.every((predictiveMatchSet) => predictiveMatchSet.matches < 3)) {
                    x = defensiveMove[0];
                    return true;
                }
            });
        }

        // if no defensive moves are found then look for offensive moves
        // todo: until we have a better ai we will just pick a random column
        if (x === null) {
            let availableColumns: number[] = [];
            for (let i = 0; i < 7; i++) {
                console.log(i);
                if (getAvailableY(i) !== -1) availableColumns.push(i);
            }
            console.log({ availableColumns });
            return availableColumns[getRandomMinMax(0, availableColumns.length)];
        }

        return dropChecker(x);
    };

    // create element references
    const app = {
        board: getElement('#board'),
        columns: getElement('#board .columns'),
        size: getElement('#size'),
        gameOver: getElement('#game-over'),
        gameTie: getElement('#game-tie'),
        gameStart: getElement('#game-start'),
        resetButtons: getElements<HTMLButtonElement>('.reset-btn'),
        startButton: getElement<HTMLButtonElement>('#start-btn'),
        buttons: getElements<HTMLButtonElement>('#board button'),
        spacesWrapper: getElements('#board .spaces'),
        winMessage: getElement('.win-message'),
        checkers: getElement<HTMLDivElement>('.checkers'),
        next: getElement<HTMLDivElement>('.next .track'),
        nextChecker: createCheckerElement('player1'),
        column: [] as HTMLElement[],
    };

    app.gameStart.style.display = 'flex';

    // attach events to board

    app.next.appendChild(app.nextChecker);

    app.column = [...app.columns.children] as HTMLElement[];

    const onColumnIndex = (event: MouseEvent, callback: (index: number) => void) => {
        const element = event.target as HTMLElement;
        if (!element.classList.contains('column')) return;

        const index = indexOfElement(element);
        if (index === -1 || index >= app.column.length) {
            console.error('column not found ', { event, element, index });
            return;
        }

        callback(index);
    };

    app.board.onmouseover = (event) => onColumnIndex(event, moveNextChecker);
    app.board.onclick = (event) => onColumnIndex(event, dropChecker);

    // attach events
    app.startButton.onclick = start;
    app.resetButtons.forEach((button) => (button.onclick = reset));

    // @ts-ignore = todo: remove
    globalThis.app = () => app;
}

for (let i = 0; i < 1000000; i++) {
    const x = getRandomMinMax(0, 7);
    x === 7 && console.log(x);
}

addEventListener('load', main);

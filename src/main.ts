import { getPossibleMatchSets, getRandom, getRandomMinMax, hideElements, showElements, wait } from './utils';
import './style.scss';

const Players = {
    player1: 'player1',
    player2: 'player2',
};

const WinMessage = {
    player1: 'You Win!',
    player2: 'Computer!',
};

const config = {
    dropSpeed: 400,
    defaultState: {
        currentPlayer: Players.player1,
        aiPlayers: [Players.player2],
        history: [] as { x: number; y: number; player: string }[],
        checkers: [] as HTMLDivElement[],
        active: false,
    },
};

Object.freeze(Players);
Object.freeze(config);

const getElements = <T extends Element = HTMLElement>(selector: string) =>
    Array.from(document.querySelectorAll<T>(selector));

const getElement = <T extends Element = HTMLElement>(selector: string) =>
    //
    getElements<T>(selector)[0];

function Connect4() {
    document.body.innerHTML = document.querySelector('template')?.innerHTML || '';

    const app = initialize();

    const state = { ...config.defaultState };

    function initialize() {
        const app = {
            board: getElement('#board'),
            blocker: getElement('#board .blocker'),
            gameOver: getElement('#game-over'),
            gameTie: getElement('#game-tie'),
            gameStart: getElement('#game-start'),
            resetButtons: getElements<HTMLButtonElement>('.reset-btn'),
            startButton: getElement<HTMLButtonElement>('#start-btn'),
            buttons: getElements<HTMLButtonElement>('#board button'),
            spacesWrapper: getElements('#board .spaces'),
            winMessage: getElements('.win-message'),
            checkerTemplate: getElement('#template .checker'),
            checkers: [] as HTMLDivElement[],
        };

        app.startButton.onclick = start;
        app.resetButtons.forEach((button) => (button.onclick = reset));
        app.buttons.forEach((button, x) => (button.onclick = () => dropChecker(x)));
        Object.freeze(app);
        return app;
    }

    function isActive(value: boolean) {
        state.active = value;
        [...app.resetButtons, ...app.buttons].forEach((btn: HTMLButtonElement) => {
            btn.disabled = value;
        });
    }

    function start() {
        hideElements(app.gameStart);
        app.board.className = 'turn-' + state.currentPlayer;
    }

    function reset() {
        if (state.active) return;

        const ms = config.dropSpeed * 2;
        state.checkers.forEach((c) => {
            c.style.transition = `top ${ms}ms linear`;
            c.style.top = window.outerHeight + window.outerHeight / 2 + 'px';
        });
        wait(ms).then(() => state.checkers.forEach((c) => c.remove()));
        updateState(config.defaultState);
        app.board.className = 'turn-' + state.currentPlayer;
        hideElements(app.gameOver);
        hideElements(app.gameTie);
    }

    function getPlayer(x: number, y: number) {
        return (state.history.find((p) => p.x === x && p.y === y) || {}).player;
    }

    function setChecker(x: number, y: number, player: string) {
        updateState({
            history: [...state.history, { x, y, player }],
        });
    }

    function updateState(update: {
        currentPlayer?: string;
        aiPlayers?: string[];
        history?: any[] | any[];
        checkers?: HTMLDivElement[];
    }) {
        return Object.assign(state, update);
    }

    function checkForWin(x: any, y: number) {
        const sets = getPossibleMatchSets(x, y);
        return sets.some((set) => set.every((pos) => getPlayer(...pos) === state.currentPlayer));
    }

    function checkForTie() {
        return state.history.length === 64;
    }

    async function dropChecker(x: number): Promise<void> {
        showElements(app.blocker);
        const y = getAvailableY(x);
        if (y < 0) return Promise.resolve();
        await animateChecker(x, y);
        setChecker(x, y, state.currentPlayer);
        hideElements(app.blocker);
        if (checkForWin(x, y)) {
            return wait(250).then(() => {
                showElements(app.gameOver);
            });
        }
        if (checkForTie()) {
            return wait(250).then(() => {
                showElements(app.gameTie);
            });
        }
        toggleTurn();
        if (state.aiPlayers.includes(state.currentPlayer)) {
            return aiMove();
        }
        return await Promise.resolve();
    }

    async function animateChecker(x: number, y: number) {
        isActive(true);

        y = Math.abs(y - 7) + 1;
        const ms = (config.dropSpeed / 8) * y;

        const clone = app.checkerTemplate.cloneNode(true) as HTMLDivElement;
        app.board.appendChild(clone);
        const c = app.board.lastChild as HTMLDivElement;
        state.checkers.push(c);

        c.style.transform = 'rotate(' + getRandom(1, 360) + 'deg)';
        c.classList.add(state.currentPlayer);

        setTimeout(() => {
            c.style.transition = '';
        }, ms + 100);

        c.style.transition = `top ${ms}ms linear`;
        c.style.left = x * 9 + 'vmin';
        c.style.display = '';

        return wait(50).then(() => {
            c.style.top = y * 9 + 'vmin';
            return wait(ms + 300).then(() => {
                isActive(false);
                return true;
            });
        });
    }

    function getAvailableY(x: number) {
        for (let y = 0; y < 8; y++) {
            if (!getPlayer(x, y)) return y;
        }
        return -1;
    }

    function aiMove() {
        const lastPos = state.history[state.history.length - 1];

        const sortFilterSets = (matchSets: [number, number][][], player: string) =>
            matchSets
                .map((set) => ({
                    matches: set.filter((pos) => getPlayer(...pos) === player).length,
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

        // looks for any oponent matches and makes blocking move recomendations
        const defensiveMovesSets = sortFilterSets(possibleMatchSets, lastPos.player);

        if (defensiveMovesSets.length) {
            // defensive

            defensiveMovesSets.some((defensiveMovesSet) => {
                let defensiveMove = defensiveMovesSet.moves[0];

                // check if defensiveMove has a follow up win

                // check if next y exists if it doesn't don't wory about it
                if (defensiveMove[1] === 7) {
                    x = defensiveMove[0];
                    return true;
                }

                // check if the next y move has 3 in a row
                const predictiveMove = [defensiveMove[0], defensiveMove[1] + 1];
                const predictiveMatchSets = getPossibleMatchSets(predictiveMove[0], predictiveMove[1])
                    .map((set) => ({
                        matches: set.filter((pos) => getPlayer(...pos) === lastPos.player).length,
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

        if (!x) {
            x = getRandomMinMax(0, 7);
            while (getAvailableY(x) === -1) {
                if (++x > 7) x = 0;
            }
        }

        return dropChecker(x);
    }

    function toggleTurn() {
        const currentPlayer = state.currentPlayer === Players.player1 ? Players.player2 : Players.player1;
        updateState({ currentPlayer });
        const currentWinMessage = WinMessage[currentPlayer as keyof typeof WinMessage];

        app.board.className = 'turn-' + currentPlayer;
        app.winMessage.forEach((el) => (el.innerText = currentWinMessage));
        return Promise.resolve();
    }
}

Connect4();

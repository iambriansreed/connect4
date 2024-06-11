import { dataShow, humanDropChecker, loadGame, moveNextChecker, restart, start } from './utils';
import './style.scss';
import { stateInit } from './state';

function main() {
    globalThis.state = stateInit(['player2']);

    // create element references

    const columns = document.querySelector<HTMLElement>('#board .columns')!;

    const app: App = (globalThis.app = {
        board: document.querySelector<HTMLElement>('#board')!,
        columns,
        size: document.querySelector<HTMLElement>('#size')!,
        gameOver: document.querySelector<HTMLElement>('#game-over')!,
        gameTie: document.querySelector<HTMLElement>('#game-tie')!,
        gameStart: document.querySelector<HTMLElement>('#game-start')!,
        restartButtons: Array.from(document.querySelectorAll<HTMLButtonElement>('[data-restart]')),
        startButton: document.querySelector<HTMLButtonElement>('#start-btn')!,
        buttons: Array.from(document.querySelectorAll<HTMLButtonElement>('#board button')),
        spacesWrapper: Array.from(document.querySelectorAll<HTMLElement>('#board .spaces')),
        winMessage: document.querySelector<HTMLElement>('#win-message')!,
        nextChecker: document.querySelector<HTMLElement>('#board .next .checker')!,
        column: [...columns.children] as HTMLElement[],
    });

    // attach events to board
    {
        app.column.forEach((element, index) => {
            element.addEventListener('click', () => humanDropChecker(index));
            element.addEventListener('mouseover', () => moveNextChecker(index));
        });

        app.startButton.addEventListener('click', start);
        app.restartButtons.forEach((button) => button.addEventListener('click', restart));
    }

    // loadGame([
    //     { x: 2, y: 0, player: 'player1' },
    //     { x: 2, y: 1, player: 'player2' },
    //     { x: 2, y: 2, player: 'player1' },
    //     { x: 3, y: 0, player: 'player2' },
    //     { x: 2, y: 3, player: 'player1' },
    //     { x: 2, y: 4, player: 'player2' },
    //     { x: 2, y: 5, player: 'player1' },
    //     { x: 3, y: 1, player: 'player2' },
    //     { x: 3, y: 2, player: 'player1' },
    //     { x: 1, y: 0, player: 'player2' },
    //     { x: 3, y: 3, player: 'player1' },
    //     { x: 3, y: 4, player: 'player2' },
    //     { x: 3, y: 5, player: 'player1' },
    //     { x: 0, y: 0, player: 'player2' },
    //     { x: 1, y: 1, player: 'player1' },
    // ]);

    dataShow(app.gameStart);
}

addEventListener('load', main);

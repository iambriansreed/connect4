import { dataShow, humanDropChecker, moveNextChecker, restart, start } from './utils';
import './style.scss';
import { stateInit } from './state';

function main() {
    globalThis.state = stateInit({ aiPlayers: ['player2'] });

    // create element references

    const columns = document.querySelector<HTMLElement>('#board .columns')!;

    const app: App = (globalThis.app = {
        debug: false,
        board: document.querySelector<HTMLElement>('#board')!,
        columns,
        size: document.querySelector<HTMLElement>('#size')!,
        gameOver: document.querySelector<HTMLElement>('#game-over')!,
        gameTie: document.querySelector<HTMLElement>('#game-tie')!,
        gameStart: document.querySelector<HTMLElement>('#game-start')!,
        restartButtons: Array.from(document.querySelectorAll<HTMLButtonElement>('[data-restart]')),
        startButtons: Array.from(document.querySelectorAll<HTMLButtonElement>('[data-start]')),
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

        app.startButtons.forEach((button) => button.addEventListener('click', start));
        app.restartButtons.forEach((button) => button.addEventListener('click', restart));
    }

    dataShow(app.gameStart);
}

addEventListener('load', main);

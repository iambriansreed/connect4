import { dropChecker, moveNextChecker, restart, start } from './utils';
import './style.scss';
import { stateInit } from './state';
// import Ai from './utils/ai';

function main() {
    globalThis.state = stateInit(['player2']);

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
            element.onclick = () => dropChecker(index);
            element.onmouseover = () => moveNextChecker(index);
        });

        app.startButton.onclick = start;
        app.restartButtons.forEach((button) => (button.onclick = restart));
    }
}

addEventListener('load', main);

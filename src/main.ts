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

    // show the title splash first, then hand off to the intro modal
    const splash = document.querySelector<HTMLElement>('#splash');
    if (splash) {
        // render the info slide's background behind the splash (its content
        // stays hidden) so sliding the title up reveals slide 2, not the board
        app.gameStart.classList.add('show');
        setTimeout(() => {
            splash.classList.add('hide');
            setTimeout(() => {
                splash.style.display = 'none';
                dataShow(app.gameStart);
            }, 600);
        }, 1900);
    } else {
        dataShow(app.gameStart);
    }
}

addEventListener('load', main);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Connect4__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_scss__);



document.addEventListener('DOMContentLoaded', function (event) {
    const main = new __WEBPACK_IMPORTED_MODULE_0__Connect4__["a" /* default */]();
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const players = {
    player1: 'player1',
    player2: 'player2'
};

class Connect4 {

    constructor() {

        this.board = document.getElementById('board');
        this.buttonsWrapper = document.getElementsByClassName('buttons')[0];
        this.spacesWrapper = document.getElementsByClassName('spaces')[0];
        this.gameOver = document.getElementById('game-over');
        this.gameStart = document.getElementById('game-start');
        this.turnColor = Array.from(document.getElementsByClassName('turn-color'));
        this.reset = document.getElementById('reset-btn');
        this.start = document.getElementById('start-btn');
        this.animatedChecker = document.getElementsByClassName('checker')[0];

        document.settings.ai.value = 'stupid';

        this.checkerSize = 60;
        this.checkerMoving = false;

        this.reset.onclick = () => {
            window.location.reload();
        };

        this.gameStart.style.display = 'none';
        this.start.onclick = () => {
            this.gameStart.style.display = 'none';
        };

        this.spaces = {};
        this.lastPosition = null;

        this.toggleTurn();

        for (let x = 0; x < 8; x++) {
            const button = document.createElement('button');
            button.type = "button";
            button.onclick = () => this.dropChecker(x);
            this.buttonsWrapper.appendChild(button);
        }

        for (let y = 7; y > -1; y--) {
            for (let x = 0; x < 8; x++) {
                this.spaces[x] = this.spaces[x] || [];
                const space = document.createElement('div');
                space.className = 'space';
                space.id = `pos-${x}-${y}`;
                space.onclick = () => console.log(x, y);
                space.appendChild(document.createElement('div'));
                this.spaces[x][y] = {
                    x,
                    y,
                    element: space,
                    checker: false
                };
                this.spacesWrapper.appendChild(this.spaces[x][y].element);
            }
        }
    }

    checkForWin() {

        const isValidPosition = pos => pos && pos.x < 8 && pos.y < 8 && pos.x > -1 && pos.y > -1;

        const checks = [{
            type: 'horizontal -',
            getFirst: pos => ({
                y: pos.y,
                x: 0
            }),
            getNext: (pos, originalPosition) => {
                return {
                    y: pos.y,
                    x: pos.x + 1
                };
            }
        }, {
            type: 'vertical |',
            getFirst: pos => ({
                x: pos.x,
                y: 0
            }),
            getNext: (pos, originalPosition) => ({
                x: pos.x,
                y: pos.y + 1
            })
        }, {
            type: 'diagonal /',
            getFirst: pos => {

                while (isValidPosition({
                    x: pos.x - 1,
                    y: pos.y - 1
                })) {
                    pos = {
                        x: pos.x - 1,
                        y: pos.y - 1
                    };
                }
                return pos;
            },
            getNext: pos => ({
                x: pos.x + 1,
                y: pos.y + 1
            })
        }, {
            type: 'diagonal \\',
            getFirst: pos => {
                while (isValidPosition({
                    x: pos.x - 1,
                    y: pos.y + 1
                })) {
                    pos = {
                        x: pos.x - 1,
                        y: pos.y + 1
                    };
                }
                return pos;
            },
            getNext: pos => ({
                x: pos.x + 1,
                y: pos.y - 1
            })
        }];

        let win = false;
        checks.forEach(check => {
            const originalPosition = this.lastPosition;
            let pos = check.getFirst(this.lastPosition);
            let group = [];
            while (isValidPosition(pos)) {
                const checker = this.spaces[pos.x][pos.y].checker;
                if (this.turn === checker) {
                    group.push(this.spaces[pos.x][pos.y].element);
                    if (group.length === 4) {
                        win = true;
                        break;
                    }
                } else {
                    group = [];
                }
                pos = check.getNext(pos, originalPosition);
            }
        });
        return win;
    }

    dropChecker(x) {
        if (this.checkerMoving) return;
        const y = this.getAvailableY(x);
        if (y < 0) return;
        if (this.turn === players.player2) console.log(x, y);
        this.animateChecker(x, y).then(() => {
            this.updateDom(x, y);
            if (this.checkForWin()) {
                this.gameOver.style.display = 'block';
                return;
            }
            this.toggleTurn();
            if (this.turn === players.player2) {
                this.aiMove();
            }
        });
    }

    animateChecker(x, y) {
        this.checkerMoving = true;
        x = parseInt(x);
        y = Math.abs(parseInt(y) - 7) + 1;
        const ms = 250 / 8 * y;
        const checker = this.animatedChecker;
        return new Promise(resolve => {
            checker.style.marginLeft = 0;
            checker.style.marginTop = 0;
            checker.style.display = 'block';
            checker.style.transition = `margin-top ${ms}ms linear`;
            console.log(checker.style.marginLeft, checker.style.marginTop);
            setTimeout(() => {
                checker.style.marginLeft = x * this.checkerSize + 'px';
                checker.style.marginTop = y * this.checkerSize + 20 + 'px';
                console.log(checker.style.marginLeft, checker.style.marginTop);
                setTimeout(() => {
                    checker.style.display = 'none';
                    checker.style.transition = 'none';
                    setTimeout(() => {
                        checker.style.marginLeft = 0;
                        checker.style.marginTop = 0;
                        this.checkerMoving = false;
                        resolve();
                    }, 1);
                }, ms + 50);
            }, 1);
        });
    }

    getAvailableY(x) {
        for (let y = 0; y < 8; y++) {
            if (!this.spaces[x][y].checker) return y;
        }
        return -1;
    }

    updateDom(x, y) {
        this.spaces[x][y].checker = this.turn;
        this.spaces[x][y].element.classList.add(this.turn);
        this.lastPosition = {
            x,
            y
        };
    }

    aiMove() {
        const ai = this.getAiType();
        let x = -1;

        if (ai === 'random') {
            x = this.aiMoveRandom();
        }
        if (ai === 'defensive') {
            x = this.aiMoveDefensive();
        }
        if (ai === 'offensive') {
            x = this.aiMoveOffensive();
        }
        if (ai === 'stupid') {
            x = this.aiMoveStupid();
        }

        this.buttonsWrapper.childNodes[x].click();
        console.log('AI just made a ' + ai + ' move.');
    }

    aiMoveDefensive() {
        return this.getRandomMinMax(0, 7);
    }

    aiMoveOffensive() {
        return this.getRandomMinMax(0, 7);
    }

    aiMoveRandom() {
        return this.getRandomMinMax(0, 7);
    }

    aiMoveStupid() {
        return this.getRandomMinMax(0, 7) < 3 ? 0 : 7;
    }

    getAiType() {
        return document.settings.ai.value;
    }

    getRandomMinMax(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    toggleTurn() {
        this.board.classList.remove('turn-' + players.player1, 'turn-' + players.player2);
        this.turn = this.turn === players.player1 ? players.player2 : players.player1;
        this.board.classList.add('turn-' + this.turn);
        this.turnColor.forEach(el => {
            el.innerText = this.turn[0].toUpperCase() + this.turn.substr(1);
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Connect4);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
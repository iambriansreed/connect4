/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomMinMax": () => (/* binding */ getRandomMinMax),
/* harmony export */   "showElements": () => (/* binding */ showElements),
/* harmony export */   "hideElements": () => (/* binding */ hideElements),
/* harmony export */   "getRanges": () => (/* binding */ getRanges),
/* harmony export */   "getPossibleMatchSets": () => (/* binding */ getPossibleMatchSets),
/* harmony export */   "wait": () => (/* binding */ wait),
/* harmony export */   "listToArray": () => (/* binding */ listToArray),
/* harmony export */   "getRandom": () => (/* binding */ getRandom)
/* harmony export */ });
function getRandomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function showElements(...elements) {
    elements.forEach((el) => (el.style.display = "inherit"));
}
function hideElements(...elements) {
    elements.forEach((el) => (el.style.display = "none"));
}
function getRanges(x, y) {
    return {
        VerticalBottomToTop: () => {
            const range = [];
            let testY = y + 0, maxRange = 3;
            // 3 up
            while (--testY > -1 && range.length < maxRange) {
                range.push([x, testY]);
            }
            range.reverse();
            range.push([x, y]);
            testY = y + 0;
            maxRange = range.length + 3;
            // 3 down
            while (++testY < 8 && range.length < maxRange) {
                range.push([x, testY]);
            }
            return range;
        },
        HorizontalLeftToRight: () => {
            const range = [];
            let testX = x + 0, maxRange = 3;
            // 3 left
            while (--testX > -1 && range.length < maxRange) {
                range.push([testX, y]);
            }
            range.reverse();
            range.push([x, y]);
            testX = x + 0;
            maxRange = range.length + 3;
            // 3 right
            while (++testX < 8 && range.length < maxRange) {
                range.push([testX, y]);
            }
            return range;
        },
        DiagonalBottomLeftToTopRight: () => {
            const range = [];
            let testX = x + 0, testY = y + 0, maxRange = 3;
            // 3 left
            while (--testX > -1 && --testY > -1 && range.length < maxRange) {
                range.push([testX, testY]);
            }
            range.reverse();
            range.push([x, y]);
            testX = x + 0;
            testY = y + 0;
            maxRange = range.length + 3;
            // 3 right
            while (++testX < 8 && ++testY < 8 && range.length < maxRange) {
                range.push([testX, testY]);
            }
            return range;
        },
        DiagonalTopLeftToBottomRight: () => {
            const range = [];
            let testX = x + 0, testY = y + 0, maxRange = 3;
            // 3 left
            while (--testX > -1 && ++testY < 8 && range.length < maxRange) {
                range.push([testX, testY]);
            }
            range.reverse();
            range.push([x, y]);
            testX = x + 0;
            testY = y + 0;
            maxRange = range.length + 3;
            // 3 right
            while (++testX < 8 && --testY > -1 && range.length < maxRange) {
                range.push([testX, testY]);
            }
            return range;
        },
    };
}
function getPossibleMatchSets(x, y) {
    const rangeTypes = getRanges(x, y);
    return [
        rangeTypes.DiagonalBottomLeftToTopRight(),
        rangeTypes.DiagonalTopLeftToBottomRight(),
        rangeTypes.HorizontalLeftToRight(),
        rangeTypes.VerticalBottomToTop(),
    ]
        .filter((points) => points.length >= 4)
        .reduce((sets, range) => {
        if (range.length > 4) {
            sets.push(range.slice(0, 4));
            sets.push(range.reverse().slice(0, 4).reverse());
        }
        else {
            sets.push(range);
        }
        return sets;
    }, []);
}
function wait(time, willReject = false) {
    return new Promise((resolve, reject) => setTimeout(() => (willReject ? reject() : resolve()), time));
}
function listToArray(list) {
    return Array.prototype.slice.call(list);
}
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");


const Players = {
    player1: "player1",
    player2: "player2",
};
const config = {
    dropSpeed: 300,
    defaultState: {
        currentPlayer: Players.player1,
        aiPlayers: [Players.player2],
        history: [],
    },
};
Object.freeze(Players);
Object.freeze(config);
function Connect4() {
    const app = initialize();
    const state = Object.assign({}, config.defaultState);
    function initialize() {
        const getElements = (selector) => Array.from(document.querySelectorAll(selector));
        const getElement = (selector) => getElements(selector)[0];
        const app = {
            board: getElement("#board"),
            blocker: getElement("#board .blocker"),
            gameOver: getElement("#game-over"),
            gameTie: getElement("#game-tie"),
            gameStart: getElement("#game-start"),
            resetBtns: getElements(".reset-btn"),
            startBtn: getElement("#start-btn"),
            buttons: getElements("#board button"),
            spacesWrapper: getElements("#board .spaces"),
            turnColor: getElements(".turn-color"),
            checkerTemplate: getElement("#template .checker"),
        };
        // const resizeBoard = () => {
        //     let h = app.board.offsetHeight;
        //     let w = app.board.offsetWidth;
        //     const smallestSize = Math.min(h, w);
        //     const grid = (smallestSize - (smallestSize % 9)) / 9;
        //     h = grid * 9;
        //     w = grid * 8;
        //     app.board.style.width = `${w}px`;
        //     app.board.style.height = `${h}px`;
        // };
        // resizeBoard();
        app.startBtn.onclick = start;
        app.resetBtns.forEach((button) => (button.onclick = reset));
        app.buttons.forEach((button, x) => (button.onclick = () => dropChecker(x)));
        Object.freeze(app);
        return app;
    }
    function start() {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.hideElements)(app.gameStart);
        app.board.className = "turn-" + state.currentPlayer;
    }
    function reset() {
        const oldCheckers = Array.from(document.getElementsByClassName("checker"));
        oldCheckers.forEach((c) => (c.style.top = window.outerHeight + window.outerHeight / 2 + "px"));
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(1000).then(() => oldCheckers.forEach((c) => c.remove()));
        updateState(config.defaultState);
        app.board.className = "turn-" + state.currentPlayer;
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.hideElements)(app.gameOver);
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.hideElements)(app.gameTie);
    }
    function getPlayer(x, y) {
        return (state.history.find((p) => p.x === x && p.y === y) || {}).player;
    }
    function setChecker(x, y, player) {
        updateState({
            history: [...state.history, { x, y, player }],
        });
    }
    function updateState(update) {
        return Object.assign(state, update);
    }
    function checkForWin(x, y) {
        const sets = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPossibleMatchSets)(x, y);
        return sets.some((set) => set.every((pos) => getPlayer(...pos) === state.currentPlayer));
        return false;
    }
    function checkForTie() {
        return state.history.length === 64;
    }
    function dropChecker(x) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.showElements)(app.blocker);
        const y = getAvailableY(x);
        if (y < 0)
            return;
        return animateChecker(x, y).then(() => {
            setChecker(x, y, state.currentPlayer);
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.hideElements)(app.blocker);
            if (checkForWin(x, y)) {
                return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(250).then(() => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.showElements)(app.gameOver));
            }
            if (checkForTie()) {
                return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(250).then(() => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.showElements)(app.gameTie));
            }
            toggleTurn();
            if (state.aiPlayers.includes(state.currentPlayer)) {
                return aiMove();
            }
            return Promise.resolve();
        });
    }
    function animateChecker(x, y) {
        y = Math.abs(y - 7) + 1;
        const ms = (config.dropSpeed / 4) * y;
        const clone = app.checkerTemplate.cloneNode(true);
        app.board.appendChild(clone);
        const o = app.board.lastChild;
        o.style.transform = "rotate(" + (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandom)(1, 360) + "deg)";
        o.classList.add(state.currentPlayer);
        setTimeout(() => {
            o.style.transition = "";
        }, ms + 100);
        o.style.transition = `top ${ms}ms linear`;
        o.style.left = x * 9 + "vmin";
        o.style.display = "";
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(50).then(() => {
            o.style.top = y * 9 + "vmin";
            return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(ms + 300);
        });
    }
    function getAvailableY(x) {
        for (let y = 0; y < 8; y++) {
            if (!getPlayer(x, y))
                return y;
        }
        return -1;
    }
    function aiMove() {
        const lastPos = state.history[state.history.length - 1];
        const sortFilterSets = (matchSets, player) => matchSets
            .map((set) => ({
            matches: set.filter((pos) => getPlayer(...pos) === player).length,
            moves: set.filter((pos) => getAvailableY(pos[0]) === pos[1]),
        }))
            .filter((moveSets) => moveSets.moves.length > 0)
            .sort((a, b) => {
            if (a.matches === b.matches) {
                if (a.moves > b.moves)
                    return -1;
                if (a.moves < b.moves)
                    return 1;
                return 0;
            }
            if (a.matches > b.matches)
                return -1;
            if (a.matches < b.matches)
                return 1;
            return 0;
        });
        const possibleMatchSets = state.history.length ? (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPossibleMatchSets)(lastPos.x, lastPos.y) : [];
        let x = null;
        const offensiveMovesSets = sortFilterSets(possibleMatchSets, state.currentPlayer);
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
                const predictiveMatchSets = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPossibleMatchSets)(predictiveMove[0], predictiveMove[1])
                    .map((set) => ({
                    matches: set.filter((pos) => getPlayer(...pos) === lastPos.player).length,
                }))
                    .sort((a, b) => {
                    if (a.matches > b.matches)
                        return -1;
                    if (a.matches < b.matches)
                        return 1;
                    return 0;
                });
                if (predictiveMatchSets.every((predictiveMatchSet) => predictiveMatchSet.matches < 3)) {
                    x = defensiveMove[0];
                    return true;
                }
            });
        }
        if (!x) {
            x = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandomMinMax)(0, 7);
            while (getAvailableY(x) === -1) {
                if (++x > 7)
                    x = 0;
            }
        }
        return dropChecker(x);
    }
    function toggleTurn() {
        const currentPlayer = state.currentPlayer === Players.player1 ? Players.player2 : Players.player1;
        updateState({ currentPlayer });
        const currentPlayerName = currentPlayer[0].toUpperCase() + currentPlayer.substr(1);
        app.board.className = "turn-" + currentPlayer;
        app.turnColor.forEach((el) => (el.innerText = currentPlayerName));
        return Promise.resolve();
    }
}
Connect4();

})();

/******/ })()
;
//# sourceMappingURL=app.js.map
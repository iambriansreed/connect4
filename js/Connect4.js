const Players = {
  player1: 'player1',
  player2: 'player2'
};

const config = {
  checkerSize: 60,
  dropSpeed: 300,
  defaultState: {
    currentPlayer: Players.player1,
    aiPlayers: [Players.player2],
    history: []
  }
};
Object.freeze(Players);
Object.freeze(config);

const {
  getRandomMinMax,
  showElements,
  hideElements,
  getPossibleMatchSets,
  wait
} = Utilities;

function Connect4() {
  const app = initialize();

  const state = { ...config.defaultState };

  function initialize() {
    const getElements = selector =>
      Array.from(document.querySelectorAll(selector));
    const getElement = selector => getElements(selector)[0];
    const app = {
      board: getElement('#board'),
      blocker: getElement('#board .blocker'),
      gameOver: getElement('#game-over'),
      gameTie: getElement('#game-tie'),
      gameStart: getElement('#game-start'),
      resetBtns: getElements('.reset-btn'),
      startBtn: getElement('#start-btn'),
      buttons: getElements('#board .buttons button'),
      columns: getElements('#board .columns button'),
      spacesWrapper: getElements('#board .spaces'),
      turnColor: getElements('.turn-color')
    };

    app.startBtn.onclick = start;
    app.resetBtns.forEach(button => (button.onclick = reset));
    app.buttons.forEach((button, x) => (button.onclick = () => dropChecker(x)));
    Object.freeze(app);
    return app;
  }

  function start() {
    hideElements(app.gameStart);
    app.board.className = 'turn-' + state.currentPlayer;
  }

  function reset() {
    const oldCheckers = Array.from(document.getElementsByClassName('checker'));
    oldCheckers.forEach(
      c => (c.style.top = window.outerHeight + window.outerHeight / 2 + 'px')
    );
    wait(1000).then(() => oldCheckers.forEach(c => c.remove()));
    updateState(config.defaultState);
    app.board.className = 'turn-' + state.currentPlayer;
    hideElements(app.gameOver);
    hideElements(app.gameTie);
  }

  function getPlayer(x, y) {
    return (state.history.find(p => p.x === x && p.y === y) || {}).player;
  }

  function setChecker(x, y, player) {
    updateState({
      history: [...state.history, { x, y, player }]
    });
  }

  function updateState(update) {
    return Object.assign(state, update);
  }

  function checkForWin(x, y) {
    const sets = getPossibleMatchSets(x, y);
    return sets.some(set =>
      set.every(pos => getPlayer(...pos) === state.currentPlayer)
    );
  }

  function checkForTie() {
    return state.history.length === 64;
  }

  function dropChecker(x) {
    showElements(app.blocker);
    const y = getAvailableY(x);
    if (y < 0) return;
    return animateChecker(x, y).then(() => {
      setChecker(x, y, state.currentPlayer);
      hideElements(app.blocker);
      if (checkForWin(x, y)) {
        return wait(250).then(() => showElements(app.gameOver));
      }
      if (checkForTie()) {
        return wait(250).then(() => showElements(app.gameTie));
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
    const ms = (config.dropSpeed / 8) * y;

    const o = document.createElement('div');
    o.className = `checker ${state.currentPlayer}`;
    o.style.transition = `top ${ms}ms linear`;
    o.style.left = x * config.checkerSize + 15 + 'px';
    o.style.top = '35px';
    app.board.appendChild(o);

    return wait(50).then(() => {
      o.style.top = y * config.checkerSize + 55 + 'px';
      return wait(ms + 100);
    });
  }

  function getAvailableY(x) {
    for (let y = 0; y < 8; y++) {
      if (!getPlayer(x, y)) return y;
    }
    return -1;
  }

  function aiMove() {
    const lastPos = state.history[state.history.length - 1];

    const sortFilterSets = (matchSets, player) =>
      matchSets
        .map(set => ({
          matches: set.filter(pos => getPlayer(...pos) === player).length,
          moves: set.filter(pos => getAvailableY(pos[0]) === pos[1])
        }))
        .filter(moveSets => moveSets.moves.length > 0)
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

    const possibleMatchSets = state.history.length
      ? getPossibleMatchSets(lastPos.x, lastPos.y)
      : [];
      
    let x = null;

    const offensiveMovesSets = sortFilterSets(
      possibleMatchSets,
      state.currentPlayer
    );
    // TODO: check for easy 3 matches and

    // looks for any oponent matches and makes blocking move recomendations
    const defensiveMovesSets = sortFilterSets(
      possibleMatchSets,
      lastPos.player
    );

    if (defensiveMovesSets.length) {
      // defensive

      defensiveMovesSets.some(defensiveMovesSet => {
        let defensiveMove = defensiveMovesSet.moves[0];

        // check if defensiveMove has a follow up win

        // check if next y exists if it doesn't don't wory about it
        if (defensiveMove[1] === 7) {
          x = defensiveMove[0];
          return true;
        }

        // check if the next y move has 3 in a row
        const predictiveMove = [defensiveMove[0], defensiveMove[1] + 1];
        const predictiveMatchSets = getPossibleMatchSets(
          predictiveMove[0],
          predictiveMove[1]
        )
          .map(set => ({
            matches: set.filter(pos => getPlayer(...pos) === lastPos.player)
              .length
          }))
          .sort((a, b) => {
            if (a.matches > b.matches) return -1;
            if (a.matches < b.matches) return 1;
            return 0;
          });

        if (
          predictiveMatchSets.every(
            predictiveMatchSet => predictiveMatchSet.matches < 3
          )
        ) {
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
    const currentPlayer =
      state.currentPlayer === Players.player1
        ? Players.player2
        : Players.player1;
    updateState({ currentPlayer });
    const currentPlayerName =
      currentPlayer[0].toUpperCase() + currentPlayer.substr(1);
    app.board.className = 'turn-' + currentPlayer;
    app.turnColor.forEach(el => (el.innerText = currentPlayerName));
    return Promise.resolve();
  }
}

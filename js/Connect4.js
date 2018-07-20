const Players = {
  player1: 'player1',
  player2: 'player2'
};
Object.freeze(Players);

const AiTypes = {
  random: 'random',
  defensive: 'defensive',
  offensive: 'offensive'
};
Object.freeze(AiTypes);

const config = {
  checkerSize: 60,
  dropSpeed: 300,
  defaultState: {
    lastPosition: null,
    currentPlayer: Players.player1,
    aiPlayers: [Players.player2]
  }
};
Object.freeze(config);

const { wait, getRanges } = Utilities;

function Connect4() {
  const app = initialize();

  const state = { ...config.defaultState };

  function initialize() {
    document.settings.ai.value = AiTypes.random;
    const app = {
      board: document.getElementById('board'),
      buttons: Array.from(document.querySelectorAll('.buttons button')),
      buttonBlock: document.querySelector('.buttons .blocker'),
      spacesWrapper: document.getElementsByClassName('spaces')[0],
      gameOver: document.getElementById('game-over'),
      gameStart: document.getElementById('game-start'),
      turnColor: Array.from(document.getElementsByClassName('turn-color')),
      reset: document.getElementById('reset-btn'),
      start: document.getElementById('start-btn'),
      animatedChecker: document.getElementsByClassName('animated-checker')[0],
      spaces: {}
    };
    app.start.onclick = () => hideElements(app.gameStart);
    app.reset.onclick = () => reset();
    app.buttons.forEach((button, x) => (button.onclick = () => dropChecker(x)));
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const key = `${x}-${y}`;
        const element = document.getElementById(`pos-${key}`);
        app.spaces[key] = { x, y, element, checker: false };
        app.spaces[key].element.onclick = () => console.log(x, y);
      }
    }
    Object.freeze(app);
    return app;
  }

  function updateState(update) {
    return Object.assign(state, update);
  }

  function showElements(...elements) {
    elements.forEach(el => (el.style.display = 'inherit'));
  }

  function hideElements(...elements) {
    elements.forEach(el => (el.style.display = 'none'));
  }

  function checkForWin() {
    const ranges = getRanges(state.lastPosition.x, state.lastPosition.y);
    let winningSet = [];
    Object.keys(ranges).some(rangeType => {
      const points = ranges[rangeType]();
      if (points.length < 4) {
        return false;
      }
      return points.some((pos, pointIndex) => {
        const space = getSpace(...pos);
        if (space.checker !== state.currentPlayer) {
          winningSet = [];
          return false;
        }
        winningSet.push(pos);
        return winningSet.length === 4;
      });
    });
    return winningSet.length === 4 ? winningSet : false;
  }

  function dropChecker(x) {
    showElements(app.buttonBlock);
    const y = getAvailableY(x);
    if (y < 0) return;
    return animateChecker(x, y).then(() => {
      getSpace(x, y).checker = state.currentPlayer;
      updateState({ lastPosition: { x, y } });
      hideElements(app.buttonBlock);
      const winningSet = checkForWin();
      if (winningSet) {
        return wait(250).then(() => showElements(app.gameOver));
      }
      return toggleTurn();
    });
  }

  function reset() {
    Object.keys(app.spaces).forEach(key => (app.spaces[key].checker = false));
    const oldCheckers = Array.from(document.getElementsByClassName('checker'));
    oldCheckers.forEach(
      c => (c.style.top = window.outerHeight + window.outerHeight / 2 + 'px')
    );
    wait(1000).then(() => oldCheckers.forEach(c => c.remove()));
    updateState(config.defaultState);
    hideElements(app.gameOver);
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

  function getSpace(x, y) {
    return app.spaces[`${x}-${y}`];
  }

  function getAvailableY(x) {
    for (let y = 0; y < 8; y++) {
      if (!getSpace(x, y).checker) return y;
    }
    return -1;
  }

  function aiMove() {
    const ai = getAiType();
    let x = -1;

    function aiMoveDefensive() {
      // TODO: write the logic for this
      // 1. get array of possible matches for opponent
      // 2. determine if possible matches could be next in drop
      // 2. sort verified matches by count in a row
      // 3. add checker in next drop x
      return aiMoveRandom();
    }

    function aiMoveOffensive() {
      // TODO: write the logic for this
      // 1. get array of possible matches for myself
      // 2. determine if possible matches could be next in drop
      // 2. sort verified matches by count in a row
      // 3. add checker in next drop x
      return aiMoveRandom();
    }

    function aiMoveRandom() {
      const x = getRandomMinMax(0, 7);
      // TODO: fix very possible infinite loop issue
      return isValidMove(x) ? x : aiMoveRandom();
    }

    function isValidMove(x) {
      return getAvailableY(x) > -1;
    }

    if (ai === AiTypes.random) {
      x = aiMoveRandom();
    }
    if (ai === AiTypes.defensive) {
      x = aiMoveDefensive();
    }
    if (ai === AiTypes.offensive) {
      x = aiMoveOffensive();
    }

    console.log('AI just made a ' + ai + ' move.');
    return dropChecker(x);
  }

  function getAiType() {
    return document.settings.ai.value;
  }

  function getRandomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  function toggleTurn() {
    app.board.classList.remove(
      'turn-' + Players.player1,
      'turn-' + Players.player2
    );
    const currentPlayer =
      state.currentPlayer === Players.player1
        ? Players.player2
        : Players.player1;
    updateState({ currentPlayer });
    app.board.classList.add('turn-' + state.currentPlayer);
    app.turnColor.forEach(el => {
      el.innerText =
        state.currentPlayer[0].toUpperCase() + state.currentPlayer.substr(1);
    });
    if (state.aiPlayers.includes(currentPlayer)) {
      return aiMove();
    }
    return Promise.resolve();
  }
}

const Players = {
  player1: 'player1',
  player2: 'player2'
};

const AiTypes = {
  random: 'random',
  defensive: 'defensive',
  offensive: 'offensive'
};

const config = {
  checkerSize: 60,
  dropSpeed: 300,
  defaultState: {
    currentPlayer: Players.player1,
    aiPlayers: [Players.player2],
    places: []
  },
  aiType: AiTypes.defensive
};
Object.freeze(Players);
Object.freeze(AiTypes);
Object.freeze(config);

const { wait, getSets } = Utilities;

function Connect4() {
  const app = initialize();

  const state = { ...config.defaultState };

  function initialize() {
    document.settings.ai.value = config.aiType;
    const getElements = selector =>
      Array.from(document.querySelectorAll(selector));
    const getElement = selector => getElements(selector)[0];
    const app = {
      board: getElement('#board'),
      buttonBlock: getElement('#board .buttons .blocker'),
      gameOver: getElement('#game-over'),
      gameStart: getElement('#game-start'),
      reset: getElement('#reset-btn'),
      start: getElement('#start-btn'),
      buttons: getElements('#board .buttons button'),
      spacesWrapper: getElements('#board .spaces'),
      turnColor: getElements('.turn-color')
    };
    app.start.onclick = () => hideElements(app.gameStart);
    app.reset.onclick = () => reset();
    app.buttons.forEach((button, x) => (button.onclick = () => dropChecker(x)));
    Object.freeze(app);
    return app;
  }

  function getPlayer(x, y) {
    return (state.places.find(p => p.x === x && p.y === y) || {}).player;
  }

  function addPlace(x, y, player) {
    updateState({
      places: [...state.places, { x, y, player }],
      lastPosition: { x, y }
    });
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

  function checkForWin(x, y) {
    const sets = getSets(x, y);
    return sets.some(set =>
      set.every(pos => getPlayer(...pos) === state.currentPlayer)
    );
  }

  function dropChecker(x) {
    showElements(app.buttonBlock);
    const y = getAvailableY(x);
    if (y < 0) return;
    return animateChecker(x, y).then(() => {
      addPlace(x, y, state.currentPlayer);
      hideElements(app.buttonBlock);
      const winningSet = checkForWin(x, y);
      if (winningSet) {
        return wait(250).then(() => showElements(app.gameOver));
      }
      toggleTurn();
      if (state.aiPlayers.includes(state.currentPlayer)) {
        return aiMove();
      }
      return Promise.resolve();
    });
  }

  function reset() {
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

  function getAvailableY(x) {
    for (let y = 0; y < 8; y++) {
      if (!getPlayer(x, y)) return y;
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

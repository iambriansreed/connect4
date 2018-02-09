document.addEventListener('DOMContentLoaded', function (event) {

    const main = new Connect4();

});

const color = {
    red: 'red',
    yellow: 'yellow'
}

class Connect4 {

    static iterator(fn) {
        for (let i = 0; i < 8; i++) {
            if (fn(i) === false) {
                break;
            }
        }
    }

    constructor() {

        this.board = document.querySelector('.board');
        this.buttonsWrapper = document.querySelector('.buttons');
        this.spacesWrapper = document.querySelector('.spaces');
        this.gameOver = document.querySelector('.game-over');
        this.turnColor = document.querySelectorAll('.turn-color');
        this.reset = document.querySelector('a.reset');

        this.reset.onclick = (e) => {
            e.preventDefault();
            window.location.reload();
        }

        this.spaces = {};
        this.lastPosition = null;

        this.toggleTurn();

        Connect4.iterator((x) => {
            const button = document.createElement('button');
            button.type = "button";
            button.appendChild(this.checker());
            button.onclick = () => this.onDropChecker(x);
            this.buttonsWrapper.appendChild(button);

            this.spaces[x] = [];
            Connect4.iterator((y) => {
                const space = document.createElement('div');
                const placeholder = document.createElement('div');
                placeholder.className = 'placeholder';
                space.appendChild(placeholder);
                space.onclick = () => {
                    console.log(x, y);
                }
                this.spaces[x][y] = {
                    x,
                    y,
                    element: space,
                    checker: false,
                };
            });
        });

        // adding to the DOM
        Connect4.iterator((y) => {
            y = Math.abs(y - 7);
            Connect4.iterator((x) => {
                this.spacesWrapper.appendChild(this.spaces[x][y].element);
            });
        });
    }

    checkForWin() {

        const isValidPosition = (pos) =>
            pos.x < 8 && pos.y < 8 && pos.x > -1 && pos.y > -1;

        const checks = [{
                type: 'horizontal -',
                getFirst: (pos) => ({
                    y: pos.y,
                    x: 0,
                }),
                getNext: (pos) => ({
                    y: pos.y,
                    x: pos.x + 1,
                })
            },
            {
                type: 'vertical |',
                getFirst: (pos) => ({
                    x: pos.x,
                    y: 0,
                }),
                getNext: (pos) => ({
                    x: pos.x,
                    y: pos.y + 1,
                })
            },
            {
                type: 'diagonal /',
                getFirst: (pos) => {

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
                getNext: (pos) => ({
                    x: pos.x + 1,
                    y: pos.y + 1
                })
            },
            {
                type: 'diagonal \\',
                getFirst: (pos) => {
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
                getNext: (pos) => ({
                    x: pos.x + 1,
                    y: pos.y - 1
                })
            }
        ];

        let win = false;
        checks.forEach(check => {
            let pos = check.getFirst(this.lastPosition);
            let group = [];
            while (isValidPosition(pos)) {
                const checker = this.spaces[pos.x][pos.y].checker;
                if (this.turn === checker) {
                    group.push(this.spaces[pos.x][pos.y].element);
                    if (group.length === 4) {
                        setInterval(() => {
                            group.forEach(space => {
                                space.querySelector('.checker').style.opacity =
                                    space.querySelector('.checker').style.opacity === '0.25' ? '1' : '0.25';
                            });
                        }, 1000);
                        win = true;
                        break;
                    }
                } else {
                    group = [];
                }
                pos = check.getNext(pos);
            }
        });

        return win;
    }

    onDropChecker(y) {
        if (this.dropChecker(y)) {

            if (this.checkForWin()) {
                this.gameOver.style.display = 'block';
                return;
            }

            this.toggleTurn();
        }
    }

    toggleTurn() {
        this.board.classList.remove('turn-red', 'turn-yellow');
        this.turn = this.turn === color.red ? color.yellow : color.red;
        this.board.classList.add('turn-' + this.turn);
        this.turnColor.forEach(el => {
            el.innerText = this.turn[0].toUpperCase() + this.turn.substr(1);
        });
    }

    dropChecker(x) {

        let dropped = false;
        Connect4.iterator((y) => {
            if (this.spaces[x][y].checker)
                return true;
            this.spaces[x][y].checker = this.turn;
            this.spaces[x][y].element.appendChild(this.checker(this.turn));
            dropped = true;
            this.lastPosition = {
                x,
                y
            };
            return false;
        });
        return dropped;
    }

    checker(color = '') {
        const checker = document.createElement('div');
        checker.className = "checker " + color;
        return checker;
    }
}
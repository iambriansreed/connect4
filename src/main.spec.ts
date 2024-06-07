type TestSet = {
    grid: [number, number, number, number, number, number, number][];
    lastPoint: Point;
    expected: Point[];
};

const gridToHistory = (grid: number[][]) =>
    grid
        .map((row, indexRow) => {
            return row.map((cell, x) => {
                return cell && { x, y: 5 - indexRow, player: 'player' + cell };
            });
        })
        .flat()
        .filter(Boolean) as Point[];

/*
| 0,5 | 1,5 | 2,5 | 3,5 | 4,5 | 5,5 | 6,5 |
| 0,4 | 1,4 | 2,4 | 3,4 | 4,4 | 5,4 | 6,4 |
| 0,3 | 1,3 | 2,3 | 3,3 | 4,3 | 5,3 | 6,3 |
| 0,2 | 1,2 | 2,2 | 3,2 | 4,2 | 5,2 | 6,2 |
| 0,1 | 1,1 | 2,1 | 3,1 | 4,1 | 5,1 | 6,1 |
| 0,0 | 1,0 | 2,0 | 3,0 | 4,0 | 5,0 | 6,0 |
*/

const testSets: TestSet[] = [
    {
        lastPoint: { x: 1, y: 3, player: 'player2' },
        expected: [
            { x: 1, y: 3, player: 'player2' },
            { x: 1, y: 2, player: 'player2' },
            { x: 1, y: 1, player: 'player2' },
            { x: 1, y: 0, player: 'player2' },
        ],
        grid: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 0],
            [0, 2, 1, 1, 0, 0, 0],
            [0, 2, 1, 1, 0, 0, 0],
        ],
    },
    {
        lastPoint: { x: 3, y: 3, player: 'player1' },
        expected: [
            { x: 0, y: 0, player: 'player1' },
            { x: 1, y: 1, player: 'player1' },
            { x: 2, y: 2, player: 'player1' },
            { x: 3, y: 3, player: 'player1' },
        ],
        grid: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 2, 0, 0, 0],
            [0, 1, 2, 2, 0, 0, 0],
            [1, 2, 1, 1, 2, 0, 0],
        ],
    },
    {
        lastPoint: { x: 4, y: 1, player: 'player2' },
        expected: [
            { x: 1, y: 1, player: 'player2' },
            { x: 2, y: 1, player: 'player2' },
            { x: 3, y: 1, player: 'player2' },
            { x: 4, y: 1, player: 'player2' },
        ],
        grid: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0],
            [0, 2, 2, 2, 2, 0, 0],
            [0, 1, 2, 1, 1, 0, 0],
        ],
    },
    {
        lastPoint: { x: 4, y: 0, player: 'player1' },
        expected: [
            { x: 1, y: 0, player: 'player1' },
            { x: 2, y: 0, player: 'player1' },
            { x: 3, y: 0, player: 'player1' },
            { x: 4, y: 0, player: 'player1' },
        ],
        grid: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 2, 0, 0, 0],
            [0, 1, 1, 1, 1, 0, 0],
        ],
    },
];

describe('getWinningSet', function () {
    testSets.forEach(({ grid }) => {
        // const history = gridToHistory(grid);
        // const received = getWinningSet(history, lastPoint);

        it(grid.map((row) => row.join(' ')).join('\n'), () => {
            //expect(received).toEqual(expected);
        });
    });
});

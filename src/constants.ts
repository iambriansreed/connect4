export const WIN_MESSAGE: Record<Player, string> = {
    player1: 'Red Wins!',
    player2: 'Yellow Wins!',
};

export const ROW_COUNT = 6;

export const COLUMN_COUNT = 7;

export const RANGE_LENGTH = 7;

export const RANGES: {
    name: string;
    points: [number, number][];
}[] = [
    {
        name: 'top to bottom',
        points: [
            [0, 3],
            [0, 2],
            [0, 1],
            [0, 0],
            [0, -1],
            [0, -2],
            [0, -3],
        ],
    },
    {
        name: 'left to right',
        points: [
            [-3, 0],
            [-2, 0],
            [-1, 0],
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
    },
    {
        name: 'top left to bottom right',
        points: [
            [-3, 3],
            [-2, 2],
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
            [3, -3],
        ],
    },
    {
        name: 'bottom left to top right',
        points: [
            [-3, -3],
            [-2, -2],
            [-1, -1],
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3],
        ],
    },
];

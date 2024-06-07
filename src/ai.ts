import { COLUMN_COUNT, RANGES, ROW_COUNT } from './constants';
import { NonNullish } from './utils';

declare module globalThis {
    var aiLog: any[];
}

const isWithinBounds = (x: number, y: number) => x >= 0 && x < COLUMN_COUNT && y >= 0 && y < ROW_COUNT;

globalThis.aiLog = [];

const log = (...message: any[]) => {
    console.log(...message);
    globalThis.aiLog[globalThis.aiLog.length - 1].push(message);
};

const logClear = () => {
    console.clear();
    globalThis.aiLog.push([]);
};

const POINT_CODE = {
    unavailable: 'u',
    occupied: 'o',
    available: 'a',
    next: 'n',
    outOfBounds: 'x',
};

const MOVE_VALUES = {
    match4: 100,
    match3: 80,
    match2: 60,
    match4opponent: -100,
    match3opponent: -80,
    match2opponent: -60,
};

const MOVE_VALUES_MATCHES: {
    key: keyof typeof MOVE_VALUES;
    matches: string[];
}[] = [
    {
        key: 'match4',
        matches: ['aooo', 'oooa', 'oaoo', 'ooao'],
    },
    {
        key: 'match3',
        matches: ['aoo', 'ooa', 'oao'],
    },
    {
        key: 'match2',
        matches: ['ao', 'oa'],
    },
    {
        key: 'match4opponent',
        matches: ['nooo', 'ooon', 'onoo', 'oono'],
    },
    {
        key: 'match3opponent',
        matches: ['noo', 'oon', 'ono'],
    },
    {
        key: 'match2opponent',
        matches: ['no', 'on'],
    },
];

type MoveType = 'offensive' | 'defensive';

type Move = {
    value: number;
    x: number;
    name: string;
    type?: MoveType;
} & any;

export default function getAiMove() {
    const availableYs = Array.from({ length: COLUMN_COUNT }, (_, i) => state.availableY(i));

    logClear();

    log(state.player + ' is playing');

    log('availableYs', availableYs);

    const getMoves = (basePlay: Play | null): Move[] => {
        const moves: Move[] = [];

        if (!basePlay) return moves;

        for (const range of RANGES) {
            let encoding = '';
            const points: number[] = [];

            for (const [xDiff, yDiff] of range.points) {
                const [x, y] = [basePlay.x + xDiff, basePlay.y + yDiff];

                points.push(x);

                if (!isWithinBounds(x, y)) {
                    encoding += POINT_CODE.outOfBounds;
                    continue;
                }

                if (state.getPlay(x, y)?.player === basePlay.player) {
                    encoding += POINT_CODE.occupied;
                    continue;
                }

                const availableY = availableYs[x];

                if (availableY !== null) {
                    if (availableY === y) {
                        encoding += POINT_CODE.available;
                        continue;
                    }

                    if (availableY + 1 === y) {
                        encoding += POINT_CODE.next;
                        continue;
                    }
                }

                encoding += POINT_CODE.unavailable;
            }

            for (const { key, matches } of MOVE_VALUES_MATCHES) {
                for (const match of matches) {
                    const matches = encoding.indexOf(match);
                    if (matches > -1) {
                        const matchIndex = encoding.indexOf(match);

                        let aIndex = match.indexOf('a');

                        const availablePoint = matchIndex + aIndex;

                        moves.push({
                            value: MOVE_VALUES[key],
                            x: points[availablePoint],
                            name: key,
                            encoding,
                            matches,
                            aIndex,
                            matchIndex,
                            availablePoint,
                            points,
                        });
                    }
                }
            }
        }

        return moves;
    };

    const currentPlayer = state.player;

    if (!availableYs.filter(NonNullish).length) throw new Error('No available moves');

    const moves = state.plays
        .flatMap((play) => {
            const type = play.player === currentPlayer ? 'offensive' : 'defensive';
            return getMoves(play).map((move) => ({
                ...move,
                type,
                value: move.value + (type === 'defensive' ? -10 : 0),
            }));
        })
        .flat()
        .sort((a, b) => b.value - a.value);

    log(moves);

    if (moves.length === 0) {
        return 3;
    }

    const terribleMoves = moves.filter((m) => m.value < 0);

    const bestMove = moves.find((m) => m.value > 0 && !terribleMoves.some((tm) => tm.x === m.x));

    // make the move with the highest value unless that doesn't help the opponent
    if (bestMove) {
        log('bestMove', bestMove);
        return bestMove.x;
    }

    // attempt to make a move without a negative value
    const bestAvailableYs = availableYs.filter((x) => !moves.some((m) => m.x === x));

    log('bestAvailableYs', bestAvailableYs);

    if (bestAvailableYs.length) return bestAvailableYs[0]!;

    log('No available moves without a negative value.');

    return moves[0].x; // make the move with the highest value even if it's negative
}

import { COLUMN_COUNT, RANGES, ROW_COUNT } from './constants';
import { NonNullish, getRandomMinMax } from './utils';

declare module globalThis {
    var aiLog: any[];
}

const isWithinBounds = (x: number, y: number) => x >= 0 && x < COLUMN_COUNT && y >= 0 && y < ROW_COUNT;

globalThis.aiLog = [];

const POINT_CODE = {
    unavailable: 'u',
    occupied: 'o',
    available: 'a',
    next: 'n',
    outOfBounds: 'x',
};

type MoveMatch = 'match4' | 'match3' | 'match2' | 'match4Next' | 'match3Next' | 'match2Next';

type MoveType = 'offensive' | 'defensive';

const PATTERNS: Record<MoveMatch, string[]> = {
    match4: ['aooo', 'oooa', 'oaoo', 'ooao'],
    match3: ['aoo', 'ooa', 'oao'],
    match2: ['ao', 'oa'],
    match4Next: ['nooo', 'ooon', 'onoo', 'oono'],
    match3Next: ['noo', 'oon', 'ono'],
    match2Next: ['no', 'on'],
};

const MOVE_PRIORITY: {
    key: MoveMatch;
    type: MoveType;
    value: number;
}[] = [
    // this offensive move is prioritized over the defensive move
    { key: 'match4', type: 'offensive', value: 100 },
    { key: 'match4', type: 'defensive', value: 90 },

    // this defensive move is prioritized over the offensive move
    { key: 'match3', type: 'defensive', value: 80 },
    // more important we block the opponent from getting 3 in a row then getting 3 in a row ourselves
    { key: 'match3', type: 'offensive', value: 70 },

    // this offensive move is prioritized over the defensive move
    { key: 'match2', type: 'offensive', value: 60 },
    { key: 'match2', type: 'defensive', value: 50 },

    // bad moves
    { key: 'match3Next', type: 'defensive', value: -1 },
    { key: 'match4Next', type: 'offensive', value: -1 },
];

type GoodMove = {
    value: number;
    x: number;
    name: string;
    type: MoveType;
    extra: any;
};

type BadMove = {
    x: number;
    name: string;
    type: MoveType;
    extra: any;
};

export default function getAiMove() {
    const availableYs = Array.from({ length: COLUMN_COUNT }, (_, i) => state.availableY(i));

    const getMoves = (basePlay: Play | null) => {
        const moves: {
            goodMoves: GoodMove[];
            badMoves: BadMove[];
        } = {
            goodMoves: [],
            badMoves: [],
        };

        const moveType = basePlay?.player === state.player ? 'offensive' : 'defensive';

        if (!basePlay) return moves;

        for (const range of RANGES) {
            let encoding = '';
            let xPoints: number[] = [];

            range.points.forEach(([xDiff, yDiff]) => {
                const [x, y] = [basePlay.x + xDiff, basePlay.y + yDiff];

                xPoints.push(x);

                encoding += (() => {
                    if (!isWithinBounds(x, y)) return POINT_CODE.outOfBounds;

                    if (state.getPlay(x, y)?.player === basePlay.player) return POINT_CODE.occupied;

                    const availableY = availableYs[x];
                    if (availableY === y) return POINT_CODE.available;
                    if (availableY !== null && availableY + 1 === y) return POINT_CODE.next;

                    return POINT_CODE.unavailable;
                })();
            });

            for (const { key, value } of MOVE_PRIORITY.filter((m) => m.type === moveType)) {
                for (const pattern of PATTERNS[key]) {
                    const matchIndex = encoding.indexOf(pattern);
                    if (matchIndex == -1) continue;

                    let aIndex = pattern.indexOf(POINT_CODE.available);
                    let nIndex = pattern.indexOf(POINT_CODE.next);

                    if (aIndex > -1) {
                        const availableX = matchIndex + aIndex;
                        moves.goodMoves.push({
                            value,
                            x: xPoints[availableX],
                            name: key,
                            type: moveType,
                            extra: { encoding, aIndex, matchIndex, availablePoint: availableX, xPoints },
                        });
                    }

                    if (nIndex > -1) {
                        const xToAvoid = matchIndex + nIndex;
                        moves.badMoves.push({
                            x: xPoints[xToAvoid],
                            name: key,
                            type: moveType,
                            extra: {
                                encoding,
                                aIndex,
                                matchIndex,
                                xToAvoid,
                            },
                        });
                    }
                }
            }
        }

        return moves;
    };

    if (!availableYs.filter(NonNullish).length) throw new Error('No available moves');

    const goodMoves: GoodMove[] = [];
    const badMoves: BadMove[] = [];

    state.plays.forEach((play) => {
        const moves = getMoves(play);
        goodMoves.push(...moves.goodMoves);
        badMoves.push(...moves.badMoves);
    });

    goodMoves.sort((a, b) => b.value - a.value);

    if (goodMoves.length === 0) {
        const availableXs = availableYs.reduce((xs, y, x) => {
            if (y !== null) xs.push(x);
            return xs;
        }, [] as number[]);
        const index = getRandomMinMax(0, availableXs.length - 1);
        return availableXs[index];
    }

    // make the move with the highest value that does not help the opponent
    const bestMove = goodMoves.find((m) => !badMoves.some((bm) => bm.x === m.x));
    if (bestMove) return bestMove.x;

    // attempt to make a move without a negative value
    const bestAvailableYs = availableYs.filter((x) => !goodMoves.some((m) => m.x === x));

    if (bestAvailableYs.length) return bestAvailableYs[0]!;

    return goodMoves[0].x; // make the move with the highest value even if it's negative
}

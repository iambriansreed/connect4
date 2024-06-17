import { COLUMN_COUNT, RANGES, ROW_COUNT } from './constants';
import { NonNullish, getRandomMinMax } from './utils';

const isWithinBounds = (x: number, y: number) => x >= 0 && x < COLUMN_COUNT && y >= 0 && y < ROW_COUNT;

globalThis.aiLog = [];

const POINT_CODE = {
    unavailable: 'u',
    occupied: 'o',
    available: 'a',
    next: 'n',
    outOfBounds: 'x',
};

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

export default function getAiMove() {
    const aiLogTurn = [];

    aiLogTurn.push(state.player);

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

                    const availableX = matchIndex + aIndex;
                    const xToAvoid = matchIndex + nIndex;

                    const extra = { encoding, aIndex, matchIndex, availableX, xToAvoid, xPoints };

                    if (aIndex > -1) {
                        moves.goodMoves.push({
                            value,
                            x: xPoints[availableX],
                            name: key,
                            type: moveType,
                            extra,
                        });
                    }

                    if (nIndex > -1) {
                        moves.badMoves.push({
                            x: xPoints[xToAvoid],
                            name: key,
                            type: moveType,
                            extra,
                        });
                    }
                }
            }
        }

        return moves;
    };

    if (!availableYs.filter(NonNullish).length) {
        aiLog.push(['No available moves', availableYs]);
        throw new Error('No available moves');
    }

    const goodMoves: GoodMove[] = [];
    const badMoves: BadMove[] = [];

    state.plays.forEach((play) => {
        const moves = getMoves(play);
        goodMoves.push(...moves.goodMoves);
        badMoves.push(...moves.badMoves);
    });

    goodMoves.sort((a, b) => b.value - a.value);

    aiLogTurn.push({ goodMoves, badMoves });

    const getX = () => {
        // if there are no good moves, pick a random available column
        if (goodMoves.length === 0) {
            const availableXs = availableYs.reduce((xs, y, x) => {
                if (y !== null) xs.push(x);
                return xs;
            }, [] as number[]);
            const index = getRandomMinMax(0, availableXs.length - 1);

            aiLogTurn.push('random', { availableXs });
            return availableXs[index];
        }

        if (goodMoves[0].value === 100) {
            aiLogTurn.push('win the game');
            return goodMoves[0].x;
        }

        if (goodMoves[0].value === 90) {
            aiLogTurn.push('save the game');
            return goodMoves[0].x;
        }

        // make the move with the highest value that does not help the opponent
        const bestMove = goodMoves.find((m) => !badMoves.some((bm) => bm.x === m.x));
        if (bestMove) {
            aiLogTurn.push(['best non bad move', { bestMove }]);
            return bestMove.x;
        }

        // attempt to make a move without a negative value
        const bestAvailableY = availableYs.find((x) => x !== null && goodMoves.some((m) => m.x === x));
        if (bestAvailableY) {
            aiLogTurn.push(['bestAvailableY', bestAvailableY]);
            return bestAvailableY;
        }

        aiLogTurn.push(['goodMoves[0].x', goodMoves]);
        return goodMoves[0].x; // make the move with the highest value even if it's negative
    };

    aiLog.push(aiLogTurn);
    return getX();
}

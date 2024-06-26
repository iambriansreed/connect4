import { ROW_COUNT } from './constants';

export function stateInit(props: { aiPlayers: Player[] }): State {
    const playList: Play[] = [];
    let playIndexes: Record<string, Record<string, number>> = {};
    let dropping = 0;
    let currentPlayer: Player = 'player1';
    let debug = false;
    let aiPlayers = props.aiPlayers;

    return {
        setAiPlayers(...players: Player[]) {
            aiPlayers = players;
        },
        get debug() {
            return !!debug;
        },
        setDebug() {
            debug = true;
        },
        togglePlayer() {
            currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        },
        reset() {
            playList.length = 0;
            playIndexes = {};
            dropping = 0;
            currentPlayer = 'player1';
        },
        get isPlayerAi() {
            return aiPlayers.includes(currentPlayer);
        },
        get plays() {
            return [...playList];
        },
        dropping(is: boolean = true) {
            dropping = dropping + (is ? 1 : -1);
        },
        get isDropping() {
            return dropping > 0;
        },
        get player() {
            return currentPlayer;
        },
        get playsLength() {
            return playList.length;
        },
        addPlay({ x, y, player }: Play) {
            playList.push({ x, y, player });
            playIndexes[x] = playIndexes[x] || {};
            playIndexes[x][y] = playList.length - 1;
        },
        at(index: number) {
            return index < 0 ? playList[playList.length + index] : playList[index];
        },
        getPlay(x: number, y: number) {
            return playIndexes ? playList[playIndexes[x]?.[y]] : null;
        },
        availableY(x: number) {
            const y = Object.keys(playIndexes[x] || {}).length;
            return y < ROW_COUNT ? y : null;
        },
    };
}

declare type Player = 'player1' | 'player2';

declare type Point = {
    x: number;
    y: number;
    player?: Player;
};

declare type Play = {
    x: number;
    y: number;
    player: Player;
};

declare type App = {
    board: HTMLElement;
    columns: HTMLElement;
    size: HTMLElement;
    gameOver: HTMLElement;
    gameTie: HTMLElement;
    gameStart: HTMLElement;
    restartButtons: HTMLButtonElement[];
    startButton: HTMLButtonElement;
    buttons: HTMLButtonElement[];
    spacesWrapper: HTMLElement[];
    winMessage: HTMLElement;
    nextChecker: HTMLElement;
    column: HTMLElement[];
};

declare type State = {
    debug: boolean;
    get isPlayerAi(): boolean;
    get plays(): Play[];
    dropping(is: boolean): void;
    get isDropping(): boolean;
    get player(): Player;
    togglePlayer(): void;
    get playsLength(): number;
    addPlay(x: number, y: number, player: Player): void;
    at(index: number): Play;
    getPlay(x: number, y: number): Play | null;
    availableY(x: number): number | null;
    reset(): void;
};

declare module globalThis {
    var app: App;
    var state: State;
    var aiLog: any[];
}

declare type MoveMatch = 'match4' | 'match3' | 'match2' | 'match4Next' | 'match3Next' | 'match2Next';

declare type MoveType = 'offensive' | 'defensive';

declare type GoodMove = {
    value: number;
    x: number;
    name: string;
    type: MoveType;
    extra: any;
};

declare type BadMove = {
    x: number;
    name: string;
    type: MoveType;
    extra: any;
};

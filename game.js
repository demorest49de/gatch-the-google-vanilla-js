import {Status} from "./constants.js";

export class Game {
  #settings;
  //   = {
  //   gridSize: {
  //     rows: 2,
  //     columns: 2,
  //   }
  // };
  
  #status = Status.pending;
  
  #player1;
  #player2;
  #google;
  
  #allUnits;
  #allPlayers;
  
  #playerNames = [
    'player1',
    'player2',
    'google',
  ];
  
  #googleJumpIntervalId;
  
  #score = {
    1: {points: 0},
    2: {points: 0}
  };
  
  #movePlayer(player, otherPlayer, moveInfo) {
    const isOnBorder = this.checkPlayerIsOnBorder(player, moveInfo);
    const isOnDifferentPlayer = this.#checkDidPlayersOverlap(player, otherPlayer, moveInfo);
    
    if (isOnBorder || isOnDifferentPlayer) return;
    
    const {x, y} = player.position;
    
    if (moveInfo.x) {
      player.position = new Position(x + moveInfo.x, y);
    }
    
    if (moveInfo.y) {
      player.position = new Position(x, y + moveInfo.y);
    }
    
    const isOnGoogle = this.#checkPlayerDidCatchGoogle(player);
  }
  
  #checkPlayerDidCatchGoogle(player) {
    return player.position.equal(this.#google.position);
  }
  
  #movePlayer1Right() {
    this.#movePlayer(this.#player1, this.#player2, {x: 1});
  }
  
  #movePlayer1Left() {
    this.#movePlayer(this.#player1, this.#player2, {x: -1});
  }
  
  #movePlayer1Up() {
    this.#movePlayer(this.#player1, this.#player2, {y: 1});
  }
  
  #movePlayer1Down() {
    this.#movePlayer(this.#player1, this.#player2, {y: -1});
  }
  
  #movePlayer2Right() {
    this.#movePlayer(this.#player1, this.#player2, {x: 1});
  }
  
  #movePlayer2Left() {
    this.#movePlayer(this.#player1, this.#player2, {x: -1});
  }
  
  #movePlayer2Up() {
    this.#movePlayer(this.#player1, this.#player2, {y: 1});
  }
  
  #movePlayer2Down() {
    this.#movePlayer(this.#player1, this.#player2, {y: -1});
  }
  
  get settings() {
    return this.#settings;
  }
  
  // set settings(settings) {
  //   this.#settings = settings;
  // }
  
  get status() {
    return this.#status;
  }
  
  get player1() {
    return this.#player1;
  }
  
  get player2() {
    return this.#player2;
  }
  
  get google() {
    return this.#google;
  }
  
  set status(status) {
    this.#status = status;
  }
  
  setSettings(settings = {}) {
    this.#settings = {
      ...this.#settings,
      gridSize:
        {...this.#settings.gridSize, ...settings},
      ...settings
    };
  }
  
  startGame() {
    this.#status = Status.inProgress;
    this.#createUnits();
    this.#googleJumpIntervalId = setInterval(() => {
      this.#moveGoogleToRandomPosition();
    }, this.#settings.jumpGoogleInterval);
  }
  
  stopGame() {
    clearInterval(this.#googleJumpIntervalId);
  }
  
  #checkRandomPlayersPosition() {
    
    
    const playersPos = new Set();
    
    const positions = {};
    while (playersPos.size < this.#playerNames.length) {
      const prevSize = playersPos.size;
      const playerName = this.#playerNames[prevSize];
      const newPos = this.#createRandomPosition();
      playersPos.add(this.#createNumber(newPos));
      
      prevSize !== playersPos.size && (positions[playerName] = newPos);
    }
    
    return positions;
  }
  
  #moveGoogleToRandomPosition() {
    const players = this.#allPlayers;
    
    const playersPos = new Set();
    
    
    for (const player of Object.values(players)) {
      playersPos.add(this.#createNumber(player));
    }
    
    while (playersPos.size < this.#playerNames.length) {
      const prevSize = playersPos.size;
      const newGooglePos = this.#createRandomPosition();
      playersPos.add(this.#createNumber(newGooglePos));
      
      prevSize !== playersPos.size && (this.#google.position = newGooglePos);
    }
  }
  
  #createNumber(player) {
    return new Number(`${player.position.x}${player.position.y}`).valueOf();
  }
  
  #createRandomPosition() {
    const x = this.#getRandomNumber(1, this.#settings.gridSize.rows);
    const y = this.#getRandomNumber(1, this.#settings.gridSize.columns);
    return {position: {x, y}};
  }
  
  #getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  constructor() {
    this.#settings = {
      gridSize: {
        rows: 3,
        columns: 3,
      },
      jumpGoogleInterval: 150
    };
  }
  
  #createUnits() {
    const {
      player1,
      player2,
      google,
    } = this.#checkRandomPlayersPosition();
    this.#player1 = new Player(player1.position, 1);
    this.#player2 = new Player(player2.position, 2);
    this.#google = new Google(google.position);
    
    // TODO add or remove below
    this.#allUnits = [this.#player1, this.#player2, this.#google];
    
    // TODO add or remove below
    this.#allPlayers = [this.#player1, this.#player2];
  }
  
  checkPlayerIsOnBorder(player, moveInfo) {
    const positionCopy = player.position.clone();
    
    if (moveInfo.x) positionCopy.x += moveInfo.x;
    if (moveInfo.y) positionCopy.y += moveInfo.y;
    
    if (positionCopy.x < 1 || positionCopy.x > this.#settings.gridSize.rows) return true;
    if (positionCopy.y < 1 || positionCopy.y > this.#settings.gridSize.columns) return true;
    
    return false;
  }
  
  #checkDidPlayersOverlap(currentPlayer, otherPlayer, moveInfo) {
    const positionCopy = currentPlayer.position.clone();
    
    if (moveInfo.x) positionCopy.x += moveInfo.x;
    if (moveInfo.y) positionCopy.y += moveInfo.y;
    
    return positionCopy.equal(otherPlayer.position);
  }
  
}

class Unit {
  constructor(position) {
    this.position = position;
  }
}

export class Player extends Unit {
  constructor(position, id) {
    super(position);
    this.id = id;
  }
}

export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  clone() {
    return new Position(this.x, this.y);
  }
  
  equal({x, y}) {
    return this.x === x && this.y === y;
  }
}

export class Google extends Unit {
  constructor(position) {
    super(position);
  }
}

//  "type": "module" , - in package.json
// const game = new Game();

//ctrl + shift + "-" - fold
//ctrl + shift + "+" - unfold
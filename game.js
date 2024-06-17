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
  }
  
  #checkRandomPlayersPosition() {
    const playerNames = [
      'player1',
      'player2',
      'google',
    ];
    
    const playersPos = new Set();
    
    const positions = {};
    while (playersPos.size < playerNames.length) {
      const prevSize = playersPos.size;
      const playerName = playerNames[prevSize];
      const newPos = this.#createRandomPosition();
      playersPos.add(this.#createNumber(newPos));
      
      prevSize !== playersPos.size && (positions[playerName] = newPos);
    }
    
    return positions;
  }
  
  #checkGoogleUniquePosition() {
  
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
      }
    };
  }
  
  #moveGoogleToRandomPosition() {
  
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
  }
  
  #validatePlayerIsInsideOffBorder(player, moveInfo) {
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
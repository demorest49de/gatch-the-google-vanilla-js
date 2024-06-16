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
  
  get settings() {
    return this.#settings;
  }
  
  set settings(settings) {
    this.#settings = settings;
  }
  
  get status() {
    return this.#status;
  }
  
  get player1() {
    return this.#player1;
  }
  
  get player2() {
    return this.#player2;
  }
  
  set status(status) {
    this.#status = status;
  }
  
  startGame() {
    this.#status = Status.inProgress;
  }
  
  #getPlayersPosition() {
    return this.#checkPlayersCoordinates();
  }
  
  #checkPlayersCoordinates() {
    // const [player1, player2] = this.#getRandomPlayerCoords();
    // if (JSON.stringify(player1.position) !== JSON.stringify(player2.position)) {
    //   return {player1, player2};
    // }
    // const google = this.#createInitialPosition();
    // const num1 = new Number(`${player1.position.x}${player1.position.y}`);
    // const num2 = new Number(`${player2.position.x}${player2.position.y}`);
    // if (num1 != num2) {
    //   return {player1, player2};
    // }
    
    const player1 = this.#createInitialPosition();
    const player2 = this.#createInitialPosition();
    const google = {position: {x: 0, y: 0}};
    
    const playersPos = new Set();
    playersPos.add(this.#createNumber(google));
    // playersPos.add(this.#createNumber({position: {x: 1, y: 2}}));
    // playersPos.add(this.#createNumber({position: {x: 1, y: 2}}));
    playersPos.add(this.#createNumber(player1));
    playersPos.add(this.#createNumber(player2));
    
    while (playersPos.size !== 3) {
      playersPos.add( this.#createNumber(this.#createInitialPosition()));
    }
    
    return {player1, player2, google};
  }
  
  #createNumber(player){
    return new Number(`${player.position.x}${player.position.y}`).valueOf();
  }
  
  #createInitialPosition() {
    const x = this.#getRandomNumber(1, this.#settings.gridSize.rows);
    const y = this.#getRandomNumber(1, this.#settings.gridSize.columns);
    return {position: {x, y}};
  }
  
  // #getRandomPlayerCoords() {
  //   const playersPos = new Array(2).fill({}).map(() => (this.#createInitialPosition()));
  //   let i = 0;
  //   while (i < playersPos.length) {
  //     const x = this.#getRandomNumber(1, this.#settings.gridSize.rows);
  //     const y = this.#getRandomNumber(1, this.#settings.gridSize.columns);
  //     playersPos[i].position.x = x;
  //     playersPos[i].position.y = y;
  //     i++;
  //   }
  //   return playersPos;
  // }
  
  #getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  constructor(rows = 2, cols = 2) {
    this.#settings = {
      gridSize: {
        rows: rows,
        columns: cols,
      }
    };
    const {
      player1,
      player2,
      google,
    } = this.#getPlayersPosition();
    
    this.#player1 = new Player(player1.position, 1);
    this.#player2 = new Player(player2.position, 2);
    this.#google = new Google(google.position);
    
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

export class Google extends Unit {
  constructor(position) {
    super(position);
  }
}

//  "type": "module" , - in package.json
// const game = new Game();
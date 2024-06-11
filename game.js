import {Status} from "./constants";

export class Game {
  #settings;
  #status = Status.pending;
  #player1;
  #player2;
  
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
  
  constructor(rows = 2, cols = 2) {
    this.#settings = {
      gridSize: {
        rows: rows,
        columns: cols,
      }
    };
    const {player1, player2} = this.#getPlayerPosition();
    this.#player1 = new Player(player1.position);
    this.#player2 = new Player(player2.position);
  }
  
  startGame() {
    this.#status = Status.inProgress;
  }
  
  #getPlayerPosition() {
    return this.#checkPlayersCoordinates();
  }
  
  #checkPlayersCoordinates() {
    const [player1, player2] = this.#getRandomPlayerCoords();
    if (JSON.stringify(player1.position) !== JSON.stringify(player2.position)) {
      return {player1, player2};
    }
    
    return this.#checkPlayersCoordinates();
  }
  
  #getRandomPlayerCoords() {
    const playersPos = new Array(2).fill().map(()=>({position:{x: 0, y: 0}}));
    let i = 0;
    while (i < playersPos.length) {
      const x = this.#getRandomNumber(1, this.#settings.gridSize.rows);
      const y = this.#getRandomNumber(1, this.#settings.gridSize.columns);
      playersPos[i].position.x  = x;
      playersPos[i].position.y = y;
      i++;
    }
    return playersPos;
  }
  
  #getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export class Player {
  constructor(position) {
    this.position = position;
  }
}
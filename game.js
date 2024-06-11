import {Status} from "./constants";

export class Game {
  #settings;
  #status = Status.pending;
  
  constructor() {
  }
  
  get settings() {
    return this.#settings;
  }
  
  set settings(settings) {
    this.#settings = settings;
  }
  
  get status()  {
    return this.#status;
  }
  set status(status) { this.#status  = status;}
  
  startGame()  {
    this.#status = Status.inProgress;
  }
}
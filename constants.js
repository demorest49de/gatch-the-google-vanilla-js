export class Status {
  static #pending = 'pending';
  static #inProgress  = 'in-progress';
  
  static get pending() {
    return this.#pending;
  }
  static get inProgress()  {
    return this.#inProgress;
  }
}
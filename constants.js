export class Status {
  static #pending = "pending"
  static #inProgress = "in-progress"
  static #paused = "paused"
  static #finished = "finished"

  static get pending() {
    return this.#pending
  }

  static get inProgress() {
    return this.#inProgress
  }

  static get paused() {
    return this.#paused
  }

  static get finished() {
    return this.#finished
  }
}

import { Status } from "./constants.js"

export class Game {
  #settings

  #status = Status.pending

  #player1
  #player2
  #google

  #allUnits
  #allPlayers

  #playerNames = ["player1", "player2", "google"]

  #googleJumpIntervalId

  #score = {
    1: { points: 0 },
    2: { points: 0 },
  }

  #movePlayer(player, otherPlayer, moveInfo) {
    const isOnBorder = this.checkPlayerIsOnBorder(player, moveInfo)
    const isOnDifferentPlayer = this.#checkDidPlayersOverlap(player, otherPlayer, moveInfo)

    if (isOnBorder || isOnDifferentPlayer) return

    const { x, y } = player.position

    if (moveInfo.x) {
      player.position = new Position(x + moveInfo.x, y)
    }

    if (moveInfo.y) {
      player.position = new Position(x, y + moveInfo.y)
    }

    const isOnGoogle = this.#checkPlayerDidCatchGoogle(player)

    if (isOnGoogle) {
      this.#updateScore(player)
      if (this.#score[player.id].points === this.#settings.maxPointsToWin) {
        this.stopGame()
        return
      }
      this.#moveGoogleToRandomPosition()
    }
  }

  #checkPlayerDidCatchGoogle(player) {
    return player.position.equal(this.#google.position)
  }

  #updateScore(player) {
    this.#score[player.id].points++
  }

  stopGame() {
    clearInterval(this.#googleJumpIntervalId)
    this.#google.position = new Position(0, 0)
    this.#status = Status.finished
  }

  movePlayer1Right() {
    this.#movePlayer(this.#player1, this.#player2, { x: 1 })
  }

  movePlayer1Left() {
    this.#movePlayer(this.#player1, this.#player2, { x: -1 })
  }

  movePlayer1Up() {
    this.#movePlayer(this.#player1, this.#player2, { y: 1 })
  }

  movePlayer1Down() {
    this.#movePlayer(this.#player1, this.#player2, { y: -1 })
  }

  movePlayer2Right() {
    this.#movePlayer(this.#player2, this.#player1, { x: 1 })
  }

  movePlayer2Left() {
    this.#movePlayer(this.#player2, this.#player1, { x: -1 })
  }

  movePlayer2Up() {
    this.#movePlayer(this.#player2, this.#player1, { y: 1 })
  }

  movePlayer2Down() {
    this.#movePlayer(this.#player2, this.#player1, { y: -1 })
  }

  get settings() {
    return this.#settings
  }

  get status() {
    return this.#status
  }

  get player1() {
    return this.#player1
  }

  get player2() {
    return this.#player2
  }

  get google() {
    return this.#google
  }

  get score() {
    return this.#score
  }

  set status(status) {
    this.#status = status
  }

  setSettings(settings = {}) {
    this.#settings = {
      ...this.#settings,
      gridSize: { ...this.#settings.gridSize, ...settings },
      ...settings,
    }
  }

  get googlePrevPositionTest() {
    return this.#google.prevPos
  }

  startGame() {
    this.#status = Status.inProgress
    this.#createUnits()

    //TODO remove after testing
    this.#google.prevPos = this.#google.position

    // TODO use it on next random google position
    this.#googleJumpIntervalId = setInterval(() => {
      this.#moveGoogleToRandomPosition()
    }, this.#settings.jumpGoogleInterval)
  }

  #checkRandomPlayersPosition() {
    const playersPos = new Set()

    const positions = {}
    while (playersPos.size < this.#playerNames.length) {
      const prevSize = playersPos.size
      const playerName = this.#playerNames[prevSize]
      const newPos = this.#createRandomPosition()
      playersPos.add(this.#createNumber(newPos))

      prevSize !== playersPos.size && (positions[playerName] = newPos)
    }

    return positions
  }

  #moveGoogleToRandomPosition() {
    const units = this.#allUnits
    const googlePrevPos = units.google.position
    delete units.google.position
    const playersPos = new Set()

    for (const unit of Object.values(units)) {
      unit.position && playersPos.add(this.#createNumber(unit.position))
    }

    while (playersPos.size < this.#playerNames.length) {
      const prevSize = playersPos.size
      const newGooglePos = this.#createRandomPosition()
      !googlePrevPos.equal(newGooglePos) && playersPos.add(this.#createNumber(newGooglePos))

      prevSize !== playersPos.size && (this.#google.position = newGooglePos)
    }
  }

  #createNumber(player) {
    return new Number(`${player.x}${player.y}`).valueOf()
  }

  #createRandomPosition() {
    const x = this.#getRandomNumber(1, this.#settings.gridSize.columns)
    const y = this.#getRandomNumber(1, this.#settings.gridSize.rows)
    return new Position(x, y)
  }

  #getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  constructor() {
    this.#settings = {
      gridSize: {
        rows: 3,
        columns: 3,
      },
      jumpGoogleInterval: 150,
      maxPointsToWin: 10,
    }
  }

  #createUnits() {
    const { player1, player2, google } = this.#checkRandomPlayersPosition()
    this.#player1 = new Player(player1, 1)
    this.#player2 = new Player(player2, 2)
    this.#google = new Google(google)

    // TODO add or remove below
    this.#allUnits = { player1: this.#player1, player2: this.#player2, google: this.#google }

    // TODO add or remove below
    this.#allPlayers = { player1: this.#player1, player2: this.#player2 }
  }

  checkPlayerIsOnBorder(player, moveInfo) {
    const positionCopy = player.position.clone()

    if (moveInfo.x) positionCopy.x += moveInfo.x
    if (moveInfo.y) positionCopy.y += moveInfo.y

    if (positionCopy.x < 1 || positionCopy.x > this.#settings.gridSize.rows) return true
    if (positionCopy.y < 1 || positionCopy.y > this.#settings.gridSize.columns) return true

    return false
  }

  #checkDidPlayersOverlap(currentPlayer, otherPlayer, moveInfo) {
    const positionCopy = currentPlayer.position.clone()

    if (moveInfo.x) positionCopy.x += moveInfo.x
    if (moveInfo.y) positionCopy.y += moveInfo.y

    return positionCopy.equal(otherPlayer.position)
  }
}

class Unit {
  constructor(position) {
    this.position = position
  }
}

export class Player extends Unit {
  constructor(position, id) {
    super(position)
    this.id = id
  }
}

export class Position {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  clone() {
    return new Position(this.x, this.y)
  }

  equal({ x, y }) {
    return this.x === x && this.y === y
  }
}

export class Google extends Unit {
  constructor(position) {
    super(position)
    this.prevPos = new Position(0, 0)
  }
}

//  "type": "module" , - in package.json

//ctrl + shift + "-" - fold
//ctrl + shift + "+" - unfold

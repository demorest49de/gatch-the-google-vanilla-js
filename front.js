import { Game } from "./game.js"

const game = new Game()
game.setSettings({
  gridSize: {
    rows: 3,
    columns: 3,
  },
  jumpGoogleInterval: 150,
  maxPointsToWin: 10,
})

const tableGridEl = document.getElementById("table-grid")

for (let x = 1; x <= game.settings.gridSize.columns; x++) {
  const trEl = document.createElement("tr")
  tableGridEl.append(trEl)
  for (let y = 1; y <= game.settings.gridSize.rows; y++) {
    const tdEl = document.createElement("td")
    trEl.append(tdEl)
  }
}

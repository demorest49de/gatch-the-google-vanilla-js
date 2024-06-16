import {Game} from "./game";
import {Status} from "./constants";

test('check init settings', () => {
  const game = new Game();
  game.setSettings({
    gridSize: {
      rows: 4,
      columns: 4,
    }
  });
  game.startGame();
  const {gridSize} = game.settings;
  expect(gridSize.rows).toBe(4);
  expect(gridSize.columns).toBe(4);
});

test('check start game', () => {
  const game = new Game();
  
  expect(game.status).toBe(Status.pending);
  game.startGame();
  expect(game.status).toBe(Status.inProgress);
});

test('check player position', () => {
  const game = new Game();
  game.startGame();
  const {player1, player2} = game;
  const num1 = new Number(`${player1.position.x}${player1.position.y}`);
  const num2 = new Number(`${player2.position.x}${player2.position.y}`);
  expect(num1).not.toBe(num2);
  expect(num1).not.toBe(0);
  expect(num2).not.toBe(0);
});

test('check player status', () => {
  const game = new Game();
  game.startGame();
  expect(game.player1.position.x).not.toBe(0);
  
});

test('check google position', async () => {
  const game = new Game();
  
  game.setSettings({
    gridSize: {
      rows: 4,
      columns: 4,
    },
    jumpGoogleInterval: 120
  });
  
  game.startGame();
  
  const prevPosition = game.google.position;
  
  await delay(121);
  
  expect(prevPosition).not.toBe(game.google.position);
});

const delay = (ms) => {
  return new Promise(r => setTimeout(r, ms));
};
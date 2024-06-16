import {Game} from "./game";
import {Status} from "./constants";

test('check init settings', () => {
  const game = new Game();
  game.settings = {
    gridSize: {
      rows: 2,
      columns: 2,
    }
  };
  const {gridSize} = game.settings;
  expect(gridSize.rows).toBe(2);
  expect(gridSize.columns).toBe(2);
});

test('check start game', () => {
  const game = new Game();
  
  expect(game.status).toBe(Status.pending);
  
  game.startGame();
  
  expect(game.status).toBe(Status.inProgress);
});

test('check player position', () => {
  const game = new Game();
  const {player1, player2} = game;
  const num1 = new Number(`${player1.position.x}${player1.position.y}`)
  const num2 = new Number(`${player2.position.x}${player2.position.y}`)
  expect(num1).not.toBe(num2)
  expect(num1).not.toBe(0)
  expect(num2).not.toBe(0);
});

test('check player status', () => {
  const game = new Game();
  
  
 
});

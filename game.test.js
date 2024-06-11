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


test('check statuses', () => {
  
  expect(Status.pending).toBe('pending');
  expect(Status.inProgress).toBe('in-progress');
});

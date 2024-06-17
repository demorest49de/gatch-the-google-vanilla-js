import {Game} from "./game";
import {Status} from "./constants";

describe("Game Test", function () {
  
  beforeEach(function () {
  
  });
  
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
    const {player1, player2, google} = game;
    
  });
  
  test('check start game', () => {
    const game = new Game();
    game.startGame();
    
  });
  
  test('check google position', async () => {
    for (let i = 0; i < 50; i++) {
      const game = new Game();
      
      game.setSettings({
        gridSize: {
          rows: 4,
          columns: 4,
        }
      });
      
      game.startGame();
      
      const prevPosition = game.google.position;
      
      await delay(150);
      
      expect(prevPosition).not.toBe(game.google.position);
    }
  });
  
  const delay = (ms) => {
    return new Promise(r => setTimeout(r, ms));
  };
});

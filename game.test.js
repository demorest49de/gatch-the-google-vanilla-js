import {Game} from "./game";
import {Status} from "./constants";

describe("Game Test", function () {
  
  let game;
  
  beforeEach(function () {
    game = new Game();
  });
  
  afterEach(function () {
    game.stopGame();
  });
  
  test('check game init', () => {
    // const game = new Game();
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
    
    expect(game.status).toBe(Status.pending);
    game.startGame();
    expect(game.status).toBe(Status.inProgress);
  });
  
  test('check player position', () => {
    for (let i = 0; i < 10; i++) {
      game.setSettings({
        gridSize: {
          rows: 4,
          columns: 4,
        },
      });
      
      game.startGame();
      
      expect(game.player1.position).not.toEqual(game.player2.position);
      expect(game.google.position).not.toEqual(game.player1.position);
      expect(game.google.position).not.toEqual(game.player2.position);
    }
  });
  
  test('check google position after jump', async () => {
    for (let i = 0; i < 40; i++) {
      
      game.setSettings({
        gridSize: {
          rows: 4,
          columns: 4,
        },
        jumpGoogleInterval: 10,
      });
      
      game.startGame();
      
      const prevPosition = game.google.position;
      
      await delay(20);
      
      expect(prevPosition).not.toBe(game.google.position);
      
      game.stopGame();
    }
  });
  
  test('Check player moving validation in one row 3x1', async () => {
    game.setSettings({
      gridSize: {
        rows: 4,
        columns: 4,
      },
      jumpGoogleInterval: 10,
    });
    game.startGame();
    
    const prevPosition = game.google.position.clone();
    
    const deltaForPlayer1 = game.google.position.x - game.player1.position.x;
    
    if (Math.abs(deltaForPlayer1) === 2) {
      const deltaForPlayer2 = game.google.position.x - game.player2.position.x;
      if (deltaForPlayer2 > 0) {
        game.movePlayer2Right();
      } else {
        game.movePlayer2Left();
      }
      expect(game.score[1].points).toBe(0);
      expect(game.score[2].points).toBe(1);
    } else {
      if (deltaForPlayer1 > 0) {
        game.movePlayer1Right();
      } else {
        game.movePlayer1Left();
      }
      expect(game.score[1].points).toBe(1);
      expect(game.score[2].points).toBe(0);
    }
    
    expect(game.google.position).not.toEqual(prevPosition);
  });
  
});
const delay = (ms) => {
  return new Promise(r => setTimeout(r, ms));
};

import Start from "./scenes/Start.js";
import Game from "./scenes/Game.js";
import End from "./scenes/End.js";
import Instructions from "./scenes/Instructions.js";
const config = {
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [Start, Game, Instructions, End],
};

window.game = new Phaser.Game(config);



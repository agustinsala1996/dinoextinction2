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

//--------------------------------- CREAR EVENTO QUE DIFERENCIE ENTRE NIVELES
//--------------------------------- CREAR EVENTOS CADA 1SEG DE LARGAR LOS ENEMIGOS
//--------------------------------- CREAR EVENTO PARA ENEMIGO FINAL UNA VEZ ELIMINADOS TODOS LOS ENEMIGOS (10 x nivel)
//--------------------------------- CREAR TEXTO DE SIGUIENTE NIVEL UNA VEZ ELIMINADO EL ENEMIGO/S FINAL DE CADA NIVEL
//--------------------------------- CREAR ANIMACION DE ATAQUE CON ESPADA
//--------------------------------- CREAR ATAQUE MELEE(EVENTO)
//--------------------------------- CREAR MENU PRINCIPAL
//--------------------------------- CREAR GAME OVER
//--------------------------------- CREAR PUNTUACIONES
//--------------------------------- CREAR VIDA DE PERSONAJE
//--------------------------------- CREAR VIDA DE ENEMIGO FINAL
//--------------------------------- CREAR RECIBIR ATAQUE ENEMIGO COMUN
//--------------------------------- CREAR RECIBIR ATAQUE ENEMIGO FINAL
//--------------------------------- CREAR SONIDO DE ATAQUE MELEE,IMPACTOS TANTO NUESTRO COMO A LOS ENEMIGOS PEQUENIOS Y GRANDES, MUSICA MENU PRINCIPAL

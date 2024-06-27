export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.gameOver = false;
    this.score = 0;
    this.enemyScore = {
      enemigo: { points: 10, count: 0 },
      boss: { points: 100, count: 0 },
    };
  }

  preload() {
    //fondo
    this.load.image("fondo", "./public/assets/fondo.png");

    //personaje SE VE MAL
    this.load.image("personaje", "./public/assets/tercero.png");

    //enemigo
    this.load.image("enemigo", "./public/assets/enemigo.png");

    //boss
    this.load.image("boss", "./public/assets/boss.png");
  }

  create() {
    //fondo
    this.fondo = this.add.image(400, 300, "fondo");
    this.fondo.setScale(1);

    //personaje
    this.personaje = this.physics.add.sprite(400, 300, "personaje");
    this.personaje.setScale(2);
    this.personaje.setCollideWorldBounds(true);
    this.personaje.body.immovable = true;

    //grupo de enemigos
    this.enemigos = this.physics.add.group();
    //agregar enemigo al grupo de enemigos
    const enemigo = this.enemigos.create(800, 0, "enemigo");
    enemigo.setScale(0.1);
    //boss
    this.boss = this.physics.add.sprite(0, 800, "boss");
    this.boss.setScale(0.4);

    //colision entre personaje y enemigos
    //this.physics.add.collider(this.personaje, this.enemigos);
    // Añadir colisiones entre el jefe y el personaje
    this.physics.add.collider(this.boss, this.personaje, () => {
      // Esta función se llama cuando el jefe colisiona con el personaje

      // Detener la física del jefe para que deje de moverse
      this.boss.body.setVelocity(0);

      // Cambiar a la escena 'End.js'
      this.scene.start("End", { score: this.score, gameOver: this.gameOver });
    });
    this.physics.add.collider(this.boss, this.enemigos);

    //teclas
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // evento 1 segundo
    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    // Ataque melee
    this.isAttacking = false;
    this.space.on("down", () => {
      this.isAttacking = true;
      // Aquí puedes agregar la animación de ataque cuando esté lista
    });
    this.space.on("up", () => {
      this.isAttacking = false;
    });
    this.enemySpeed = 80;
    this.bossSpeed = 20;
    this.maxSpeed = 80;
    this.scoreText = this.add.text(16, 16, "Puntuación: 0", {
      fontSize: "32px",
      fill: "#FFF",
    });
  }

  update() {
    if (this.a.isDown) {
      this.personaje.setVelocityX(-160);
    } else if (this.d.isDown) {
      this.personaje.setVelocityX(160);
    } else {
      this.personaje.setVelocityX(0);
    }
    if (this.w.isDown) {
      this.personaje.setVelocityY(-160);
    } else if (this.s.isDown) {
      this.personaje.setVelocityY(160);
    } else {
      this.personaje.setVelocityY(0);
    }

    // Aumentar la velocidad del jefe gradualmente hasta que alcance la velocidad máxima
    if (this.bossSpeed < this.maxSpeed) {
      // Incrementar la velocidad en 1 (o el valor que desees para controlar la aceleración)
      this.bossSpeed += 0.02;
    }

    this.bossSpeed = Math.min(this.bossSpeed, this.maxSpeed);
    this.physics.moveToObject(this.boss, this.personaje, this.bossSpeed);

    // Verificar colisiones para ataque melee
    this.physics.world.overlap(
      this.personaje,
      this.enemigos,
      (personaje, enemigo) => {
        if (this.isAttacking) {
          enemigo.destroy(); // Elimina al enemigo si el personaje está atacando
          this.score += this.enemyScore.enemigo.points; // Aumenta la puntuación
          this.enemyScore.enemigo.count++;
          this.scoreText.setText(`Puntuación: ${this.score}`); // Actualiza el texto de la puntuación
        } else {
          this.gameOver = true; // Termina el juego o reduce la vida del personaje
        }
      }
    );
  }

  onSecond() {
    const posX = Phaser.Math.Between(0, 800);
    const posY = Phaser.Math.Between(0, 600);

    const posiciones = [
      [0, Phaser.Math.Between(0, 600)],
      [800, Phaser.Math.Between(0, 600)],
      [Phaser.Math.Between(0, 800), 0],
      [Phaser.Math.Between(0, 800), 600],
    ];

    const pos = Phaser.Math.RND.pick(posiciones);

    this.enemigos.create(pos[0], pos[1], "enemigo").setScale(0.1);

    this.enemigos.getChildren().forEach(function (enemigo) {
      this.physics.moveToObject(enemigo, this.personaje, this.enemySpeed);
      console.log(this.personaje);
    }, this);
  }
}

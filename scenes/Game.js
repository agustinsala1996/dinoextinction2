export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.gameOver = false;
    this.score = 0;
    this.enemyScore = {
      enemigo: { points: 10, count: 0 }
    };
    this.currentAnimation = 'walk-down'; // Variable para almacenar la animación actual
    this.powerUpDuration = 4000; // Duración del efecto del power-up (en ms)
  }

  preload() {
    //fondo
    this.load.image("fondo", "./public/assets/graybackground.png");

    //personaje 
    //this.load.image("personaje", "./public/assets/tercero.png");
    this.load.spritesheet("personaje", "./public/assets/charactersheet.png", {
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.spritesheet("ataques", "./public/assets/charactersheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    //enemigo
    this.load.image("enemigo", "./public/assets/dinopixel.png");

    //boss
    this.load.image("boss", "./public/assets/dinopixel.png");

    //powerup
    this.load.image("powerup", "./public/assets/egg.png")


    }

  create() {
    //fondo
    this.fondo = this.add.image(400, 300, "fondo");
    this.fondo.setScale(1);

    //personaje
    this.personaje = this.physics.add.sprite(400, 300, "personaje");
    this.personaje.setScale(3);
    this.personaje.setCollideWorldBounds(true);
    this.personaje.body.immovable = true;
    

    ////prueba
    // Define animaciones para el personaje
  this.anims.create({
    key: 'walk-left',
    frames: this.anims.generateFrameNumbers('personaje', { start: 51, end: 54}),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'walk-right',
    frames: this.anims.generateFrameNumbers('personaje', { start: 17, end: 20 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers('personaje', { start: 34, end: 37 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('personaje', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  //attack anims
  this.anims.create({
    key: 'attack-left',
    frames: this.anims.generateFrameNumbers('ataques', { start: 56, end: 59 }),
    frameRate: 10,
    repeat: -1,
    
  });
  this.anims.create({
    key: 'attack-right',
    frames: this.anims.generateFrameNumbers('ataques', { start: 48, end: 51 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'attack-up',
    frames: this.anims.generateFrameNumbers('ataques', { start: 40, end: 43}),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'attack-down',
    frames: this.anims.generateFrameNumbers('ataques', { start: 32 , end: 35 }),
    frameRate: 10,
    repeat: -1
  });

  // Iniciar con la animación de caminar hacia abajo o la que sea apropiada
  this.personaje.play('walk-down');

    //grupo de enemigos
    this.enemigos = this.physics.add.group();
    //agregar enemigo al grupo de enemigos
    const enemigo = this.enemigos.create(800, 0, "enemigo");
    enemigo.setScale(0.1);
    //boss
    this.boss = this.physics.add.sprite(0, 800, "boss");
    this.boss.setScale(0.4);

    
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
      // Aca agregar la animación de ataque cuando esté lista
    });
    this.space.on("up", () => {
      this.isAttacking = false;
    });
    this.enemySpeed = 60;
    this.bossSpeed = 20;
    this.maxSpeed = 160;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

 // Grupo de power-ups
 this.powerUps = this.physics.add.group();

 // Evento de temporizador para generar power-ups cada 10 segundos
 this.time.addEvent({
   delay: 20000, // 10 segundos
   callback: this.spawnPowerUp,
   callbackScope: this,
   loop: true,
 });

 // Añadir colisiones entre el personaje y los power-ups
 this.physics.add.overlap(this.personaje, this.powerUps, this.collectPowerUp, null, this);

    
  }

  update() {
    let velocityX = 0;
    let velocityY = 0;

    // Verifica si la tecla SPACE está presionada
    let isAttacking = this.space.isDown;

    // Verifica si una tecla de movimiento está presionada
    let moving = false;

    // Movimiento horizontal
    if (this.a.isDown) {
        velocityX = -160;
        moving = true;
        if (isAttacking) {
            this.personaje.play('attack-left', true);
        } else {
            this.personaje.play('walk-left', true);
        }
    } else if (this.d.isDown) {
        velocityX = 160;
        moving = true;
        if (isAttacking) {
            this.personaje.play('attack-right', true);
        } else {
            this.personaje.play('walk-right', true);
        }
    }

    // Movimiento vertical, solo si no hay movimiento horizontal
    if (!moving) {
        if (this.w.isDown) {
            velocityY = -160;
            if (isAttacking) {
                this.personaje.play('attack-up', true);
            } else {
                this.personaje.play('walk-up', true);
            }
        } else if (this.s.isDown) {
            velocityY = 160;
            if (isAttacking) {
                this.personaje.play('attack-down', true);
            } else {
                this.personaje.play('walk-down', true);
            }
        }
    }

    // Detener la animación si el personaje no se mueve
    if (velocityX === 0 && velocityY === 0) {
        if (!isAttacking) {
            this.personaje.anims.stop();
        }
    }

    this.personaje.setVelocityX(velocityX);
    this.personaje.setVelocityY(velocityY);
    
    // Aumentar la velocidad del jefe gradualmente hasta que alcance la velocidad máxima
    if (this.bossSpeed < this.maxSpeed) {
        this.bossSpeed += 0.022;

        let proportion = this.bossSpeed / this.maxSpeed;
        let red = Math.floor(255 * proportion);
        let green = 255 - red;
        let tint = (red << 16) + (green << 8);
        this.boss.setTint(tint);
    }

    this.bossSpeed = Math.min(this.bossSpeed, this.maxSpeed);
    this.physics.moveToObject(this.boss, this.personaje, this.bossSpeed);

    if (this.boss.body.velocity.x < 0) {
        this.boss.setFlipX(true);
    } else if (this.boss.body.velocity.x > 0) {
        this.boss.setFlipX(false);
    }

    this.enemigos.getChildren().forEach((enemigo) => {
        if (enemigo.body.velocity.x < 0) {
            enemigo.setFlipX(true);
        } else if (enemigo.body.velocity.x > 0) {
            enemigo.setFlipX(false);
        }
    });

    this.physics.world.overlap(
        this.personaje,
        this.enemigos,
        (personaje, enemigo) => {
            if (this.isAttacking) {
                enemigo.destroy();
                this.score += this.enemyScore.enemigo.points;
                this.enemyScore.enemigo.count++;
                this.scoreText.setText(`Score: ${this.score}`);
            } else {
                this.gameOver = true;
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
  spawnPowerUp() {
    const x = Phaser.Math.Between(0, 800);
    const y = Phaser.Math.Between(0, 600);
    const powerUp = this.powerUps.create(x, y, "powerup");
    powerUp.setScale(3); // Ajusta el tamaño del power-up si es necesario
  }
  collectPowerUp(personaje, powerUp) {
    powerUp.destroy(); // Destruye el power-up
    this.score += 1000; // Aumenta la puntuación en 1000 puntos
    this.scoreText.setText(`Score: ${this.score}`); // Actualiza el texto de la puntuación
  }
}

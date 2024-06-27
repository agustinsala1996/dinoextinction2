export default class End extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  init() {}

  preload() {
    //fondo
    this.load.image("fondonegro", "./public/assets/blackbackground.png");
    //boton start
    this.load.image("boton", "./public/assets/playbutton.png");
    //boton instrucciones
    this.load.image(
      "instruccionesboton",
      "./public/assets/instructionsbutton.png"
    );
  }

  create() {
    //fondo
    this.fondonegro = this.add.image(400, 300, "fondonegro");

    //boton start
    this.boton = this.add.image(400, 300, "boton").setInteractive();

    this.boton.on("pointerdown", () => {
      this.scene.start("Game");
    });

    //boton instrucciones
    this.instruccionesboton = this.add
      .image(400, 350, "instruccionesboton")
      .setInteractive();

    this.instruccionesboton.on("pointerdown", () => {
      this.scene.start("Instructions");
    });
  }

  update() {}
}

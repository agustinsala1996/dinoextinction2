export default class End extends Phaser.Scene {
  constructor() {
    super("Instructions");
  }

  init() {}
  preload() {
    this.load.image("instrucciones", "./public/assets/instructions.png");
  }
  create() {
    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.instrucciones = this.add.image(400, 300, "instrucciones");
  }
  update() {
    if (this.r.isDown) {
      this.scene.start("Start");
    }
  }
}

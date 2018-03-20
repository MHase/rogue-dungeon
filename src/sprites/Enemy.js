class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.tint = 0xFF0000;
    // this.create();
  }

  // create() {
  //
  // }
}


export default Enemy;

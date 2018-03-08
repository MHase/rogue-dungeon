class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.key = config.key;
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    // console.log(this);
    this.create();
  }

  create() {
    this.body.setCollideWorldBounds(true);
    // this.scene.cameras.main.startFollow(this);
  }

  update(keys) {
    if (keys.A.isDown) {
      this.body.setVelocityX(-100);
      // this.anims.play('left', true);
    } else if (keys.D.isDown) {
      this.body.setVelocityX(100);
      // this.anims.play('right');
    } else {
      this.body.setVelocityX(0);
      // this.anims.stop('stand');
    }

    if (keys.S.isDown) {
      this.body.setVelocityY(100);
      // this.anims.play('down');
    } else if (keys.W.isDown) {
      this.body.setVelocityY(-100);
      // this.anims.play('up');
    } else this.body.setVelocityY(0);


    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      this.anims.play('stand');
      // this.frame = 0;
    }
    if (this.body.velocity.x > 0 && (this.body.velocity.y >= 0 || this.body.velocity.y < 0))
      this.anims.play('right', true);
    if (this.body.velocity.x < 0 && (this.body.velocity.y >= 0 || this.body.velocity.y < 0))
      this.anims.play('left', true);
    if (this.body.velocity.x === 0 && this.body.velocity.y > 0)
      this.anims.play('down', true);
    if (this.body.velocity.x === 0 && this.body.velocity.y < 0)
      this.anims.play('up', true);
  }
}

export default Player;

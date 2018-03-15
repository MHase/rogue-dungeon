class Bullet extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

    scene.physics.world.enable(this);
    this.setScale(0.5);

    this.speed = 200;
  }

  fire(gun) {
    this.setActive(true);
    this.setVisible(true);
    this.rotation = gun.rotation;

    this.setPosition(gun.x, gun.y);
    const angle = Phaser.Math.DegToRad(gun.body.rotation);
    this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
  }

  hide() {
    this.setActive(false);
    this.setVisible(false);
    this.body.stop();
  }

  hit() {
    this.hide();
  }
}

export default Bullet;

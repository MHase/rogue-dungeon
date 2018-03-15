class Bullet extends Phaser.GameObjects.Text {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    Phaser.GameObjects.Text.call(this, scene, 0, 0, 'pium pium', {
      font: '5px Viga',
      color: 'white',
    });
    scene.physics.world.enable(this);
  }

  fire(gun) {
    this.speed = 200;

    this.setActive(true);
    this.setVisible(true);
    this.rotation = gun.rotation;

    const width = 10;
    const offset = new Phaser.Geom.Point(width, 0);
    Phaser.Math.Rotate(offset, gun.rotation);
    this.setPosition(gun.x + offset.x, gun.y + offset.y);

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

import Bullet from './Bullet';
import Client from '../client';
import Keyboard from '../utils/keyboard';

class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.score = 0;
    // this.cameraCenter = {
    //   y: this.scene.cameras.main.height / 2,
    //   x: this.scene.cameras.main.width / 2,
    // };
    this.controls = new Keyboard(this, this.scene);
    this.angle = 0;
    this.animation = 'stand';
    this.create();
  }

  create() {
    // this.body.setCollideWorldBounds(true); // we can add it, but our bounds are within tilemap

    this.bullets = this.scene.physics.add.group({
      classType: Bullet,
    });

    this.scene.physics.add.collider(
      this.bullets,
      this.scene.groundLayer,
      this.handleBulletHit,
      null,
      this.scene,
    );

    // LINES RESPONSIBLE FOR TURNING ANG FIRING BULLETS
    // this.scene.input.on('pointermove', (pointer) => {
    //   const angle = ((Math.atan2(pointer.y - this.cameraCenter.y, pointer.x - this.cameraCenter.x) * 180) / Math.PI); // my player change position all the time with movement, so center of caemra is the same positiosn ans player's
    //   this.angle = parseInt(angle, 10);
    // });

    // on mouse click get bullet and fire it in desired direction
    // this.scene.input.on('pointerdown', () => {
    //   const bullet = new Bullet(this.scene);
    //   this.bullets.add(bullet);
    //   bullet.fire(this);
    // });
  }

  update() {
    this.controls.update();
    this.animations();
    this.anims.play(this.animation, true);
    Client.socket.emit('update', {
      player: this,
      animation: this.animation,
    });

    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0)
      Client.socket.emit('move', { x: this.body.x, y: this.body.y });
  }

  handleBulletHit(bullet, tile) {
    console.log(bullet, tile); // remove!
    bullet.hit();
  }

  animations() {
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0)
      this.animation = 'stand';
    if (this.body.velocity.x > 0 && (this.body.velocity.y >= 0 || this.body.velocity.y < 0))
      this.animation = 'right';
    if (this.body.velocity.x < 0 && (this.body.velocity.y >= 0 || this.body.velocity.y < 0))
      this.animation = 'left';
    if (this.body.velocity.x === 0 && this.body.velocity.y > 0)
      this.animation = 'down';
    if (this.body.velocity.x === 0 && this.body.velocity.y < 0)
      this.animation = 'up';
  }
}

export default Player;

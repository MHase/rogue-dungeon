import Bullet from './bullet';

class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.key = config.key;
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.life = 100;
    this.cameraCenter = {
      y: this.scene.cameras.main.height / 2,
      x: this.scene.cameras.main.width / 2,
    };
    this.create();
  }

  create() {
    this.body.setCollideWorldBounds(true);
    this.scene.cameras.main.startFollow(this);
    this.scene.cameras.main.zoom = 2;
    this.scene.input.scale = 0.5;

    this.graphics = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xaa00aa } });
    this.line = new Phaser.Geom.Line(this.y, this.x);

    this.bullets = this.scene.physics.add.group({
      classType: Bullet,
      maxSize: 20,
      runChildUpdate: true,
    });

    this.scene.input.on('pointermove', (pointer) => {
      const angle = ((Math.atan2(pointer.y - this.cameraCenter.y, pointer.x - this.cameraCenter.x) * 180) / Math.PI); // my player change position all the time with movement, so center of caemra is the same positiosn ans player's
      this.angle = parseInt(angle, 10);
    });

    this.scene.input.on('pointerdown', () => {
      const bullet = this.bullets.get();

      if (bullet) {
        // const offset = new Phaser.Geom.Point(0, -this.height / 2);
        const offset = 0;
        Phaser.Math.Rotate(offset, this.angle);
        bullet.fire(this);
      }
    });
  }

  update(keys) {
    this.movement(keys);
    this.animations();
    this.redraw(this.line);
    this.scene.physics.add.collider(
      this.bullets,
      this.scene.groundLayer,
      this.handleBulletHit,
      null,
      this.scene,
    );
  }

  handleBulletHit(bullet, tile) {
    console.log(tile); // remove!
    bullet.hit();
  }

  movement(keys) {
    if (keys.A.isDown) {
      this.body.setVelocityX(-100);
    } else if (keys.D.isDown) {
      this.body.setVelocityX(100);
    } else {
      this.body.setVelocityX(0);
    }

    if (keys.S.isDown) {
      this.body.setVelocityY(100);
    } else if (keys.W.isDown) {
      this.body.setVelocityY(-100);
    } else this.body.setVelocityY(0);
  }

  animations() {
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0)
      this.anims.play('stand');
    if (this.body.velocity.x > 0 && (this.body.velocity.y >= 0 || this.body.velocity.y < 0))
      this.anims.play('right', true);
    if (this.body.velocity.x < 0 && (this.body.velocity.y >= 0 || this.body.velocity.y < 0))
      this.anims.play('left', true);
    if (this.body.velocity.x === 0 && this.body.velocity.y > 0)
      this.anims.play('down', true);
    if (this.body.velocity.x === 0 && this.body.velocity.y < 0)
      this.anims.play('up', true);
  }

  redraw(line) {
    this.line.x1 = this.x;
    this.line.y1 = this.y;
    this.line.x2 = this.scene.input.activePointer.worldX;
    this.line.y2 = this.scene.input.activePointer.position.y;

    this.graphics.clear();
    this.graphics.strokeLineShape(line);
  }
}

export default Player;

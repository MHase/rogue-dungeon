// import Player from '../player';
import player from '../assets/pokeball.png';
// import platform from '../assets/platform.png';
import makeAnimations from '../animations';

class Example1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Example1' });

    this.player = null;
  }

  preload() {
    this.load.spritesheet('player', player, { frameWidth: 12, frameHeight: 12 });
  }

  create() {
    // add map
    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.groundLayer = this.map.createStaticLayer('ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createStaticLayer('walls', this.tileset, 0, 0);
    this.groundLayer.setCollisionByProperty({ collide: true });
    this.wallsLayer.setCollisionByProperty({ collide: true });
    // console.log(this);
    this.matter.world.convertTilemapLayer(this.groundLayer);
    this.matter.world.convertTilemapLayer(this.wallsLayer);

    this.matter.world.setBounds(this.map.widthInPixels, this.map.heightInPixels);

    this.matter.world.createDebugGraphic();

    // this.map.getObjectLayer('skull').objects.map((skull) => {
    // });

    this.pokeball = this.matter.add.sprite(400, 300, 'player').setFixedRotation(); // .setFixedRotation sets inertia to Infinity to prevets rotation on collision
    // this.pokeball.setBody({
    //   type: 'circle',
    //   radius: 6,
    // });

    this.cursors = this.input.keyboard.createCursorKeys();

    makeAnimations(this);

    // // setting keys
    // this.keys = {
    //   A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    //   S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    //   D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    //   W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    // };

    // console.log(this.matter.add.sprite(this.player));

    // this.player = new Player({
    //   scene: this,
    //   key: 'player',
    //   x: this.sys.game.config.width / 2,
    //   y: (this.sys.game.config.height / 2) - 150,
    // });

    // changing scenes
    // this.input.keyboard.on('keyup', (e) => {
    //   e.key === '2' && this.scene.start('Example2');
    //   e.key === '3' && this.scene.start('Example3');
    // });

    // this.physics.add.collider(this.player, this.groundLayer);
    // this.physics.add.collider(this.player, this.wallsLayer);
  }

  update() {
    // this.player.update(this.keys);

    if (this.cursors.left.isDown) {
      this.pokeball.setVelocityX(-1);
    } else if (this.cursors.right.isDown) {
      this.pokeball.setVelocityX(1);
    } else {
      this.pokeball.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.pokeball.setVelocityY(-1);
    } else if (this.cursors.down.isDown) {
      this.pokeball.setVelocityY(1);
    } else {
      this.pokeball.setVelocityY(0);
    }

    if (this.pokeball.body.velocity.x === 0 && this.pokeball.body.velocity.y === 0) {
      this.pokeball.anims.play('stand');
    }
    if (this.pokeball.body.velocity.x > 0 && (this.pokeball.body.velocity.y >= 0 || this.pokeball.body.velocity.y < 0))
      this.pokeball.anims.play('right', true);
    if (this.pokeball.body.velocity.x < 0 && (this.pokeball.body.velocity.y >= 0 || this.pokeball.body.velocity.y < 0))
      this.pokeball.anims.play('left', true);
    if (this.pokeball.body.velocity.x === 0 && this.pokeball.body.velocity.y > 0)
      this.pokeball.anims.play('down', true);
    if (this.pokeball.body.velocity.x === 0 && this.pokeball.body.velocity.y < 0)
      this.pokeball.anims.play('up', true);

    // console.log(this.pokeball.body.velocity);
  }
}

export default Example1;

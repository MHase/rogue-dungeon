import Player from '../player';
// import player from '../assets/pokeball.png';
// import platform from '../assets/platform.png';
import makeAnimations from '../animations';

class Example1 extends Phaser.Scene {
  constructor() {
    super({
      key: 'Example1',
      physics: {
        matter: {
          debug: true,
          // gravity: { y: 0.5 },
        },
      },
    });

    this.player = null;
  }

  create() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.groundLayer = this.map.createStaticLayer('ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createStaticLayer('walls', this.tileset, 0, 0);

    this.groundLayer.setCollision(-1); // don't collide with anything from groundLayer and will collide with any other layer

    // this.groundLayer.setCollisionByProperty({ collide: true });
    // this.wallsLayer.setCollisionByProperty({ collide: true });
    // console.log(this);
    // this.matter.world.convertTilemapLayer(this.groundLayer);
    // this.matter.world.convertTilemapLayer(this.wallsLayer);

    // this.matter.world.setBounds(this.map.widthInPixels, this.map.heightInPixels);
    this.matter.world.createDebugGraphic();

    this.map.getObjectLayer('player').objects.map((player) => {
      this.player = new Player({
        scene: this,
        key: 'player',
        x: player.x,
        y: player.y,
      });
      return null;
    });

    makeAnimations(this);

    // setting keys
    this.keys = {
      A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    };

    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.wallsLayer);
  }

  update() {
    this.player.update(this.keys);
  }
}

export default Example1;

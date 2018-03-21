import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';
import makeAnimations from '../utils/animations';
import Client from '../client';

class Example1 extends Phaser.Scene {
  constructor() {
    super({
      key: 'Example1',
    });

    this.player = null;
  }

  create() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.groundLayer = this.map.createStaticLayer('ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createStaticLayer('walls', this.tileset, 0, 0);

    this.groundLayer.setCollision(-1); // don't collide with anything from groundLayer and will collide with any other layer

    this.map.getObjectLayer('player').objects.map(() => {
      this.player = new Player({
        scene: this,
        key: 'player',
        x: 100,
        y: 100,
        // x: player.x,
        // y: player.y,
      });
      return null;
    });

    Client.socket.on('newplayer', (data) => {
      console.log('adding new player');
      this.player[data.id] = new Player({
        scene: this,
        key: 'player',
        x: data.x,
        y: data.y,
      });
      console.log(data.id, this, this.data.id);
      // (data.id,data.x,data.y);
    });

    Client.socket.on('remove', (id) => {
      this.removePlayer(id);
    });

    this.map.getObjectLayer('enemies').objects.map((enemy) => {
      this.enemy = new Enemy({
        scene: this,
        key: 'player',
        x: enemy.x,
        y: enemy.y,
      });
      return null;
    });

    // setInterval(() => {
    //   console.log('timeout'); // use setinterval to spawn enemies
    // }, 3000);

    makeAnimations(this);

    this.physics.add.collider([this.player, this.enemy], this.groundLayer);
    this.physics.add.collider(this.player, this.enemy);
    this.physics.add.collider(
      this.player.bullets,
      this.enemy,
      (enemy, bullet) => {
        console.log(enemy);
        bullet.hit();
      },
      null,
      this,
    );
  }

  update() {
    this.player.update(this.keys);
  }

  removePlayer(id) {
    this.player[id].destroy();
    console.log('player disconnected', id);
    // delete Game.playerMap[id];
  }
}

export default Example1;

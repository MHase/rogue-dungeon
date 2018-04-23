import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';
import makeAnimations from '../utils/animations';
import getArrayRandomly from '../utils/getArrayRandomly';
import Client from '../client';

class Example1 extends Phaser.Scene {
  constructor() {
    super({
      key: 'Example1',
    });

    this.player = null;
    this.players = [];
    this.rubies = null;
  }

  create() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.groundLayer = this.map.createStaticLayer('ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createStaticLayer('walls', this.tileset, 0, 0);

    this.groundLayer.setCollision(-1); // don't collide with anything from groundLayer and will collide with any other layer

    this.map.getObjectLayer('player').objects.map((player) => {
      Client.askNewPlayer({ x: player.x, y: player.y });
      // this.players[player.id] = new Player({
      this.player = new Player({
        scene: this,
        key: 'player',
        x: player.x,
        y: player.y,
      });
      return null;
    });

    this.rubies = this.physics.add.group();
    getArrayRandomly(this.map.getObjectLayer('stars').objects).map((ruby, index) => {
      setTimeout(() => {
        this.rubies.create(ruby.x, ruby.y, 'ruby').setScale(0.5);
      }, (index + 1) * 2000);
      return null;
    });

    Client.socket.on('allplayers', (data) => {
      console.log('scene || loading all players', data);
      data.map((player) => {
        this.addPlayer(player);
        return null;
      });
    });

    Client.socket.on('newplayer', (data) => {
      this.addPlayer(data);
    });

    Client.socket.on('remove', (id) => {
      this.removePlayer(id);
    });

    Client.socket.on('updatePlayer', (data) => {
      console.log(this.players[data.id]);
      if (this.players[data.id]) {
        this.players[data.id].x = data.player.x;
        this.players[data.id].y = data.player.y;
        if (this.players[data.id].animation !== data.animation) {
          this.players[data.id].animation = data.animation;
          this.players[data.id].anims.play(data.animation);
        }
      }
      return null;
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
    // this.physics.add.collider(
    //   this.player.bullets,
    //   this.enemy,
    //   (enemy, bullet) => {
    //     console.log(enemy);
    //     bullet.hit();
    //   },
    //   null,
    //   this,
    // );
    this.physics.add.collider(
      this.rubies,
      this.player,
      (player, ruby) => {
        player.score += 10;
        ruby.destroy();
      },
      null,
      this,
    );

    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoom = 2.5;
    // this.input.scale = 0.5;
  }

  update() {
    this.player.update();
    // this.players.getChildren().update();
    // this.players.map(singlePlayer => singlePlayer.update());
  }

  removePlayer(id) {
    const playerIndex = this.players.indexOf(id);
    if (playerIndex > -1) {
      this.players.splice(playerIndex, 1);
    }
    this.players[id].destroy();
    delete this.players[id];
    console.log('player disconnected', id);
  }

  addPlayer(player) {
    console.log('mmm adding player', player);
    this.players[player.id] = new Player({
      scene: this,
      key: 'player',
      x: player.x,
      y: player.y,
    });
    console.log(this.players);
  }
}

export default Example1;

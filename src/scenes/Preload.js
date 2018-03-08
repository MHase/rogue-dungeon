import player from '../assets/pokeball.png';
// import platform from '../assets/platform.png';

import map from '../assets/tilemaps/testMap.json';
import tileset from '../assets/tileset.png';

class Preload extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload() {
    this.load.spritesheet('player', player, { frameWidth: 12, frameHeight: 12 });

    this.load.tilemapTiledJSON('map', map);
    this.load.image('tiles', tileset);
  }

  create() {
    this.scene.start('Example1');
  }
}

export default Preload;

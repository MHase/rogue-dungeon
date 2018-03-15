import Phaser from 'phaser';
import {
  Preload,
  Example1,
  Example2,
  Example3,
} from './scenes';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  // width: 800,
  // height: 600,
  backgroundColor: '#000000',
  parent: 'content',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      // gravity: { y: 200 },
    },
    // matter: {
    //   debug: true,
    //   gravity: { y: 0.5 },
    // },
  },
  scene: [Preload, Example1, Example2, Example3],
};

const game = new Phaser.Game(config);

export default game;

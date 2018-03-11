import Phaser from 'phaser';
import {
  Preload,
  Example1,
  Example2,
  Example3,
} from './scenes';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  parent: 'content',
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: {
        y: 0,
        x: 0,
      },
    },
  },
  scene: [Preload, Example1, Example2, Example3],
};

const game = new Phaser.Game(config);

export default game;

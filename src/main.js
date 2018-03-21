import Phaser from 'phaser';
import {
  Preload,
  Example1,
  Example2,
  Example3,
} from './scenes';
import Client from './client';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#000000',
  parent: 'content',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: [Preload, Example1, Example2, Example3],
};

const game = new Phaser.Game(config);

Client.askNewPlayer();

export default game;

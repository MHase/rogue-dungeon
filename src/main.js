import Phaser from 'phaser';
import $ from 'jquery';
import Client from './client';
import {
  Preload,
  Example1,
  Example2,
  Example3,
} from './scenes';

const config = {
  type: Phaser.AUTO,
  // width: window.innerWidth,
  // height: window.innerHeight,
  width: 800,
  height: 600,
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

$('form').submit((e) => {
  e.preventDefault();
  const inputValue = $('.chat__input');
  console.log('form submit', inputValue.val());
  if (inputValue.val())
    Client.socket.emit('chatMessage', inputValue.val());
  inputValue.val('');
  return false;
});

Client.socket.on('chatMessageInsert', (message) => {
  console.log('client received', message);
  $('.chat__messages').append(`<li>${message}</li>`);
});

export default game;

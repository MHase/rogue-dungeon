import game from '../main';

class PlayerKeyboard {
  constructor(player) {
    this.player = player;
    this.keys = {
      A: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      W: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    };
  }

  update() {
    if (this.keys.A.isDown) {
      this.player.body.setVelocityX(-100);
    } else if (this.keys.D.isDown) {
      this.player.body.setVelocityX(100);
    } else {
      this.player.body.setVelocityX(0);
    }

    if (this.keys.S.isDown) {
      this.player.body.setVelocityY(100);
    } else if (this.keys.W.isDown) {
      this.player.body.setVelocityY(-100);
    } else this.player.body.setVelocityY(0);
  }
}

export default PlayerKeyboard;

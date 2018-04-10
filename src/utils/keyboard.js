import game from '../main';

class PlayerKeyboard {
  constructor(player) {
    this.player = player;
    // game.input.keyboard.createCursorKeys()
    // creates object with keys codes as follows:
    // 16: true | shift
    // 32: true | spacebar
    // 37: true | left arrow
    // 38: true | up arrow
    // 39: true | right arrow
    // 40: true | down arrow
    // so we have to disable every other input exept arrows
    this.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.removeKeyCapture(16);
    game.input.keyboard.removeKeyCapture(32);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(100);
    } else {
      this.player.body.setVelocityX(0);
    }

    if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(100);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-100);
    } else this.player.body.setVelocityY(0);
  }
}

export default PlayerKeyboard;

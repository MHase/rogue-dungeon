import music from '../assets/sound.mp3';

class Example3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Example3' });
  }

  preload() {
    this.load.audioSprite('test', [music]);
  }

  create() {
    this.soundFX = this.sound.add('test', { loop: true });
    this.soundFX.play();
    this.soundFX.rate = 1;

    this.input.keyboard.on('keydown_L', () => {
      this.soundFX.loop = !this.soundFX.loop;
    });

    this.input.keyboard.on('keydown_P', () => {
      console.log('click P', this.soundFX.isPlaying);
      this.soundFX.isPlaying ? this.soundFX.pause() : this.soundFX.resume();
    });
  }
}

export default Example3;

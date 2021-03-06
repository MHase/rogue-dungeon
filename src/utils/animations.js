export default function makeAnimations(scene) {
  const defaultConfig = {
    frameRate: 10,
    repeat: -1,
  };

  scene.anims.create({
    key: 'stand',
    frames: scene.anims.generateFrameNames('player', { start: 0, end: 0 }),
  });

  scene.anims.create({
    key: 'up',
    frames: scene.anims.generateFrameNames('player', { start: 12, end: 16 }),
    ...defaultConfig,
  });

  scene.anims.create({
    key: 'down',
    frames: scene.anims.generateFrameNames('player', { start: 4, end: 7 }),
    ...defaultConfig,
  });

  scene.anims.create({
    key: 'right',
    frames: scene.anims.generateFrameNames('player', { start: 0, end: 4 }),
    ...defaultConfig,
  });

  scene.anims.create({
    key: 'left',
    frames: scene.anims.generateFrameNames('player', { start: 8, end: 11 }),
    ...defaultConfig,
  });
}

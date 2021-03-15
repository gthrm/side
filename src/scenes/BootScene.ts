import * as Phaser from 'phaser'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'BootScene',
}

export class BootScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig)
  }

  public preload() {
    this.load.image('background', 'assets/sprites/background.png')
  }

  public create() {
    this.scene.start('PreloadScene')
  }

  // public update() {
  //   console.log('update');
  // }
}

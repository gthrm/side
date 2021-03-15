import * as Phaser from 'phaser'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'PreloadScene',
}

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig)
  }

  public preload() {
    console.log('preload')
  }

  public create() {
    console.log('create')
    this.scene.start('StartScene')
  }

  // public update() {
  //   console.log('update');
  // }
}

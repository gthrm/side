import * as Phaser from 'phaser'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'StartScene',
}

export class StartScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig)
  }

  createBackground() {
    this.add.sprite(0, 0, 'background').setOrigin(0)
  }

  createText() {
    this.add.text(0, 0, 'Start').setOrigin(0.5, 0.5)
  }

  public create() {
    console.log('create')
    this.createBackground()
    this.createText()
  }

  // public update() {
  //   console.log('update');
  // }
}

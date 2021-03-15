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

  public preload() {
    console.log('preload')
    this.load.image('background', 'assets/sprites/background.png')
  }

  public create() {
    console.log('create')
    this.createBackground()
  }

  // public update() {
  //   console.log('update');
  // }
}

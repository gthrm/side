import * as Phaser from 'phaser'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'GameScene',
}

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig)
  }

  createBackground() {
    this.add.sprite(0, 0, 'background').setOrigin(0)
  }

  public create() {
    console.log('create')
    this.createBackground()
  }

  // public update() {
  //   console.log('update');
  // }
}

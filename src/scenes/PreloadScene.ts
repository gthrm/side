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

  preloadAtlases() {
    this.load.atlas('dragon', 'assets/sprites/dragon.png', 'assets/sprites/dragon.json')
    this.load.atlas('enemy', 'assets/sprites/enemy.png', 'assets/sprites/enemy.json')
    this.load.image('fire', 'assets/sprites/fire.png')
    this.load.image('bullet', 'assets/sprites/bullet.png')
  }

  public preload() {
    this.preloadAtlases()
  }

  public create() {
    this.scene.start('StartScene')
  }
}

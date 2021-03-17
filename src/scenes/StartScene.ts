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
    this.add.text(this.game.config.width as number / 2, this.game.config.height as number - 200, 'Tap to Start', {
      fontSize: '40px',
      color: '#fff',
      backgroundColor: 'rgba(1,1,1,.3)',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5)
  }

  listenerTapStart() {
    this.input.on('pointerdown', () => this.scene.start('GameScene'))
  }

  public create() {
    console.log('create')
    this.createBackground()
    this.createText()
    this.listenerTapStart()
  }

  // public update() {
  //   console.log('update');
  // }
}

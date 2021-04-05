import * as Phaser from 'phaser'

type startSceneProps = {
  winStatus: boolean;
  score: number;
};

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'StartScene',
}

const textStyle = {
  fontSize: '40px',
  color: '#fff',
}

export class StartScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig)
  }

  createBackground() {
    this.add.sprite(0, 0, 'background').setOrigin(0)
  }

  createText() {
    this.add
      .text(
        (this.game.config.width as number) / 2,
        (this.game.config.height as number) - 200,
        'Tap to Start',
        textStyle,
      )
      .setOrigin(0.5)
  }

  listenerTapStart() {
    this.input.on('pointerdown', () => this.scene.start('GameScene'))
  }

  createStatistics({ score, winStatus }: startSceneProps) {
    if (score !== undefined) {
      this.add
        .graphics()
        .fillStyle(0x000000, 0.5)
        .fillRoundedRect(
          (this.game.config.width as number) / 2 - 200,
          (this.game.config.height as number) / 2 - 200,
          400,
          400,
          10,
        )

      const scoreText = `Score: ${score}`
      const title = winStatus ? 'Level Completed' : 'Game Over'
      this.add
        .text((this.game.config.width as number) / 2, 250, title, textStyle)
        .setOrigin(0.5)
      this.add
        .text((this.game.config.width as number) / 2, 350, scoreText, textStyle)
        .setOrigin(0.5)
    }
  }

  public create(props: startSceneProps) {
    console.log('create')
    this.createBackground()
    this.createStatistics(props)
    this.createText()
    this.listenerTapStart()
  }

  // public update() {
  //   console.log('update');
  // }
}

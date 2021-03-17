import * as Phaser from 'phaser'
import { Dragon, IDragon } from '../components/Dragon'
import { Enemy, IEnemy } from '../components/Enemy'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'GameScene',
}

export interface IGameScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null
}

export class GameScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys | null;

  background!: Phaser.GameObjects.TileSprite | null;

  player!: IDragon | null;

  enemy!: IEnemy | null;

  constructor() {
    super(sceneConfig)
    this.cursors = null
    this.background = null
    this.player = null
    this.enemy = null
  }

  initCursors() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  createBackground() {
    this.background = this.add
      .tileSprite(
        0,
        0,
        Number(this.game.config.width),
        Number(this.game.config.height),
        'background',
      )
      .setOrigin(0)
  }

  createPlayer() {
    this.player = new Dragon(this, {
      x: 150,
      y: Number(this.game.config.height) / 2,
    })
  }

  createEnemy() {
    this.enemy = new Enemy(this, {
      x: Number(this.game.config.width) - 150,
      y: Number(this.game.config.height) / 2,
    })
  }

  moveBackground() {
    if (this.background) {
      this.background.tilePositionX += 0.5
    }
  }

  public init() {
    this.initCursors()
  }

  public create() {
    this.createBackground()
    this.createPlayer()
    this.createEnemy()
  }

  public update() {
    this.player?.move()
    this.enemy?.move()
    this.moveBackground()
  }
}

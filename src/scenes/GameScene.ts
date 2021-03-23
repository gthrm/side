import * as Phaser from 'phaser'
import { Dragon } from '../components/Dragon'
import { Enemies } from '../components/Enemies'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'GameScene',
}

export interface IGameScene extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys | null;
}

export class GameScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys | null;

  background!: Phaser.GameObjects.TileSprite | null;

  player!: Dragon | null;

  enemies!: Enemies | null;

  gameIsReset!: Boolean

  constructor() {
    super(sceneConfig)
    this.cursors = null
    this.background = null
    this.player = null
    this.enemies = null
    this.gameIsReset = false
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

  createEnemies() {
    this.enemies = new Enemies(this)
  }

  moveBackground() {
    if (this.background) {
      this.background.tilePositionX += 0.5
    }
  }

  onOverlap(
    source: any,
    target: any,
  ) {
    source.setAlive(false)
    target.setAlive(false)
  }

  addOverlap() {
    if (this.player?.fires && this.enemies) {
      this.physics.add.overlap(
        this.player?.fires,
        this.enemies,
        this.onOverlap,
        undefined,
        this,
      )
    }
    if (this.enemies?.fires && this.player) {
      this.physics.add.overlap(
        this.enemies?.fires,
        this.player,
        this.onOverlap,
        undefined,
        this,
      )
    }
    if (this.enemies && this.player) {
      this.physics.add.overlap(
        this.enemies,
        this.player,
        this.onOverlap,
        undefined,
        this,
      )
    }

    if (this.enemies?.fires && this.player?.fires) {
      this.physics.add.overlap(
        this.enemies?.fires,
        this.player?.fires,
        this.onOverlap,
        undefined,
        this,
      )
    }
  }

  handleAlive() {
    this.player?.once('killed', this.resetGame, this)

    if (this.enemies && this.enemies.getLength() > 0 && this.enemies.countActive() === 0) {
      this.resetGame()
    }
  }

  resetGame() {
    if (!this.gameIsReset) {
      this.gameIsReset = true
      this.registry.destroy()
      this.scene.start('StartScene')
    }
  }

  public init() {
    this.initCursors()
    this.gameIsReset = false
  }

  public create() {
    this.createBackground()
    this.createPlayer()
    this.createEnemies()
    this.addOverlap()
  }

  public update() {
    this.moveBackground()
    this.handleAlive()
  }
}

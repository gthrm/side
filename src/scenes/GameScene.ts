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

  gameIsReset!: Boolean;

  score!: number;

  scoreText!: Phaser.GameObjects.Text | null

  constructor() {
    super(sceneConfig)
    this.cursors = null
    this.background = null
    this.player = null
    this.enemies = null
    this.gameIsReset = false
    this.score = 0
    this.scoreText = null
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

  onOverlap(source: any, target: any) {
    source.setAlive(false)
    target.setAlive(false)
    if (source !== this.player && target !== this.player) {
      this.score += 1
      this.scoreText?.setText(`Score: ${this.score}`)
    }
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
    if (
      this.enemies
      && this.enemies.getLength() > 0
      && this.enemies.countActive() === 0
    ) {
      this.resetGame()
    }
  }

  resetGame() {
    if (!this.gameIsReset) {
      this.gameIsReset = true
      // this.scene.pause()
      this.registry.destroy()
      this.scene.start('StartScene', {
        score: this.score,
        winStatus: this.player?.active,
      })
    }
  }

  createText() {
    this.scoreText = this.add.text(50, 50, `Score: ${this.score}`, {
      fontSize: '30px',
      color: '#fff',
      backgroundColor: 'rgba(1,1,1,.3)',
      padding: { x: 10, y: 5 },
    })
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
    this.createText()
  }

  public update() {
    this.moveBackground()
    this.handleAlive()
  }
}

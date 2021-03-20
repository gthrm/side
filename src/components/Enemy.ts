import * as Phaser from 'phaser'
import type { Positions } from '../types'
import type { IGameScene } from '../scenes/GameScene'
import { ActiveSprite, IActiveSpriteData } from './ActiveSprite'
import { Fires } from './Fires'

export class Enemy extends ActiveSprite {
  scene!: IGameScene;

  velocity!: number;

  fires!: Fires | null

  shootTimer!: Phaser.Time.TimerEvent

  constructor(
    scene: Phaser.Scene,
    position: Positions,
    texture: string,
    frame: string,
  ) {
    super({
      scene, x: position.x, y: position.y, texture, frame,
    } as IActiveSpriteData)
    this.scene = scene
    this.velocity = -300
    this.fires = null
    this.init()
    this.shootTimer = scene.time.addEvent({
      delay: 500,
      loop: true,
      callback: this.shoot,
      callbackScope: this,
    })
  }

  static getInitialParams(scene: Phaser.Scene) {
    const x = Number(scene.game.config.width) + 150
    const y = Phaser.Math.Between(100, Number(scene.game.config.height) - 100)
    const frameId = Phaser.Math.Between(1, 4)
    return { x, y, frameId }
  }

  static generate(scene: Phaser.Scene) {
    const { x, y, frameId } = this.getInitialParams(scene)
    const texture = 'enemy'
    const frame = `enemy${frameId}`
    return new Enemy(
      scene,
      {
        x,
        y,
      },
      texture,
      frame,
    )
  }

  shoot() {
    this.fires?.createFire('Bullet')
  }

  init() {
    super.init()
    this.fires = new Fires(this.scene, this)
  }

  isDead() {
    return this.active && this.x < -this.width
  }

  reset({ x, y }: {x: number, y: number}) {
    super.reset({ x, y })
    this.shootTimer = this.scene.time.addEvent({
      delay: 500,
      loop: true,
      callback: this.shoot,
      callbackScope: this,
    })
  }

  update() {
    super.update()
    if (this.x < -this.width) {
      this.shootTimer.remove()
    }
  }
}

import * as Phaser from 'phaser'
import type { Positions } from '../types'
import type { IGameScene } from '../scenes/GameScene'
import { ActiveSprite, IActiveSpriteData } from './ActiveSprite'
import { Fires } from './Fires'

export class Enemy extends ActiveSprite {
  scene!: IGameScene;

  velocity!: number;

  fires!: Fires | undefined

  shootTimer!: Phaser.Time.TimerEvent

  constructor(
    scene: Phaser.Scene,
    position: Positions,
    texture: string,
    frame: string,
    fires?: Fires,
  ) {
    super({
      scene, x: position.x, y: position.y, texture, frame,
    } as IActiveSpriteData)
    this.scene = scene
    this.velocity = -300
    this.fires = fires
    this.init()
    this.shootTimer = Enemy.getShootTimer(scene, this.shoot.bind(this))
  }

  static getShootTimer(scene: Phaser.Scene, callback: Function) {
    return scene.time.addEvent({
      delay: 1500,
      loop: true,
      callback,
    })
  }

  static getInitialParams(scene: Phaser.Scene) {
    const x = Number(scene.game.config.width) + 150
    const y = Phaser.Math.Between(100, Number(scene.game.config.height) - 100)
    const frameId = Phaser.Math.Between(1, 4)
    return { x, y, frameId }
  }

  static generate(scene: Phaser.Scene, fires: Fires) {
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
      fires,
    )
  }

  shoot() {
    this.fires?.createFire(this, 'Bullet')
  }

  isDead() {
    return this.active && this.x < -this.width
  }

  reset({ x, y }: {x: number, y: number}) {
    super.reset({ x, y })
    this.shootTimer = Enemy.getShootTimer(this.scene, this.shoot)
  }

  update() {
    super.update()
    if (this.x < -this.width) {
      this.shootTimer.remove()
    }
  }
}

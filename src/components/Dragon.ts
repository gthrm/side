import type { Positions } from '../types'
import type{ IGameScene } from '../scenes/GameScene'
import { Enemy } from './Enemy'
import { Fires } from './Fires'

const prefix = 'dragon'
const frame = 'dragon1'

export class Dragon extends Enemy {
  shooting!: boolean

  constructor(scene: IGameScene, position: Positions) {
    super(scene, position, prefix, frame)
    this.velocity = 500
    this.shooting = false
    this.fires = new Fires(this.scene)
    this.setDepth(1)
  }

  shoot() {
    if (this.active) {
      if (this.scene.cursors?.space.isDown && !this.shooting) {
        this.shooting = true
        this.fires?.createFire(this)
      }
      if (this.scene.cursors?.space.isUp) {
        this.shooting = false
      }
    }
  }

  move() {
    if (this.active) {
      if ('setVelocity' in this.body) {
        this.body.setVelocity(0)
      }
      if (this.scene.cursors?.left.isDown) {
        if ('setVelocity' in this.body) {
          this.body.setVelocityX(-this.velocity)
        }
      } else if (this.scene.cursors?.right.isDown) {
        if ('setVelocity' in this.body) {
          this.body.setVelocityX(this.velocity)
        }
      }

      if (this.scene.cursors?.up.isDown) {
        if ('setVelocity' in this.body) {
          this.body.setVelocityY(-this.velocity)
        }
      } else if (this.scene.cursors?.down.isDown) {
        if ('setVelocity' in this.body) {
          this.body.setVelocityY(this.velocity)
        }
      }
    }
  }

  reset({ x, y }: {x: number, y: number}) {
    super.reset({ x, y })
  }

  public update() {
    super.update()
    this.move()
    this.shoot()
  }
}

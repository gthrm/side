import * as Phaser from 'phaser'
import type { Positions } from '../types'
import type{ IGameScene } from '../scenes/GameScene'

const prefix = 'dragon'
const frame = 'dragon1'

export interface IDragon extends Phaser.GameObjects.Sprite {
  move: Function
}

export class Dragon extends Phaser.GameObjects.Sprite {
  scene!: IGameScene

  velocity!: number

  constructor(scene: IGameScene, position: Positions) {
    super(scene, position.x, position.y, prefix, frame)
    this.scene = scene
    this.velocity = 500
    this.init()
  }

  init() {
    this.setOrigin(0.5, 0.5)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    if ('enable' in this.body) {
      this.body.enable = true
    }
  }

  move() {
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

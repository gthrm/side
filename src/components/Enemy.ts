import * as Phaser from 'phaser'
import type { Positions } from '../types'

const prefix = 'enemy'
const frame = 'enemy1'

export interface IEnemy extends Phaser.GameObjects.Sprite {
  move: Function
}

export class Enemy extends Phaser.GameObjects.Sprite {
  scene!: Phaser.Scene

  velocity!: number

  constructor(scene: Phaser.Scene, position: Positions) {
    super(scene, position.x, position.y, prefix, frame)
    this.scene = scene
    this.velocity = -300
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
      this.body.setVelocityX(this.velocity)
    }
  }
}

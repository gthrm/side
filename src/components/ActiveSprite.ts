import * as Phaser from 'phaser'
import { Dragon } from './Dragon'
import { Enemy } from './Enemy'

export interface IActiveSpriteData {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    velocity: number;
    player?: Dragon | Enemy;
    frame?: string
  }

export class ActiveSprite extends Phaser.GameObjects.Sprite {
    scene!: Phaser.Scene;

    velocity!: number;

    player!: Dragon | Enemy | undefined

    constructor(data: IActiveSpriteData) {
      super(data.scene, data.x, data.y, data.texture, data.frame)
      this.scene = data.scene
      this.velocity = data.velocity
      this.player = data.player
      this.init()
    }

    init() {
      this.setOrigin(0.5, 0.5)
      this.scene.add.existing(this)
      this.scene.physics.add.existing(this)
      if (this.body && 'enable' in this.body) {
        this.body.enable = true
      }
      this.scene.events.on('update', this.update, this)
    }

    move() {
      if (this.body && 'setVelocity' in this.body) {
        this.body.setVelocityX(this.velocity)
      }
    }

    setAlive(value: boolean) {
      this.setVisible(value)
      this.setActive(value)
      if (this.body && 'enable' in this.body) {
        this.body.enable = value
      }
    }

    isDead() {
      return false
    }

    public reset(config: {x: number, y: number}) {
      this.x = config.x
      this.y = config.y
      this.setAlive(true)
    }

    public update() {
      if (this.active && this.isDead()) {
        this.setAlive(false)
      }
    }
}

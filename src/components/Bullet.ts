import * as Phaser from 'phaser'
import { Enemy } from './Enemy'
import { ActiveSprite, IActiveSpriteData } from './ActiveSprite'

export class Bullet extends ActiveSprite {
  constructor(data: IActiveSpriteData) {
    super(data)
    this.scene = data.scene
    this.velocity = data.velocity
    this.player = data.player
  }

  static getInitialParams(scene: Phaser.Scene, player: Enemy) {
    return {
      scene,
      x: Number(player.x),
      y: Number(player.y),
      texture: 'bullet',
      velocity: -750,
      player,
    }
  }

  static generate(scene: Phaser.Scene, player: Enemy) {
    const config = this.getInitialParams(scene, player)
    return new Bullet(config)
  }

  isDead() {
    return this.active && (this.x < -this.width)
  }
}

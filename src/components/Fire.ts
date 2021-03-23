import * as Phaser from 'phaser'
import { Dragon } from './Dragon'
import { ActiveSprite, IActiveSpriteData } from './ActiveSprite'

export class Fire extends ActiveSprite {
  constructor(data: IActiveSpriteData) {
    super(data)
    this.scene = data.scene
    this.velocity = data.velocity
  }

  static getInitialParams(scene: Phaser.Scene, player: Dragon) {
    return {
      scene,
      x: Number(player.x),
      y: Number(player.y),
      texture: 'fire',
      velocity: 750,
      player,
    }
  }

  static generate(scene: Phaser.Scene, player: Dragon) {
    const config = this.getInitialParams(scene, player)
    return new Fire(config)
  }

  isDead() {
    return this.active && (this.x < -this.width || this.x > this.scene.game.config.width)
  }
}

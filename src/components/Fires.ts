import * as Phaser from 'phaser'
import { Fire } from './Fire'
import { Bullet } from './Bullet'
import { Dragon } from './Dragon'
import { Enemy } from './Enemy'

export interface IFires extends Phaser.Physics.Arcade.Group {
  createEnemy: Function;
}

export class Fires extends Phaser.Physics.Arcade.Group {
  count!: number

  timer!: Phaser.Time.TimerEvent

  player!: Dragon | Enemy

  constructor(scene: Phaser.Scene, player: Dragon | Enemy) {
    super(scene.physics.world, scene)
    this.scene = scene
    this.player = player
    this.count = 0
  }

  createFire(type?: 'Bullet' | 'Fire') {
    const fireObj = type === 'Bullet' ? Bullet : Fire
    let fire: Fire = this.getFirstDead()
    if (!fire) {
      fire = fireObj.generate(this.scene, this.player)
      this.add(fire)
    } else {
      fire.reset({ x: this.player.x, y: this.player.y })
    }
    fire.move()
  }
}

import * as Phaser from 'phaser'
import { Enemy } from './Enemy'

const MAX_ENEMY_COUNT = 10

export interface IEnemies extends Phaser.Physics.Arcade.Group {
  createEnemy: Function;
}

export class Enemies extends Phaser.Physics.Arcade.Group {
  count!: number

  timer!: Phaser.Time.TimerEvent

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)
    this.scene = scene
    this.count = 0
    this.timer = scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.handleTime,
      callbackScope: this,
    })
  }

  createEnemy() {
    let enemy: Enemy = this.getFirstDead()
    if (!enemy) {
      enemy = Enemy.generate(this.scene)
      this.add(enemy)
    } else {
      const { x, y } = Enemy.getInitialParams(this.scene)
      enemy.reset({ x, y })
    }
    enemy.move()
  }

  handleTime() {
    if (this.count < MAX_ENEMY_COUNT) {
      this.createEnemy()
      this.count += 1
    } else {
      this.timer.remove()
    }
  }
}

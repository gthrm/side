import * as Phaser from 'phaser'
import { StartScene } from './scenes/StartScene'

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.CANVAS,

  scale: {
    width: 1280,
    height: 720,
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },

  parent: 'game',
  backgroundColor: '#000000',
  scene: [StartScene],
}

export const game = new Phaser.Game(gameConfig)

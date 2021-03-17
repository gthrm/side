import * as Phaser from 'phaser'
import { StartScene } from './scenes/StartScene'
import { BootScene } from './scenes/BootScene'
import { PreloadScene } from './scenes/PreloadScene'
import { GameScene } from './scenes/GameScene'

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
  scene: [BootScene, PreloadScene, StartScene, GameScene],
}

export const game = new Phaser.Game(gameConfig)

import EnemyWave from "./enemies"

import UI from './UIComponent'
import _gg from './GameGlobals'
import { default as ds} from './dataStore'

import Game from './Game'
import { LevelManager } from './LevelManager'

// import collision from './Collisions'
import PowerUpGroup from './RPowerUps'

let dataStore = ds.storeInstance

export let LifeCycle = {
    isFirstGame: true,
    gameStart(game:Game, lvlID:number) {
        if (game.game.paused || game.isOver == true) {
            console.log(" >>> LifeCycle - gameStart <<<")

            game.levelConfig = game.levelManager.get(lvlID)
            game.game.state.start("Game");

        } else {
            console.log("Game not paused")
        }

    },

    gameOver(game:Game) {
        console.log(" >>> LifeCycle - gameOver <<<")
        game.Enemies.destroy()
    //   game.startButton.visible = true

        game.player.visible = false
        game.UI.timer.internalTimer.pause()
        // game.UI.timer.internalTimer.stop()

        game.leftStick? game.leftStick.visible = false: 0
        game.rightStick? game.rightStick.visible = false: 0
        game.isOver = true
        setTimeout(() => {
            console.log("GAME RESTARTING")
            game.game.camera.fade(0x0000000, 1000, true)
            LifeCycle.gameStart(game, 0)
        }, 2000);

    },
    gamePause(game:Game) {
         game.UI.timer.internalTimer.pause()
         game.game.paused = true
    },
    gameResume(game: Game) {
        
    },
    goToNextLevel(game: Game) {
       let nxtLevelId = +(dataStore.get("_currentLevel")||0) + 1
       LifeCycle.isFirstGame = false

        game.camera.flash(0x000000, 500, false);
        game.camera.fade(0x000000, 200, false);
            game.time.events.add(2000, function() {
                // this.game.state.start('Game');

                LifeCycle.gameStart(game, nxtLevelId)
            }, this);

        
    }

}
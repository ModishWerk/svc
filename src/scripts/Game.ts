
// imports here refers to the old JS files
import { default as ds} from './dataStore'
import levelManager  from './level'
import Player from './Player'
import EnemyWave from "./enemies"

import UI from './UIComponent'
import _gg from './GameGlobals'

import collision from './Collisions'

let dataStore = ds.storeInstance

/**
 * GameState
 */

export default class Game extends Phaser.State {
    timer: Phaser.Timer
    background: Phaser.TileSprite
    player: Player
    Enemies: any

    score: number
    savingInterval
    lastSave
    savedText
    UI:UI


    cursors: Phaser.CursorKeys
    pad: any
    leftStick: any
    rightStick: any
    fireButton: any
    levelManager: any


    init() {
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.renderer.renderSession.roundPixels = true;
        // this.game.plugins.add(Phaser.Plugin.SaveCPU);

        // // Add a input listener that can help us return from being paused
        // this.timer = new Phaser.Timer(this.game);
        // this.timer.add(this._level.timer, _stopGame, this);
        // this.timer.start();

        this.game.time.advancedTiming = true;

        this.score = parseInt(dataStore.getItem("_highScore")) || 0
        // this.autoSave = true
        this.savingInterval = 30000 // every 30 sec
        this.game.input.maxPointers = 2
        this.lastSave = 0
        this.savedText = null;

        this.levelManager = levelManager

    }
    preload() {

    }
    create() {

        _gg.switchMusic("gameMusic")
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.disableVisibilityChange = true;
        this.world.setBounds(0, 0, 800, 800);
        
        
        this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'atlas', 'bg1');
        this.background.fixedToCamera = true
        
        this.cursors = this.input.keyboard.createCursorKeys()
        this.pad = this.game.plugins.add(Phaser.VirtualJoystick)
        this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
        
        this.leftStick = this._setupDirectionPad()
        this.rightStick = this._setupOrientationPad()
        // this._addSuperJoystick() 

        this.player = new Player(this.game, innerWidth/2, innerHeight/2,4)
        this.Enemies = new EnemyWave(this.game, this ,100, this.player);
        
        this.UI = new UI(this.game, _gg)
        this.UI.timer.start()


    }

    update() { 
		this.background.tilePosition.set(-this.game.camera.x * 0.95, -this.game.camera.y * 0.95)
        this.player.update()
        this.UI.timer.update()
        this._checkAllCollision()
    }

    render() {
        // this.game.debug.soundInfo(_gg.Music, 20, 32);
        // this.game.debug.spriteInfo(this.player, 20, 32);
        this.game.debug.text("" + this.game.time.fps || '--', 32, 32, "#00ff00");

        // this.game.debug.text("" + this.game.time.totalElapsedSeconds().toFixed(0) || '--', 32,232, "#00ff00");
        // this.game.debug.text("" + this.UI.timer.internalTimer.seconds.toFixed(0) || '--', 32,332, "#00ff00");
        
    }

    _setupDirectionPad() {
        var stick = this.pad.addStick(0, 0, 100, 'generic');
        stick.scale = 0.60;
        stick.alignBottomLeft(45);
        return stick
    }

    _setupOrientationPad() {
        var stick = this.pad.addStick(0, 0, 100, 'generic');
        stick.scale = 0.60;
        stick.alignBottomRight(45)
        return stick
    }

    _save() {
         if (dataStore){
            dataStore.save("_highScore", this.score || 0) //
         }
    }

    _addSuperJoystick() {
        var joystick	= new VirtualJoystick({
        	container	: document.getElementById('game'),
        	strokeStyle	: "rgba(255,0,0,0.5)",
        	limitStickTravel: true,
            stickRadius: 120,
            mouseSupport: false,
            useCssTransform:false
        });
        joystick.addEventListener('touchStartValidation', function(event){
        	var touch	= event.changedTouches[0];
        	if( touch.pageX < window.innerWidth/2 )	return false;
        	return true
        });

    }
    _checkAllCollision() {
        this.game.physics.arcade.collide(this.player, this.Enemies, collision.collisionHandlerHeroEnemy);
        this.game.physics.arcade.collide(this.Enemies, this.Enemies);
        // this.game.physics.arcade.collide(this.player, this.powerUpGroup, this.player.pickUpHandler);
    }
}


/* The current game state - not the Phaser game object*/
export function stopGame(gameState:Game) {
  console.log(" >>> stopGame <<<")
  console.log("Game Over")
//   game.startButton.visible = true

//   game.Hero.visible = false

//   game.stick.visible = false
//   game.FireStick.visible = false
//   game.nukeButton.visible = false
//   game.gameOver = true
//   game.EnemyGroup.destroy()

//   game.gameOverText.text = `GAME OVER\n\t\t\t  Score: ${game.Hero._score},  Health: ${game.Hero.health},  Lives: ${game.Hero.lives}`;
//   game.gameOverText.visible = true
//   game.Hero.health = game.Hero.MAX_HEALTH
//   game.Hero.health = game.Hero.MAX_HEALTH
//   game.Hero.lives = game._level.lives
//   game.timer.stop();
//   game.storeInstance.save("_currentLevel", game._level.id)

}

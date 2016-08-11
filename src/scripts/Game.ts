
// imports here refers to the old JS files
import { default as ds} from './dataStore'
import levelManager from './level'

import UI from './UIComponent'
import _gg from './GameGlobals'


let dataStore = ds.storeInstance

/**
 * GameState
 */

export default class Game extends Phaser.State {
    timer: Phaser.Timer
    background: Phaser.TileSprite
    player: any

    score: number
    savingInterval
    lastSave
    savedText
    UI


    cursors: Phaser.CursorKeys
    pad: any
    stick: any


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
        this.lastSave = 0
        this.savedText = null;

    }
    preload() {

    }
    create() {

        _gg.switchMusic("gameMusic")
        
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.game.stage.disableVisibilityChange = true;
        this.world.setBounds(0, 0, 1200, 1200);
        
        
        this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'atlas', 'bg1');
        this.background.fixedToCamera = true;
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);
        
        this.stick = this._setupDirectionPad()

        this.UI = new UI(this.game, _gg)
        
        // this._addSuperJoystick()

    }
    update() { }
    render() {
        this.game.debug.soundInfo(_gg.Music, 20, 32);
        this.game.debug.text("" + this.game.time.fps || '--', 32, 32, "#00ff00");

    }

    _setupDirectionPad() {
        var stick = this.pad.addStick(0, 0, 100, 'generic');
        stick.scale = 0.5;
        stick.alignBottomLeft(20);
        return stick
    }

    _setupOrientationPad() {
        var FireStick = this.pad.addStick(500, 520, 100, 'generic');
        FireStick.scale = 0.5;
        FireStick.alignBottomRight(20)
    }


    _save() {
         if (dataStore){
            dataStore.save("_highScore", this.score || 0) //
         }
    }

    _addSuperJoystick() {
        //   	var joystick	= new VirtualJoystick({
        // 	container	: document.body,
        // 	strokeStyle	: "rgba(255,0,0,0.5)",
        // 	limitStickTravel: true,
        //     stickRadius: 120,
        //     mouseSupport: false,
        //     useCssTransform:false
        // });
        // joystick.addEventListener('touchStartValidation', function(event){
        // 	var touch	= event.changedTouches[0];
        // 	if( touch.pageX < window.innerWidth/2 )	return false;
        // 	return true
        // });

    }
}
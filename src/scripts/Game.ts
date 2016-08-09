
// imports here refers to the old JS files
import * as dataStore from './dataStore'
import levelManager from './level'


/**
 * GameState
 */

export default class Game extends Phaser.State {
    timer: Phaser.Timer
    background: Phaser.TileSprite
    player: any


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

    }
    preload() {

    }
    create() {
        this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight,'atlas', 'bg2');
        this.background.fixedToCamera = true;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.game.stage.disableVisibilityChange = true;
        this.world.setBounds(0, 0, 1200, 1200);
        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);
        console.log("dataStore = ", dataStore)
        console.log("lvlManager = ", levelManager)
        

       this.stick = this._setupDirectionPad()

        // this._addSuperJoystick()

    }
    update() { }
    render() { 
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
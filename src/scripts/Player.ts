/**
 * Player
 */
export default class Player extends Phaser.Sprite {
    maxVelocity: number
    _currentState: any//Phaser.State

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "atlas", "box_cyborg_skin")
        // this.loadTexture("atlas", "box_steel_skin")
        this.game.physics.arcade.enable(this);
        this.body.bounce.setTo(0.3, 0.3);
        this.body.collideWorldBounds=true;
        this.anchor.set(0.5,0.5)
        this._currentState = game.state.getCurrentState()
        this.maxVelocity = 300
        this.scale.set(1.5)

        console.log(this._currentState['rightStick'])

        
        
        game.camera.follow(this)
        // game.camera.deadzone = new Phaser.Rectangle(100, 100, innerWidth - 200, innerHeight - 200);
        game.add.existing(this)
    }
    update() {
        this.updateMobileInputHandler() 
        // this.updateKeyboardInputHandler()
    }

    updateKeyboardInputHandler() {
        
    }

    updateMobileInputHandler() {

        if (this._currentState['rightStick'].isDown) {
            
            this.game.physics.arcade.velocityFromRotation(this._currentState['rightStick'].rotation, this.maxVelocity * this._currentState['rightStick'].force, this.body.velocity);
        } 

        if (this._currentState['leftStick'].isDown) {
            
            this.rotation = this._currentState['leftStick'].rotation;
        }

        if (! this.game.camera.atLimit.x) {
            this._currentState.background.tilePosition.x -= (this.body.velocity.x *  this.game.time.physicsElapsed);
        }

        if (! this.game.camera.atLimit.y) {
            this._currentState.background.tilePosition.y -= (this.body.velocity.y *  this.game.time.physicsElapsed);
        }

    }
}


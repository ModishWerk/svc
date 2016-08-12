/**
 * Player
 */
export default class Player extends Phaser.Sprite {
    maxVelocity: number
    _currentState: Phaser.State

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "atlas", "box_cyborg_skin")
        this.game.physics.arcade.enable(this);
        this.body.bounce.setTo(0.3, 0.3);
        this.body.collideWorldBounds=true;
        this.anchor.set(0.5,0.5)
        this._currentState = game.state.getCurrentState()
        this.maxVelocity = 500

        
        
        game.camera.follow(this)
        game.add.existing(this)
    }
    update() {
        this.updateMobileInputHandler() 
    }

    handleJoysticInput() {
        this.body.moveForward(this.maxVelocity); /* *2 to give a consitent acceleration as keyboard input*/
        this.body.rotation = this._currentState['rightStick'].rotation + 1.555
    }

    updateMobileInputHandler() {
        if (this._currentState['rightStick'].isDown) {
            this.game.physics.arcade.velocityFromRotation(this._currentState['rightStick'].rotation, this.maxVelocity * this._currentState['rightStick'].force, this.body.velocity);
        } 

        if (this._currentState['leftStick'].isDown) {
            this.rotation = this._currentState['leftStick'].rotation - 1.555;
        }

    };
}


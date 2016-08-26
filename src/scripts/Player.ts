import Weapons from './Weapons'


/**
 * Player
 */
export default class Player extends Phaser.Sprite {
    maxVelocity: number
    _currentState: any//Phaser.State
    inventory
    wp: Phaser.Weapon
    margin = 100
    body:Phaser.Physics.Arcade.Body
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "atlas", "box_cyborg_skin")
        // this.loadTexture("atlas", "box_steel_skin")
        this.game.physics.arcade.enable(this);
        this.body.bounce.setTo(0.3, 0.3);
        this.body.collideWorldBounds = true;
        this.anchor.set(0.5,0.5)
        this._currentState = game.state.getCurrentState()
        this.maxVelocity = 600
        this.scale.set(1.5)
        this.body.drag.x = 300 // decreasing speed
        this.body.drag.y = 300 // decreasing speed
        this.wp = this.game.add.weapon(30, 'atlas', 'bullet')


        game.camera.follow(this)
        // game.camera.deadzone = new Phaser.Rectangle(100, 100, innerWidth - 200, innerHeight - 200);
        game.add.existing(this)
        this.inventory = []
        this.inventory.push(new Weapons(this))
    }
    
    update() {
        this.updateMobileInputHandler() 
        // this.updateKeyboardInputHandler()
    }

    updateKeyboardInputHandler() {
        
    }

    updateMobileInputHandler() {

        if (this._currentState['rightStick'].isDown) {
            
            this.inventory[0].fire()
            this.rotation = this._currentState['rightStick'].rotation;
        } 

        if (this._currentState['leftStick'].isDown) {

            // this.wp.fire(this)
            this.game.physics.arcade.velocityFromRotation(this._currentState['leftStick'].rotation, this.maxVelocity * this._currentState['rightStick'].force, this.body.velocity);
        }

        // if (! this.game.camera.atLimit.x) {
        //     this._currentState.background.tilePosition.x -= (this.body.velocity.x *  this.game.time.physicsElapsed);
        // }

        // if (! this.game.camera.atLimit.y) {
        //     this._currentState.background.tilePosition.y -= (this.body.velocity.y *  this.game.time.physicsElapsed);
        // }
        if (this.x > this.game.world.width - this.margin ) {
            this.x = this.game.world.width - this.margin
        } else if (this.x < this.margin){
            this.x = this.margin
        }
        if (this.y > this.game.world.height - this.margin * 2) {
            this.y = this.game.world.height - this.margin * 2
        } else if (this.y < this.margin){
            this.y = this.margin
        }
    }


}


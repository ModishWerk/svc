import Weapons from './Weapons'
import { HealthBarMechanism } from './UIComponent'


/**
 * Player
 */
export default class Player extends Phaser.Sprite {
    maxVelocity: number
    _currentState: any//Phaser.State
    inventory
    // wp: Phaser.Weapon
    margin = 100
    body: Phaser.Physics.Arcade.Body
    hp: HealthBarMechanism
    lives: number
    constructor(game: Phaser.Game, x: number, y: number, maxHealth?) {
        super(game, x, y, "atlas", "box_cyborg_skin")
        // this.loadTexture("atlas", "box_steel_skin")
        this.game.physics.arcade.enable(this);
        this.body.bounce.setTo(0.3, 0.3);
        this.body.collideWorldBounds = true;
        this.anchor.set(0.5, 0.5)
        this._currentState = game.state.getCurrentState()
        this.maxVelocity = 600
        this.scale.set(1.5)
        this.body.drag.x = 300 // decreasing speed
        this.body.drag.y = 300 // decreasing speed
        this.lives = 1
        this.maxHealth = maxHealth || 20
        this.health = this.maxHealth
        this.hp = new HealthBarMechanism(game, "HP", innerWidth / 2, innerHeight - 50, 'atlas', 'greenBarOutline', 'greenBarFill', "#F8E71C", this.maxHealth, this.health)
        // this.wp = this.game.add.weapon(30, 'atlas', 'bullet')


        // this.skinAnim = this.animations.add('royal_purple', [0, 1, 2, 3, 4, 5, 6, 7,6,5,4,3,2,1,0], 8, true, true);

        // this.skinAnim.play("royal_purple", true);

        game.camera.follow(this)
        // game.camera.deadzone = new Phaser.Rectangle(100, 100, innerWidth - 200, innerHeight - 200);
        game.add.existing(this)
        this.inventory = []
        this.inventory.push(new Weapons(this))
    }

    update() {
        this.updateMobileInputHandler()
        this.updateKeyboardInputHandler()
        this.updateGhostJoystick()
    }

    updateKeyboardInputHandler() {
        if (this._currentState.cursors.left.isDown) {
            // rotate left
            this.body.angularVelocity = -180;
        }
        else if (this._currentState.cursors.right.isDown) {
            // rotate right
            this.body.angularVelocity = 180;
        }
        else {
            // Stop rotating
            this.body.angularVelocity = 0;
        }

        if (this._currentState.cursors.up.isDown) {

            this._currentState.physics.arcade.velocityFromRotation(this.rotation, 350, this.body.velocity);
        } else if (this._currentState.cursors.down.isDown) {
            this._currentState.physics.arcade.velocityFromRotation(this.rotation - Math.PI, 350, this.body.velocity);
        }
        else {
        }

        if (this._currentState.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            //  this.action("fire");
            this.inventory[0].fire()
        }
    }

    updateMobileInputHandler() {
        if (!this._currentState['rightStick']) return 
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
        if (this.x > this.game.world.width - this.margin) {
            this.x = this.game.world.width - this.margin
        } else if (this.x < this.margin) {
            this.x = this.margin
        }
        if (this.y > this.game.world.height - this.margin * 2) {
            this.y = this.game.world.height - this.margin * 2
        } else if (this.y < this.margin) {
            this.y = this.margin
        }
    }

    updateGhostJoystick() {
        var vjr = this._currentState['rightGhostStick']            
        var vjl = this._currentState['leftGhostStick']            
        if (this._currentState['rightGhostStick']._pressed) {
            this.inventory[0].fire()
            vjr.rotation = Math.atan2(vjr.deltaY() , vjr.deltaX())
            console.log(vjr.rotation * 180/Math.PI, vjr.deltaX(), vjr.deltaY())
             this.rotation = (vjr.rotation)
        }
        if (vjl._pressed) {
            vjl.rotation = Math.atan2(vjl.deltaY(), vjl.deltaX())
            vjl.force = Math.min(1, (Math.sqrt(vjl.deltaX()**2 +  vjl.deltaY()**2) / vjl._stickRadius * 2)) 
             this.game.physics.arcade.velocityFromRotation(vjl.rotation, this.maxVelocity * vjl.force, this.body.velocity);
        }
    }
}


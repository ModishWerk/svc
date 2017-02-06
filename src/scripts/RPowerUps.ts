'use strict';

// 'use strict';

// import { ASSET_POWER_UPS_LIFE, ASSET_POWER_UPS_NUKE } from '../states/playingState.js'

var ASSET_POWER_UPS_NUKE = 'pickupShield',
    ASSET_POWER_UPS_LIFE = 'pickupSpeed';


/**
 * LIFE - power up - add a life
 */


export class PowerUp_Life extends Phaser.Sprite {

  activate: any
  used: boolean
  pickedUp: boolean
  capacity: number
  
  tween: any
  timer: Phaser.Timer

  
  constructor(game, x, y) {
    super(game, x, y);
    this.name = "life";
    this.capacity = 1;
    this.used = false;
    this.pickedUp = false;

    game.physics.arcade.enable(this);
    this.alpha = 0;

    //  Create our tween. This will fade the sprite to alpha 1 over the duration of 2 seconds
    this.tween = game.add.tween(this).to({ alpha: 1 }, 500, "Linear", true, 0, -1);

    //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
    //  The 3000 tells it to wait for 3 seconds before starting the fade back.
    this.tween.yoyo(true, 1000);

    this.timer = game.time.create(false);

    //  Set a TimerEvent to occur after 3 seconds
    this.timer.add(powerUps.pickuptime, powerUps_wasPickedUp, this, game);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    this.timer.start();

    game.add.existing(this);
    this.bringToTop();
      
      return this
  }
}


PowerUp_Life.prototype.activate = function powerUps_life_action(owner) {
  if (!this.used) {
    // guard to only add 1 life
    this.pickedUp = true;
    owner.lives += this.capacity;
    this.used = true;
    // this.timer.add(powerUps.pickuptime, renderAction, this, owner);
  }
};

function powerUps_wasPickedUp(game) {
  // this here is the context passed by the timer - which will be a powerup sprite element
  if (!this.pickedUp) {

    (function destroyPickUpAnimationFunction(_sprite, game) {
      // yep IIFE deal with it -_- !
      var tween = game.add.tween(_sprite);
      tween.to({ alpha: 0 }, 100, Phaser.Easing.Linear.None);
      tween.onComplete.add(function () {
        _sprite.destroy();
      });
      tween.start();
      console.log("Time to say good bye to that power up");
    })(this, game);
  }
}

/**
 * Nuke - power up - add a Nuke
 */


export class PowerUp_Nuke extends Phaser.Sprite {

  used: boolean
  pickedUp: boolean
  capacity: number
  tween: any
  timer: Phaser.Timer

  activate: (owner: any) => void
  
  constructor(game, x, y) {
    super(game, x, y, "atlas", ASSET_POWER_UPS_NUKE);

    this.name = "nuke";
    this.capacity = 1;
    this.used = false;
    this.pickedUp = false;

    game.physics.arcade.enable(this);
    this.alpha = 0;

    this.tween = game.add.tween(this).to({ alpha: 1 }, 500, "Linear", true, 0, -1);
    this.tween.yoyo(true, 1000);

    this.timer = game.time.create(false);
    this.timer.add(powerUps.pickuptime, powerUps_wasPickedUp, this, game);
    this.timer.start();

  };

}

  PowerUp_Nuke.prototype.activate = function powerUps_nuke_action(owner) {
    if (!this.used) {
      // this only activate the pick up ... it does not detonate the nuke
      this.pickedUp = true;
      owner.nukes += this.capacity;
      this.used = true;
    }
  };
/**
 * ADD NEW POWER UP HERE ....
 */

export default class PowerUpGroup extends Phaser.Group {

  constructor(game: Phaser.Game) {
      super(game)
    }
}

// PowerUpGroup.prototype = Object.create(Phaser.Group.prototype);
// PowerUpGroup.prototype.constructor = PowerUpGroup;

PowerUpGroup.prototype.update = function () {
  // console.log('Wave Update')
  this.forEachAlive(function (item) {
    if (item.used) {
      item.destroy();
    } else {}
    // item.update() // animation

    // enemy.rotation = this.game.math.degToRad(90) + this.game.physics.arcade.moveToObject(enemy, this.game.Hero, this.SPEED);
  }, this);
};


export var powerUps = {
  probs: 0.5,
  pickuptime: 10000, // 5 seconds
  registered: {
    "life": PowerUp_Life,
    "nuke": PowerUp_Nuke,
  }
};
'use strict';



var MAX_ENEMY_SPEED = 400

function getRandomPositionOutsideMargin(game, margin = 10) {
  var x, y;
  var loc = game.rnd.integerInRange(0, 3)
  if (loc == 0) { //left
    x = -margin
    y = game.rnd.integerInRange(margin, game.world.height - margin)
  } else if (loc == 1) { // top
    x = game.rnd.integerInRange(margin, game.world.width - margin)
    y = -margin
  } else if (loc == 2) { // right

    x = game.world.width + margin
    y = game.rnd.integerInRange(margin, game.world.height - margin)
  } else { // bottom
    x = game.rnd.integerInRange(margin, game.world.width - margin)
    y = game.world.height + margin
  }

  return [x, y]
}

// Enemy constructor
var Enemy = function(game, x, y, enemy_asset, _game) {
  Phaser.Sprite.call(this, game, x, y, 'atlas', enemy_asset);

  this.health = 2;
  this.attack = 1;
  this.defense = 1;
  this.isBoss = false;
  // Set the pivot point for this sprite to the center
  this.anchor.setTo(0.5, 0.5);

  // this.scale.setTo(0.2, 0.2);
  this._game = _game
  // Enable physics on the Enemy
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.collideWorldBounds = true;
  this.body.moves = true;
  this.body.bounce.x = 30;
  this.body.bounce.y = 30;
  // Define constants that affect motion
  this.SPEED = 60 + game.rnd.integerInRange(0, 10) * 5; // Enemy speed pixels/second
  this.TURN_RATE = 5; // turn rate in degrees/frame

  this.WOBBLE_LIMIT = 30; // degrees
  this.WOBBLE_SPEED = 100; // milliseconds

  // Create a variable called wobble that tweens back and forth between
  // -this.WOBBLE_LIMIT and +this.WOBBLE_LIMIT forever
  this.wobble = this.WOBBLE_LIMIT;


  // this.game.add.tween(this)
  //     .to(
  //         { wobble: -this.WOBBLE_LIMIT },
  //         this.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
  //         100000, true
  //     );


  // this.Anim = this.animations.add('run', Phaser.Animation.generateFrameNames('enemyWalking_', 1, 4), 3 , true, false);
  // this.Anim.play('run', 3, true);
};


// Enemys are a type of Phaser.Sprite
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.resetStats = function resetStats(argument) {
  this.health = 2;
  this.attack = 1;
  this.defense = 1;
  this.alpha = 1; // opacity
}

Enemy.prototype.updateParentGroupOnKill = function() {
  if (this.parent && this.parent.remaining) {
    this.parent.remaining -= 1
  }
  if (this.isBoss){  // a sprite has been killed and it was the boss
    this.parent.bossIsDead = true
  }
}
Enemy.prototype.update = function() {
  // Calculate the angle from the Enemy to the mouse cursor game.input.x
  // and game.input.y are the mouse position; substitute with whatever
  // target coordinates you need.
  var targetAngle = this.game.math.angleBetween(
    this.x, this.y,
    this._game.Hero.body.x, this._game.Hero.body.y
  );

  targetAngle += this.game.math.degToRad(this.wobble);

  // Gradually (this.TURN_RATE) aim the Enemy towards the target angle
  if (this.rotation !== targetAngle) {
    // Calculate difference between the current angle and targetAngle
    var delta = targetAngle - this.rotation;

    // Keep it in range from -180 to 180 to make the most efficient turns.
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;

    if (delta > 0) {
      // Turn clockwise
      this.angle += this.TURN_RATE;
    } else {
      // Turn counter-clockwise
      this.angle -= this.TURN_RATE;
    }

    // Just set angle to target angle if they are close
    if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
      this.rotation = targetAngle;
    }
  }

  // Calculate velocity vector based on this.rotation and this.SPEED
  this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
  this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
};
Enemy.prototype.fire = function() {
  var item = 0;
  for (var item in this.items) {
    if (this.items[item].type == "weapon") {
      this.items[item].fire(this)
    }
  }
}
Enemy.prototype.takeDamage = function(bullet) {
  if (this.defense > 0) {
    this.defense -= bullet.attack;

    console.log("Enemy Resist :P")
  } else {
    this.health -= bullet.attack || 1;
    console.log(this.health)
  }
  if (!this.isBoss){
    this.alpha -= (0.2/this.health)

  }
}

function EnemyWave(game, _game, MAX) {

  Phaser.Group.call(this, game);
  this.remaining = MAX
  this.bossArrived = false
  this.bossIsDead = false

  this.completed = false
  var x, y;
  for (var i = 0; i < MAX; i++) {
    x = getRandomPositionOutsideMargin(game, 50) // this is bad don't do it again
    y = x[1]
    x = x[0]
    this.add(new Enemy(game, x, y, ASSET_ENEMY_BASIC, _game), true);
  }
  this.nextEnemyAt = 0;
  this.enemyDelay = 500;

  this.callAll('animations.add', 'animations', 'run', Phaser.Animation.generateFrameNames('enemyWalking_', 1, 4, '.png'), 16, true);
  this.callAll('play', null, 'run');
  return this
}

EnemyWave.prototype = Object.create(Phaser.Group.prototype);
EnemyWave.prototype.constructor = EnemyWave;

EnemyWave.prototype.update = function(source) {
  // console.log('Wave Update')
  this.forEachAlive(function(enemy) {
    enemy.update()
    this.completed = this.remaining > 0 ? false : true
    // enemy.rotation = this.game.math.degToRad(90) + this.game.physics.arcade.moveToObject(enemy, this.game.Hero, this.SPEED);
  }, this)
};

EnemyWave.prototype.spawn = function() {
  if (this.game && !this.completed) {
    if (this.nextEnemyAt < this.game.time.now && this.countDead() > 0) {
      this.nextEnemyAt = this.game.time.now + this.enemyDelay;
      var enemy = this.getFirstExists(false);
      enemy.resetStats(); // because we are reusing the object some of them might have no defense or no life left already
      // spawn at a random location top of the screen
      var x = getRandomPositionOutsideMargin(this.game, 50) // this is bad don't do it again
      var y = x[1]
      x = x[0]
      enemy.reset(x, y);
      enemy.SPEED = 60 + this.game.rnd.integerInRange(0, 30) * 5;
    }
  }
}
EnemyWave.prototype.spawnBoss = function(stats) {
  stats = stats || {}
  if (this.completed) {
    var enemy = this.getFirstExists(false);
    if (enemy) {
      var x = getRandomPositionOutsideMargin(this.game, 50)
      var y = x[1]
      x = x[0]
      enemy.reset(x, y);
      enemy.resetStats();
      enemy.scale.set(3, 3)
      enemy.health = stats.health || 20;
      enemy.attack = stats.attack || 5;
      enemy.defense = stats.defense || 10;
      enemy.SPEED = 150 + this.game.rnd.integerInRange(0, 30) * 5;
      console.log("BOSS Arrived", enemy)
      this.bossArrived = true // make sure we only spawn one boss lol
      enemy.isBoss = true
    }
  }
}


export {
  EnemyWave
}

/**
 * Weapons
 */
export default class Weapons  {
	_wp: Phaser.Weapon
	owner: Phaser.Sprite
	item_name = "weapon"
    constructor(owner: Phaser.Sprite) {
		this.owner = owner
        // super(game, game.plugins)
        this._wp = owner.game.add.weapon(30, 'atlas', 'bullet');
		this._wp.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;

		//  Because our bullet is drawn facing up, we need to offset its rotation:
		// this._wp.bulletAngleOffset = 90;

		//  The speed at which the bullet is fired
		this._wp.bulletSpeed = 800;

		//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
		this._wp.fireRate = 50;

		//  Add a variance to the bullet angle by +- this._wp value
		// this._wp.bulletAngleVariance = 10;

		this._wp.trackRotation = true
		// sprite = this._wp.add.sprite(320, 500, 'ship');

		// game.physics.arcade.enable(this._wp);

		//  Tell the to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
		this._wp.fireAngle = -90

		this._wp.trackSprite(owner, 14, 0, true);
	 }
	fire() {
		this._wp.fire(this.owner)
	}
}
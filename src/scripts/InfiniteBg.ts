

export default class InfiniteBg extends Phaser.Group {
	bg1: Phaser.TileSprite
	bg2: Phaser.TileSprite
	constructor(game: Phaser.Game, scale?, bg1?, bg2?) {
		super(game)
		var scale = scale || 1
		this.bg1 = this.game.add.tileSprite(0, 0, this.game.world.width * scale, this.game.world.height * scale, bg1)
		this.bg2 = this.game.add.tileSprite(0, 0, this.game.world.width * scale, this.game.world.height * scale, bg2)
		this.add(this.bg1)
		this.add(this.bg2)
        
		this.bg1.fixedToCamera = true
		this.bg2.fixedToCamera = true
		this.bg2.alpha = 0.3
	}
    
	updateTile() {
		this.bg1.tilePosition.set(-this.game.camera.x * 0.25, -this.game.camera.y * 0.25)
		this.bg2.tilePosition.set(-this.game.camera.x * 0.5, -this.game.camera.y * 0.5)
        
		// this.bg.tilePosition.set(this.game.camera.x * -0.5, this.game.camera.y * -0.5);
        // this.bgnear.tilePosition.set(this.game.camera.x * -1, this.game.camera.y * -1);
	}
    
}
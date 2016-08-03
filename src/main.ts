
import Splash from './scripts/Splash'
import GameState from './scripts/GameState'

class lvlUp {
	game: Phaser.Game;

	constructor() {
		this.game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'game', { preload: this.preload, create: this.create });
        this.game.state.add("Splash", Splash)
        // WebFont.load(<WebFont.Config>{
        //     custom: {
        //         families: ['TheMinion'],
        //         urls: ['assets/style/theminion.css']
        //     },
        //     active: () => {
        //         console.log("initial Webfonts loaded")

        //     }
        // });
	}

	preload() {
        console.log("lvlup Preload")
        this.game.stage.backgroundColor = 0x222222;
        this.game.load.image('loading',  'assets/images/loading.png');
        this.game.load.image('brand',    'assets/images/logo.png');
	}

	create() {
        console.log("lvlup Create")
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.game.stage.disableVisibilityChange = true;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

        console.log("/********************New State**********************/")
		this.game.state.start("Splash")

	}
}

export declare let WebFontConfig: any;
export declare let Music: Phaser.AudioSprite;


window.onload = () => {
	var game = new lvlUp();
}

export default {WebFontConfig, Music}
'use strict';

import utils from './js/utils'
import * as mgg from '../main'
import Menu from './Menu'
import Game from './Game'


export default class Splash extends Phaser.State {
    loadingBar: Phaser.Sprite
    logo: Phaser.Sprite
    status: Phaser.Text

    fontLoaded: Boolean
    
    init() {
        loadFonts(this)
        this.loadingBar = this.game.make.sprite(this.game.world.centerX - (387 / 2), 400, "loading");
        this.logo = this.game.make.sprite(this.game.world.centerX, 200, 'brand');
        this.status = this.game.make.text(this.game.world.centerX, 200, '...', { fill: 'white', font: '30pt TheMinion' });
        console.log("Init Splash", this)
    }
    preload() {
        this.game.add.existing(this.loadingBar)
        this.game.add.existing(this.logo)
        this.game.add.existing(this.status)

        utils.centerGameObjects([this.logo, this.status]);
        utils.fitVertically([this.logo, this.status, this.loadingBar], this.game.stage)

        this.game.load.setPreloadSprite(this.loadingBar);
        this.game.load.onFileComplete.add(this._onFileComplete, this);
        this.game.load.onLoadComplete.addOnce(() => {

            this.status.setText('Ready!');
        }, this)
        console.log("Preload Splash")

        this.game.load.atlas('atlas', 'assets/images/atlas.png', 'assets/images/atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.load.atlas('generic', 'assets/images/generic-joystick.png', 'assets/images/generic-joystick.json');
        //TODO: look in audiosprite to reduce overhead https://github.com/tonistiigi/audiosprite
        this.game.load.audio('menuMusic', ['assets/sounds/menu_screen_music_the_come_up_nocopyright.ogg'])
        this.game.load.audio('gameMusic', ['assets/sounds/robo_sing_comicdead_edit_version_noncopyrigh.ogg'])
        this.game.load.audio('fx_nuke', ['assets/sounds/nuke_snd_fx.ogg'])
        this.game.load.audio('fx_player', ['assets/sounds/player_snd_fx.ogg'])
        this.game.load.audio('fx_bullet', ['assets/sounds/norm_gun_snd_fx.ogg'])

        // this.game.load.image("testImg", "http://placekitten.com/2000/3000")
        // this.game.load.image("testImg2", "http://placekitten.com/2000/3000")
        // this.game.load.image("testImg3", "http://placekitten.com/2000/3000")
    }
    create() {
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.renderer.renderSession.roundPixels = true;


        this._addGameState();
        this._addGameMusic();
        // this.initDeviceRatio();

        window.setInterval(function (game) {
            
            
            if (game.fontLoaded) {
                game.camera.fade(0x0000000, 1000, true)
                game.state.start("Menu");
            }
        } (this), 1000);


    }
    update() { 
        // if all the fonts are loaded, go to next State
        if (this.fontLoaded) {

            console.log("/********************New State**********************/")
            setTimeout(() => {
                this.game.camera.fade(0x0000000, 1000, true)
                this.game.state.start("Menu");
            }, 1000);
        
        }

    }
    render() {
        // console.log("Render Splash")
        // this.game.debug.rectangle(this.logo.getLocalBounds(), 'blue', false);
        this.game.debug.body(this.logo, 'rgb(255,99,0)', false);
        this.game.debug.text("" + this.game.time.fps || '--', 32, 32, "#00ff00");

    }
    _addGameState() {
        this.game.state.add("Menu", Menu);
        this.game.state.add("Game", Game);
        //     game.state.add("GameOver",GameOver);
        //     game.state.add("Credits",Credits);
        //     game.state.add("Options",Options);
    }
    _addGameMusic() {

    }
    _onFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        console.log(progress);

        // this.status.setText("Loading the awesomeness..." + progress + "% - " + totalLoaded + " out of " + totalFiles);
        this.status.setText("Lvl UP loading..." + progress + "%");
        this.status.setStyle({ fill: 'white', font: '20pt sequence_brk' })

    }
}

let loadFonts = (game: Splash) => {
    WebFont.load(<WebFont.Config>{
        custom: {
            families: ['TheMinion', 'FontAwesome', 'sequence_brk'],
            urls: [ 'assets/style/theminion.css',
                    'assets/style/font-awesome.min.css',
                    'assets/style/sequence_brk.css'
            ]
        },
        // google: { families: ['Sniglet', 'Modak'] },
        classes: false,
        active: () => {
            console.log("Webfonts loaded")

            setTimeout(function (game: Splash) {
                game.fontLoaded = true
                // game.status.setStyle({ fill: 'white', font: '30pt Sniglet' });
                // game.add.existing(game.status)
            } (game), 500);
        }
    });
}

function loadBgm(game: Splash) {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/Analog Hero.mp3');
    game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
}
function loadImages(game: Splash) {
    game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'assets/images/options-bg.jpg');
    game.load.image('blur-bg', 'assets/images/blur32x32.png');
}


'use strict';

import utils from './js/utils'

import Menu from './Menu'
import Game from './Game'
import Options from './Options'

import _gg from './GameGlobals'

import { default as ds} from './dataStore'
let dataStore = ds.storeInstance


export default class Splash extends Phaser.State {
    loadingBar: Phaser.Sprite
    logo: Phaser.Sprite
    status: Phaser.Text

    fontLoaded: Boolean
    musicDecoded:Boolean
    
    init() {
        loadFonts(this)
        this.loadingBar = this.game.make.sprite(this.game.world.centerX - (387 / 2), 400, "loading");
        this.logo = this.game.make.sprite(this.game.world.centerX, 200, 'brand');
        this.status = this.game.make.text(this.game.world.centerX, 200, '...', { fill: 'white', font: '30pt TheMinion' });
        console.log("Init Splash", this)
    }
    preload() {
        console.log("Preload Splash")
        this.game.add.existing(this.loadingBar)
        this.game.add.existing(this.logo)
        this.game.add.existing(this.status)

        utils.centerGameObjects([this.logo, this.status]);
        utils.fitVertically([this.logo, this.status, this.loadingBar], this.game.stage)

        this.game.load.setPreloadSprite(this.loadingBar);
        this.game.load.onFileComplete.add(this._onFileComplete, this);
        this.game.load.onLoadComplete.addOnce(() => {
            this.status.setText('Assets loaded - Decoding music...');
            this.game.sound.setDecodedCallback(['menuMusic', 'gameMusic'], this._onMusicDecoded, this);
                        

        }, this)

        this.game.load.atlas('atlas', 'assets/images/atlas.png', 'assets/images/atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.game.load.atlas('enemy', 'assets/images/Enemy1.png', 'assets/images/Enemy1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.load.atlas('generic', 'assets/images/generic-joystick.png', 'assets/images/generic-joystick.json');
        //TODO: look in audiosprite to reduce overhead https://github.com/tonistiigi/audiosprite
        this.game.load.audio('menuMusic', ['assets/sounds/Racing-Menu.mp3', 'assets/sounds/menu_screen_music_the_come_up_nocopyright.ogg'])
        this.game.load.audio('gameMusic', ['assets/sounds/AL3X_Flight-160.mp3','assets/sounds/robo_sing_comicdead_edit_version_noncopyrigh.ogg'])
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
        console.log("Splash ==> ", _gg.autoSave, _gg.Music)


        this._addGameState();
        this._addGameMusic();
        // this.initDeviceRatio();

    }
    update() { 
        // if all the fonts are loaded, go to next State
        if (this.fontLoaded && this.musicDecoded) {

            console.log("/********************New State**********************/")
            // setTimeout(() => {
                this.game.camera.fade(0x0000000, 1000, true)
                this.game.state.start("Menu");
            // }, 1000);
        
        }

    }
    render() {
        this.game.debug.body(this.logo, 'rgb(255,99,0)', false);
        this.game.debug.soundInfo(_gg.Music, 20, 32);
        this.game.debug.text("" + this.game.time.fps || '--', 32, 32, "#00ff00");

    }
    _addGameState() {
        this.game.state.add("Menu", Menu);
        this.game.state.add("Game", Game);
        //     game.state.add("GameOver",GameOver);
        //     game.state.add("Credits",Credits);
        this.game.state.add("Options", Options);
    }
    _addGameMusic() {
        _gg.Music = this.game.add.audio("menuMusic")
        _gg.Music.loop = true;

    }
    _onFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        console.log(progress);

        // this.status.setText("Loading the awesomeness..." + progress + "% - " + totalLoaded + " out of " + totalFiles);
        this.status.setText("Lvl UP loading..." + progress + "%");
        this.status.setStyle({ fill: 'white', font: '20pt sequence_brk' })

    }
    _onMusicDecoded() {
        setTimeout(() => {
            this.status.setText("Music Decoded!");
            this.musicDecoded = true
        }, 1000);

    }
}

let loadFonts = (game: Splash) => {
    WebFont.load(<WebFont.Config>{
        custom: {
            families: ['TheMinion', 'FontAwesome', 'sequence_brk', 'NextStop-doubledots', 'NextStop-blocky'],
            urls: [ 'assets/style/theminion.css',
                    'assets/style/font-awesome.min.css',
                    'assets/style/sequence_brk.css',
                    'assets/style/nextStop.css'
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

// function loadBgm(game: Splash) {
//     // thanks Kevin Macleod at http://incompetech.com/
//     game.load.audio('dangerous', 'assets/bgm/Analog Hero.mp3');
//     game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
// }
// function loadImages(game: Splash) {
//     game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
//     game.load.image('options-bg', 'assets/images/options-bg.jpg');
//     game.load.image('blur-bg', 'assets/images/blur32x32.png');
// }


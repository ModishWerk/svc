'use strict';

import utils from './js/utils'
import * as mgg from '../main'
import GameMenu from './GameMenu'


export default class Splash extends Phaser.State {
    loadingBar: Phaser.Sprite
    logo: Phaser.Sprite
    status: Phaser.Text

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
        fitVertically([this.logo, this.status, this.loadingBar], this.game.stage)

        this.game.load.setPreloadSprite(this.loadingBar);
        this.game.load.onFileComplete.add(this._onFileComplete, this);
        this.game.load.onLoadComplete.addOnce(() => {

            this.status.setText('Ready!');
        }, this)
        console.log("Preload Splash")

        this.game.load.atlas('atlas', 'assets/images/atlas.png', 'assets/images/atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        //TODO: look in audiosprite to reduce overhead https://github.com/tonistiigi/audiosprite
        this.game.load.audio('menuMusic', ['assets/sounds/menu_screen_music_the_come_up_nocopyright.ogg'])
        this.game.load.audio('gameMusic', ['assets/sounds/robo_sing_comicdead_edit_version_noncopyrigh.ogg'])
        this.game.load.audio('fx_nuke', ['assets/sounds/nuke_snd_fx.ogg'])
        this.game.load.audio('fx_player', ['assets/sounds/player_snd_fx.ogg'])
        this.game.load.audio('fx_bullet', ['assets/sounds/norm_gun_snd_fx.ogg'])

        this.game.load.image("testImg", "http://placekitten.com/2000/3000")
        this.game.load.image("testImg2", "http://placekitten.com/2000/3000")
        this.game.load.image("testImg3", "http://placekitten.com/2000/3000")
    }
    create() {
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.renderer.renderSession.roundPixels = true;


        this._addGameState();
        this._addGameMusic();
        // this.initDeviceRatio();

        setTimeout(function (game) {

            console.log("/********************New State**********************/")
            game.camera.fade(0x0000000, 1000, true)
            game.state.start("GameMenu");
        } (this), 1000);


    }
    update() { }
    render() {
        // console.log("Render Splash")
        // this.game.debug.rectangle(this.logo.getLocalBounds(), 'blue', false);
        this.game.debug.body(this.logo, 'rgb(255,99,0)', false);
        this.game.debug.text("" + this.game.time.fps || '--', 32, 32, "#00ff00");

    }
    _addGameState() {
        this.game.state.add("GameMenu", GameMenu);
        //     game.state.add("Game",Game);
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
        google: { families: ['Sniglet', 'Modak'] },
        classes: false,
        active: () => {
            console.log("Webfonts loaded")

            setTimeout(function (game) {
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

/**
 * Fits an array of elements vertically in it's parents
 */
function fitVertically(eltArr: [Phaser.Sprite], parent, FirstMargin?: number, margin?: number, xPos?: number) {
    // parent = (parent) ? parent : window
    margin = margin | 0
    var offsetY: number = parent.y + FirstMargin | 0;  // current offset
    var sp_bounds = null;
    console.log("parent y = ", parent.y)
    eltArr.map((sp) => {
        sp.anchor.y = 0
        sp.y = offsetY + margin
        offsetY = sp.y + sp.height
        // console.log(offsetY, sp.y, sp.offsetY, sp.height, sp, sp.key, margin)
    })
}

// var Splash = function () {};
// var dataStore = null;
//     // playSound = true,
//     // playMusic = true,
//     // music;

// Splash.prototype = {

//   loadScripts: function () {
//     game.load.script('style', 'lib/style.js');
//     game.load.script('mixins', 'lib/mixins.js');
//     // game.load.script('uuid', 'lib/bower_components/node-uuid/uuid.js');
//     game.load.script('WebFont', 'vendor/webfontloader.js');
//     game.load.script('gamemenu','states/GameMenu.js');
//     game.load.script('game', 'states/Game.js');
//     game.load.script('gameover','states/GameOver.js');
//     game.load.script('credits', 'states/Credits.js');
//     game.load.script('options', 'states/Options.js');
//   },

//   loadBgm: function () {
//     // thanks Kevin Macleod at http://incompetech.com/
//     game.load.audio('dangerous', 'assets/bgm/Analog Hero.mp3');
//     game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
//   },
//   // varios freebies found from google image search
//   loadImages: function () {
//     game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
//     game.load.image('options-bg', 'assets/images/options-bg.jpg');
//     game.load.image('blur-bg', 'assets/images/blur32x32.png');
//     // game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
//   },

//   loadFonts: function () {
//     WebFontConfig = {
//       custom: {
//         families: ['TheMinion', 'FontAwesome'],
//         urls: ['assets/style/theminion.css', 'assets/style/font-awesome.min.css']
//       },
//       google: {
//           families: ['Sniglet', 'Modak']
//       }
//     }
//   },
//   connectDataStore: function(){
//     dataStore = window.localStorage;
//     if (dataStore){
//       var _highScore = dataStore.getItem("_highScore") || 0;
//       var _uuid = dataStore.getItem("_uuid") || uuid.v4();
//       dataStore.setItem("_uuid", _uuid);
//       console.log(_highScore, _uuid)
//     }

//   },
//   init: function () {
//     this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
//     this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
//     this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
//     utils.centerGameObjects([this.logo, this.status]);
//   },

//   preload: function () {
//     // game.add.sprite(0, 0, 'stars');
//     game.stage.backgroundColor = "#222222";
//     game.add.existing(this.logo).scale.setTo(0.5);
//     game.add.existing(this.loadingBar);
//     game.add.existing(this.status);
//     this.addLoadingIcon()
//     this.connectDataStore()
//     this.load.setPreloadSprite(this.loadingBar);

//     this.loadScripts();
//     this.loadImages();
//     this.loadFonts();
//     this.loadBgm();

//   },

//   loadUpdate: function(){
//     this.loadingIcon.angle += 5
//   },

//   addLoadingIcon: function() {
//         /* adding UI icon*/
//     this.loadingIcon = this.add.text(game.world.centerX-(387/2), 400, '\uf1ce', { fill : '#D7D7D7', font : '64px FontAwesome' });
//     this.loadingIcon.anchor.setTo(0.5);
//   },

//   addGameStates: function () {

//     game.state.add("GameMenu",GameMenu);
//     game.state.add("Game",Game);
//     game.state.add("GameOver",GameOver);
//     game.state.add("Credits",Credits);
//     game.state.add("Options",Options);
//   },

//   addGameMusic: function () {
//     music = game.add.audio('dangerous');
//     music.loop = true;
//     // music.play();
//   },

//   initDeviceRatio: function(){
//     if (this.game.device.desktop)
//     {
//         this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//         // this.scale.setMinMax(480, 260, 1024, 768);
//         this.scale.pageAlignHorizontally = true;
//         this.scale.pageAlignVertically = true;
//     }
//     else
//     {
//         this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//         // this.scale.setMinMax(480, 260, 1024, 768);
//         this.scale.pageAlignHorizontally = true;
//         this.scale.pageAlignVertically = true;
//         this.scale.forceOrientation(true, false);
//         // this.scale.setResizeCallback(this.gameResized, this);
//         // this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
//         // this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
//     }
//   },

//   create: function() {
//     this.status.setText('Ready!');
//     this.addGameStates();
//     this.addGameMusic();
//     this.initDeviceRatio();

//     setTimeout(function () {
//       game.state.start("GameMenu");
//     }, 1000);
//   }
// };

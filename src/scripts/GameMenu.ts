'use strict';

/** inner color scheme defining the default color of the menue*/
var _cs = {
    defaultColor: "white",
    highlightColor: "#FEFFD5",

    /* Color Scheme*/
    heading_color: "#E6E2AF",
    base_color: "#FFB03B",
    background_color: "#31152B",

    text_color: "#F9E4AD",
    accent_color: "#CC4452",
    accent_hover_color: "#F9E4AD",
}

// cs = color scheme
export var cs = {
    color:_cs,
    title: {
        default: {
            font: '60pt Modak',
            fill: _cs.heading_color,
            align: 'center'
        }
    },
    navitem: {
        base: {
            font: '30pt Sniglet',
            align: 'left',
            srokeThickness: 4
        },
        default: {
            fill: _cs.text_color,
            stroke: 'rgba(0,0,0,0)'
        },
        inverse: {
            fill: _cs.accent_color,
            stroke: _cs.accent_color
        },
        hover: {
            fill: _cs.accent_color,
            stroke: 'rgba(200,200,200,0.5)'
        }
    }
}

export default class GameMenu extends Phaser.State {
    music: Phaser.Sound
    titleText: Phaser.Text
    fade: any
    init() {
        this.titleText = this.game.make.text(this.game.world.centerX, 100, "Game Title", cs.title.default);
        console.log( cs.title.default)
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
    }
    preload() { }
    create() {
        console.log("GameMenu Create")
        this._setupGameMenu()
        this.fade = this.game.camera.flash(0xfffffff, 1000, true)
        // this.game.camera.onFlashComplete.addOnce(this._setupGameMenu, this)
    }
    update() { 
    }
    render() {
        // console.log("Render Splash")
        // this.game.debug.rectangle(this.logo.getLocalBounds(), 'blue', false);
        this.game.debug.text("" + this.game.time.fps || '--', 32, 32, "#00ff00");

    }
    _setupGameMenu() {
            //  Listen for this signal to reset once the fade is over
  
        // console.log(this.fade)

        // this.game.camera.fx.alpha = 0
        this.game.stage.disableVisibilityChange = true;
        this.game.stage.backgroundColor = cs.color.background_color
        this.game.add.existing(this.titleText);
    }
}


'use strict';

import {cs, fa_cs} from './ColorScheme'
import menuTools from './MenuComponent'

export default class GameMenu extends Phaser.State {
    music: Phaser.Sound
    titleText: Phaser.Text
    fade: any
    init() {
        this.titleText = this.game.make.text(this.game.world.centerX, 100, "Lvl Up", cs.title.default);
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
        this._createMenuOptions()
    }
    _createMenuOptions(){
        // menuTools.addMenuOption('Start \uf04b', () => {
        // // game.state.start("Game");
        // }, 'default' , "fa_style", this.menuGroup);
        var menu = [
            { 
                text: ' \uf04b',
                cb: (() => { this.game.state.start("Game")}),
            },
        ]
        new menuTools.TextMenuMaker(this.game, menu ,{})
        // menuTools.addMenuOption('\uf013 Options', () => {
        // // game.state.start("Options");
        // }, 'default' , "fa_style", this.menuGroup);

        // menuTools.addMenuOption('Credits \uf25b', () => {
        // // game.state.start("Credits");
        // }, 'default' , "fa_style", this.menuGroup);

        // this.adjustBottom(20, 0, this.menuGroup)
        // console.log(this.menuGroup)
    }
}

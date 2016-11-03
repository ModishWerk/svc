'use strict';

import {cs, fa_cs} from './ColorScheme'
import menuTools from './MenuComponent'
import Game from './Game'
import utils from './js/utils'

import _gg from './GameGlobals'
import { MuteMechanism }from './UIComponent'



export default class Menu extends Phaser.State {
    titleText: Phaser.Text
    muteBtn: MuteMechanism
    menuGrp: Phaser.Group
    fade: any
    init() {
        this.titleText = this.game.make.text(this.game.world.centerX, 100, "Lvl Up", cs.title.default);
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
    }
    preload() { }
    create() {
        // console.log("GameMenu Create")
        this._setupGameMenu()
        this.fade = this.game.camera.flash(0xfffffff, 1000, true)
        this._playMusic()

    }
    update() {}
    render() {
        // console.log("Render Splash")
        // this.game.debug.rectangle(this.logo.getLocalBounds(), 'blue', false);
        // this.game.debug.text("" + this.game.time.fps || '--', 32, 32, "#00ff00");
        // this.game.debug.soundInfo(_gg.Music, 20, 32);

    }
    _setupMuteBtn() { 
        this.muteBtn = new MuteMechanism(this.game, _gg, undefined, innerWidth, 0)
    }
    _setupGameMenu() {

        this.game.stage.disableVisibilityChange = true;
        this.game.stage.backgroundColor = cs.color.background_color
        this.game.add.existing(this.titleText);
        this._createMenuOptions()
        this._setupMuteBtn()
    }
    _playMusic() {
        _gg.switchMusic("menuMusic")
    }
    _createMenuOptions() {

        var menu = [
            {
                text: 'Start \uf04b',
                cb: (() => { this.game.state.start("Game") }),
            },
            {
                text: '\uf013 Options',
                cb: (() => { this.game.state.start("Options") }),
            },
            {
                text: 'Credits \uf25b',
                cb: (() => { this.game.state.start("Credit") }),
            },
        ]
        this.menuGrp = new menuTools.TextMenuMaker(this.game, menu, {verticalSpacing:60})
        utils.adjustFromBottom(this.menuGrp, 20)
    }
}


'use strict';

/**
 * Options
 */
import {cs, fa_cs} from './ColorScheme'
import menuTools from './MenuComponent'
import utils from './js/utils'

import _gg from './GameGlobals'


export default class Options extends Phaser.State {
    titleText: Phaser.Text
    optionCount: number
    menuGroup: Phaser.Group
    init() {
        this.titleText = this.game.make.text(this.game.world.centerX, 100, "Lvl Up", cs.title.default);
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 0;
    }
    create() {
        var playFXSound = _gg.playFXSound,
            playMusic = _gg.playMusic,
            autoSave = _gg.autoSave;

        this.game.add.existing(this.titleText);

        this.menuGroup = this._createMenuOptions()


        // this.adjustBottom(20, this.game.world.centerX - this.menuGroup.width / 2, this.menuGroup);
    }

    _createMenuOptions() {

        var menu = [
            {
                text: _gg.playMusic ? 'Mute Music' : 'Play Music' + '\uf04b',
                cb: ((target) => {
                    _gg.playMusic = !_gg.playMusic;
                    target.text = _gg.playMusic ? 'Mute Music' : 'Play Music';
                    _gg.Music.volume = _gg.playMusic ? 1 : 0;
                }),
            },
            {
                text: _gg.playFXSound ? 'Mute Sound' : 'Play Sound' + '\uf013',
                cb: ((target) => {
                    _gg.playFXSound = !_gg.playFXSound;
                    target.text = _gg.playFXSound ? 'Mute Sound' : 'Play Sound';
                    _gg.FXSound.volume = _gg.playFXSound ? 1 : 0;
                }),
            },
            {
                text: _gg.autoSave ? 'AutoSave On' : 'AutoSave Off' + '\uf25b',
                cb: ((target) => {
                    _gg.autoSave = !_gg.autoSave;
                    target.text = _gg.autoSave ? 'AutoSave On' : 'AutoSave Off';
                    _gg.autoSave = _gg.autoSave;
                }),
            },
            {
                text: ' Back',
                cb: (() => { this.game.state.start("Menu"); }),
            }
        ]
        var menuGrp = new menuTools.TextMenuMaker(this.game, menu, { verticalSpacing: 50 })
        utils.adjustFromBottom(menuGrp, 20)
        return menuGrp
    }

}
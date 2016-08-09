'use strict';

import utils from './js/utils'
import { cs, fa_cs } from './ColorScheme'

var unicodeRegEx = /[^\u0000-\u0080]+/g

/**
 * MenuMaker
 */
export class TextMenuMaker extends Phaser.Group {
    style: any
    tmpWordArr: [String]
    config: any
    optionCount: number = 0
    constructor(game: Phaser.Game, listOfItem, config?: { startX?: number, startY?: number, verticalSpacing?: number, horizontalSpacing?: number, className?: string }) {
        super(game)

        this.config = { startX: this.game.world.centerX, startY: this.game.world.centerY, verticalSpacing: 80, horizontalSpacing: 20, className: 'default' }
        this.config.startX = config.startX || this.config.startX
        this.config.startY = config.startY || this.config.startY
        this.config.verticalSpacing = config.verticalSpacing || this.config.verticalSpacing
        this.config.horizontalSpacing = config.horizontalSpacing || this.config.horizontalSpacing
        this.config.className = config.className || this.config.className

        var x = this.config.startX
        var y = this.config.startY;

        listOfItem.map((item) => {
            var wordArr = item.text.split(unicodeRegEx)//  DONT FILTER IT helps to allows having a icon at the begining
            var unicodeArr = item.text.match(unicodeRegEx)
            var allWords = unicodeArr != null ? utils.interleaveArrays(wordArr, unicodeArr) : wordArr
            allWords = allWords.filter((el) => { return el != "" && el != " " })
            
            var _style, txt, w = 0;
            var _optionTextsObj = []

            for (var word in allWords) {
                _style = wordArr.indexOf(allWords[word]) > -1 ? cs : fa_cs // if it a word set to cs else its unicode and set to fa_cs
                txt = this.game.add.text(
                    x + w,
                    (this.optionCount * this.config.verticalSpacing) + y,
                    allWords[word],
                    _style.navitem[this.config.className]
                );
                this._createButton(txt, item.cb, item.className || 'default', _style)
                this.add(txt)
                _optionTextsObj.push(txt)
                w += txt.width + this.config.horizontalSpacing
            }
            this.optionCount++

            for (var idx in _optionTextsObj) { // centering bug fix... reposition the text element 
                if (x == this.game.world.centerX) {
                    _optionTextsObj[idx].x -=  w / 2
                }
            }
        })
    }
    _createButton(txt, callback, className, _style)  {
        // txt.anchor.setTo(this.config.startX == this.game.world.centerX ? 0.5 : 0.0);
        txt.inputEnabled = true;

        txt.events.onInputUp.add(callback);
        txt.events.onInputOver.add(function (target) {
            target.setStyle(_style.navitem.hover);
        });
        txt.events.onInputOut.add(function (target) {
            target.setStyle(_style.navitem[className]);
        });

    }
}




export default {
    TextMenuMaker: TextMenuMaker
}

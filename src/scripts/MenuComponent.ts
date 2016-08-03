'use strict';

// import cs from './colorScheme'
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
    constructor(game: Phaser.Game, listOfItem, Options) {
        super(game)
        this.config = Options || { startX: "center", startY: 200, verticalSpacing: 80, className: 'default' }
        this.config.className = this.config.className || 'default'
        this.config.verticalSpacing = this.config.verticalSpacing || 80

        // set the x coordinate to game.world.center if we use "center"
        // otherwise set it to menuConfig.startX
        var x = this.config.startX === "center" ? this.game.world.centerX : this.config.startX;

        // set Y coordinate based on config
        var y = this.config.startY;
        listOfItem.map((item) => {
            var wordArr = item.text.split(unicodeRegEx).filter((el) => { el === " " || ""})
            var unicodeArr = item.text.match(unicodeRegEx)
            var allWords = unicodeArr != null ? utils.interleaveArrays(wordArr, unicodeArr) : wordArr
            var _style, txt, w;
            // assign the right style to each type of word
            for (var word in allWords) {
                _style = wordArr.indexOf(allWords[word]) > -1 ? cs : fa_cs // if it a word set to cs else its unicode and set to fa_cs
                console.log(this.config.className, _style.navitem[this.config.className])
                txt = this.game.add.text(
                    x + w,
                    (this.optionCount * this.config.verticalSpacing) + y,
                    allWords[word],
                    _style.navitem[this.config.className]
                );
                this.add(txt)
                w += txt.width + 10
            }
        
            this.optionCount++

        })
    }    
}


export function addMenuOption(text, callback, className, fontOption, group) {
    this.makeMenuText = makeMenuText
    // use the className argument, or fallback to menuConfig, but
    // if menuConfig isn't set, just use "default"
    className || (className = this.menuConfig.className || 'default');
    var verticalSpacing = this.menuConfig.verticalSpacing || 80;

    // set the x coordinate to game.world.center if we use "center"
    // otherwise set it to menuConfig.startX
    var x = this.menuConfig.startX === "center" ? this.game.world.centerX : this.menuConfig.startX;

    // set Y coordinate based on menuconfig
    var y = this.menuConfig.startY;

    // set navigation style
    var _style
    if (fontOption == "fa_style") {
        _style = fa_cs
        var re = /[^\u0000-\u0080]+/g
        var array1 = text.split(re) // array of Words
        // a1 =  array1.join(" ").trim().split(" ")
        // array1 = array1.join(" ").trim().split(" ")
        var array2 = text.match(re) // array of unicodes
        var array3 = array2 != null ? utils.interleaveArrays(array1, array2) : array1


        var array4 = [] // will contain phaser txt object
        var w = 0

        // assign the right style to each type of word
        for (var word in array3) {
            _style = array1.indexOf(array3[word]) > -1 ? cs : fa_cs
            var txt = this.game.add.text(
                x + w,
                (this.optionCount * verticalSpacing) + y,
                array3[word],
                _style.navitem[className]
            );
            array4.push(txt)
            w += txt.width + 10
            // console.log(w ,array3[word], a1, a1.indexOf(array3[word]) > -1 ?  true: false)
            this.makeMenuText(txt, callback, className, _style)
            if (group) {
                group.add(txt)
            }
        }

        for (var idx in array4) { // centering bug fix... reposition the text element
            if (x == this.game.world.centerX) {
                console.log(array4[idx].w, x, w / 2, array4[idx].w)
                array4[idx].x = x - w / 2 + array4[idx].width * (Number(idx) == 0 ? 0 : 1)
            }
        }
    } else {
        _style = cs
        var txt = this.game.add.text(
            x,
            (this.optionCount * verticalSpacing) + y,
            text,
            _style.navitem[className]
        );

        this.makeMenuText(txt, callback, className, _style)

        if (group) {
            group.add(txt)
        }
    }
    // create
    // use the anchor method to center if startX set to center.

    this.optionCount++;
}


function makeMenuText(txt, callback, className, _style) {
    txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);
    txt.inputEnabled = true;

    txt.events.onInputUp.add(callback);
    txt.events.onInputOver.add(function (target) {
        target.setStyle(_style.navitem.hover);
    });
    txt.events.onInputOut.add(function (target) {
        target.setStyle(_style.navitem[className]);
    });
}

export default {
    addMenuOption: addMenuOption,
    TextMenuMaker: TextMenuMaker
}

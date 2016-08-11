

import {cs, fa_cs} from './ColorScheme'

/**
 * UI
 */
export default class UI extends Phaser.Group {
    scoreText: Phaser.Text
    savedText: DynamicFeedBack
    pause: PauseMechanism
    blurLayer: Phaser.TileSprite
    muteBtn: MuteMechanism

    constructor(game: Phaser.Game, gameGlobals) {
        super(game)
        this.pause = new PauseMechanism(game, 250, this)
        this.savedText = new DynamicFeedBack(game, innerWidth/2, innerHeight/2, "Auto\nSaved..",1000, null, this)
        this.muteBtn = new MuteMechanism(game, gameGlobals, this)
    }

    update() {

    }

}

/**********************************************************
 * Pause game component
 **********************************************************/
class PauseMechanism {
    blurLayer: Phaser.TileSprite
    pauseBtn: Phaser.Text
    animationDuration: number
    optionStyle: any
    constructor(game: Phaser.Game, duration: number = 100, grp?: Phaser.Group) {
        this.animationDuration = duration
        this.blurLayer = game.add.tileSprite(0, 0, window.screen.width, window.screen.height, 'atlas', 'blur-bg', grp);
        this.blurLayer.alpha = 0
        this.optionStyle = {
            default: {
                font: '40px FontAwesome',
                align: 'left',
                fill: cs.color.accent_color,
                stroke: "rgba(200,200,200,0.5)",
                srokeThickness: 4
            },
            over: {
                fontSize: '300px',
                font: 'FontAwesome',
                align: 'left',
                fill: "#FEFFD5",
                stroke: "rgba(200,200,200,0.5)"
            }, out: {
                font: '40px FontAwesome',
                align: 'left',
                fill: cs.color.accent_color,
                stroke: "rgba(0,0,0,0)"
            }
        }
        this.pauseBtn = createFontAwesomeBtn(game, window.screen.width, 0, '\uf28c', this.optionStyle,  (btn)=>{this._pauseHandler(game, btn)}, game ,grp )

        game.input.onDown.add(this._unPauseHandler, this); // Add a input listener to unpause the game

        this.pauseBtn["resetX"] = this.pauseBtn.x
        this.pauseBtn["resetY"] = this.pauseBtn.y

        return this
    }
    _pauseHandler(game, btn) {
        var blurTwn = game.add.tween(this.blurLayer).to({ alpha: 1 }, this.animationDuration, Phaser.Easing.Cubic.In, true, 200);
        var twn = game.add.tween(btn).to({ fontSize: "300px", x: window.screen.width/2, y: window.screen.height/2, backgroundColor: cs.color.accent_color }, this.animationDuration, Phaser.Easing.Cubic.In, true, 200);
        twn.onComplete.add(() => { game.paused = true; }) // pause after tweening
                
    }
    _unPauseHandler(event) {
        // Unpause the game
        var bounds = this.pauseBtn.getBounds();
        if (event.game.paused) {
            var x1 = bounds.x, x2 = x1 + bounds.width,
                y1 = bounds.y, y2 = y1 + bounds.height;
            // Check if the click was inside the pauseBtn Bounds
            if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {

                event.game.paused = false;
                // I'm not sure why but a negative found size does reduce the pause button back
                event.game.add.tween(this.pauseBtn).to({ fontSize: "-300px", x: this.pauseBtn["resetX"], y: this.pauseBtn["resetY"], backgroundColor: cs.color.accent_color }, this.animationDuration, Phaser.Easing.Cubic.In, true, 200);
                event.game.add.tween(this.blurLayer).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.In, true, 200);

            }
        }
        
    }
}

export function createFontAwesomeBtn(game:Phaser.Game, x, y, text, optionStyle, callback,context, grp) {
    optionStyle.default = optionStyle.default || {}
    optionStyle.over = optionStyle.over || {}
    optionStyle.out = optionStyle.out || {}


    var txt = game.add.text(x, y, text, optionStyle.default, grp);
    txt.anchor.setTo(0.5);
    txt.inputEnabled = true;

    txt.events.onInputUp.add(callback, context);
    txt.events.onInputOver.add(function (target) {
        target.setStyle(optionStyle.over);
    });
    txt.events.onInputOut.add(function (target) {
        target.setStyle(optionStyle.out);
    });

    txt.x = txt.x - txt.width / 2
    txt.y = txt.y + txt.height / 2

    return txt

}


/**********************************************************
 * feedback game component
 **********************************************************/

/**
 * dynamic feedback create a quickly displayed text near the 
 */
class DynamicFeedBack {
    txt: Phaser.Text
    twn: Phaser.Tween
    constructor(game: Phaser.Game, x, y, content: string =  "FeedBack Text\nmissing..", duration:number = 1000, style?:any, grp?) {
        this.txt = game.add.text(x, y, content, style? style : cs.title.default, grp);
        this.txt.anchor.set(0.5);
        this.txt.alpha = 0
        
        var twn1 = game.add.tween(this.txt).to({ y: "-30", alpha: 1 }, duration, "Quart.easeOut"),
            twn2 = game.add.tween(this.txt).to({ y: "30", alpha: 0 }, duration, "Quart.easeOut");
        twn1.chain(twn2);
        this.twn = twn1  

        return this
    }
    setText(newText:string) {
        this.txt.setText(newText, true)
    }

    display() {
        this.twn.start()
    }
}



/**********************************************************
 * mute btn game component
 **********************************************************/
class MuteMechanism {
    optionStyle: any
    muteBtn: Phaser.Text
    gameGlobals:any
    constructor(game: Phaser.Game, gameGlobals, grp) {
          this.optionStyle = {
            default: {
                font: '40px FontAwesome',
                align: 'left',
                fill: cs.color.accent_color,
                // stroke: "rgba(200,200,200,0.5)",
                srokeThickness: 4
            },
            over: {
                font: '40px FontAwesome',
                align: 'left',
                fill: "#FEFFD5",
                // stroke: "rgba(200,200,200,0.5)"
            }, out: {
                font: '40px FontAwesome',
                align: 'left',
                fill: cs.color.accent_color,
                // stroke: "rgba(0,0,0,0)"
            }
        }
        this.gameGlobals  = gameGlobals
        // this.muteBtn = game.add.text(0, 0, gameGlobals.playMusic ? '\uf028':'\uf026', { fill : cs.color.accent_color, font : '40px FontAwesome'});
        this.muteBtn = createFontAwesomeBtn(game, innerWidth - 50, 0, gameGlobals.playMusic ? '\uf028' : '\uf026', this.optionStyle, this._handleMuteBtn, this,grp)

        return this
    }
    _handleMuteBtn() {
        console.log("Mute that ", this.gameGlobals.Music.volume)
        this.gameGlobals.playMusic = !this.gameGlobals.playMusic
        this.gameGlobals.Music.volume = this.gameGlobals.playMusic ? 1 : 0;
        this.gameGlobals.Music.volume ? this.muteBtn.setText('\uf028') : this.muteBtn.setText('\uf026')
    }
}


import {cs, fa_cs} from './ColorScheme'
import { default as ds} from './dataStore'
let dataStore = ds.storeInstance
/**
 * UI
 */
export default class UI extends Phaser.Group {
    scoreText: Phaser.Text
    savedText: DynamicFeedBack
    pause: PauseMechanism
    blurLayer: Phaser.TileSprite
    muteBtn: MuteMechanism
    timer: TimerMechanism
    score: ScoreTracker
    // HealthBar: HealthBarMechanism

    constructor(game: Phaser.Game, gameGlobals) {
        super(game)
        this.score = new ScoreTracker(game, dataStore)
        this.pause = new PauseMechanism(game, 250, this)
        this.savedText = new DynamicFeedBack(game, innerWidth/2, innerHeight/2, "Auto\nSaved..",1000, null, this)
        this.muteBtn = new MuteMechanism(game, gameGlobals, this)
        this.timer = new TimerMechanism(game, 15000,innerWidth/2, 0,  cs.title.default, null, this)
        // this.HealthBar = new HealthBarMechanism(game, "HP", innerWidth/2, innerHeight - 50, 'atlas','greenBarOutline', 'greenBarFill', "#F8E71C", 300, 150)
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
        this.blurLayer.fixedToCamera = true
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

        this.pauseBtn = createFontAwesomeBtn(game, innerWidth, 0, '\uf28c', this.optionStyle,  (btn)=>{this._pauseHandler(game, btn)}, game ,grp )
        this.pauseBtn["resetX"] = this.pauseBtn.x
        this.pauseBtn["resetY"] = this.pauseBtn.y
        game.input.onDown.add(this._unPauseHandler, this); // Add a input listener to unpause the game

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

export function createFontAwesomeBtn(game:Phaser.Game, x, y, text, optionStyle, callback, context, grp) {
    optionStyle.default = optionStyle.default || {}
    optionStyle.over = optionStyle.over || {}
    optionStyle.out = optionStyle.out || {}


    var txt = game.add.text(x, y, text, optionStyle.default, grp);
    txt.anchor.setTo(0.5, 0.5);
    txt.inputEnabled = true;

    if (callback) {
        txt.events.onInputUp.add(callback, context);
        txt.events.onInputOver.add(function (target) {
            target.setStyle(optionStyle.over);
        });
        txt.events.onInputOut.add(function (target) {
            target.setStyle(optionStyle.out);
        });
    }

       
    txt.x = (x == innerWidth/2)? txt.x : (txt.x - txt.width / 2)
    txt.y = txt.y + txt.height / 2

    txt.fixedToCamera = true;
    
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
export class MuteMechanism {
    optionStyle: any
    muteBtn: Phaser.Text
    gameGlobals:any
    constructor(game: Phaser.Game, gameGlobals, grp, x?, y?) {
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
        this.muteBtn = createFontAwesomeBtn(game, x || (innerWidth - 50), y || 0, gameGlobals.playMusic ? '\uf028' : '\uf026', this.optionStyle, this._handleMuteBtn, this,grp)

        return this
    }
    _handleMuteBtn() {
        console.log("Mute that ", this.gameGlobals.Music.volume)
        this.gameGlobals.playMusic = !this.gameGlobals.playMusic
        this.gameGlobals.Music.volume = this.gameGlobals.playMusic ? 1 : 0;
        this.gameGlobals.Music.volume ? this.muteBtn.setText('\uf028') : this.muteBtn.setText('\uf026')
        if (this.gameGlobals.playMusic && !this.gameGlobals.Music.isPlaying) {
            this.gameGlobals.switchMusic(this.gameGlobals.Music.name)
        }
    }
}


class TimerMechanism {
    internalTimer: Phaser.Timer
    display: Phaser.Text
    parent: any

    /* the timer mechanims receive an options specifying  */    
    constructor(game: Phaser.Game, delay: number, x: number, y: number, textStyle?: any,  type?: string, context?, grp?) {
        
         var optionStyle = {
            default: {
                font: '40px FontAwesome',
                align: 'left',
                fill: cs.color.accent_color,
                stroke: "rgba(200,200,200,0.5)",
                srokeThickness: 4
            },
            over: {},
            out: {}
        }
         optionStyle.default = textStyle || optionStyle.default
        
        this.internalTimer = game.time.create(false);//new Phaser.Timer(game, false)
        this.internalTimer.add(delay, () => { console.log("DONE - TIMER")})
        // this.internalTimer.start()
        this.display = createFontAwesomeBtn(game, x, y, this.internalTimer.seconds, optionStyle, null, null, grp)
        // seconds -> counts up
        // duration -> counts down
        // console.log(textStyle)
        // this.internalTimer.ms
        this.parent = context
    }
    update() {
        this.display.setText(this.convertToLightYears(this.internalTimer.ms.toFixed(0)))
    }
    start() {
        this.internalTimer.start()
    }
    convertToLightYears(timeInSeconds) {
        // 1 sec = 1 month <=> 12sec = 1year
        var years = Math.floor(timeInSeconds / 200)
        this.parent.score.current_score = years
        return `${years} ` + ( years > 1 ?  'yrs': 'yr')   
        
        
    }
}

class ScoreTracker {
    current_score: number = 0
    highest_score: number = 0
    last_score: number = 0
    constructor(game: Phaser.Game, dataStore) {
    
    }
    update() {
        
    }
}

export class HealthBarMechanism {
	outline: Phaser.Sprite
	fill: Phaser.Sprite
	text_description: Phaser.Text
	text_value: Phaser.Text
	currentValue: number
	maxValue: number
	pixelUnit: number
	width: number
	x: number
	y: number
	constructor(game: Phaser.Game, name: string, x, y, atlas, outlineKey, fillKey, txtColor = "#FFFFFF", maxValue = 100, currentValue?) {
		var margY = 7
		this.currentValue = currentValue || null
		this.maxValue = maxValue
		this.x = x
		this.y = y 

		//description text		
		// bar content
		this.text_description = game.add.text(x, y, name, { font: "8pt Courier", fill: txtColor, stroke: "#1CF87F" })
		this.outline = game.add.sprite(x, y + this.text_description.height - margY, atlas, outlineKey)
		this.fill = game.add.sprite(x, y + this.text_description.height - margY, atlas, fillKey)

		// value text
		this.text_value = game.add.text(x, this.outline.y + this.outline.height, (this.currentValue || "--") + "/" + (this.maxValue || "--"), { font: "8pt	 Courier", fill: txtColor, stroke: "#1CF87F", align: "right" })
		// this.text_value.width = this.outline.width;
		// this.text_value.x += this.outline.width - this.text_value.width
		// this.text_value.smoothed = false
		// this.text_value.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

		// misc
		this.pixelUnit = this.fill.width / (maxValue > 0 ? maxValue : 1)  // defined the pixel unit of health to be removed when the hero lose health
		this.width = this.outline.width // for positioning in its parent
        

		// set the fill bar correctly
        this.fill.width = (this.pixelUnit * this.currentValue) | 0

        this.realign()

		this.text_description.fixedToCamera = true;
		this.outline.fixedToCamera = true;
		this.fill.fixedToCamera = true;
		this.text_value.fixedToCamera = true;
    }
    
    realign() {
        this.outline.x -= this.outline.width/2
        this.fill.x = this.outline.x
        this.text_description.x = this.outline.x
        this.text_value.x = this.outline.x + this.outline.width - this.text_value.width

        this.x = this.outline.x
    }


	updateText(currentValue?) {
		this.text_value.setText((currentValue || this.currentValue) + "/" + this.maxValue)
	}
	updateValue(val?) {

		this.fill.width -= this.fill.width - val >= 0 ? val : this.fill.width
	}

	incrementBy(val?) {

		var inc = val * this.pixelUnit
		if (this.currentValue + val > this.maxValue) {
			this.fill.width = this.outline.width
			this.currentValue = this.maxValue
		} else if (this.currentValue + val <= 0) {
			this.fill.width = 0
			this.currentValue = 0
		} else {
			this.fill.width += inc
			this.currentValue += val
		}
		this.updateText()

    }
    reset() {
        this.incrementBy(this.maxValue)
        this.updateValue(this.maxValue)
    }

}


/**
 * UI
 */
export default class UI extends Phaser.Group {
    scoreText: Phaser.Text
    savedText: Phaser.Text
    pause: pauseMechanism
    blurLayer: Phaser.TileSprite

    constructor(game: Phaser.Game) {
        super(game)
        this.pause = new pauseMechanism(game, this)
    }
    update() {

    }

}

class pauseMechanism {
    blurLayer: Phaser.TileSprite
    pauseBtn: Phaser.Text
    optionStyle: any
    constructor(game: Phaser.Game, grp:Phaser.Group) {
        this.blurLayer = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'atlas', 'blur-bg', grp);
        this.blurLayer.alpha = 0
        this.optionStyle = {
            default: {
                font: '40px FontAwesome',
                align: 'left',
                fill: "#FEFFD5",
                stroke: "rgba(200,200,200,0.5)",
                srokeThickness: 4
            },
            over: {
                font: '40px FontAwesome',
                align: 'left',
                fill: "#FEFFD5",
                stroke: "rgba(200,200,200,0.5)"
            }, out: {
                font: '40px FontAwesome',
                align: 'left',
                fill: "white",
                stroke: "rgba(0,0,0,0)"
            }
        }
        this.pauseBtn = createFontAwesomeBtn(game, window.screen.width, 0, '\uf28c', this.optionStyle,  (btn)=>{this._pauseHandler(game, btn)}, grp )

        game.input.onDown.add(this._unPauseHandler, this); // Add a input listener to unpause the game

        this.pauseBtn["resetX"] = this.pauseBtn.x
        this.pauseBtn["resetY"] = this.pauseBtn.y

        return this
    }
    _pauseHandler(game, btn) {
        var blurTwn = game.add.tween(this.blurLayer).to({ alpha: 1 }, 200, Phaser.Easing.Cubic.In, true, 200);
        var twn = game.add.tween(btn).to({ fontSize: "300px", x: window.screen.width/2, y: window.screen.height/2, backgroundColor: 'rgba(200,200,200,0.5)' }, 500, Phaser.Easing.Cubic.In, true, 200);
        console.log(window.screen.width/2, window.screen.height/2)
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
                event.game.add.tween(this.pauseBtn).to({ fontSize: "-300px", x: this.pauseBtn["resetX"], y: this.pauseBtn["resetY"] }, 500, Phaser.Easing.Cubic.In, true, 200);
                event.game.add.tween(this.blurLayer).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.In, true, 200);

            }
        } else {
            console.log("Nothing to UnPause")
        }
    }
}


function createFontAwesomeBtn(game:Phaser.Game, x, y, text, optionStyle, callback,grp) {
    optionStyle.default = optionStyle.default || {}
    optionStyle.over = optionStyle.over || {}
    optionStyle.out = optionStyle.out || {}


    var txt = game.add.text(x, y, text, optionStyle.default, grp);
    txt.anchor.setTo(0.5);
    txt.inputEnabled = true;

    txt.events.onInputUp.add(callback, game);
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
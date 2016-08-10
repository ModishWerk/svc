/** Class exposing some global variable _gg = game global */
export  default class Mgg {
    public static Music: Phaser.Sound = null
    public static FXSound: Phaser.Sound = null
    public static autoSave: boolean = true
    constructor(game:Phaser.Game) {
        Mgg.autoSave = true
    }
    getSound() { }
}

export var _gg = new Mgg(Phaser.GAMES[0])
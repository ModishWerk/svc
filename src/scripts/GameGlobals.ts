/** Class exposing some global variable _gg = game global */
export  default class Mgg {
    public static Music: Phaser.Sound = null
    public static FXSound: Phaser.Sound = null
    public static autoSave: boolean = true
    public static playMusic: boolean = true
    public static playFXSound: boolean = true

    constructor(game:Phaser.Game) {
        Mgg.autoSave = true
    }
    static switchMusic(musicName: string) { 
        if (Mgg.playMusic) {
            if (Mgg.Music.name !== musicName) {
                Mgg.Music.stop();
                Mgg.Music = Phaser.GAMES[0].add.audio(musicName)
                Mgg.Music.loop = true
                Mgg.Music.fadeIn(1000);//.play()
            } else if (!Mgg.Music.isPlaying) {
                Mgg.Music.play()
            } else {
                // the correct music is already playing
            }
        }
    }
    static switchFx(FxName:string) { 
        if (Mgg.FXSound.name !== FxName && Mgg.playFXSound) {
            Mgg.FXSound.stop();
            Mgg.FXSound = Phaser.GAMES[0].add.audio(FxName)
            Mgg.FXSound.fadeIn(1000);//.play()
        } 
    }
}

// export var _gg = new Mgg(Phaser.GAMES[0])
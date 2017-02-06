
// a level is simply a set of configuration passed to the playingState. setLevel function



export var LevelManager = {
  
   LEVEL_0 : {
    id:0,
    enemies:100,
    powerUps: 20,
    lives:20,
    timer:10000,
  },
  LEVEL_1:{
    id:1,
    enemies:3,
    powerUps: 2,
    lives:3,
    timer:60000,
  },
  LEVEL_2:{
    id:2,
    enemies:10,
    powerUps: 2,
    lives:3,
    timer:60000,
  },

  MASTER_LEVEL_LIST:[
    this.LEVEL_0,
    this.LEVEL_1,
    this.LEVEL_2
  ],

  get: function(lvlId){
    if (lvlId < this.MASTER_LEVEL_LIST.length ){
      return this.MASTER_LEVEL_LIST[lvlId]
    }
    return this.MASTER_LEVEL_LIST[0]  // if no next level start over...
  }
  // return this
}
console.log(LevelManager.MASTER_LEVEL_LIST)
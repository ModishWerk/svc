  //level.es6

// a level is simply a set of configuration passed to the playingState. setLevel function



function LevelManager () {
  var LEVEL_0 = {
    id:0,
    enemies:100,
    powerUps: 20,
    lives:20,
    timer:10000,
  };
  var LEVEL_1 = {
    id:1,
    enemies:3,
    powerUps: 2,
    lives:3,
    timer:60000,
  };

  var LEVEL_2 = {
    id:2,
    enemies:10,
    powerUps: 2,
    lives:3,
    timer:60000,
  };

  var MASTER_LEVEL_LIST = [
    LEVEL_0,
    LEVEL_1,
    LEVEL_2
  ]

  this.get = function(lvlId){
    if (lvlId < MASTER_LEVEL_LIST.length ){
      return MASTER_LEVEL_LIST[lvlId]
    }
    return MASTER_LEVEL_LIST[0]  // if no next level start over...
  }
  return this
}

var levelManager = new LevelManager()

export default levelManager


// a level is simply a set of configuration passed to the playingState. setLevel function



export var LevelManager = {
  LEVEL_0: {
    id: 0,
    enemies: 100,
    powerUps: 20,
    lives: 20,
    timer: 10000,
  },
  LEVEL_1: {
    id: 1,
    enemies: 3,
    powerUps: 2,
    lives: 3,
    timer: 60000,
  },
  LEVEL_2: {
    id: 2,
    enemies: 10,
    powerUps: 2,
    lives: 3,
    timer: 60000,
  },
  get: (any) => { }
}

const MASTER_LEVEL_LIST = [
  LevelManager.LEVEL_0,
  LevelManager.LEVEL_1,
  LevelManager.LEVEL_2,
]

LevelManager.get = function(lvlId){
  if (lvlId < MASTER_LEVEL_LIST.length ){
    return MASTER_LEVEL_LIST[lvlId]
  }
  return MASTER_LEVEL_LIST[0]  // if no next level start over...
}


console.log(MASTER_LEVEL_LIST)
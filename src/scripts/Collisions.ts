import Player from './Player'
import { powerUps } from './RPowerUps'
import { LifeCycle } from './GameLifeCycle'

// http://stackoverflow.com/a/9071606/623546
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}


var collision = {
    collisionHandlerHeroPowerUps(Hero: Player, item) { 
        if (item.name == "life" || item.name == 'nuke' ){
            item.activate(Hero)  // activate to immediatly add life
        }else {
            Hero.inventory.push(item)  // keep the new item in the hero reserve
        }
        item.destroy()
        console.log("Item {" + item.name +"} was picked up")
    },
    collisionHandlerHeroEnemy(Hero:Player, enemy) {
        if (!enemy.isBoss) {
            enemy.kill()
            enemy.updateParentGroupOnKill()
        }

        Hero.health -= enemy.attack;
        Hero.hp.incrementBy(-enemy.attack);
        // Hero.skinAnim.speed += 1

        if (Hero.health < 1) {
            Hero.lives -= 1
            Hero.hp.reset()
            Hero.health = Hero.maxHealth
        }
        if (Hero.lives <= 0) {
            LifeCycle.gameOver(Hero._currentState)

        }
    },
    collisionHandlerBulletEnemy(bullet, enemy) {

        // if (enemy.health <= 0) {
            if (Math.random() < powerUps.probs) {
                var name = choose(Object.keys(powerUps.registered))
                var pw = new powerUps.registered[name](enemy.game, enemy.x, enemy.y)
                var _currentState:any = enemy.game.state.getCurrentState()
                _currentState.powerups.add(pw)
                
                console.log("a" + name + " as appeared", pw)
            }
        // }    

        enemy.kill()
        enemy.updateParentGroupOnKill()
        bullet.kill()
    }
}

export default collision
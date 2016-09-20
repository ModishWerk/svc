import {stopGame} from './Game'
import Player from './Player'

var collision = {
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
            stopGame(Hero._currentState)

        }
    },
    collisionHandlerBulletEnemy(bullet, enemy) {
        console.log("BOOMM ENEMY DEAD !")
        enemy.kill()
        enemy.updateParentGroupOnKill()
        bullet.kill()
    }
}

export default collision
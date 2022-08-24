/**
 * The shoot system, check if user shoot after chrono, if there aer bad shoot, etc
 * @param {Object} object 
 */
function shootGame(object) {
    if (object.enemyShoot && !object.enemyShootBool) {
        if (object.spaceKeyLoad) {
            shoot(object, 'enemy');
            enemyShootBool = true;
            object.spaceKeyLoad = false;
        }
    }
    object.input.keyboard.on('keydown-SPACE', () => {

        if (object.spaceKeyLoad) {

            object.spaceKeyLoad = false;

            if (object.inShootRound) {

                if (!object.alreadyFire) {

                    object.alreadyFire = true;

                    if (!object.endChrono) {
                        object.playerBadShoot = true;
                        object.endChrono = false
                        object.iddleP.setActive(false).setVisible(false);
                        object.player.setActive(true).setVisible(true);

                        object.gunShoot.play();

                        setTimeout(() => {
                            object.badShoot.play();
                        }, 100);

                        setTimeout(() => {      
                            object.player.setActive(false).setVisible(false);
                            object.iddleP.setActive(true).setVisible(true);
                        }, 500);
                    }

                    else if (object.endChrono && !object.enemyShoot){
                        shoot(object, 'player')
                    }

                    object.inShootRound = false;
                }
            }
        }
    })
}
/**
 * Remove health, update health bar, reset all animation && if player win -> change scene
 * @param {Object} object 
 * @param {String} target - player || enemy 
 */
function shoot(object, target) {
    if (target == 'player') {
        // play gun music
        object.gunShoot.play()
        
        // remove enemy health
        if ((enemyHealth-ItemsShopCapacity[itemsSelect][2]*10) < 0) {
            enemyHealth = 0
        }
        else {
            enemyHealth -= ItemsShopCapacity[itemsSelect][2]*10;
        }

        // update health bar
        object.fgHealthEnemy.clear();
        object.fgHealthEnemy.fillStyle(0x4ADBD1, 0.8);
        object.fgHealthEnemy.fillRect(object.x2, object.y, enemyHealth*3, 30);

        // change player animation (iddle to shoot)
        object.iddleP.setActive(false).setVisible(false);
        object.player.setActive(true).setVisible(true);
        
        // kill enemy and change scene if enemy health is < 1
        if (enemyHealth < 1) {
            money += object.moneyEarned;
            object.endGame = true;
            object.deathSound.play();

            object.iddleE.setActive(false).setVisible(false);
            object.deathE.setActive(true).setVisible(true);

            object.deathE.anims.play('deathE');

            object.Edeath = true;
            
            // chnage scene with a fade effect
            setTimeout(() => {
                object.cameras.main.fadeOut(1000, 0, 0, 0);
                setTimeout(() => {
                    object.musicScene.stop();
                    object.scene.start('map');
                    object.scene.stop('battle');
                }, 1000);
            }, 4000)
            
        }

        // change player animation (shoot to iddle)
        setTimeout(() => {      
            object.player.setActive(false).setVisible(false);
            object.iddleP.setActive(true).setVisible(true);
        }, 500);
    }

    else if (target == 'enemy') {
        // play gun music
        object.gunShootE.play()
        
        // remove enemy health
        if ((playerHealth-ItemsShopCapacity[0][2]*10) < 0) {
            playerHealth = 0
        }
        else {
            playerHealth -= ItemsShopCapacity[0][2]*10;
        }

        // update health bar
        object.fgHealthPlayer.clear();
        object.fgHealthPlayer.fillStyle(0x4ADBD1, 0.8);
        object.fgHealthPlayer.fillRect(object.x1, object.y, playerHealth*3, 30);

        // change player animation (iddle to shoot)
        object.iddleE.setActive(false).setVisible(false);
        object.enemy.setActive(true).setVisible(true);
        
        // change player animation (shoot to iddle)
        setTimeout(() => {      
            object.enemy.setActive(false).setVisible(false);
            object.iddleE.setActive(true).setVisible(true);
        }, 500);
    }
}
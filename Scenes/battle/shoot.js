function shoot(object, target) {
    if (target == 'player') {
        // play gun music
        [object.gunShoot1, object.gunShoot2, object.gunShoot3][itemsSelect].play()
        
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
            }, 2000)
            
        }

        // change player animation (shoot to iddle)
        setTimeout(() => {      
            object.player.setActive(false).setVisible(false);
            object.iddleP.setActive(true).setVisible(true);
        }, 500);
    }
}
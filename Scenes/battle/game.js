function shootGame(object) {
    object.input.keyboard.on('keydown-SPACE', () => {

        if (object.spaceKeyLoad) {

            object.spaceKeyLoad = false;

            if (object.inShootRound) {

                if (!object.alreadyFire) {

                    object.alreadyFire = true;

                    //alert(object.endChrono)

                    if (!object.endChrono) {
                        object.endChrono = false
                        object.iddleP.setActive(false).setVisible(false);
                        object.player.setActive(true).setVisible(true);

                        object.gunShoot2.play();

                        setTimeout(() => {
                            object.badShoot.play();
                        }, 100);

                        setTimeout(() => {      
                            object.player.setActive(false).setVisible(false);
                            object.iddleP.setActive(true).setVisible(true);
                        }, 500);
                    }

                    else if (object.endChrono){
                        shoot(object, 'player')
                    }

                    object.inShootRound = false;
                }
            }
        }
    })
}
/**
 * Begin the game (The title 'Press shift button')
 * @param {Object} object 
 */
function start(object) {
    if (object.endChrono && !object.inShootRound) {

        object.infoTxt.text = "Press SHIFT button";
        object.infoTxt.setTint(0x834b36);

        if (object.K_enter.isDown) {
            object.infoTxt.text = "";
            chrono(object);

            // reset var
            object.alreadyFire = false;
        }
    }

    else {
        shootGame(object);
    }
}
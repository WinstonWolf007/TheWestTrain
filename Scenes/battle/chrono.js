/**
 * It is used for display a chrono. (The cowboy combat system)
 * @param {Object} object 
 */
function chrono(object) {
    // ----- 'Tick' Sound ----- //
    object.inShootRound = true;
    object.endChrono = false;

    object.s321 = SoundAdd(object, 'sound:321', false);

    // ----- Chrono system ----- //
    const time_loops   = randint(3, 5);
    let time_delay     = randint(400, 1000);
    const time_delay_2 = time_delay;

    for(let i=time_loops; i>=0; i--) {
        if(i>0) {
            setTimeout(() => {
                object.timeTxt.text = i.toString();
                object.timeTxt.setTint(0xf26419);
                object.s321.play();
            }, time_delay);

            time_delay += time_delay_2;
        }
        else {
            setTimeout(() => {
                object.timeTxt.text = '>';
                object.timeTxt.setTint(0x758e4f);
            }, time_delay);

            time_delay += time_delay_2;

            setTimeout(() => {
                object.timeTxt.text = '';
            }, time_delay);

            object.endChrono = true;
        }
    }
}

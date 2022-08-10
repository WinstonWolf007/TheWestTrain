/**
 * Add different event to the mouse
 * @param {Array} allBtn  
 * @param {*} clickVar 
 * @param {Hex} color 
 */

function btnEvent(allBtn, clickVar, color) {

    allBtn.forEach(btn => {
        
        // If on click object -> play 'click' sound
        btn.on('pointerdown', () => {
            clickVar.play();
            if (color === 0xffff0f) {
                setCursor('default')
            }
        });

        // If hover object -> change cursor type
        btn.on('pointerover', () => {
            btn.setTint(color);
            setCursor('pointer');
        });

        // If hover out object -> change cursor type
        btn.on('pointerout', () => {
            btn.setTint(0xffffff);
            setCursor('default');
        });
    });
}
/**
 * Change light spritesheet frame
 * @param {Object} object 
 * @param {Number} spritesheetIdx 
 */
function setLightBtn(object, spritesheetIdx) {
    object.iconLightBtn = object.add.image(180, 530, 'spritesheet:menuLight', spritesheetIdx).setInteractive()
    object.iconLightBtn.setScale(1.25)
}
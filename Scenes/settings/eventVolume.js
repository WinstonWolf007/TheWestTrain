/**
 * Update volume icon image when on click on this
 * @param {Object} object 
 * @param {Object} volumeIcon 
 * @param {String} type 
 */
function eventChangeVolumeIcon(object, volumeIcon, type) {
    volumeIcon.on('pointerdown', () => {
        if (object.reloadClick) {
            updateVolume(type);
            setDefaultVolumeIcon(object);
            object.reloadClick = false;
            object.scene.restart();
        }
    })
}
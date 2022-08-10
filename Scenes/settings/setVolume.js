/**
 * Reset volume icon value
 * @param {Object} object 
 */
function setDefaultVolumeIcon(object) {
    object.volumeIconBg = object.add.image(object.bgIconX, object.bgIconY, 'spritesheet:volume', getIdxVolumeIcon('bg')).setInteractive();
    object.volumeIconFg = object.add.image(object.bgIconX, object.bgIconY+200, 'spritesheet:volume', getIdxVolumeIcon('fg')).setInteractive();

    [object.volumeIconBg, object.volumeIconFg].forEach(VI => {
        VI.setScale(0.4);
    });
}
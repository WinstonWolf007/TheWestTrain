/**
 * Give a index of the volume type
 * @param {String} types 
 * @returns a index of the volume type
 */
function getIdxVolumeIcon(types) {
    return PARAM_volume.indexOf(JSON['volume'][types])
}

/**
 * Change volume (BG || FG)
 * @param {String} types 
 */
function updateVolume(types) {
    const data = JSON['volume'][types]
    let equ = PARAM_volume.indexOf(data)+1

    if(equ === 4) {
        equ = 0
    }

    JSON['volume'][types] = PARAM_volume[equ]
}



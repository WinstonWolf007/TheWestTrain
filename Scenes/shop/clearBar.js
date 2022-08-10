/**
 * Clear all bar
 * @param {Object} object 
 */
function clearCharacteristicBar(object) {
    for (let el of [object.FGbar0, object.FGbar1, object.FGbar2]) {
        el.clear();
    }
}
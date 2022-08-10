/**
 * 
 * @param {Object} object 
 * @param {Boolean} exception
 */
function changeColorAll(object, exception) {
    let color;
    let color2;

    if (exception) {
        color = 0xffffff;
        color2 = 0xffffff;
    } else {
        color = 0x3b3b3b;
        color2 = 0xb1b1b1;
    }

    [object.bg, object.btnInfo, object.btnMap, object.btnShop, object.iconChestCode, object.iconScreenData, object.iconScreenTitle].forEach(e => {
        e.setTint(color);
        object.iconLightBtn.setTint(color2)
    });
    
}
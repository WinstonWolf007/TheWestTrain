/**
 * Display gun proprerity with bar color
 * @param {Object} object 
 * @param {Number} gunTypeIdx 
 */
function displayCharacteristicBar(object, gunTypeIdx) {
    let idx = 0;
    let idx2 = 0;

    for (let el of [object.FGbar0, object.FGbar1, object.FGbar2]) {
        el.clear();
        el.fillStyle(0xb47d58);
        el.fillRect(540, 390+idx, 320/5*ItemsShopCapacity[gunTypeIdx][idx2], 10);
        idx += 50;
        idx2 += 1;
    }
}
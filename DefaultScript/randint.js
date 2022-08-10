/**
 * Create a random number with math.random() function (This is a shortcut)
 * @param {Number} min 
 * @param {Number} max 
 * @returns a random number (min to max)
 */
function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
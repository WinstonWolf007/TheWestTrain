/**
 * Reset all variable for start scene
 * @param {Object} object 
 * @param {String} name 
 */
function startScene(object, name) {
    if (object.lightOpen) {
        clearInterval(object.timer);
        object.lightOpen = false;
        object.bgMusic.stop();
        object.scene.start(name);
        object.scene.stop('menu');
    }
}
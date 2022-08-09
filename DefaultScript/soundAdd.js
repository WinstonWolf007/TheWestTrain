// just a shotcut for add sound
function SoundAdd(self, name, loop, vol=null) {
    let type = name.split(':')[0]
    let struct = {volume: 0, loop: loop}
    if (type == 'sound') {
        if (vol == null) {
            struct['volume'] = JSON['volume']['fg']
        }
        else {
            struct['volume'] = vol
        }
    }
    else if (type == 'music') {
        struct['volume'] = JSON['volume']['bg']
    }
    return self.sound.add(name, struct)
}
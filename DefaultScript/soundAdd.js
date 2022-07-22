// just a shotcut for add sound
function SoundAdd(self, name, loop) {
    let type = name.split(':')[0]
    let struct = {volume: 0, loop: loop}
    if (type == 'sound') {
        struct['volume'] = JSON['volume']['fg']
    }
    else if (type == 'music') {
        struct['volume'] = JSON['volume']['bg']
    }
    return self.sound.add(name, struct)
}
// just a shotcut for add sound
function SoundAdd(self, name, vol, loop) {
    return self.sound.add(name, {
        volume: vol,
        loop: loop
    })
}
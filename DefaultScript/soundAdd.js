function SoundAdd(self, name, vol, loop) {
    return self.sound.add(name, {
        volume: vol,
        loop: loop
    })
}
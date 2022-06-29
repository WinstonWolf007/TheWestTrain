class Begin extends Phaser.Scene {
    constructor() {
        super('begin');
        this.introV;
    }

    preload () {
        this.load.video('v', './Assets/video/Solitary.mp4', 'loadeddata', false, false);
    }

    create() {
        this.introV = this.add.video(700, 400, 'v');
        this.introV.play();
        this.introV.setPaused(false);
    }

    update() {
        if (this.introV.getProgress() === 1) {
            this.scene.start('company')
        }
    }
}
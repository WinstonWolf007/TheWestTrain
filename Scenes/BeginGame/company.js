class Begin extends Phaser.Scene {
    constructor() {
        super('company');
        this.introV;
        this.end = false;
    }

    preload () {
        this.load.video('v', './Assets/video/intro.mp4', 'loadeddata', false, false);
    }

    create() {
        this.introV = this.add.video(700, 400, 'v');
        this.introV.autoplay = true;
        this.introV.play();
        this.introV.setPaused(false);
    }

    update() {
        if (this.introV.getProgress() === 1 && !this.end) {
            this.end = true;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            setTimeout(() => {
                this.scene.start('home');
                this.scene.stop('company');
            }, 1000);
        }
    }
}
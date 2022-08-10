class Map extends Phaser.Scene {
    constructor() {
        super('map')
        this.size = 0.2
    }

    preload() {
        this.cameras.main.setBackgroundColor('#ead9a7');
    }

    create() {
        getGraf(this, 30);

        this.clickSound = SoundAdd(this, 'sound:click', false);

        this.btnBack = this.add.image(130, 80, "image:backBtn").setInteractive();
        this.btnBack.setScale(0.6)

        btnEvent([this.btnBack], this.clickSound, 0xffff0f)

        this.btnBack.on('pointerdown', () => {
            this.scene.start('menu');
            this.scene.stop('map');
        });
    }
}
class Shop extends Phaser.Scene {
    constructor() {
        super('shop')
    }

    preload() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        // sound add function <clickSound.js> 
        this.barSound = SoundAdd(this, 'music:psychedelic', JSON['volume']['bg'], true);
        this.clickSound = SoundAdd(this, 'sound:click', JSON['volume']['fg'], false);

        this.barSound.play();
        this.physics.pause();

        this.bgBar = this.physics.add.sprite(750, 460, 'spritesheet:shop').setInteractive();
        this.bgBar.setScale(1.25);
        
        // btn image
        this.btnBack = this.add.image(130, 80, "image:backBtn").setInteractive();
        this.btnBack.setScale(0.6)

        this.anims.create({
            key: 'iddle',
            frames: this.anims.generateFrameNumbers('spritesheet:shop', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.bgBar.anims.play('iddle', true);
    }

    update() {
        btnEvent([this.btnBack], this.clickSound, 0xffff0f);

        this.btnBack.on('pointerdown', () => {
            this.barSound.stop();
            this.scene.start('menu');
            this.scene.stop('shop');
        })
    }
}
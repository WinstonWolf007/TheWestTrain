class Shop extends Phaser.Scene {
    constructor() {
        super('shop')
    }

    preload() {
        setCursor('default')
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        // ---------- Music + Sound ---------- // 
        this.barSound = SoundAdd(this, 'music:chill-abstract-intention', JSON['volume']['bg'], true);
        this.clickSound = SoundAdd(this, 'sound:click', JSON['volume']['fg'], false);

        this.barSound.play();
        this.physics.pause();

        // --------------- Front --------------- //
        this.bgBar = this.physics.add.sprite(750, 460, 'spritesheet:shop').setInteractive();
        this.bgBar.setScale(1.25);
        
        this.btnBack = this.add.image(130, 80, "image:backBtn").setInteractive();
        this.btnBack.setScale(0.6)

        // -------------- Animation -------------- //
        this.anims.create({
            key: 'iddle',
            frames: this.anims.generateFrameNumbers('spritesheet:shop', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.bgBar.anims.play('iddle');

        btnEvent([this.btnBack], this.clickSound, 0xffff0f)

        // ----------------- Event ---------- //
        this.btnBack.on('pointerdown', () => {
            this.barSound.stop();
            this.scene.start('menu');
            this.scene.stop('shop');
        });
    }
}
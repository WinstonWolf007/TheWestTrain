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

        let moneyWidth = this.textures['list']['image:money2']['source']['0']['width'];
        let centerMoneyX = (1500-moneyWidth)/2;

        this.moneyIcon = this.add.image(centerMoneyX, 80, "image:money2").setInteractive();
        this.moneyIcon.setScale(0.6);
        
        if (money > 999) {
            let moneyTxt = '999+';
            this.moneyText = this.add.text(centerMoneyX+25, 55, moneyTxt, {fontSize: 70, fontFamily: 'pixelMoney'})
        }
        else {
            this.moneyText = this.add.text(centerMoneyX+25, 55, money, {fontSize: 70, fontFamily: 'pixelMoney'});
        }
        
        this.moneyText.setTint(0xb47d58);

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
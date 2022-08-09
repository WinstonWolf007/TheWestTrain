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
        this.barSound   = SoundAdd(this, 'music:chill-abstract-intention', true);
        this.clickSound = SoundAdd(this, 'sound:click', false);

        this.barSound.play();
        this.physics.pause();

        // --------------- Text --------------- //
        this.moneyText    = this.add.text(0, 0, '');
        this.txtShopIcon1 = this.add.text(0, 0, '');
        this.txtShopIcon2 = this.add.text(0, 0, '');
        this.txtShopIcon3 = this.add.text(0, 0, '');

        // --------------- Front --------------- //
        this.bgBar     = this.physics.add.sprite(750, 460, 'spritesheet:shop').setInteractive();
        
        this.btnBack   = this.add.image(130, 80, "image:backBtn").setInteractive();

        this.shopIcon1 = this.add.image(500, 300, 'image:shopItems1').setInteractive();
        this.shopIcon2 = this.add.image(700, 300, 'image:shopItems2').setInteractive();
        this.shopIcon3 = this.add.image(900, 300, 'image:shopItems3').setInteractive();

        this.bgBar.setScale(1.25);
    
        [this.shopIcon1, this.shopIcon2, this.shopIcon3, this.btnBack].forEach(el => {
            el.setScale(0.6)
        })

        // -------------- Animation -------------- //
        this.anims.create({
            key: 'iddle',
            frames: this.anims.generateFrameNumbers('spritesheet:shop', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.bgBar.anims.play('iddle');

        // ----------------- Btn Event ---------------- //
        btnEvent([this.btnBack], this.clickSound, 0xffff0f);
        btnEvent([this.shopIcon1, this.shopIcon2, this.shopIcon3], this.clickSound, 0xffff0f)

        // ----------------- Event ----------------- //
        this.btnBack.on('pointerdown', () => {
            this.barSound.stop();
            this.scene.start('menu');
            this.scene.stop('shop');
        });

        this.shopIcon1.on('pointerdown', () => {
            if ((money-ItemsShopMoney[0]) >= 0) {
                money -= ItemsShopMoney[0]
                ItemsShopMoney[0] += 5
                ItemsShopCapacity[0] += 1
            }
        })

        this.shopIcon2.on('pointerdown', () => {
            if ((money-ItemsShopMoney[1]) >= 0) {
                money -= ItemsShopMoney[1]
                ItemsShopMoney[1] += 5
                ItemsShopCapacity[1] += 1
            }
        })

        this.shopIcon3.on('pointerdown', () => {
            if ((money-ItemsShopMoney[2]) >= 0) {
                money -= ItemsShopMoney[2]
                ItemsShopMoney[2] += 5
                ItemsShopCapacity += 1
            }
        })
    }

    update() {
        [this.txtShopIcon1, this.txtShopIcon2, this.txtShopIcon3, this.moneyText].forEach(el => {
            el.text = ''
        })
        this.txtShopIcon1  = this.add.text(440, 180, '$'+ItemsShopMoney[0].toString(), {fontSize: 50, fontFamily: 'pixelMoney'})
        this.txtShopIcon2  = this.add.text(640, 180, '$'+ItemsShopMoney[1].toString(), {fontSize: 50, fontFamily: 'pixelMoney'})
        this.txtShopIcon3  = this.add.text(840, 180, '$'+ItemsShopMoney[2].toString(), {fontSize: 50, fontFamily: 'pixelMoney'})

        this.txtShopIcons  = [this.txtShopIcon1, this.txtShopIcon2, this.txtShopIcon3]

        this.txtShopIcons.forEach(el => {
            el.setTint(0xb47d58)
        })

        if (money > 999) { 
            this.moneyText = this.add.text(((1500-(70*5))/4)*3+200, 280, '$999+', {fontSize: 70, fontFamily: 'pixelMoney'})
        }
        else {
            this.moneyText = this.add.text(((1500-(70*(money.toString().length+1)))/4)*3+200, 280, '$'+money.toString(), {fontSize: 70, fontFamily: 'pixelMoney'});
        }
    }
}
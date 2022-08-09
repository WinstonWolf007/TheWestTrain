class Shop extends Phaser.Scene {
    constructor() {
        super('shop');
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

        this.allTxt = [this.add.text(0, 0, ''), this.add.text(0, 0, ''), this.add.text(0, 0, '')]

        // --------------- Background, Shop Icon & btn "back" --------------- //
        this.bgBar         = this.physics.add.sprite(750, 460, 'spritesheet:shop').setInteractive();
        
        this.btnBack       = this.add.image(130, 80, "image:backBtn").setInteractive();
 
        this.shopIcon1     = this.add.image(500, 260, 'image:shopItems1').setInteractive();
        this.shopIcon2     = this.add.image(700, 260, 'image:shopItems2').setInteractive();
        this.shopIcon3     = this.add.image(900, 260, 'image:shopItems3').setInteractive();
        this.shopIcon0_bar = this.add.image(500, 390, 'image:shopIcon0');
        this.shopIcon1_bar = this.add.image(500, 440, 'image:shopIcon1');
        this.shopIcon2_bar = this.add.image(500, 490, 'image:shopIcon2');

        [this.shopIcon0_bar, this.shopIcon1_bar, this.shopIcon2_bar].forEach(el => {
            el.setScale(0.2);
        });
    
        [this.shopIcon1, this.shopIcon2, this.shopIcon3, this.btnBack].forEach(el => {
            el.setScale(0.6);
        });

        this.bgBar.setScale(1.25);

        // ----- items shop bar characteristic ----- //
        let idx = 0;

        let BGbar0 = this.add.graphics();
        let BGbar1 = this.add.graphics();
        let BGbar2 = this.add.graphics();

        [BGbar0, BGbar1, BGbar2].forEach(bg => {
            bg.fillStyle(0x8c5c47);
            bg.fillRect(530, 385+idx, 340, 20);
            idx += 50
        });

        idx = 0;

        this.FGbar0 = this.add.graphics();
        this.FGbar1 = this.add.graphics();
        this.FGbar2 = this.add.graphics();

        [this.FGbar0, this.FGbar1, this.FGbar2].forEach(fg => {
            fg.fillRect(540, 390+idx, 0, 10);
            idx += 50;
        });

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
        btnEvent([this.shopIcon1, this.shopIcon2, this.shopIcon3], this.clickSound, 0xffff0f);

        // ----------------- Event ----------------- //
        this.btnBack.on('pointerdown', () => {
            this.barSound.stop();
            this.scene.start('menu');
            this.scene.stop('shop');
        });

        for (let i=0; i<3; i++) {
            [this.shopIcon1, this.shopIcon2, this.shopIcon3][i].on('pointerover', () => {
                this.displayCharacteristicBar(i);
            })
        }

        for (let k=0; k<3; k++) {
            [this.shopIcon1, this.shopIcon2, this.shopIcon3][k].on('pointerout', () => {
                this.clearCharacteristicBar();
            })
        }

        for (let j=0; j<3; j++) {
            [this.shopIcon1, this.shopIcon2, this.shopIcon3][j].on('pointerdown', () => {
                if (!itemsIsBuy[j] && (money-ItemsShopMoney[j]) >= 0) {
                    money -= ItemsShopMoney[j];
                    itemsIsBuy[j] = true;
                }
            })
        }
    }

    update() {
        console.log(itemsIsBuy)
        this.allTxt.forEach(el => {
            el.text = '';
        })

        this.moneyText.text = '';

        let x = 0;

        for (let i=0; i<3; i++) {
            if (!itemsIsBuy[i]) {
                this.allTxt[i] = this.add.text(440+x, 130, '$'+ItemsShopMoney[i].toString(), {fontSize: 50, fontFamily: 'pixelMoney'});
                x += 200;
            }
            else {
                this.allTxt[i] = this.add.text(440+x, 130, 'Buy', {fontSize: 50, fontFamily: 'pixelMoney'});
                x += 200;
            }
            this.allTxt[i].setTint(0xb47d58);
        }

        if (money > 999) { 
            this.moneyText = this.add.text(((1500-(70*5))/4)*3+300, 230, '$999+', {fontSize: 70, fontFamily: 'pixelMoney'});
        }
        else {
            this.moneyText = this.add.text(((1500-(70*(money.toString().length+1)))/4)*3+200, 230, '$'+money.toString(), {fontSize: 70, fontFamily: 'pixelMoney'});
        }

        this.moneyText.setTint(0xb47d58);
    }

    displayCharacteristicBar(i) {
        let idx = 0;
        let idx2 = 0;

        for (let el of [this.FGbar0, this.FGbar1, this.FGbar2]) {
            el.clear();
            el.fillStyle(0xb47d58);
            el.fillRect(540, 390+idx, 320/5*ItemsShopCapacity[i][idx2], 10);
            idx += 50;
            idx2 += 1;
        }
    }

    clearCharacteristicBar() {
        for (let el of [this.FGbar0, this.FGbar1, this.FGbar2]) {
            el.clear();
        }
    }
}
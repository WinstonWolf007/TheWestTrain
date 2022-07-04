class Home extends Phaser.Scene {
    constructor() {
        super('home');
    }

    preload() {
        // set begin value
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#ead9a7');
    }
    
    create() {
        // music load
        this.bgSound = SoundAdd(this, 'music:countryboy', JSON['volume']['bg'], true);
        this.bgSound.play();

        this.clickSound = SoundAdd(this, 'sound:click', JSON['volume']['fg'], false);

        // --------------- back ---------------
        this.icon1 = this.add.image(200, 500, 'spritesheet:basements', 0);
        this.icon2 = this.add.image(1300, 700, 'spritesheet:basements', 2);
        this.icon3 = this.add.image(1200, 300, 'spritesheet:basements', 4);
        
        // change size
        [this.icon1, this.icon2, this.icon3].forEach(icons => {
            icons.setScale(0.4);
        });
        
        // --------------- front --------------- //
        this.title = this.add.image(750, 100, 'image:menuTitle');
        this.startBtn = this.add.image(750, 500, 'image:startBtn').setInteractive();
        this.settingsBtn = this.add.image(750, 700, 'image:settingsBtn').setInteractive();

        //  change size
        this.title.setScale(0.8);

        // change scene if btn is clicked
        this.startBtn.on('pointerdown', () => {
            this.bgSound.stop();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            setTimeout(() => {
                this.scene.start('menu');
                this.scene.stop('home')
            }, 1000);
        })

        this.settingsBtn.on('pointerdown', () => {
            this.scene.start('settings');
        })
    }

    update() {
        btnEvent([this.startBtn, this.settingsBtn], this.clickSound, 0xffff0f)
    }
}


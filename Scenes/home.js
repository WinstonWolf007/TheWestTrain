class Home extends Phaser.Scene {
    constructor() {
        super('home');

        this.title;
        this.startBtn;
        this.settingsBtn;

        this.icon1;
        this.icon2;
        this.icon3;

        this.bgSound;
        this.clickSound;
    }

    preload() {
        // set begin value
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#ead9a7');
    
        this.load.image('title', './Assets/map-menu/menuTitle.png');
        this.load.image('start', './Assets/button/startBtn.png');
        this.load.image('settings', './Assets/button/settingsBtn.png');
        this.load.image('icon1', './Assets/basement/icon0.png');
        this.load.image('icon2', './Assets/basement/icon2.png');
        this.load.image('icon3', './Assets/basement/icon4.png');

        this.load.audio('music', './Assets/music/countryboy.mp3');
        this.load.audio('click', './Assets/music/click.wav');
    }
    
    create() {
        // music load
        this.bgSound = SoundAdd(this, 'music', 0.5, true);
        this.bgSound.play();

        this.clickSound = SoundAdd(this, 'click', 1, false);

        // --------------- back ---------------
        this.icon1 = this.add.image(200, 500, 'icon1');
        this.icon2 = this.add.image(1300, 700, 'icon2');
        this.icon3 = this.add.image(1200, 300, 'icon3');
        
        // change size
        [this.icon1, this.icon2, this.icon3].forEach(icons => {
            icons.setScale(0.6);
        });
        
        // --------------- front --------------- //
        this.title = this.add.image(750, 100, 'title');
        this.startBtn = this.add.image(750, 500, 'start').setInteractive();
        this.settingsBtn = this.add.image(750, 700, 'settings').setInteractive();
        
        //  change size
        this.title.setScale(0.8);

        // change scene if btn is clicked
        this.startBtn.on('pointerdown', () => {
            this.bgSound.stop();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            setTimeout(() => {
                this.scene.start('shop');
            }, 1000);
        })
    }

    update() {
        btnEvent([this.startBtn, this.settingsBtn], this.clickSound)
    }
}


class Title extends Phaser.Scene {
    constructor() {
        super('title')
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
    }
    
    create() {
        // init dft var
        let title;
        let startBtn;
        let settingsBtn;

        let icon1;
        let icon2;
        let icon3;

        // --------------- back ---------------
        icon1 = this.add.image(200, 500, 'icon1');
        icon2 = this.add.image(1300, 700, 'icon2');
        icon3 = this.add.image(1200, 300, 'icon3');
        
        // change size
        [icon1, icon2, icon3].forEach(icons => {
            icons.setScale(0.6)
        });
        
        // --------------- front --------------- //
        title = this.add.image(750, 100, 'title');
        startBtn = this.add.image(750, 500, 'start');
        settingsBtn = this.add.image(750, 700, 'settings');
        
        //  change size
        title.setScale(0.8);
        
        // add hover and out event
        [startBtn, settingsBtn].forEach(btn => {
        
            btn.setInteractive().on('pointerover', (e) => {
                btn.setTint(0xffff0f);
                game.canvas.style.cursor = "pointer";
            });
        
            btn.setInteractive().on('pointerout', (e) => {
                btn.setTint(0xffffff);
                game.canvas.style.cursor = "default";
            });
        
        });
    }
    
}
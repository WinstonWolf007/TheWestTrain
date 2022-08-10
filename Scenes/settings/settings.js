class Settings extends Phaser.Scene {
    constructor() {
        super("settings");
        this.bgIconX = 900;
        this.bgIconY = 200;
        this.fontTxt = "bold 50px Arial"
    }

    preload() {
        this.cameras.main.setBackgroundColor('#ead9a7');
    }

    create() {
        // ---------- Music + Sound ---------- //
        this.clickSound = SoundAdd(this, 'sound:click', false);

        // -------------- Front -------------- //
        this.btnBack = this.add.image(130, 80, "image:backBtn").setInteractive();
        this.btnBack.setScale(0.6);
        
        setDefaultVolumeIcon(this)

        this.txtMusic = this.add.text(this.bgIconX-300, this.bgIconY-25, 'Music', {font: this.fontTxt});
        this.txtSound = this.add.text(this.bgIconX-300, this.bgIconY-25+200, 'Sound', {font: this.fontTxt});

        [this.txtMusic, this.txtSound].forEach(txt => {
            txt.setTint(0x212529);
        });
        
        // Put time interval for fix bug
        this.loop = setInterval(() => {
            this.reloadClick = true;
        }, 100);
    }

    update() {
        // ---------------- Event ---------------- //
        btnEvent([this.btnBack], this.clickSound, 0xffff0f);

        this.btnBack.on('pointerdown', () => {
            clearInterval(this.loop);
            this.scene.start('home');
        })

        eventChangeVolumeIcon(this, this.volumeIconBg, 'bg');
        eventChangeVolumeIcon(this, this.volumeIconFg, 'fg');
    }
}
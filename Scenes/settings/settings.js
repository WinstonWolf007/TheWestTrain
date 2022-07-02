class Settings extends Phaser.Scene {
    setDefault() {
        this.volumeIconBg = this.add.image(this.bgIconX, this.bgIconY, 'volumeIcon', getIdxVolumeIcon('bg')).setInteractive();
        this.volumeIconBg.setScale(0.4)

        this.volumeIconFg = this.add.image(this.bgIconX, this.bgIconY+200, 'volumeIcon2', getIdxVolumeIcon('fg')).setInteractive();
        this.volumeIconFg.setScale(0.4)

        let txtMusic = this.add.text(this.bgIconX-300, this.bgIconY-25, 'Music', {font: "bold 50px Arial"})
        txtMusic.setTint(0x212529);

        let txtSound = this.add.text(this.bgIconX-300, this.bgIconY-25+200, 'Sound', {font: "bold 50px Arial"})
        txtSound.setTint(0x212529);
    }

    constructor() {
        super("settings")
        this.backBtn;
        this.clickSound;
        this.data;

        this.txt_bgVolume;
        this.txt_fgVolume;
        this.volumeIcon;
        this.reloadClick;

        this.bgIconX = 900
        this.bgIconY = 200

        this.loop;
    }

    preload() {
        this.cameras.main.setBackgroundColor('#ead9a7');
        this.load.spritesheet('volumeIcon', './Assets/Icon/volume(256X256).png', {
            frameWidth: 256, 
            frameHeight: 256
        })
        this.load.spritesheet('volumeIcon2', './Assets/Icon/volume(256X256).png', {
            frameWidth: 256, 
            frameHeight: 256
        })
        this.load.image("btnBackSet", './Assets/button/backBtn.png');
        this.load.audio('clickSet', './Assets/music/click.wav');
    }

    create() {
        this.btnBack = this.add.image(130, 80, "btnBackSet").setInteractive();
        this.btnBack.setScale(0.6)

        this.clickSound = SoundAdd(this, 'clickSet', JSON['volume']['fg'], false);
        
        this.setDefault()

        this.loop = setInterval(() => {
            this.reloadClick = true;
        }, 100)
    }

    update() {
        btnEvent([this.btnBack], this.clickSound)

        this.btnBack.on('pointerdown', () => {
            clearInterval(this.loop);
            this.scene.start('home');
        })

        this.volumeIconBg.on('pointerdown', () => {
            if (this.reloadClick) {
                updateVolume('bg');
                this.setDefault();
                this.reloadClick = false;
                this.scene.restart();
            }
        })

        this.volumeIconFg.on('pointerdown', () => {
            if (this.reloadClick) {
                updateVolume('fg');
                this.setDefault();
                this.reloadClick = false;
                this.scene.restart();
            }
        })
    }
}
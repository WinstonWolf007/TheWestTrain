class Settings extends Phaser.Scene {
    constructor() {
        super("settings")
        this.bgIconX = 900
        this.bgIconY = 200
    }

    setDefault() {
        this.volumeIconBg = this.add.image(this.bgIconX, this.bgIconY, 'spritesheet:volume', getIdxVolumeIcon('bg')).setInteractive();
        this.volumeIconBg.setScale(0.4)

        this.volumeIconFg = this.add.image(this.bgIconX, this.bgIconY+200, 'spritesheet:volume', getIdxVolumeIcon('fg')).setInteractive();
        this.volumeIconFg.setScale(0.4)

        let txtMusic = this.add.text(this.bgIconX-300, this.bgIconY-25, 'Music', {font: "bold 50px Arial"})
        txtMusic.setTint(0x212529);

        let txtSound = this.add.text(this.bgIconX-300, this.bgIconY-25+200, 'Sound', {font: "bold 50px Arial"})
        txtSound.setTint(0x212529);
    }

    preload() {
        this.cameras.main.setBackgroundColor('#ead9a7');
    }

    create() {
        this.btnBack = this.add.image(130, 80, "image:backBtn").setInteractive();
        this.btnBack.setScale(0.6)

        this.clickSound = SoundAdd(this, 'sound:click', JSON['volume']['fg'], false);
        
        this.setDefault()

        this.loop = setInterval(() => {
            this.reloadClick = true;
        }, 100)
    }

    update() {
        btnEvent([this.btnBack], this.clickSound, 0xffff0f)

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
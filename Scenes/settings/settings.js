class Settings extends Phaser.Scene {
    constructor() {
        super("settings")
        this.backBtn;
        this.clickSound;
        this.data;

        this.txt_bgVolume;
        this.txt_fgVolume;
        this.volumeIcon;
        this.reloadClick;
    }

    preload() {
        this.cameras.main.setBackgroundColor('#ead9a7');
        this.load.spritesheet('volumeIcon', './Assets/Icon/volume(256X256).png', {
            frameWidth: 256, 
            frameHeight: 256
        })
        this.load.image("btnBackSet", './Assets/button/backBtn.png');
        this.load.audio('clickSet', './Assets/music/click.wav');
    }

    create() {
        this.btnBack = this.add.image(130, 80, "btnBackSet").setInteractive();
        this.btnBack.setScale(0.6)

        this.clickSound = SoundAdd(this, 'clickSet', 0.5, false);
        
        this.volumeIconBg = this.add.image(300, 100, 'volumeIcon', getIdxVolumeIcon('bg')).setInteractive();
        setInterval(() => {
            this.reloadClick = true;
        }, 100)

        this.volumeIconBg.setScale(0.5)

        this.add.text()
    }

    update() {
        btnEvent([this.btnBack], this.clickSound)

        this.btnBack.on('pointerdown', () => {
            this.scene.start('home');
        })

        this.volumeIconBg.on('pointerdown', () => {
            if (this.reloadClick) {
                updateVolume('bg')
                this.volumeIconBg = this.add.image(300, 100, 'volumeIcon', getIdxVolumeIcon('bg')).setInteractive();
                console.log(getIdxVolumeIcon('bg'))
                this.reloadClick = false
            }
            
        })
    }
}
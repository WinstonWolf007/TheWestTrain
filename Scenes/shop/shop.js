class Shop extends Phaser.Scene {
    constructor() {
        super('shop')
        this.set;
        this.bgBar;
        this.barSound;
        this.clickSound;
        this.beginTime;
    }

    preload() {
        this.load.spritesheet("bgBar", './Assets/map-menu/shop.png', {
            frameWidth: 1200,
            frameHeight: 736
        });

        this.load.audio("barMusic", './Assets/music/psychedelic.mp3')
        this.load.audio('click', './Assets/music/click.wav')

        this.load.json('Set', './settings.json');
    }

    create() {
        this.set = this.cache.json.get('Set')
        this.physics.pause()

        this.bgBar = this.physics.add.sprite(750, 460, 'bgBar').setInteractive();
        this.bgBar.setScale(1.25);

        this.anims.create({
            key: 'iddle',
            frames: this.anims.generateFrameNumbers('bgBar', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: 1
        })

        this.barSound = this.sound.add('barMusic', {
            volume: 1,
            loop: true
        })

        this.clickSound = this.sound.add('click', {
            volume: 0.1,
            loop: false
        })

        this.barSound.play();
        
    }

    update() {
        this.bgBar.anims.play('iddle', true)

        this.bgBar.on('pointerdown', () => {
            this.clickSound.play()
        });
    }
}
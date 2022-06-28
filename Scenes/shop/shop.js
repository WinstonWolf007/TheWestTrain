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
        this.cameras.main.fadeIn(1000, 0, 0, 0);
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

        // sound add function <clickSound.js>
        this.barSound = SoundAdd(this, 'barMusic', 1, true)
        this.clickSound = SoundAdd(this, 'click', 0.1, false);

        this.barSound.play();
    }

    update() {
        this.bgBar.anims.play('iddle', true)

        this.bgBar.on('pointerdown', () => {
            this.clickSound.play()
        });
    }
}
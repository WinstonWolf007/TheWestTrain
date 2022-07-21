class Battle extends Phaser.Scene {
    constructor() {
        super('battle')
    }

    preload() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        // ----- Image ----- //
        this.map = this.physics.add.sprite(0, 0, 'spritesheet:battleMap').setInteractive().setOrigin(0, 0);
        
        this.enemy = this.physics.add.sprite(1200, 700, 'spritesheet:battleEntity', 0).setInteractive()
        this.enemy.flipX = true;

        this.player = this.physics.add.sprite(300, 700, 'spritesheet:battleEntity', 2).setInteractive()

        // ----- Animation ----- //
        this.anims.create({
            key: 'iddle',
            frames: this.anims.generateFrameNumbers('spritesheet:battleMap', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.map.anims.play('iddle');
    
        this.input.keyboard.on('keydown-SPACE', () => {
            this.player.setTexture('spritesheet:battleEntity', 3)
            setTimeout(() => {
                this.player.setTexture('spritesheet:battleEntity', 2)
            }, 500)
        })
    }
}
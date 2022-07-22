class Battle extends Phaser.Scene {
    constructor() {
        super('battle')
    }

    preload() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        // ----- Music + Sound ----- //
        this.music1 = SoundAdd(this, 'music:aspire', JSON['volume']['bg'], true)
        this.music1.play()

        this.gunShoot2 = SoundAdd(this, 'sound:gunShoot2', JSON['volume']['fg'], false);

        // ----- Image ----- //
        this.map = this.physics.add.sprite(0, 0, 'spritesheet:battleMap').setOrigin(0, 0);
        
        this.enemy = this.physics.add.sprite(1200, 700, 'spritesheet:battleEntity', 0)
        this.enemy.flipX = true;

        this.player = this.physics.add.sprite(300, 700, 'spritesheet:battleEntity', 3).setActive(false).setVisible(false)
        
        this.deathE = this.physics.add.sprite(1200, 700, 'spritesheet:deathEntity', 0).setActive(false).setVisible(false)

        this.iddleP = this.physics.add.sprite(300, 700, 'spritesheet:iddleEntity', 2);
        
        // ----- Health bar player and enemy ----- //
        let x1 = 140
        let x2 = 1040
        let y = 400
        let bgHealthPlayer = this.add.graphics();
        let fgHealthPlayer = this.add.graphics();
        let bgHealthEnemy = this.add.graphics();
        let fgHealthEnemy = this.add.graphics();
        
        bgHealthPlayer.fillStyle(0x222222, 0.8);
        bgHealthPlayer.fillRect(x1, y, 300, 30);
        fgHealthPlayer.fillStyle(0x4ADBD1, 0.8);
        fgHealthPlayer.fillRect(x1, y, 300, 30);

        bgHealthEnemy.fillStyle(0x222222, 0.8);
        bgHealthEnemy.fillRect(x2, y, 300, 30);
        fgHealthEnemy.fillStyle(0x4ADBD1, 0.8);
        fgHealthEnemy.fillRect(x2, y, 300, 30);

        // ----- Animation ----- //
        this.anims.create({
            key: 'iddleBG',
            frames: this.anims.generateFrameNumbers('spritesheet:battleMap', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'deathE',
            frames: this.anims.generateFrameNumbers('spritesheet:deathEntity', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'iddleP',
            frames: this.anims.generateFrameNumbers('spritesheet:iddleEntity', { start: 2, end: 3 }),
            frameRate: 1,
            repeat: -1
        })

        this.map.anims.play('iddleBG');
        this.iddleP.play('iddleP')
        
        // ----- Key board Event ----- //
        this.input.keyboard.on('keydown-SPACE', () => {
            this.gunShoot2.play()
            enemyHealth -= 20;
            this.player.setActive(true).setVisible(true)
            this.iddleP.setActive(false).setVisible(false)
            fgHealthEnemy.clear();
            fgHealthEnemy.fillStyle(0x4ADBD1, 0.8);
            fgHealthEnemy.fillRect(x2, y, enemyHealth*3, 30);
            if (enemyHealth < 1) {
                this.enemy.setActive(false).setVisible(false);
                this.deathE.setActive(true).setVisible(true);
                this.deathE.flipX = true;
                this.deathE.anims.play('deathE');

                // setTimeout(() => {
                //     this.cameras.main.fadeOut(1000, 0, 0, 0);
                // }, 1000)
                
                // setTimeout(() => {
                //     this.scene.start('home')
                //     this.scene.stop('battle')
                // }, 1000)
            }

            setTimeout(() => {      
                setTimeout(() => {
                    this.player.setActive(false).setVisible(false)
                    this.iddleP.setActive(true).setVisible(true)
                }, 100)
            }, 500)
        })
    }
}
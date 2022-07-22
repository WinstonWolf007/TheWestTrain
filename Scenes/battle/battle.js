class Battle extends Phaser.Scene {
    constructor() {
        super('battle');
    }

    preload() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        // ----- Key code ----- //
        this.K_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.K_enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)

        // ----- game load loop ----- //
        this.gunLoad   = true;
        this.enterLoad = true;
        this.spaceLOad = true;
        this.titleGame = false;

        this.intervalGunLoad = setInterval(() => {
            this.gunLoad   = true; 
            this.enterLoad = true;
            this.spaceLOad = true;
        }, 1000)

        // ----- Game ----- //
        this.gameLoad = false

        // ----- Music + Sound ----- //
        SoundAdd(this, 'music:irreducible', true).play();

        this.gunShoot2  = SoundAdd(this, 'sound:gunShoot2', false);
        this.deathSound = SoundAdd(this, 'sound:electricity', false);
        this.badShoot = SoundAdd(this, 'sound:badShoot', false);

        // ----- Image ----- //
        this.map          = this.physics.add.sprite(0, 0, 'spritesheet:battleMap').setOrigin(0, 0);

        this.enemy        = this.physics.add.sprite(1200, 700, 'spritesheet:battleEntity', 0).setActive(false).setVisible(false);
        this.deathE       = this.physics.add.sprite(1200, 700, 'spritesheet:deathEntity', 0).setActive(false).setVisible(false);
        this.iddleE       = this.physics.add.sprite(1200, 700, 'spritesheet:iddleEntity', 0);
        this.enemy.flipX  = true;
        this.iddleE.flipX = true;
        this.deathE.flipX = true;

        this.player       = this.physics.add.sprite(300, 700, 'spritesheet:battleEntity', 3).setActive(false).setVisible(false);
        this.iddleP       = this.physics.add.sprite(300, 700, 'spritesheet:iddleEntity', 2);
        this.deathP       = this.physics.add.sprite(300, 700, 'spritesheet:deathEntity', 7).setActive(false).setVisible(false);

        // ----- Health bar player and enemy ----- //
        this.x1             = 140;
        this.x2             = 1040;
        this.y              = 400;
        this.bgHealthPlayer = this.add.graphics();
        this.fgHealthPlayer = this.add.graphics();
        this.bgHealthEnemy  = this.add.graphics();
        this.fgHealthEnemy  = this.add.graphics();
        this.Edeath         = false;
        this.Pdeath         = false;
        
        this.bgHealthPlayer.fillStyle(0x222222, 0.8);
        this.bgHealthPlayer.fillRect(this.x1, this.y, 300, 30);
        this.fgHealthPlayer.fillStyle(0x4ADBD1, 0.8);
        this.fgHealthPlayer.fillRect(this.x1, this.y, 300, 30);
        
        this.bgHealthEnemy.fillStyle(0x222222, 0.8);
        this.bgHealthEnemy.fillRect(this.x2, this.y, 300, 30);
        this.fgHealthEnemy.fillStyle(0x4ADBD1, 0.8);
        this.fgHealthEnemy.fillRect(this.x2, this.y, 300, 30);
        
        // ----- Shoot Game ----- //
        this.startShootGame = false;

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
            key: 'deathP',
            frames: this.anims.generateFrameNumbers('spritesheet:deathEntity', { start: 7, end: 14 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'iddleP',
            frames: this.anims.generateFrameNumbers('spritesheet:iddleEntity', { start: 2, end: 3 }),
            frameRate: 1,
            repeat: -1
        })

        this.anims.create({
            key: 'iddleE',
            frames: this.anims.generateFrameNumbers('spritesheet:iddleEntity', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        })

        this.map.anims.play('iddleBG');
        this.iddleP.play('iddleP');
        this.iddleE.play('iddleE');

        // ----- Txt ----- //
        this.infoTxt = this.add.text(380, 200, '', {fontSize: 50, fontFamily: 'pixelMoney'});
        this.timeTxt = this.add.text((1500-100)/2, 200, '', {fontSize: 100, fontFamily: 'pixelMoney'});
        
        this.titleGame = true;
    }


    ShootGame() {
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.spaceLOad) {
                if (!this.startShootGame && this.enterLoad && this.gameLoad) {
                    this.iddleP.setActive(false).setVisible(false);
                    this.player.setActive(true).setVisible(true);

                    this.gunShoot2.play()

                    setTimeout(() => {
                        this.badShoot.play()
                    }, 100)

                    setTimeout(() => {      
                        this.player.setActive(false).setVisible(false);
                        this.iddleP.setActive(true).setVisible(true);
                    }, 500)

                    this.startShootGame = false
                    this.enterLoad = false;
                    this.gunLoad = false;
                    this.gameLoad = false;
                }
                else if (!this.Edeath && this.gunLoad && this.startShootGame) {
                    this.gunShoot2.play();
    
                    enemyHealth -= 50;
    
                    this.fgHealthEnemy.clear();
                    this.fgHealthEnemy.fillStyle(0x4ADBD1, 0.8);
                    this.fgHealthEnemy.fillRect(this.x2, this.y, enemyHealth*3, 30);
    
                    this.iddleP.setActive(false).setVisible(false);
                    this.player.setActive(true).setVisible(true);
                    
    
                    if (enemyHealth < 1) {
                        this.deathSound.play()
    
                        this.iddleE.setActive(false).setVisible(false);
                        this.deathE.setActive(true).setVisible(true);
    
                        this.deathE.anims.play('deathE');
    
                        this.Edeath = true;

                        this.infoTxt.text = "Player Win !!"
                    }
    
                    setTimeout(() => {      
                        this.player.setActive(false).setVisible(false);
                        this.iddleP.setActive(true).setVisible(true);
                    }, 500)
    
                    this.gunLoad = false;
                    this.startShootGame = false;
                    this.gameLoad = false;
                } 
                setTimeout(() => {
                    this.timeTxt.text = ""
                    this.infoTxt.text = ""
                    this.startShootGame = false
                    this.titleGame = true
                }, 2000)

                this.spaceLOad = false
            }
            
        })
    }

    chrono() {
        // ----- Tick Sound ----- //
        this.s321 = SoundAdd(this, 'sound:321', false);
        this.sGo = SoundAdd(this, 'sound:go', false)

        // ----- Time Txt ----- //
        this.timeTxt.text = "3"
        this.timeTxt.setTint(0xff0000)
        this.s321.play()

        setTimeout(() => {
            this.timeTxt.text = "2"
            this.timeTxt.setTint(0xff0000)
            this.s321.play()
            setTimeout(() => {
                this.timeTxt.text = "1"
                this.timeTxt.setTint(0xff0000)
                this.s321.play()
                setTimeout(() => {
                    this.startShootGame = true
                    this.timeTxt.text = ">"
                    this.timeTxt.setTint(0x00ff00)
                    this.sGo.play()
                    setTimeout(() => {
                        this.timeTxt.text = ""
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    }

    loadTitleGame() {
        // ----- title ----- //
        if (this.titleGame && !this.Pdeath && !this.Edeath) {
            this.infoTxt.text = "Press SHIFT button"
            if (this.K_enter.isDown) {
                if (!this.startShootGame) {
                    this.infoTxt.text = "";
                    this.chrono()
                    this.gameLoad = true;
                    this.titleGame = false;
                }
            }
        } 
    }

    update() {
        this.loadTitleGame()
        this.ShootGame()
    }
}
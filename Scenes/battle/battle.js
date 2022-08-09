class Battle extends Phaser.Scene {
    constructor() {
        super('battle');
    }

    preload() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        // ----- Enemy Capacity ----- //
        let enemyCapacity = {
            'health': enemyHealth,
            'weapon': ItemsShopCapacity[Math.floor(Math.random() * 3)]
        }

        // ----- Music + Sound ----- //
        this.musicScene = SoundAdd(this, 'music:irreducible', true);
        this.gunShoot1  = SoundAdd(this, 'sound:gunShoot1', false);
        this.gunShoot2  = SoundAdd(this, 'sound:gunShoot2', false);
        this.gunShoot3  = SoundAdd(this, 'sound:gunShoot3', false);
        this.deathSound = SoundAdd(this, 'sound:electricity', false);
        this.badShoot   = SoundAdd(this, 'sound:badShoot', false);

        this.musicScene.play();
        
        // ----- Key code ----- //
        this.K_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.K_enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // ----- action ----- //
        this.alreadyFire  = false;
        this.endChrono    = true;
        this.inShootRound = false;

        // ----- boleen key loop ----- //
        this.spaceKeyLoad = true;
        this.shiftKeyLoad = true;

        this.interval = setInterval(() => {
            this.spaceKeyLoad = true;
            this.shiftKeyLoad = true;
        }, 1000 );

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
        
        // ----- Animation ----- //
        // background image animation
        this.anims.create({
            key: 'iddleBG',
            frames: this.anims.generateFrameNumbers('spritesheet:battleMap', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        // death enemy animation
        this.anims.create({
            key: 'deathE',
            frames: this.anims.generateFrameNumbers('spritesheet:deathEntity', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0
        });

        // death player animation
        this.anims.create({
            key: 'deathP',
            frames: this.anims.generateFrameNumbers('spritesheet:deathEntity', { start: 7, end: 14 }),
            frameRate: 10,
            repeat: 0
        });

        // iddle player animation
        this.anims.create({
            key: 'iddleP',
            frames: this.anims.generateFrameNumbers('spritesheet:iddleEntity', { start: 2, end: 3 }),
            frameRate: 1,
            repeat: -1
        });

        //  iddle enemy animation
        this.anims.create({
            key: 'iddleE',
            frames: this.anims.generateFrameNumbers('spritesheet:iddleEntity', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.map.anims.play('iddleBG');
        this.iddleP.play('iddleP');
        this.iddleE.play('iddleE');

        // ----- Txt ----- //
        this.infoTxt   = this.add.text(450, 150, '', {fontSize: 50, fontFamily: 'pixelMoney'});
        this.timeTxt   = this.add.text((1500-100)/2, 200, '', {fontSize: 100, fontFamily: 'pixelMoney'});
        this.titleGame = true;
    }


    shoot(target) {
        if (target == 'player') {
            // play gun music
            [this.gunShoot1, this.gunShoot2, this.gunShoot3][itemsSelect].play()
            
            // remove enemy health
            if ((enemyHealth-ItemsShopCapacity[itemsSelect][2]*10) < 0) {
                enemyHealth = 0
            }
            else {
                enemyHealth -= ItemsShopCapacity[itemsSelect][2]*10;
            }

            // update health bar
            this.fgHealthEnemy.clear();
            this.fgHealthEnemy.fillStyle(0x4ADBD1, 0.8);
            this.fgHealthEnemy.fillRect(this.x2, this.y, enemyHealth*3, 30);

            // change player animation (iddle to shoot)
            this.iddleP.setActive(false).setVisible(false);
            this.player.setActive(true).setVisible(true);
            
            // kill enemy and change scene if enemy health is < 1
            if (enemyHealth < 1) {
                this.deathSound.play();

                this.iddleE.setActive(false).setVisible(false);
                this.deathE.setActive(true).setVisible(true);

                this.deathE.anims.play('deathE');

                this.Edeath = true;
                
                // chnage scene with a fade effect
                setTimeout(() => {
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    setTimeout(() => {
                        this.musicScene.stop();
                        this.scene.start('map');
                        this.scene.stop('battle');
                    }, 1000);
                }, 2000)
                
            }

            // change player animation (shoot to iddle)
            setTimeout(() => {      
                this.player.setActive(false).setVisible(false);
                this.iddleP.setActive(true).setVisible(true);
            }, 500);
        }
    }


    ShootGame() {
        this.input.keyboard.on('keydown-SPACE', () => {

            if (this.spaceKeyLoad) {

                this.spaceKeyLoad = false;

                if (this.inShootRound) {

                    if (!this.alreadyFire) {

                        this.alreadyFire = true;

                        //alert(this.endChrono)

                        if (!this.endChrono) {
                            this.endChrono = false
                            this.iddleP.setActive(false).setVisible(false);
                            this.player.setActive(true).setVisible(true);
    
                            this.gunShoot2.play();
    
                            setTimeout(() => {
                                this.badShoot.play();
                            }, 100);
    
                            setTimeout(() => {      
                                this.player.setActive(false).setVisible(false);
                                this.iddleP.setActive(true).setVisible(true);
                            }, 500);
                        }

                        else if (this.endChrono){
                            this.shoot('player')
                        }

                        this.inShootRound = false;
                    }
                }
            }
        })
    }
    chrono() {
        // ----- Tick Sound ----- //
        this.inShootRound = true;
        this.endChrono = false;

        this.s321 = SoundAdd(this, 'sound:321', false);

        // ----- Chrono system ----- //
        const time_loops   = randint(3, 5);
        let time_delay     = randint(400, 1000);
        const time_delay_2 = time_delay;

        for(let i=time_loops; i>=0; i--) {
            if(i>0) {
                setTimeout(() => {
                    this.timeTxt.text = i.toString();
                    this.timeTxt.setTint(0xf26419);
                    this.s321.play();
                }, time_delay);

                time_delay += time_delay_2;
            }
            else {
                setTimeout(() => {
                    this.timeTxt.text = '>';
                    this.timeTxt.setTint(0x758e4f);
                }, time_delay);

                time_delay += time_delay_2;

                setTimeout(() => {
                    this.timeTxt.text = '';
                }, time_delay);

                this.endChrono = true;
            }
        }
    }

    // shift title section
    loadTitleGame() {
        if (this.endChrono && !this.inShootRound) {

            this.infoTxt.text = "Press SHIFT button";
            this.infoTxt.setTint(0x834b36);

            if (this.K_enter.isDown) {
                this.infoTxt.text = "";
                this.chrono();

                // reset var
                this.alreadyFire = false;
            }
        }

        else {
            this.ShootGame()
        }
    }

    update() {
        console.log(this.endChrono)
        this.loadTitleGame();
    }
}
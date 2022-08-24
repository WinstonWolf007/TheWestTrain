class Battle extends Phaser.Scene {
    constructor() {
        super('battle');
    }

    preload() {
        // ------ money earned in the game + message ----- //
        this.moneyEarned = Math.floor(Math.random() * 10)+1
        this.earnMoneyMessage = new Score(this, `You have earned $${this.moneyEarned} !!!`);

        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        // ----- Reaction time of the enemy ----- //
        this.enemyReaction = enemyReact();
        this.enemyShoot = false;
        this.enemyShootBool = false;

        // ----- Music + Sound ----- //
        this.musicScene = SoundAdd(this, 'music:irreducible', true);

        this.gunShoot = SoundAdd(this, ['sound:gunShoot1', 'sound:gunShoot2', 'sound:gunShoot3'][itemsSelect], false);
        this.deathSound = SoundAdd(this, 'sound:electricity', false);
        this.badShoot   = SoundAdd(this, 'sound:badShoot', false);

        this.gunShootE = SoundAdd(this, 'sound:gunShoot1', false);

        this.musicScene.play();
        
        // ----- Key code ----- //
        this.K_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.K_enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // ----- action ----- //
        this.playerBadShoot = false;
        this.alreadyFire    = false;
        this.endChrono      = true;
        this.inShootRound   = false;
        this.endGame        = false;

        // ----- boleen key loop ----- //
        this.spaceKeyLoad = true;
        this.shiftKeyLoad = true;

        this.interval = setInterval(() => {
            this.spaceKeyLoad = true;
            this.shiftKeyLoad = true;
        }, 1000 );

        // ----- Image ----- //
        this.map          = this.physics.add.sprite(0, 0, 'spritesheet:battleMap').setOrigin(0, 0);

        this.enemy        = this.physics.add.sprite(1200, 700, 'spritesheet:battleEntity', 1).setActive(false).setVisible(false);
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

        // ----- Pop Pop message ----- //
        this.earnMoneyMessage.add()
    }

    update() {
        start(this);

        if(this.endGame) {
            this.earnMoneyMessage.loop(100, 3);
        }
    }
}
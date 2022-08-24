class Mine1 extends Phaser.Scene {
    constructor() {
        super('mine1');
        this.startGame = false;
        this.screenEffect = true;
        this.resetKey = true;
    }

    create() {
        // ----- [KEY] ----- //
        this.keyE = this.input.keyboard.addKey('E');
        this.intervalKey = setInterval(() => {
            this.resetKey = true;
        }, 1000)

        // ----- [MUSIC] ----- //
        this.bgMusic = SoundAdd(this, 'music:darkCave', true);
        this.bgMusic.play()

        // ----- [SOUND] ----- //
        this.playerfallImpactSound = SoundAdd(this, 'sound:fallImpact', false);
        this.mineEntitySpeakSound1 = SoundAdd(this, 'sound:mineEntitySpeak1', false);
        this.mineEntitySpeakSound2 = SoundAdd(this, 'sound:mineEntitySpeak2', false);
        this.mineEntitySpeakSound3 = SoundAdd(this, 'sound:mineEntitySpeak3', false);

        // ----- [IMAGE] ----- //
        this.add.image(0, 0, 'image:bgMine').setOrigin(0, 0);
        this.add.image(100, 0, 'image:ladder').setOrigin(0, 0);

        // ----- [SPRITE] ----- //
        this.mineEntity = this.add.sprite(800, 600, 'spritesheet:mineEntity', 0).setInteractive();
        this.mineEntity.setScale(1.2);

        this.player = this.add.sprite(160, -200, 'spritesheet:playerFall', 0);
        this.playerIddle = this.add.sprite(160, 550, 'spritesheet:iddleEntity', 2).setVisible(false);
        
        // ----- [ANIMS] ----- //
        this.anims.create({
            key: 'fallplayer',
            frames: this.anims.generateFrameNumbers('spritesheet:playerFall', { start: 0, end: 4 }),
            frameRate: 4,
            repeat: 0
        });

        this.anims.create({
            key: 'iddlePlayer',
            frames: this.anims.generateFrameNumbers('spritesheet:iddleEntity', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'iddleMineEntity',
            frames: this.anims.generateFrameNumbers('spritesheet:mineEntity', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        })

        this.player.anims.play('fallplayer');
        this.mineEntity.play('iddleMineEntity')
        this.playerIddle.play('iddlePlayer')

        this.entryMineMessage = new Score(this, 'You are in a mine')
        this.entryMineMessage.add()

        this.keyE.on('down', () => {
            if (this.resetKey) {
                let sound = [this.mineEntitySpeakSound1, this.mineEntitySpeakSound2, this.mineEntitySpeakSound3][Math.floor(Math.random() * 3)]
                sound.play() 
            }
            this.resetKey = false;
        });
        //keyE.on('up', () => {});


        // ----- [TEXT] ----- //
        this.mineCallEventText = this.add.text(720, 450, '', {fontSize: 30, fontFamily: 'pixelMoney'})


        // ----- [EVENT] ------ //
        this.mineEntity.on('pointerover', () => {
            this.mineCallEventText.text = "press 'E'"
            setCursor('pointer')
        })

        this.mineEntity.on('pointerout', () => {
            this.mineCallEventText.text = '';
            setCursor('default');
        })
    }
    
    update() {
        if (this.player.y < 550) {
            this.player.y += 10;
            if (this.player.y == 540) {
                this.playerfallImpactSound.play()
            }
        }
        else if (this.screenEffect) {
            this.screenEffect = false;
            this.cameras.main.shake(200);
            this.player.setTexture('spritesheet:playerFall', 0)
        }
        else if (!this.screenEffect) {
            this.entryMineMessage.loop(100, 3);

            setTimeout(() => { 
                this.player.setActive(false).setVisible(false);
                this.playerIddle.setVisible(true);
            }, 1000);
        }
    }

}
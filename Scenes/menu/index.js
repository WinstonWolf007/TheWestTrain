class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
        this.lightOpen = false;
        this.reloadClick = true;
    }

    callback() {
        this.reloadClick = true;
    }


    preload() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        this.physics.pause()
        this.timer = setInterval(() => {
            this.callback();
        }, 100)

        // -------------- Music + Sound ------------- //
        this.clickSound = SoundAdd(this, 'sound:click', false);
        this.bgMusic = SoundAdd(this, 'music:drone-9708', true);
        this.bgMusic = SoundAdd(this, 'music:drone-9708')
        this.bizzSound = SoundAdd(this, 'sound:electricity', false);
        this.smallBizzSound = SoundAdd(this, 'sound:smallElectricity', false);
        
        this.bgMusic.play();

        // --------------- Animation --------------- // 
        this.anims.create({
            key: 'animsScreenData',
            frames: this.anims.generateFrameNumbers('spritesheet:menuScreenData', { start: 0, end: 6 }),
            frameRate: 5,
            repeat: 1
        });

        this.anims.create({
            key: 'animsScreenTitle',
            frames: this.anims.generateFrameNumbers('spritesheet:titleScreenData', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 1
        });

        // -------------------------- Image -------------------- //
        this.bg              = this.add.image(750, 460, 'image:bgMenu')
        this.iconChestCode   = this.add.image(850, 300, 'spritesheet:menuChest', 0).setInteractive();
        this.btnShop         = this.add.image(650, 750, 'spritesheet:menuBtn', 0).setInteractive();
        this.btnMap          = this.add.image(950, 750, 'spritesheet:menuBtn', 1).setInteractive();
        this.btnInfo         = this.add.image(1250, 750, 'spritesheet:menuBtn', 2).setInteractive();

        this.iconScreenData  = this.physics.add.sprite(335, 125, 'spritesheet:menuScreenData', 0).setInteractive();
        this.iconScreenTitle = this.physics.add.sprite(1270, 365, 'spritesheet:titleScreenData', 0).setInteractive();

        this.btnBack         = this.add.image(130, 80, "image:backBtn").setInteractive();

        [this.bg, this.iconChestCode, this.iconScreenData, this.iconScreenTitle, this.btnShop, this.btnMap, this.btnInfo].forEach(items => {
            items.setScale(1.25);
        });

        this.btnBack.setScale(0.6)

        // ---------- Event ---------- //
        setLightBtn(this, 0);

        btnEvent([this.btnBack, this.iconChestCode, this.btnShop, this.btnMap, this.btnInfo], this.clickSound, 0xffff0f);
        
        this.btnBack.on('pointerdown', () => {
            this.scene.start('home')
            this.bgMusic.pause();
        })
        this.btnShop.on('pointerdown', () => {
            startScene(this, 'shop');
            this.bgMusic.pause()
        })

        this.btnMap.on('pointerdown', () => {
            startScene(this, 'map');
            this.bgMusic.pause()
        })

        this.iconScreenData.on('pointerdown', () => {
            if (this.reloadClick && this.lightOpen) {
                this.reloadClick = false;
                let el = [this.bizzSound, this.smallBizzSound][Math.floor(Math.random() * 2)];
                el.play();
            }
        })
    
        this.iconScreenTitle.on('pointerdown', () => {
            if (this.reloadClick && this.lightOpen) {
                this.reloadClick = false;
                let el = [this.bizzSound, this.smallBizzSound][Math.floor(Math.random() * 2)];
                el.play();
            }
        })
    }

    update() {
        this.iconLightBtn.on('pointerup', () => {
            if (this.reloadClick) {
                this.clickSound.play()
                this.reloadClick = false;
                this.iconLightBtn.destroy();

                if (this.lightOpen) {
                    this.lightOpen = false;
                    setLightBtn(this, 0);
                } else {
                    this.lightOpen = true;  
                    setLightBtn(this, 1);
                }
            }
        })

        if (this.lightOpen) {
            this.iconScreenData.anims.play("animsScreenData", true);
            this.iconScreenTitle.anims.play('animsScreenTitle', true);
            changeColorAll(this, true);
        } else {
            changeColorAll(this, false);
        }
    }
}
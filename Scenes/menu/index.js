class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
        this.lightOpen = false;
        this.reloadClick = true;
    }

    setLightBtn(num) {
        this.iconLightBtn = this.add.image(180, 530, 'spritesheet:menuLight', num).setInteractive()
        this.iconLightBtn.setScale(1.25)
    }

    changeColorAll(bool) {
        let color;
        let color2;
        if (bool) {
            color = 0xffffff;
            color2 = 0xffffff;
        } else {
            color = 0x3b3b3b;
            color2 = 0xb1b1b1;
        }

        [this.bg, this.btnInfo, this.btnMap, this.btnShop, this.iconChestCode, this.iconScreenData, this.iconScreenTitle].forEach(e => {
            e.setTint(color);
            this.iconLightBtn.setTint(color2)
        });
        
    }

    create() {
        // animation
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
        this.physics.pause()

        this.clickSound = SoundAdd(this, 'sound:click', JSON['volume']['fg'], false);
        this.bgMusic = SoundAdd(this, 'music:drone-9708', JSON['volume']['bg'], true);
        this.bgMusic.play()

        // Img
        this.bg = this.add.image(750, 460, 'image:bgMenu')
        this.bg.setScale(1.25)
        
        this.iconChestCode = this.add.image(850, 300, 'spritesheet:menuChest', 0).setInteractive()
        this.iconChestCode.setScale(1.25)

        this.setLightBtn(0)

        this.iconScreenData = this.physics.add.sprite(335, 125, 'spritesheet:menuScreenData', 0)
        this.iconScreenData.setScale(1.25)

        this.iconScreenTitle = this.physics.add.sprite(1270, 365, 'spritesheet:titleScreenData', 0)
        this.iconScreenTitle.setScale(1.25)

        this.btnShop = this.add.image(650, 750, 'spritesheet:menuBtn', 0).setInteractive()
        this.btnShop.setScale(1.25)

        this.btnMap = this.add.image(950, 750, 'spritesheet:menuBtn', 1).setInteractive()
        this.btnMap.setScale(1.25)

        this.btnInfo = this.add.image(1250, 750, 'spritesheet:menuBtn', 2).setInteractive()
        this.btnInfo.setScale(1.25)

        this.loop = setInterval(() => {
            this.reloadClick = true;
        }, 100)
    }

    update() {
        this.iconScreenData.anims.play("animsScreenData", true);
        this.iconScreenTitle.anims.play('animsScreenTitle', true);
        btnEvent([
            this.iconChestCode,
            this.iconLightBtn,
            this.btnShop,
            this.btnMap,
            this.btnInfo], this.clickSound, 0xf0ffff)

        this.btnShop.on('pointerdown', () => {
            clearInterval(this.loop);
            this.bgMusic.stop()
            this.scene.start('shop')
            this.scene.stop('menu')
        })
        
        this.iconLightBtn.on('pointerdown', () => {
            if (this.reloadClick) {
                this.reloadClick = false;

                if (this.lightOpen) {
                    this.lightOpen = false;
                    this.iconLightBtn.destroy();
                    this.setLightBtn(0);
                } 
                
                else {
                    this.lightOpen = true;
                    this.iconLightBtn.destroy();
                    this.setLightBtn(1);
                }
            }
        })

        if (this.lightOpen) {
            this.changeColorAll(true);
        } else {
            this.changeColorAll(false)
        }
    }
}
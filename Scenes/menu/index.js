class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
        this.lightOpen = false;
        this.reloadClick = true;
    }

    SetLightBtn(num) {
        this.iconLightBtn = this.add.image(180, 530, 'spritesheet:menuLight', num).setInteractive()
        this.iconLightBtn.setScale(1.25)
    }

    ChangeColorAll(bool) {
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
        this.physics.pause()

        // -------------- Music + Sound ------------- //
        this.clickSound = SoundAdd(this, 'sound:click', JSON['volume']['fg'], false);
        this.bgMusic = SoundAdd(this, 'music:drone-9708', JSON['volume']['bg'], true);
        this.bizzSound = SoundAdd(this, 'sound:electricity', JSON['volume']['fg'], false);
        this.smallBizzSound = SoundAdd(this, 'sound:smallElectricity', JSON['volume']['fg'], false)
        this.metalEchoSound = SoundAdd(this, 'sound:metalEcho', JSON['volume']['fg'], false)
        this.metalHardSound = SoundAdd(this, 'sound:metalHard', JSON['volume']['fg'], false)

        this.bgMusic.play()

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

        // -------------------------- Front -------------------- //
        this.bg = this.add.image(750, 460, 'image:bgMenu')
        this.iconChestCode = this.add.image(850, 300, 'spritesheet:menuChest', 0).setInteractive();
        this.iconScreenData = this.physics.add.sprite(335, 125, 'spritesheet:menuScreenData', 0).setInteractive();
        this.iconScreenTitle = this.physics.add.sprite(1270, 365, 'spritesheet:titleScreenData', 0).setInteractive();
        this.btnShop = this.add.image(650, 750, 'spritesheet:menuBtn', 0).setInteractive();
        this.btnMap = this.add.image(950, 750, 'spritesheet:menuBtn', 1).setInteractive();
        this.btnInfo = this.add.image(1250, 750, 'spritesheet:menuBtn', 2).setInteractive();

        [this.bg, this.iconChestCode, this.iconScreenData, this.iconScreenTitle, this.btnShop, this.btnMap, this.btnInfo].forEach(items => {
            items.setScale(1.25);
        });

        this.SetLightBtn(0);

        // this.timer = this.time.addEvent({
        //     delay: 200,           
        //     callback: this.callback,
        //     loop: true
        // });
        this.timer = setInterval(() => {
            this.callback()
        }, 100)
    }

    callback() {
        this.reloadClick = true;
        console.log('True')
    }

    update() {
        btnEvent([this.iconLightBtn], this.clickSound, 0xf0ffff)

        if (this.lightOpen) {
            this.iconScreenData.anims.play("animsScreenData", true);
            this.iconScreenTitle.anims.play('animsScreenTitle', true);

            btnEvent([
                this.iconChestCode,
                this.btnShop,
                this.btnMap, 
                this.btnInfo],
            this.clickSound, 0xf0ffff)

            this.btnShop.on('pointerdown', () => {
                //this.timer.remove();
                clearInterval(this.timer)
                this.bgMusic.stop()
                this.lightOpen = false;
                this.scene.start('shop')
                this.scene.stop('menu')
            })
            this.iconScreenData.on('pointerdown', () => {
                if (this.reloadClick) {
                    this.reloadClick = false;
                    let el = [this.bizzSound, this.smallBizzSound][Math.floor(Math.random() * 2)];
                    console.log(el)
                    el.play();
                }
            })
    
            this.iconScreenTitle.on('pointerdown', () => {
                if (this.reloadClick) {
                    this.reloadClick = false;
                    let el = [this.bizzSound, this.smallBizzSound][Math.floor(Math.random() * 2)];
                    console.log(el)
                    el.play();
                }
            })
        }
        
        
        this.iconLightBtn.on('pointerdown', () => {
            if (this.reloadClick) {
                this.reloadClick = false;

                if (this.lightOpen) {
                    this.lightOpen = false;
                    this.iconLightBtn.destroy();
                    this.SetLightBtn(0);
                } 
                
                else {
                    this.lightOpen = true;
                    this.iconLightBtn.destroy();
                    this.SetLightBtn(1);
                }
            }
        })


        if (this.lightOpen) {
            this.ChangeColorAll(true);
        } else {
            this.ChangeColorAll(false);
        }
    }
}
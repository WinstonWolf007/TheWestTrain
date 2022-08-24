class Map extends Phaser.Scene {
    constructor() {
        super('map')
        this.size = 0.2
    }

    preload() {
        this.cameras.main.setBackgroundColor('#ead9a7');
    }

    create() {
        let position = {
            'b1': [
                [400, 100],
                [930, 400],
                [800, 800]
            ],
            'b2': [
                [1190, 650],
                [120, 700],
                [1000, 100]
            ],
            'b3': [
                [1400, 150],
                [700, 250],
                [500, 700]
            ]
        };

        let basements = {
            'b1': [],
            'b2': [],
            'b3': []
        };

        let basement_idx = -1

        // ----- [IMAGE ~ MAP] ----- //
        this.map1 = this.physics.add.sprite(1200, 700, 'spritesheet:map1', 0).setInteractive();
        this.map2 = this.physics.add.sprite(0, 0, 'spritesheet:map2', 0).setOrigin(0, 0).setInteractive();
        this.map3 = this.physics.add.sprite(0, 530, 'spritesheet:map3', 0).setOrigin(0, 0).setInteractive();
        
        this.map1.setScale(1.3);

        // ----- [IMAGE ~ BASEMENT] ----- //
        this.basement1 = this.physics.add.sprite(800, 800, 'spritesheet:basements', 0).setInteractive();
        this.basement1.setScale(0.2);

        for (let b of ['b1', 'b2', 'b3']) {
            let start_img = 0;
            let end_img = 0;


            if (basement_idx != 3) {
                start_img = basement_idx+1;
                end_img = basement_idx+2;
            }
            else {
                start_img = basement_idx+2;
                end_img = basement_idx+3;
            }
            

            this.anims.create({
                key: 'iddle'+b,
                frames: this.anims.generateFrameNumbers('spritesheet:basements', { start: start_img, end: end_img }),
                frameRate: 2,
                repeat: -1
            });
        
            for (let el of position[b]) {
                let b_sprite = this.physics.add.sprite(el[0], el[1], 'spritesheet:basements', start_img).setInteractive();
    
                b_sprite.setScale(0.25);
                b_sprite.anims.play('iddle'+b);
                b_sprite.setTint(0x303030);

                b_sprite.on('pointerover', () => {
                    setCursor('pointer')
                    b_sprite.setTint(0x404040);

                });

                b_sprite.on('pointerout', () => {
                    setCursor('default')
                    b_sprite.setTint(0x000000);
                });
    
                basements[b].push(b_sprite);
            }

            basement_idx += 2;
        }

        basements['b2'][0].setScale(0.2)
        

        // ----- [EVENT] ----- //
        this.clickSound = SoundAdd(this, 'sound:click', false);

        this.btnBack = this.add.image(130, 80, "image:backBtn").setInteractive();
        this.btnBack.setScale(0.6)

        btnEvent([this.btnBack], this.clickSound, 0xffff0f)

        this.btnBack.on('pointerdown', () => {
            this.scene.start('menu');
            this.scene.stop('map');
        });
    }
}
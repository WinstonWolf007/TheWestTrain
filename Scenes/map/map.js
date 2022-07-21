class Map extends Phaser.Scene {
    constructor() {
        super('map')
        this.size = 0.2
    }

    getGraf(divs) {
        for (let i=0; i<10; i++) {
            let row = []
            for (let j=0; j<7; j++) {
                row.push(Math.floor(Math.random() * (3+divs)))
            }
            
            for (let el=0; el<row.length; el++) {
                let element = row[el]
                let img;
                let pos = [
                    (i * 120)+100,
                    (el * 150)+50
                ]

                switch(element) {
                    case 0:
                        img = this.add.image(pos[0], pos[1], 'spritesheet:basements', 0)
                        break;
                    case 1:
                        img = this.add.image(pos[0], pos[1], 'spritesheet:basements', 2)
                        break;
                    case 2:
                        img = this.add.image(pos[0], pos[1], 'spritesheet:basements', 4)
                        break;
                    //default:
                        //img = this.add.image(pos[0], pos[1], 'spritesheet:empty', Math.floor(Math.random() * 7))
                        //break;
                }

                if (img != null) {
                    img.setScale(0.2)
                    img.setInteractive().on('pointerover', () => {
                        img.setTint(0xffff0f)
                        setCursor('pointer')
                    })

                    img.setInteractive().on('pointerout', () => {
                        img.setTint(0xffffff)
                        setCursor('default')
                    })
                }
            }
        }
        //console.log(graf)
    }

    preload() {
        this.cameras.main.setBackgroundColor('#ead9a7');
    }

    create() {
        this.getGraf(30)

        this.clickSound = SoundAdd(this, 'sound:click', JSON['volume']['fg'], false);

        this.btnBack = this.add.image(130, 80, "image:backBtn").setInteractive();
        this.btnBack.setScale(0.6)

        btnEvent([this.btnBack], this.clickSound, 0xffff0f)

        this.btnBack.on('pointerdown', () => {
            this.scene.start('menu');
            this.scene.stop('map');
        });
    }
}
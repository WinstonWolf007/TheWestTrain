class Company extends Phaser.Scene {
    constructor() {
        super('company');
    }

    create() {
        this.add.text(50, 20, 'Game maked by WinstonWolf007', {fontSize: 50})

        this.add.text(50, 100, 'Press SPACE...', {fontSize: 30})

        
    
        // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        //     this.scene.start('title')
        // })
        // setTimeout(() => {
        //     this.scene.start('title')
        // }, 2000)
    }

    update() {
        if (this.input.keyboard.addKey('SPACE').isDown) {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            setTimeout(() => {
                this.scene.start('title')
            }, 2000)
        }
    }
}
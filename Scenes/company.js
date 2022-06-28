class Company extends Phaser.Scene {
    constructor() {
        super('company');
    }

    create() {
        this.add.text(50, 20, 'Game maked by WinstonWolf007', {fontSize: 50})
        this.add.text(50, 100, 'Press SPACE...', {fontSize: 30})
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
class Company extends Phaser.Scene {
    constructor() {
        super('licence');
        this.finishWrite = false;
        this.change = false;
        this.end = false;
    }

    create() {
        this.add.text(50, 20, 'Game maked by @WinstonWolf007', {fontSize: 50})
        
        this.add.text(100, 120, 'The music licence:\n\nIn my Github project (Assets/Other/README.md)\n\nhttps://github.com/WinstonWolf007/TheWestTrain', {fontSize: 40})

        this.indicText = this.add.text(50, 700, '', {fontSize: 40})
        this.typewriteText('Press SPACE...');

        
    }

    update() {
        if (this.input.keyboard.addKey('SPACE').isDown) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            setTimeout(() => {
                this.scene.start('home');
                this.scene.stop('licence')
            }, 1000);
        }
    }

    typewriteText(text) {
        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.indicText.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 150
        })
        setTimeout(() => {
            this.finishWrite = true;
        }, (length+1) * 150)
    }
}
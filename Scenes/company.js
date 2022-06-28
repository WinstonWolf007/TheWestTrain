class Company extends Phaser.Scene {
    constructor() {
        super('company');
        this.indicText;
        this.finishWrite = false;
        this.change = false;
    }

    create() {
        this.add.text(50, 20, 'Game maked by @WinstonWolf007', {fontSize: 50})
        
        this.add.text(100, 120, '{ Music }', {fontSize: 45})
        this.add.text(100, 180, '* [countryboy.mp3]\n* [deepblue.mp3]\n* [funkysuspense.mp3]\n* [psychedelic.mp3]', {fontSize: 30})
        this.add.text(100, 330, 'https://www.bensound.com/', {fontSize: 30})

        this.add.text(100, 420, '{ Sound }', {fontSize: 45})
        this.add.text(100, 480, '* [Typewriter soft click.wav]\n* [Cool interface click tone.wav]', {fontSize: 30})
        this.add.text(100, 560, 'https://mixkit.co/free-sound-effects/click/', {fontSize: 30})

        this.indicText = this.add.text(50, 700, '', {fontSize: 40})
        this.typewriteText('Press SPACE...');
    }

    update() {
        if (this.input.keyboard.addKey('SPACE').isDown) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            setTimeout(() => {
                this.scene.start('home');
            }, 2000);
        }

        if (this.finishWrite) {
            const safeText = this.indicText.text;
            this.finishWrite = false;
            
            setInterval(() => {
                if (this.change) {
                    this.change = false;
                    this.indicText.text = ''
                } else {
                    this.change = true;
                    this.indicText.text = safeText
                }
            }, 500)

            this.indicText.text = safeText;
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
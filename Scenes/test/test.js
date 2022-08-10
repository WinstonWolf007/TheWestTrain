class Test extends Phaser.Scene {
    constructor() {
        super('test');
    }

    preload() {
        this.score = new Score(this, 'You have earned $10 !!!');
    }

    create() {
        this.score.add()
    }
    
    update() {
        this.score.loop(120, 2)
    }
}
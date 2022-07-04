class Begin extends Phaser.Scene {
    constructor() {
        super('company');
        this.end = false;
    }

    preload () {
        // VIDEO //
        this.load.video('v', './Assets/video/intro.mp4', 'loadeddata', false, false);
        
        // SOUND //
        this.load.audio('sound:click', './Assets/music/click.wav');

        // MUSIC //
        this.load.audio('music:countryboy', './Assets/music/countryboy.mp3');
        this.load.audio('music:drone-9708', './Assets/music/drone-9708.mp3');
        this.load.audio("music:psychedelic", './Assets/music/psychedelic.mp3');

        // IMAGE //
        this.load.image('image:menuTitle', './Assets/map-menu/menuTitle.png');
        this.load.image('image:startBtn', './Assets/button/startBtn.png');
        this.load.image('image:settingsBtn', './Assets/button/settingsBtn.png');
        this.load.image('image:bgMenu', './Assets/map-menu/bgMenu.png');
        this.load.image("image:backBtn", './Assets/button/backBtn.png');

        // SPRITESHEET //
        this.load.spritesheet('spritesheet:basements', './Assets/basement/basements.png', {frameWidth: 750, frameHeight: 600})
        this.load.spritesheet('spritesheet:menuChest', './Assets/Icon/menuChest(264x408).png', {frameWidth: 264,frameHeight: 408});
        this.load.spritesheet('spritesheet:menuLight', './Assets/Icon/menuLight(168x344).png', {frameWidth: 168,frameHeight: 344});
        this.load.spritesheet('spritesheet:menuScreenData', './Assets/Icon/menuScreenData(520x184).png', {frameWidth: 520,frameHeight: 184});
        this.load.spritesheet('spritesheet:titleScreenData', './Assets/Icon/titleScreenData(352x344).png', {frameWidth: 352,frameHeight: 344});
        this.load.spritesheet('spritesheet:menuBtn', './Assets/button/menuBtn(168x72).png', {frameWidth: 168,frameHeight: 72});
        this.load.spritesheet('spritesheet:volume', './Assets/Icon/volume(256X256).png', {frameWidth: 256, frameHeight: 256})
        this.load.spritesheet("spritesheet:shop", './Assets/map-menu/shop.png', {frameWidth: 1200,frameHeight: 736});
    }

    create() {
        this.introV = this.add.video(700, 400, 'v');
        this.introV.autoplay = true;
        this.introV.play();
        this.introV.setPaused(false);
    }

    update() {
        if (this.introV.getProgress() === 1 && !this.end) {
            this.end = true;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            setTimeout(() => {
                this.scene.start('home');
                this.scene.stop('company');
            }, 1000);
        }
    }
}
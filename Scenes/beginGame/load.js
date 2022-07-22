class Load extends Phaser.Scene {
    constructor() {
        super('company');
        this.end = false;
    }

    preload () {   
        // SOUND //
        //this.load.audio('sound:click', './Assets/music/click.wav');
        this.load.audio('sound:electricity', './Assets/music/electricity.wav');
        //this.load.audio('sound:casset', './Assets/music/mixkit-cassette-player-2556.wav');
        //this.load.audio('sound:smallElectricity', './Assets/music/mixkit-small-electric-glitch-2595.wav');
        //this.load.audio('sound:metalEcho', './Assets/music/mixkit-factory-hit-with-echo-2983.wav');
        //this.load.audio('sound:metalHard', './Assets/music/mixkit-factory-metal-hard-hit-2980.wav');
        //this.load.audio('sound:gunShoot1', './Assets/music/battle/gunSound/mixkit-blast-hit-with-echo-2186.wav')
        this.load.audio('sound:gunShoot2', './Assets/music/battle/gunSound/mixkit-game-gun-shot-1662.mp3')
        //this.load.audio('sound:gunShoot3', './Assets/music/battle/gunSound/mixkit-impact-of-a-blow-2150.wav')
        //this.load.audio('sound:gunShoot4', './Assets/music/battle/gunSound/mixkit-laser-weapon-shot-1681.wav')
        //this.load.audio('sound:fastHeart', './Assets/music/battle/health/mixkit-fast-heartbeat-493.wav')
        //this.load.audio('sound:slowHeart', './Assets/music/battle/health/mixkit-slow-heartbeat-494.wav')
        //this.load.audio('sound:reloadGun1', './Assets/music/battle/reloadGun/mixkit-handgun-movement-1668.wav')
        //this.load.audio('sound:reloadGun2', 'Assets/music/battle/reloadGun/mixkit-revolver-chamber-spin-1674.wav')
        //this.load.audio('sound:reloadGun3', './Assets/music/battle/reloadGun/mixkit-shotgun-hard-pump-1665.wav')
        //this.load.audio('sound:reloadGun4', './Assets/music/battle/reloadGun/mixkit-shotgun-long-pump-1666.wav')
        this.load.audio('sound:321', './Assets/music/battle/time/321.wav')
        this.load.audio('sound:go', './Assets/music/battle/time/go.wav')
        this.load.audio('sound:badShoot', './Assets/music/battle/gunSound/mixkit-falling-into-mud-surface-385.wav')

        // MUSIC //
        //this.load.audio('music:chill-abstract-intention', './Assets/music/Bar/chill-abstract-intention-12099.mp3');
        //this.load.audio('music:drone-9708', './Assets/music/Menu/drone-9708.mp3');
        //this.load.audio("music:my-life-main", './Assets/music/Home/my-life-main-6670.mp3');
        //this.load.audio('music:aspire', './Assets/music/battle/1/aspire-111789.mp3')
        this.load.audio('music:irreducible', './Assets/music/battle/2/irreducible-111374.mp3')

        // IMAGE //
        // this.load.image('image:menuTitle', './Assets/map-menu/menuTitle.png');
        // this.load.image('image:startBtn', './Assets/button/startBtn.png');
        // this.load.image('image:settingsBtn', './Assets/button/settingsBtn.png');
        // this.load.image('image:bgMenu', './Assets/map-menu/bgMenu.png');
        // this.load.image("image:backBtn", './Assets/button/backBtn.png');
        // this.load.image("image:money1", "./Assets/Icon/money1.png")
        // this.load.image("image:money2", "./Assets/Icon/money2.png")
        // this.load.image("image:money3", "./Assets/Icon/money3.png")

        // SPRITESHEET //
        // this.load.spritesheet('spritesheet:basements', './Assets/basement/basements.png', {frameWidth: 750, frameHeight: 600});
        // this.load.spritesheet('spritesheet:menuChest', './Assets/Icon/menuChest(264x408).png', {frameWidth: 264,frameHeight: 408});
        // this.load.spritesheet('spritesheet:menuLight', './Assets/Icon/menuLight(168x344).png', {frameWidth: 168,frameHeight: 344});
        // this.load.spritesheet('spritesheet:menuScreenData', './Assets/Icon/menuScreenData(520x184).png', {frameWidth: 520,frameHeight: 184});
        // this.load.spritesheet('spritesheet:titleScreenData', './Assets/Icon/titleScreenData(352x344).png', {frameWidth: 352,frameHeight: 344});
        // this.load.spritesheet('spritesheet:menuBtn', './Assets/button/menuBtn(168x72).png', {frameWidth: 168,frameHeight: 72});
        // this.load.spritesheet('spritesheet:volume', './Assets/Icon/volume(256X256).png', {frameWidth: 256, frameHeight: 256})
        // this.load.spritesheet("spritesheet:shop", './Assets/map-menu/shop.png', {frameWidth: 1200,frameHeight: 736});
        // this.load.spritesheet("spritesheet:map", './Assets/map-menu/BG_map_(1000x1000).png', {frameWidth: 1000,frameHeight: 1000});
        // this.load.spritesheet("spritesheet:empty", './Assets/plant/empty.png', {frameWidth: 750, frameHeight: 600});
        this.load.spritesheet("spritesheet:battleMap", "./Assets/map-menu/battleMap(1500X920).png", {frameWidth: 1500, frameHeight: 920});
        this.load.spritesheet("spritesheet:battleEntity", "./Assets/entity/battleEntity(250X370).png", {frameWidth: 250, frameHeight: 370});
        this.load.spritesheet("spritesheet:deathEntity", "./Assets/entity/deathEntity(250X370).png", {frameWidth: 250, frameHeight: 370});
        this.load.spritesheet("spritesheet:iddleEntity", "./Assets/entity/iddleEntity(250X370).png", {frameWidth: 250, frameHeight: 370});

        // bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
                    
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
        });
    }

    create() {
        //this.scene.start('licence')
        //this.scene.start('shop');
        this.scene.start('battle');
    }
}
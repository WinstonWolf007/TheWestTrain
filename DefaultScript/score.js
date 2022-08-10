/*
This Class is used for create a box message.
Example: I Win a combat, a box message send me a message. "Great, you have win you fist combat"
*/
class Score {
    constructor(object, text) {
        this.object = object;
        this.text = text;

        this.reverse = false;
        this.oneLoop = false;
    }

    /**
     * Add image && text instance to the scene
     * @constructor
     */
    add() {
        this.img = this.object.add.image(500, -150, 'image:score2')
        this.text = this.object.add.text(500, -80, this.text, {fontSize: 50, fontFamily: 'pixelMoney'}).setOrigin().setTint(0x834b36)
    }

    /**
     * Update Image && Text trasitionY
     * @constructor
     * @param {Number} limit
     * @param {Number} speed
     */
    loop(limit, speed) {
        if (!this.reverse && this.img.y < limit) {
            this.img.y += speed;
            this.text.y += speed;
        }
        else if (!this.reverse) {
            if (!this.oneLoop) {
                this.oneLoop = true;
                setTimeout(() => {
                    this.reverse = true;
                }, 1000);
            }
        }
        else if (this.reverse && this.img.y > -150) {
            this.img.y -= speed;
            this.text.y -= speed;
        }
    }
}
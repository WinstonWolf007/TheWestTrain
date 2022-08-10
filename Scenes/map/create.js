/**
 * Generate a matrix && display the basement  for the map compared to num in matrix (0 = basement1, 1 = basement2, etc...)
 * @param {Object} object 
 * @param {Number} divs 
 */
function getGraf(object, divs) {

// ############################ Matrix ############################# //
    for (let i=0; i<10; i++) {
        let row = []
        for (let j=0; j<7; j++) {
            row.push(Math.floor(Math.random() * (3+divs)))
        }

// ############################## Map ############################### //
        
        for (let el=0; el<row.length; el++) {
            let element = row[el]
            let img;
            let pos = [
                (i * 120)+100,
                (el * 150)+50
            ]

            switch(element) {
                case 0:
                    img = object.add.image(pos[0], pos[1], 'spritesheet:basements', 0)
                    break;
                case 1:
                    img = object.add.image(pos[0], pos[1], 'spritesheet:basements', 2)
                    break;
                case 2:
                    img = object.add.image(pos[0], pos[1], 'spritesheet:basements', 4)
                    break;
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

                img.setInteractive().on('pointerdown', () => {
                    object.scene.start('battle')
                    object.scene.stop('map')
                })
            }
        }
    }
}
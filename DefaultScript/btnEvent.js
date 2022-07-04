function btnEvent(allBtn, clickVar, color) {
    allBtn.forEach(btn => {
        btn.on('pointerdown', () => {
            clickVar.play();
            if (color === 0xffff0f) {
                setCursor('default')
            }
            
        });

        btn.on('pointerover', () => {
            btn.setTint(color);
            game.canvas.style.cursor = "pointer";
        });

        btn.on('pointerout', () => {
            btn.setTint(0xffffff);
            game.canvas.style.cursor = "default";
        });
    });
}
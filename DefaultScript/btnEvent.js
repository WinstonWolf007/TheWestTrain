function btnEvent(allBtn, clickVar) {
    allBtn.forEach(btn => {
        btn.on('pointerdown', () => {
            clickVar.play();
            setCursor('default')
        });

        btn.on('pointerover', () => {
            btn.setTint(0xffff0f);
            game.canvas.style.cursor = "pointer";
        });

        btn.on('pointerout', () => {
            btn.setTint(0xffffff);
            game.canvas.style.cursor = "default";
        });
    });
}
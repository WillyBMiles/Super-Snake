export class Button{
    #callback = null; 
    
    constructor(scene, callback, context, x, y){
        this.scene = scene;
        this.image = this.scene.add.image(x, y, DIALOGUE).setInteractive();
        this.image.scale = 1.2;
        this.text = this.scene.add.bitmapText(x-34,y-11, FONT, "", 10, 1);
        this.image.depth = 100;
        this.text.depth = 100;

        this.#callback = callback;

        this.image.on('pointerdown', () =>{
            this.click();
        });
    }

    show(text){
        this.image.alpha = 1;
        this.text.text = text;


    }

    hide(){
        this.image.alpha = 0;
        this.image.setInteractive()
        this.text.text = "";
    }

    click(){
        if (this.image.alpha == 1)
            this.#callback();
    }
}
export class Egg {
    constructor(world, scene, x, y){
        this.obj = new WorldObject(world,x,y, T_EGG, this);

        this.sprite = scene.add.image(0,0,EGG);
        let _x = this.obj.sceneX();
        let _y = this.obj.sceneY();
        this.sprite.x = _x;
        this.sprite.y = _y;
    }

    destroy(){
        this.sprite.destroy();
        this.sprite = null;
        this.obj.destroy();
    }
    
    


}
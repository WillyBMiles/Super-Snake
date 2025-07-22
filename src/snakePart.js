export class SnakePart {
    constructor(world, index, predecessor, sprite, details){
        this.index = index;
        this.successor = null;
        this.predecessor = predecessor;
        var x = 0;
        var y = 0;
        if (predecessor != null){
            x = predecessor.x;
            y = predecessor.y;
        }
        this.world = world;
        this.obj = new WorldObject(this.world, x, y, T_BODY);

        this.length = 1;

        this.sprite = sprite;
        this.details = details;
        this.draw();
        
    }

    updateMe(length){
        this.length = length;
    }
    
    addSuccessor(successor){
        this.successor = successor;
    }

    forward() {
        this.obj.move(this.predecessor.obj.x, this.predecessor.obj.y);
    }
    kill(){
        this.predecessor.successor = null;
        this.sprite.destroy();
        this.details.destroy();
        this.obj.destroy();
    }

    draw() {
        let _x = this.obj.sceneX();
        let _y = this.obj.sceneY();
        this.sprite.x = _x;
        this.sprite.y = _y;
        this.details.x = _x;
        this.details.y = _y;

        var rotation;
        if (this.successor != null){
            rotation = SnakePart.getRotation(this.obj.x, this.obj.y, this.successor.obj.x, this.successor.obj.y);
        }
        else if (this.predecessor != null){
            rotation = SnakePart.getRotation(this.predecessor.obj.x, this.predecessor.obj.y, this.obj.x, this.obj.y);
        }

        this.setSprite();
        this.setDetailColor();

        this.sprite.rotation = rotation;
        this.details.rotation = rotation;
    }

    setSprite(){
        if (this.successor == null){
            this.sprite.setTexture(TAIL);
            this.details.setTexture(TAIL_DETAILS);
        }
        else if (this.shouldTurn(this.predecessor.obj.x, this.predecessor.obj.y, this.successor.obj.x, this.successor.obj.y)){
            
            this.sprite.setTexture(TURN_BODY);
            this.details.setTexture(TURN_BODY_DETAILS);
            this.sprite.flipX = this.shouldReverse(this.predecessor.obj.x, this.predecessor.obj.y, this.successor.obj.x, this.successor.obj.y);
            this.details.flipX = this.sprite.flipX;
        }
        else {
            this.sprite.setTexture(STRAIGHT_BODY);
            this.details.setTexture(STRAIGHT_BODY_DETAILS);
        }
    }

    setDetailColor(){
        var t1 = this.index / (this.length -1);
        var t2 =(this.index + .5) / (this.length -1);
        var minColor = new Phaser.Display.Color(221,160,221);
        var maxColor = new Phaser.Display.Color(75,0,130);
        var colorT = Phaser.Display.Color.Interpolate.ColorWithColor(minColor, maxColor, 100, t1 * 100);
        var colorB = Phaser.Display.Color.Interpolate.ColorWithColor(minColor, maxColor, 100, t2 * 100);
        
        var cT = SnakePart.extractHexString(colorT);
        var cB = SnakePart.extractHexString(colorB);

        this.details.setTint(cT, cT, cB, cB);
    }

    static extractHexString(color){
        var hex = Phaser.Display.Color.RGBToString(color.r, color.g, color.b);
        return "0x" + hex.substring(1);
    }

    static getRotation(my_x, my_y, their_x, their_y){
        var direction = directionBetween(their_x, their_y, my_x, my_y);
        return directionToAngle(direction);
    }

    shouldTurn(last_x, last_y, next_x, next_y){
        return directionBetween(this.obj.x, this.obj.y, next_x, next_y) != directionBetween(last_x, last_y, this.obj.x, this.obj.y);
    }

    shouldReverse(last_x, last_y, next_x, next_y){
        var inDirection = directionBetween(last_x, last_y, this.obj.x, this.obj.y);
        var outDirection = directionBetween(this.obj.x, this.obj.y, next_x, next_y);
        return whichWayToTurn(inDirection, outDirection) == LEFT;
    }
}
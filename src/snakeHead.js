import { SnakePart } from './snakePart.js';

export class SnakeHead extends SnakePart {
    constructor(world, x, y, direction, sprite, details){
        super(world, 0, null, sprite, details);
       
        this.direction = direction;

         this.obj.move(x,y);
        this.obj.type = T_HEAD;

        this.obj.checkCollisions = true;

    }

    forward(){
        var toMove = directionToTuple(this.direction);
        let x = this.obj.x + toMove[0];
        let y = this.obj.y + toMove[1];
        this.obj.move(x,y);

    }
    turn(direction){
        if (areDirectionsAdjacent(this.direction, direction)){
            this.direction = direction;
        }
    }

    setSprite(){
        //Override with nothing
    }
}
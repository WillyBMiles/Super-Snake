import { SnakePart } from './snakePart.js';
import { SnakeHead } from './snakeHead.js';

export class Snake extends Phaser.GameObjects.GameObject {
    freeze = true;

    moveCallback = null;

    constructor(scene, world, head_x,head_y ){
        super(scene, "Snake");

        this.world = world;
        var headSprite = this.scene.add.image(0,0,HEAD);
        var headDetails = this.scene.add.image(0,0,HEAD_DETAILS);
        
        this.head = new SnakeHead(this.world, head_x, head_y, UP, headSprite, headDetails);
        this.body = [this.head];
        this.tail = this.head;
        this.addPiece(); //start with two Pieces
        
        this.head.addSuccessor(this.tail);

        this.drawChildren();

        this.freeze = false;
    }
    
    
    moveForward(){
        if (this.freeze)
            return;

        for (let i = this.body.length - 1; i >= 0; i--){
            this.body[i].forward();
        }
        this.drawChildren();
        this.world.step();
        if (this.moveCallback != null)
            this.moveCallback();
    }

    addPiece(){
        var piece = this.scene.add.image(0, 0, STRAIGHT_BODY);
        var pieceDetails = this.scene.add.image(0, 0, STRAIGHT_BODY_DETAILS);

        var newPiece = new SnakePart(this.world, this.body.length, this.tail, piece, pieceDetails );
        this.tail.addSuccessor(newPiece);
        this.body.push(newPiece);
        this.tail = newPiece;
    }
    removePiece(){
        if (this.body.length <= 2)
            return;
        let oldTail = this.tail;
        this.tail = oldTail.predecessor;
        oldTail.kill();
        this.body.splice(this.body.length -1, 1);
        this.drawChildren();
    }

    drawChildren(){
        for (let i = 0; i < this.body.length; i++){
            this.body[i].updateMe(this.body.length);
            this.body[i].draw();
        }

    }

    swipe(direction){
        console.log(direction);
        this.move(direction);
    }

    move(direction){
        if (this.freeze)
            return;

        if (this.head.direction != direction){
            this.head.turn(direction);
            this.moveForward();
        }
    }


}
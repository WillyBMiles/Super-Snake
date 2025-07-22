import { Snake } from '../snake.js';
import { Game } from '../game.js';

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image(GROUND, 'assets/groundtile.png');
        this.load.image(EGG, 'assets/egg.png');
        this.load.image(WALL, 'assets/walltile.png');

        this.load.image(DIALOGUE, 'assets/dialogueBox.png');

        this.load.image(HEAD, 'assets/HEAD.PNG');
        this.load.image(HEAD_DETAILS, 'assets/HEADDetails.PNG');

        this.load.image(TURN_BODY, 'assets/TURN.PNG');
        this.load.image(TURN_BODY_DETAILS, 'assets/TURNDetails.PNG');

        this.load.image(STRAIGHT_BODY, 'assets/BODY.PNG');
        this.load.image(STRAIGHT_BODY_DETAILS, 'assets/BODYDetails.PNG');

        this.load.image(TAIL, 'assets/TAIL.PNG');
        this.load.image(TAIL_DETAILS, 'assets/TAILDETAILS.PNG');

        let file = 'round_6x6';
        this.load.bitmapFont(FONT, 'assets/fonts/' + file + '.png', 'assets/fonts/' + file + '.xml');

    }

    create() {
        this.background = this.add.tileSprite(WIDTH  * BLOCK_SIZE / 2, HEIGHT * BLOCK_SIZE / 2, WIDTH * BLOCK_SIZE, HEIGHT * BLOCK_SIZE, GROUND);
        this.WALL = this.add.tileSprite(WIDTH  * BLOCK_SIZE / 2, (HEIGHT - .5) * BLOCK_SIZE, WIDTH * BLOCK_SIZE, BLOCK_SIZE, WALL);
        this.world = new World(this,0,0, WIDTH, HEIGHT);
        this.snake = new Snake(this, this.world, 5, 5);

        this.input.keyboard.on('keydown-' + 'W', function (event) { this.snake.move(UP) }, this);
        this.input.keyboard.on('keydown-' + 'D', function (event) { this.snake.move(RIGHT) }, this);
        this.input.keyboard.on('keydown-' + 'S', function (event) { this.snake.move(DOWN) }, this);
        this.input.keyboard.on('keydown-' + 'A', function (event) { this.snake.move(LEFT) }, this);

        this.myGame = new Game(this, this.world, this.snake);
    }

    #wasDown = false;
    #downPos = [0,0];
    #lastPos = [0,0];

    update() {
        var pointer = this.input.activePointer;
        if (pointer.isDown){
            this.#lastPos = [pointer.x, pointer.y];
            if (!this.#wasDown){
                this.#downPos = [pointer.x, pointer.y];
                this.#wasDown = true;
            }
        }
        else {
            if (this.#wasDown){
                let diffX = this.#lastPos[0] - this.#downPos[0];
                let diffY = this.#lastPos[1] - this.#downPos[1];
                let absX = Math.abs(diffX);
                let absY = Math.abs(diffY);
                let threshold = 10;
                if (absX > threshold || absY > threshold){
                    if (absX > absY){
                        if (diffX > 0){
                            this.swipe(RIGHT);
                        }
                        else {
                            this.swipe(LEFT);
                        }
                    }
                    else {
                        if (diffY > 0){
                            this.swipe(DOWN);
                        }
                        else {
                            this.swipe(UP);
                        }
                    }
                }
                this.#wasDown = false;
            }
        }
    }

    swipe(direction){
        this.snake.swipe(direction);
    }
    
}

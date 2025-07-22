import { Egg } from './egg.js';
import { Button } from './button.js';
import * as a from './ability.js';

const START = 0;
const GAME = 1;
const SELECTION = 2;
const RESTART = 3;

//Game controls the gamestate flow and the UI
export class Game {
    //ability controls
    timeScale = 1;
    points = 0;
    pointsPerEgg = 500;
    eggsPerAbility = 5;
    abilitiesPerIncreaseInEggRequirement = 1;
    eggValueIncreasePerEgg = 0;
    eggsPerLength = 1;
    randomAbilitiesPerEgg = 0;
    extraLives = 0;
    pointsPerMove = 0;
    
    currentEggs = 0;
    currentEggsReLength = 0;
    currentAbilities = 0;


    constructor(scene, world, snake){
        this.scene = scene;
        this.world = world;
        this.snake = snake;

        this.snake.moveCallback = () => this.snakeMoved();
        this.collisionSetup();
        
        this.spawnEgg();

        this.setupUI();

        this.setupStates();
        this.setupAbilities();
    }




    collisionSetup(){
        this.snake.head.obj.subscribeToCollision(this.headCollisions, this);
        this.snake.head.obj.subscribeToOutOfBounds(this.headOutOfBounds, this);
    }

    headCollisions(head, other, context){
        if (other.type == T_BODY){
            if (context.extraLives > 0){
                context.extraLives--;
            }else
                context.lose("Hit your body!");
        }
            
        if (other.type == T_EGG){
            other.parent.destroy();
            context.pickupEgg();
        }
    }
    headOutOfBounds(head, context){
        context.lose("Out of bounds!");
    }

    lose(message){
        this.lossMessage = message + "\n SCORE: " + this.points + "\n  NEW WORLD RECORD!!!";
        this.transitionTo(RESTART);
    }

    snakeMoved(){
        this.updatePoints(this.points + this.pointsPerMove);
        this.startTimer();
    }

    pickupEgg(){
        this.currentEggsReLength += 1;
        if (this.currentEggsReLength >= this.eggsPerLength){
            this.currentEggsReLength -= this.eggsPerLength;
            this.snake.addPiece();
        }
        for (let i =0; i < this.randomAbilitiesPerEgg; i++){
            this.takeAbility(this.getRandomAbility());
        }

        this.spawnEgg();
        this.updatePoints(this.points + this.pointsPerEgg);
        this.pointsPerEgg += this.eggValueIncreasePerEgg;

        this.currentEggs += 1;
        if (this.currentEggs >= this.eggsPerAbility){
            this.transitionTo(SELECTION);
            this.currentEggs -= this.eggsPerAbility;

            this.currentAbilities += 1;
            if (this.currentAbilities >= this.abilitiesPerIncreaseInEggRequirement){
                this.eggsPerAbility += 1;
                this.currentAbilities -= this.abilitiesPerIncreaseInEggRequirement;
            }
        }
    }

    spawnEgg(){
        let x = this.randomX();
        let y = this.randomY();

        let tries = 100;
        while (this.world.checkPos(x,y) && tries > 0){
            x = this.randomX();
            y = this.randomY();
            tries --;
        }

        var egg = new Egg(this.world, this.scene, x, y);

        egg.obj.subscribeToCollision(this.gotEgg,this);
        
    }

    randomX(){
        return this.getRandomInt(0, WIDTH);
    }
    randomY(){
        return this.getRandomInt(0, HEIGHT-1);
    }
    getRandomInt(min, max){
        return min + Math.floor(Math.random() * (max- min));
    }

    //STATE MANAGER
    setupStates(){
        this.state = START;
        this.startTimer();
        this.timer.timeScale  = 0;
    }

    transitionTo(state){
        this.state = state;
        switch (state){
            case GAME:
                this.timer.timeScale  = this.timeScale;
                this.snake.freeze = false;
                this.clearUI();
                break;
            case SELECTION:
                this.timer.timeScale = 0;
                this.showSelection();
                this.snake.freeze = true;
                break;
            case RESTART:
                this.timer.timeScale  = 0;
                this.button1.show("Restart");
                this.header.text = this.lossMessage;
                this.snake.freeze = true;
                break;
        }
    }

    startTimer(){
        if (this.timer != null){
            this.timer.remove();
        }
        this.timer = this.scene.time.addEvent({
            delay: 500, // ms
            callback: function(){
                this.snake.moveForward();
            },
            callbackScope: this,
            loop: true,
        });
        this.timer.timeScale = this.timeScale;
    }

    //UI

    setupUI(){
        this.title = this.scene.add.bitmapText(0,16, FONT, "SUPER SNAKE", 20, 1);
        this.header = this.scene.add.bitmapText(0,6, FONT, "", 10, 1);
        this.header.depth = 100;
        
        this.pointsText = this.scene.add.bitmapText(0,BLOCK_SIZE * (HEIGHT -.5), FONT, "0", 10, 1);
        this.pointsText.depth = 100;

        this.abilityText = this.scene.add.bitmapText(70, BLOCK_SIZE * (HEIGHT - .5), FONT, "",10,1);

        this.button1 = new Button(this.scene,() => this.clickButton1(), this, 60,50 );
        this.button1.show("Start Game!");
        this.button2 = new Button(this.scene,() => this.clickButton(1), this, 60,100 );
        this.button2.hide();
        this.button3 = new Button(this.scene, () => this.clickButton(2), this, 60,150 );
        this.button3.hide();
    }

    clearUI(){
        this.button1.hide();
        this.button2.hide();
        this.button3.hide();
        this.header.text = "";
        this.title.text = "";
    }

    startGameUI(){
        this.header.text = "  Swipe to turn!\n  Slither to go faster!";
        this.scene.time.addEvent({
            delay: 5000, // ms
            callback: function(){
                this.header.text = "";
            },
            callbackScope: this,
            loop: false,
        });

    }

    selectionAbilities = [];

    showSelection() {
        this.header.text = "Evolved!\n    Pick a new ability!"
        this.selectionAbilities = this.getThreeUniqueAbilities();
        this.button1.show(this.selectionAbilities[0].description);
        this.button2.show(this.selectionAbilities[1].description);
        this.button3.show(this.selectionAbilities[2].description);
    }

    clickButton1(){
        if (this.state == START){
            this.transitionTo(GAME);
            this.startGameUI();
        }
        if (this.state == RESTART){
            this.scene.scene.restart();
        }
        if (this.state == SELECTION){
            this.clickButton(0);
        }
    }

    clickButton(index){
        if (this.state == SELECTION){
            this.takeAbility(this.selectionAbilities[index]);
            this.transitionTo(GAME);
        }
    }
    
    updatePoints(newPoints){
        if (newPoints < 0)
            newPoints = 0;
        newPoints = Math.floor(newPoints);
        this.points = newPoints;
        this.pointsText.text = this.points;
    }


    //Ability Setup
    setupAbilities(){
        this.abilities = [
            new a.EggsPerAbility(-2, "-2 Eggs needed\nper Ability."),
            new a.EggValue(100,1,"+100 per\n future Egg."),
            new a.SpawnEgg("+1 Egg on\n  field"),
            new a.CompositeAbility([
                new a.PointsAbility(0,2),
                new a.TimeChange(1.5)
                ], "2x points\n+50% speed"),
            new a.CompositeAbility([
                new a.AddLength(5),
                new a.EggsPerLength(1)
                ], "+5 Length\n+1 Egg needed\n per length"),
            new a.ExtraAbilities(2, "+2 random\n Abilities"),
            new a.CompositeAbility([
                new a.EggValue(0,.5),
                new a.ExtraAbilities(5)
            ], "1/2 Egg value.\n+5 random\n Abilities\n"),
            new a.NumberOfAbilitiesPerCostIncrease(1,"+1 Ability\nneeded to add to\nAbility cost"),
            new a.PointsAbility(10000,1, "+10000 points"),
            new a.CompositeAbility([
                new a.ExtraLives(5),
                new a.EggsPerAbility(10)
            ], "+5 lives.\n+10 Eggs to \n get Ability."),
            new a.CompositeAbility([
                new a.PointsAbility(0,.5),
                new a.ValuePerEggPerEgg(25)
                ], "1/2 Points.\nEach Egg +25\n to future eggs"),
            new a.CompositeAbility([
                new a.PointsAbility(0,0),
                new a.RandomAbilitiesPerEgg(1)
                ], "Points to zero.\n+1 Ability per \nEgg"),
            new a.ExtraLives(1, "Cross tail 1x\nwithout loss"),
            new a.CompositeAbility([
                new a.EggValue(0,2),
                new a.PointsPerMove(-10),
                ], "2x Egg value.\n-10 Points\n per move."),
            new a.RemoveLength(5, "-5 Length"),
            new a.CompositeAbility([
                new a.RemoveLength(256),
                new a.TimeChange(1.5),
            ], "Length to 2.\n+50% Speed"),
            new a.TimeChange(.75, "-25% Speed"),
            new a.CompositeAbility([
                new a.PointsPerMove(5),
                new a.TimeChange(1.25)
            ], "+5 Points \n  per move.\n+25% Speed"),
            new a.PointFormula((p) => p + this.abilityCount * 500, "+500 Points\n per Ability."),
        ];

        this.abilityCount = 0;
    }

    getRandomAbility(){
        let index = Math.floor(Math.random() * this.abilities.length);
        return this.abilities[index];
    }

    getThreeUniqueAbilities(){
        let first = this.getRandomAbility();
        let second = first;
        //Exciting nondeterministic infinite loop possibility
        //Adds a bit of risk
        while (first == second){
            second = this.getRandomAbility();
        }
        let third = second;
        while (third == second || third == first){
            third = this.getRandomAbility();
        }
        return [first,second,third];
    }

    takeAbility(ability){
        if (this.state != GAME && this.state != SELECTION)
            return;
        if (this.abilityCount >= 100){
            this.lose("Ability overload!");
        }

        ability.take(this);
        this.abilityCount ++;
        this.abilityText.text = "Abilities: " + this.abilityCount;
    }

}